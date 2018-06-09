import React, { Component } from 'react';
import Maps from '../components/Maps';
// import qs from 'qs';

class MapsPage extends Component {
  render() {
    // const query = qs.parse(this.props.location.search);
    // const { zoom, lat, lng } = query;
    return (
      <div className="mt-4">
        <Maps />
      </div>
    );
  }
}

export default MapsPage;
