import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4  bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="navbar-brand">
            <img src="/logo.png" alt="Birds AI" className="img-fluid"
              style={{ height: 30 }} />
          </Link>
        </h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <a className="p-2" href="/#for-whom">For whom</a>
          <a className="p-2" href="/#offer">What we offer</a>
          <a className="p-2" href="/#team">Team</a>
          <Link className="p-2" to="/maps">Explore</Link>
          <a className="p-2" href="mailto:info@birdsai.co">Contact</a>
        </nav>
        <Link className="btn btn-outline-primary" to="#">Login</Link>
      </div>
    );
  }
}

export default Header;
