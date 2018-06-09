import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="navbar-brand">
            <img src="/logo.png" alt="Birds AI" className="img-fluid"
              style={{ height: 30 }} />
          </Link>
        </h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <Link className="p-2 text-dark" to="/about">About</Link>
          <Link className="p-2 text-dark" to="/maps">Map</Link>
          <Link className="p-2 text-dark" to="/features">Features</Link>
        </nav>
        <Link className="btn btn-outline-primary" to="#">Login</Link>
      </div>
    );
  }
}

export default Header;
