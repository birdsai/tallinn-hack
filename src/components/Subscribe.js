import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, FormGroup, Button } from 'reactstrap';
import ThreeBounce from './ThreeBounce';
import subscribe from '../lib/mailchimp';

class Subscribe extends Component {
  constructor(props) {
    super(props);
    if (!props.id) {
      throw new Error('You need a mailchimp id to use this component');
    }
    this.subscribe = this.subscribe.bind(this);
    this.state = {
      subscribing: false,
      subscribed: false,
      email: '',
      width: 0,
      height: 0
    };
  }

  render() {
    const { subscribing, subscribed, email, valid } = this.state;
    const { title } = this.props;
    return (
      <div className="mailchimp-subscribe text-center">
        <h2>Want to know when we launch?</h2>
        <br/>
        {!subscribed && (
          <Form inline className="justify-content-center" onSubmit={this.subscribe}>
            <FormGroup>
              <Input
                type="email"
                bsSize="lg"
                placeholder="E-mail"
                onChange={e => this.setEmail(e)}
                value={email}
              />
            </FormGroup>
            &nbsp;
            <Button
              size="lg"
              color="primary"
              disabled={subscribing || !valid}>
              {subscribing && <ThreeBounce color="white" size={40} />}
              {title || 'Subscribe'}
            </Button>
          </Form>
        )}
        {subscribed && (
          <div>
            <h4 className="font-weight-light">
              Thank you!
            </h4>
          </div>
        )}
      </div>
    );
  }

  subscribe(e) {
    e.preventDefault();
    this.setState({ subscribing: true });
    subscribe(this.state.email, this.props.id)
      .then(() => this.setState({ subscribing: false, subscribed: true }))
      .catch(e => {
        this.setState({ subscribing: false });
      });
  }

  setEmail(e) {
    this.setState({
      email: e.target.value,
      valid: validate(e.target.value)
    });
  }
}

Subscribe.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string
};

Subscribe.defaultProps = {
  id: '0e6b8997bc'
};

export default Subscribe;

function validate(email) {
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
}
