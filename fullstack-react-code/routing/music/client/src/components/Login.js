/* eslint-disable no-constant-condition */
import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { client } from '../Client';

class Login extends Component {
  state={
    loginInProgress: false,
    shouldRedirect: false
  }

  performLogin = () => {
    this.setState({loginInProgress: true});
    client.login().then(() => {
      this.setState({shouldRedirect: true})
    });
  }

  redirectPath = () => {
    const locationState = this.props.location.state;
    const pathname = (
      locationState && locationState.from && locationState.from.pathname //We need to know that two values being evaluated by the && operator, if one of them is false (null, undefined, 0 or empty) then that value is returned by the evaluation, if the two are true it returns the second value or the last one
    );

    return pathname || '/albums' //On the other hand, two values being evaluated by || operator, if one of them is false, then our evaluation returns the true one and if the two are true it returns the frist value
  }

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect to={this.redirectPath()} />
      );
    } else {
      return (
        <div className='ui one column centered grid'>
          <div className='ten wide column'>
            <div
              className='ui raised very padded text container segment'
              style={{ textAlign: 'center' }}
            >
              <h2 className='ui green header'>
                Fullstack Music
              </h2>
              { this.state.loginInProgress ? (
                <div className='ui active centered inline loader' />
              ) : (
                <div
                  className='ui large green submit button'
                  onClick={this.performLogin}
                >
                  Login
                </div>
              )               
              }
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;
