import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Subscribe from '../components/Subscribe';

class Offer extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h1>Our offer</h1>
                    <p>Make use of our Machine Learning expertise and data infrastructure to leverage the insights that
                        satellite data can give you. Through automated analysis using artificially intelligent image
                        recognition models we can help you makes sense of Earth Observation data for at any scale. All
                        you need to do, is choose the service and subscription that fits you best.</p>
                    <ul>
                        <li>Simply get the easiest access to <b>raw</b> satellite images</li>
                        <li>Choose to have <b>clouds</b> automatically masked to save yourself time and headache</li>
                        <li>Or choose to view fully <b>classified data on land use and land cover</b> so you can spend more
                            time acting on relevant findings and less on searching for them
                        </li>
                    </ul>
                    <br/>
                </div>
                <div className="py-5 bg-light">
                    <Subscribe/>
                </div>
            </div>
        );
    }
}

export default Offer;
