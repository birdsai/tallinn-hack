import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Subscribe from '../components/Subscribe';

class About extends Component {
  render() {
    return (
      <div>
        <div className="container mt-4">
          <h1>About</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit atque adipisci accusantium sit tenetur eveniet fuga voluptates a, officiis, iure. Sapiente, aut voluptas accusantium, ipsum veniam nostrum iste nesciunt quos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit atque adipisci accusantium sit tenetur eveniet fuga voluptates a, officiis, iure. Sapiente, aut voluptas accusantium, ipsum veniam nostrum iste nesciunt quos!</p>
          <br/>
        </div>
        <div className="py-5 bg-light">
          <Subscribe />
        </div>
      </div>
    );
  }
}

export default About;
