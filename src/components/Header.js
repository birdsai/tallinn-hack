import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="birdai-container">
                <img src="/logo-top.png" alt="Birds AI" className="img-fluid"/>
                <div
                    className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
                    <h5 className="my-0 mr-md-auto font-weight-normal">
                        <Link to="/" className="navbar-brand">
                            <img src="/logo.png" alt="Birds AI" className="img-fluid birdai-logo"/>
                        </Link>
                    </h5>
                    <nav className="my-2 my-md-0 mr-md-3">
                        <Link className="p-2 float-left" to="/features">Our Offer</Link>
                        <Link className="p-2 float-left" to="/services">Service</Link>
                        <Link className="p-2 float-left" to="/about">About</Link>
                        <Link className="p-2 float-left" to="/maps">Map</Link>
                        <a className="p-2 float-left" href="mailto:info@birdsai.co">Contact</a>
                    </nav>
                    <Link className="btn btn-outline-primary float-left" to="#">Login</Link>
                </div>
            </div>
        );
    }
}

export default Header;
