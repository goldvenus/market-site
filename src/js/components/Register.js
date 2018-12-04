import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Form, FormGroup ,Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import CustomInput from './CustomInput';
import AuthSideMenu from './AuthSideMenu';

class Register extends Component {
  render() {
    return (
      <div className="auth-container theme-navbar">
        <AuthSideMenu />
        <div className="login register">
          <h1>Register</h1>
          <div>Register via social networks</div>
          <div className="social-buttons">
            <button className="theme-btn btn-social btn-fb">
              <span className="fa fa-facebook"></span>
              Facebook
            </button>
            <button className="theme-btn btn-social btn-twitter">
              <span className="fa fa-twitter"></span>
              Twitter
            </button>
            <button className="theme-btn btn-social btn-google-plus">
              <span className="fa fa-google-plus"></span>
              Google +
            </button>
          </div>
          <div className="login-or-divider">Or</div>
          <Form className="theme-form">
            <div className="theme-form-field">
              <CustomInput placeholder='Name' type="text"/>
            </div>
            <div className="theme-form-field">
              <CustomInput placeholder='Email' type="email"/>
            </div>
            <div className="theme-form-field">
              <CustomInput placeholder='Password' type="Password" />
            </div>
            <div className="theme-form-field">
              <CustomInput placeholder='Confirm Password' type="Password" />
            </div>
            <div className="flex-row">
              <div className="theme-form-field">
                <CustomInput placeholder='Photo' disabled type="text"/>
              </div>
              <button className="theme-btn theme-btn-filled-white btn-photo-upload">Upload</button>
            </div>

            <button className="theme-btn-submit">Sign up</button>
          </Form>
          <div className="login-or-divider"></div>
          <div className="flex-row">
            <div>Already have an account?</div>
            <button className="theme-btn theme-btn-filled-white theme-btn-link"><Link to="/login">Login <span className="fa fa-angle-right" /></Link></button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Register);
