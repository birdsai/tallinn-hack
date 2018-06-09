import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Subscribe from '../components/Subscribe';

class About extends Component {
  render() {
    return (
      <div>
        About and Team content
        <div className="py-5 bg-light">
          <Subscribe />
        </div>
      </div>
    );
  }
}

export default About;
