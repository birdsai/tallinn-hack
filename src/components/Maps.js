import React, { Component } from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/assets/css/leaflet.css';

const lat = 58.5953;
const lng = 25.0136;

class Maps extends Component {
  componentDidMount() {

    // OpenStreetMap
    const osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    // Sentinel Hub WMS service
    // tiles generated using EPSG:3857 projection - Leaflet takes care of that
    const baseUrl = "https://services.sentinel-hub.com/ogc/wms/5406033d-85c9-43b3-95fb-153e6b19b075";

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
    const agriculture = Layer('AGRICULTURE');
    const ndvi = Layer('NDVI');

    const baseMaps = {
      'OpenStreetMap': osm
    };
    const overlayMaps = {
      'Agriculture': agriculture,
      'NDVI': ndvi
    };

    const map = L.map('maps', {
      center: [lat, lng], // lat/lng in EPSG:4326
      zoom: 12,
      layers: [osm, agriculture]
    });

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
    map.addControl(searchControl);

    L.control.layers(baseMaps, overlayMaps).addTo(map);
  }

  render() {
    return (<div id="maps" style={{ height: '600px' }}></div>)
  }
}

export default Maps;
