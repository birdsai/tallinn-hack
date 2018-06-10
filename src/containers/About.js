import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Subscribe from '../components/Subscribe';

class About extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h1 className="text-center birdai-section">About</h1>
                    <br/>
                    <p>Bird’sAI helps people make use of the penta bytes of satellite data that are being generated
                        every day. Through AI technology, we make it our mission to present people who want to leverage
                        haystacks of potentially useful data, with the needles they were looking for.</p>

                    <img src="/team.jpg" alt="Birds AI team" className="img-fluid"/>

                    <p>‘’Strive for elegant and scalable solutions. At the intersection of AI and Earth Observation many
                        awesome things are yet to be achieved’’</p>

                    <p>‘’Driven to connect more people to better information, because good things happen when we
                        understand our environment.’’</p>

                    <p>‘’Taking on challenges and learning new skills are the only ways to get things done. The world
                        changes too quickly to stick to old tricks.’’</p>
                    <br/>
                </div>
                <div className="py-5 bg-light">
                    <Subscribe/>
                </div>
            </div>
        );
    }
}

export default About;
