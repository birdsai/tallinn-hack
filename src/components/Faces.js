import React, {Component} from 'react';

class Faces extends Component {

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    render() {
        const { width, height } = this.state;
        return (
            <div style={{paddingLeft: width / 2 - 260}}>
                <tr style={{paddingLeft: width / 2 - 180}}>
                    <th style={{paddingLeft: 10, paddingRight: 10}}><img src="http://via.placeholder.com/150x150"/><p>❤️ hardcoding</p></th>
                    <th style={{paddingLeft: 10, paddingRight: 10}}><img src="http://via.placeholder.com/150x150"/><p>❤️ hardcoding</p></th>
                    <th style={{paddingLeft: 10, paddingRight: 10}}><img src="http://via.placeholder.com/150x150"/><p>❤️ hardcoding</p></th>
                </tr>
                <tr style={{paddingLeft: width / 2 - 180}}>
                    <th style={{paddingLeft: 10, paddingRight: 10}}><img src="http://via.placeholder.com/150x150"/><p>❤️ hardcoding</p></th>
                    <th style={{paddingLeft: 10, paddingRight: 10}}><img src="http://via.placeholder.com/150x150"/><p>❤️ hardcoding</p></th>
                    <th style={{paddingLeft: 10, paddingRight: 10}}><img src="http://via.placeholder.com/150x150"/><p>❤️ hardcoding</p></th>
                </tr>
                <tr style={{paddingLeft: width / 2 - 180}}>
                    <th style={{paddingLeft: 10, paddingRight: 10}}><img src="http://via.placeholder.com/150x150"/><p>❤️ hardcoding</p></th>
                    <th style={{paddingLeft: 10, paddingRight: 10}}><img src="http://via.placeholder.com/150x150"/><p>❤️ hardcoding</p></th>
                    <th style={{paddingLeft: 10, paddingRight: 10}}><img src="http://via.placeholder.com/150x150"/><p>❤️ hardcoding</p></th>
                </tr>
            </div>
        )
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
}

export default Faces;