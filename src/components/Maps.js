import React, { Component } from 'react';
import request from 'superagent';
import {Button} from 'reactstrap'
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
    this.state = {
      model: 'LandUsage',
      satellite: 'L1C',
      area: 'Coordinates',
      loading: false
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

    // On drawing rectangle
    map.on(L.Draw.Event.CREATED, e => {
      const type = e.layerType;
      const layer = e.layer;
      drawnItems.addLayer(layer);

      this.loadGroundTruth(ground);
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
    this.loadGroundTruth(this.ground);
    request
      .post(API)
      .send(data)
      .then(res => {
      // response
    })
  }

  loadGroundTruth(ground) {
    this.setState({ loading: true });
    const parse_georaster = require("georaster");
    const GeoRasterLayer = require("georaster-layer-for-leaflet");

    const promises = [];
    for (var i = 1; i <= 10; i++) {
      promises.push(fetch(`/images/${i}.tif`)
        .then(r => r.arrayBuffer())
        .then(ab => parse_georaster(ab)));
    }
    Promise.all(promises).then(arr => {
      arr.forEach(georaster => {
        const layer = new GeoRasterLayer({
          georaster: georaster,
          opacity: 0.4
        });
        ground.addLayer(layer).bringToFront();
      })
    }).then(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <div>
        <div className="container mb-3">
          <div className="d-flex flex-wrap">
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
          {this.state.loading && <ThreeBounce color="#aaa" />}
        </div>

        <div id="maps" style={{ height: '600px' }}></div>
      </div>
    )
  }
}

export default Maps;
