import React, { Component } from 'react';
import Features from '../components/Features';

class FeaturesPage extends Component {
  render() {
    // const query = qs.parse(this.props.location.search);
    // const { zoom, lat, lng } = query;
    return (
      <div className="container mt-4">
        <h1 className="text-center">Features</h1>
        <Features alternate />
      </div>
    );
  }
}

export default FeaturesPage;
