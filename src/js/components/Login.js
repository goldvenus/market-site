import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Form, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import CustomInput from './CustomInput';
import AuthSideMenu from './AuthSideMenu';
import { login } from '../actions/app.actions';
import {FACEBOOK_LOGIN_URL } from '../constants';

class Login extends Component {
  constructor(props) {
    super(props);

    if (props.isAuthenticated) {
      this.props.history.push("/");
    }

    this.state = {
      password: '',
      username: ''
    }

  }

  async submit(e) {

    const { username, password } = this.state;

    if (username && password) {
      e.preventDefault();
      let res = await login({
        username,
        password
      });

      if (res) {
        this.props.history.push("/");
      }
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="auth-container theme-navbar">
        <AuthSideMenu />
        <div className="login">
          <h1>Login</h1>
          <div className="social-buttons">
            <button className="theme-btn btn-social btn-fb" onClick={() => { window.location.href = FACEBOOK_LOGIN_URL }}>
              <span className="fab fa-facebook-f"></span>
              Facebook
            </button>
            {/*<button className="theme-btn btn-social btn-twitter">
              <span className="fab fa-twitter"></span>
              Twitter
            </button> */}
            <button className="theme-btn btn-social btn-google-plus">
              <span className="fab fa-google-plus-g"></span>
              Google +
            </button>
          </div>
          <div className="login-or-divider">Or</div>
          <Form className="theme-form">
            <div className="theme-form-field">
              <CustomInput placeholder='Email' type="email" required="required" value={username} onChange={(value) => this.setState({ username: value })} />
            </div>
            <div className="flex-row">
              <div className="theme-form-field">
                <CustomInput placeholder='Password' type="Password" required="required" value={password} onChange={(value) => this.setState({ password: value })} />
              </div>
              <Button color="link"><Link to="/forgotpassword">Forgot password?</Link></Button>
            </div>
            <div className="theme-form-field">
              <Input type="checkbox" id="login-remember" />
              <Label for="login-remember">Remember me on this device</Label>
            </div>

            <button className="theme-btn-submit" onClick={this.submit.bind(this)}>Sign In</button>
          </Form>
          <div className="login-or-divider"></div>
          <div className="flex-row">
            <div>Don't have an account?</div>
            <button className="theme-btn theme-btn-filled-white theme-btn-link"><Link to="/">Get Started <span className="fa fa-angle-right" /></Link></button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    isAuthenticated: store.app.isAuthenticated
  };
})(Login);
