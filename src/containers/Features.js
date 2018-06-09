import React, { Component } from 'react';
import Features from '../components/Features';

class FeaturesPage extends Component {
  render() {
    // const query = qs.parse(this.props.location.search);
    // const { zoom, lat, lng } = query;
    return (
      <div>
        <Features />
      </div>
    );
  }
}

export default FeaturesPage;
