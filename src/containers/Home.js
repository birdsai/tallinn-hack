import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Features from '../components/Features';
import Subscribe from '../components/Subscribe';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="display-4 mx-auto" style={{ maxWidth: 800 }}>Near Realtime Crop Monitoring and Analysis</h1>
          <br/>
          <br/>
          <Link className="btn btn-primary btn-lg" to="/maps" role="button">
            Explore
          </Link>
        </div>
        <div className="container my-4">
          <Features />
        </div>
        <div className="py-5 bg-light">
          <Subscribe />
        </div>
      </div>
    );
  }
}

export default Home;
