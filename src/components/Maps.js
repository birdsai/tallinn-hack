import React, { Component } from 'react';
import request from 'superagent';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet'
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/assets/css/leaflet.css';
import ThreeBounce from './ThreeBounce';

const SENTINAL_INSTANCE_ID = '390ee32f-87f7-4536-ac56-5ddce307ff00';
const API = 'http://birdsai.co/DataRequest/MakeDataRequest';
const lat = 59.32811085798514;
const lng = 24.68559265136719;
const FINAL_RESULTS = [
  {crop: 'Bean',  area: 152.1852281, difference: -15, disappeared: 30, new: 15},
  {crop: 'Carrot',  area: 5.789802195, difference: 0.05, disappeared: 0.01, new: 0.06},
  {crop: 'Corn', area: 63.81083456, difference: 21, disappeared: 4, new: 25},
  {crop: 'Grass', area: 268.8842214, difference: 3, disappeared: 25, new: 28},
  {crop: 'Herbs', area: 1523.120295, difference: 124, disappeared: 230, new: 354},
  {crop: 'Onion', area: 1.497640783, difference: 1.497640783, disappeared: 0, new: 1.497640783, status: 'success'},
  {crop: 'Potato', area: 79.65599486, difference: -22, disappeared: 30, new: 8, status: 'danger'},
  {crop: 'Beetroot', area: 3.541096057, difference: 1.5, disappeared: 2, new: 2.5},
  {crop: 'Wheat', area: 470.4064003, difference: -53, disappeared: 98, new: 45, status: 'danger'},
]

// Tallinn
const bounds = {
  w: 24.3457,
  s: 59.548240,
  e: 24.9664,
  n: 59.198438
};

const maxBounds = new L.LatLngBounds(
  new L.latLng(bounds.s, bounds.w),
  new L.latLng(bounds.n, bounds.e)
);

class Maps extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.predict = this.predict.bind(this);
    this.openModal = this.openModal.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      model: 'LandUsage',
      satellite: 'L1C',
      area: 'Coordinates',
      loading: false,
      modal: false,
      fetching: false
    };
  }

  componentDidMount() {
    // OpenStreetMap
    const osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    // Sentinel Hub WMS service
    // tiles generated using EPSG:3857 projection - Leaflet takes care of that
    const baseUrl = `https://services.sentinel-hub.com/ogc/wms/${SENTINAL_INSTANCE_ID}`;

    const Layer = layer => L.tileLayer.wms(baseUrl, {
      tileSize: 512,
      attribution: '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
      maxcc:99,
      minZoom:6,
      maxZoom:16,
      preset: layer,
      layers: layer,
      time:"2015-01-01/2018-06-08",
    });
    const natural = Layer('TRUE_COLOR');
    const agriculture = Layer('AGRICULTURE');
    const ndvi = Layer('NDVI');

    const baseMaps = {
      'OpenStreetMap': osm
    };
    const overlayMaps = {
      'Natural': natural,
      'Agriculture': agriculture,
      'NDVI': ndvi
    };

    const map = L.map('maps', {
      center: [lat, lng], // lat/lng in EPSG:4326
      zoom: 12,
      layers: [osm, natural],
      maxBounds,
      maxBoundsViscosity: 0.8
    });
    this.map = map;

    // Rectangles
    const drawnItems = L.featureGroup().addTo(map);

    // On map move end
    map.on('moveend', () => {
      const zoom = map.getZoom();
      const { lat, lng } = map.getCenter();
      // do something here ?
    });

    // Search
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      showMarker: false,
      autoClose: true
    });

    // Draw rectangle control
    const options = {
      position: 'topright',
      draw: {
        polygon: false,
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: false,
        rectangle: {
          shapeOptions: {
            clickable: false
          }
        },
        toolbar: {
          buttons: {
            rectangle: 'Draw'
          }
        }
      }
    };
    const drawControl = new L.Control.Draw(options);

    // Add map control
    map.addControl(drawControl);
    map.addControl(searchControl);

    // add ground truth
    const ground = L.featureGroup().addTo(map);
    this.ground = ground;

    // add prediction
    const prediction = L.featureGroup().addTo(map);
    this.prediction = prediction;

    // On drawing rectangle
    map.on(L.Draw.Event.CREATED, e => {
      const type = e.layerType;
      const layer = e.layer;
      drawnItems.addLayer(layer);

      this.loadTiffs(ground, 'images', 0.2);
      ground.bringToFront();
    });

    L.control.layers(baseMaps, overlayMaps).addTo(map);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  }

  submit(e) {
    const data = {
      ...this.state
    };
    this.loadTiffs(this.ground, 'images', 0.2);
    request
      .post(API)
      .send(data)
      .then(res => {
      // response
    })
  }

  predict(e) {
    this.loadTiffs(this.prediction, 'images', 0.8);
  }

  loadTiffs(_layer, folder = 'images', opacity) {
    this.setState({ loading: true });
    const parse_georaster = require("georaster");
    const GeoRasterLayer = require("georaster-layer-for-leaflet");

    const promises = [];
    for (var i = 1; i <= 10; i++) {
      promises.push(fetch(`/${folder}/${i}.tif`)
        .then(r => r.arrayBuffer())
        .then(ab => parse_georaster(ab)));
    }
    Promise.all(promises).then(arr => {
      arr.forEach(georaster => {
        const layer = new GeoRasterLayer({
          georaster: georaster,
          opacity
        });
        _layer.addLayer(layer).bringToFront();
      })
    }).then(() => this.setState({ loading: false }));
  }

  openModal(e) {
    e.preventDefault();
    this.setState({ modal: true, fetching: true });
    setTimeout(() => this.setState({ fetching: false }), 3000)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <div className="container mb-3">
          <div className="d-flex flex-wrap">
            <div className="form-group pr-2">
              <label>Classes:</label>
              <select name="classes" className="form-control"
                onChange={this.handleChange}>
                <option value="beans">Beans</option>
                <option value="carrots">Carrots</option>
                <option value="corn">Corn</option>
                <option value="grass">Grass</option>
                <option value="herbs">Herbs</option>
                <option value="onion">Onion</option>
                <option value="potato">Potato</option>
                <option value="beetroot">Beetroot</option>
                <option value="wheat">Wheat</option>
              </select>
            </div>

            <div className="form-group pr-2">
              <label>Model:</label>
              <select name="model" className="form-control"
                onChange={this.handleChange}>
                <option value="LandUsage">Land Usage</option>
                <option value="CloudDetection">Cloud Detection</option>
              </select>
            </div>

            <div className="form-group pr-2">
              <label>Satellite:</label>
              <select name="satellite" className="form-control"
                onChange={this.handleChange}>
                <option value="L1C" selected>L1C</option>
                <option value="L2A">L2A</option>
                <option value="SENTINEL1">SENTINEL 1</option>
              </select>
            </div>

            <div className="form-group pr-2">
              <label>Select area by:</label>
              <select name="area" className="form-control"
                onChange={this.handleChange}>
                <option value="Coordinates" selected>Coordinates</option>
                <option value="Shape">Shape</option>
              </select>
            </div>

            <div className="form-group pr-2">
              <label>Date:</label>
              <input type="date" name="date" className="form-control"
                onChange={this.handleChange}/>
            </div>

            <div className="form-group pr-2">
              <label>Max days before:</label>
              <input type="number" name="days" className="form-control"
                onChange={this.handleChange}/>
            </div>
          </div>
          <Button color="primary" onClick={this.submit}>Submit</Button>
          &nbsp;
          <Button color="primary" onClick={this.predict}>Add prediction</Button>
          &nbsp;
          <a href="" onClick={this.openModal}>What does this mean?</a>
          {this.state.loading && <span className="text-muted"><ThreeBounce color="#aaa" /> Hang tight! A beard is growing!</span>}
          <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
            <ModalHeader toggle={this.toggle}>Comparison Results</ModalHeader>
            <ModalBody>
              {!this.state.fetching && <Table responsive borderless>
                <thead>
                  <tr>
                    <th></th>
                    <th>Crop</th>
                    <th>Area</th>
                    <th>Disappeared</th>
                    <th>New</th>
                    <th>Difference</th>
                  </tr>
                </thead>
                <tbody>
                {FINAL_RESULTS.map((row, index) => (
                  <tr key={index} className={row.status ? `table-${row.status}` : ''}>
                    <th scope="row"></th>
                    <td>{row.crop}</td>
                    <td>{row.area}</td>
                    <td>{row.disappeared}</td>
                    <td>{row.new}</td>
                    <td>{row.difference}</td>
                  </tr>
                ))}
                </tbody>
              </Table>}
              {this.state.fetching && <div className="d-flex align-items-center justify-content-center" style={{ height: 200 }}>
                <div className="text-muted"><ThreeBounce color="#aaa" /> Fetching a beard! Hang tight!</div>
              </div>}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>

        <div id="maps" style={{ height: '600px' }}></div>
      </div>
    )
  }
}

export default Maps;
