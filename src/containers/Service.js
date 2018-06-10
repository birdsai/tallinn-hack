import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Subscribe from '../components/Subscribe';

class Service extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h1 className="text-center birdai-section">Custom services</h1>
                    <br/>
                    <p>Do you have a special request? Or are you missing any automated analysis tools? We would love to
                        hear all about it! Custom accounts for you, your organization, and your partners are part of
                        what we do, and we are always happy to build new automated analysis models that fit your
                        specific purpose. So let us know what you need!</p>
                    <p>Not sure what AI can do for you quite yet? No problem! We are happy to consult, and that service
                        is always on the house. No matter the size of your organization, your request, or your
                        wallet.</p>
                    <br/>
                </div>
                <div className="py-5 bg-light">
                    <Subscribe/>
                </div>
            </div>
        );
    }
}

export default Service;
