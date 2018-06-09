import React, { Component } from 'react';
import Subscribe from '../components/Subscribe';
import Faces from "../components/Faces";

class About extends Component {
  render() {
    return (
      <div className={'text-center'}>
        About and Team content
        <Faces />
        <div className="py-5 bg-light">
          <Subscribe />
        </div>
      </div>
    );
  }
}

export default About;
