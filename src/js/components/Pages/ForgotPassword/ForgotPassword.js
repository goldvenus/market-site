import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import CustomInput from '../../CustomInput';
import AuthSideMenu from '../../AuthSideMenu';

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      isEmailSent: false
    };
  }

  submit() {
    this.setState({
      isEmailSent: true
    });
  }

  render() {
    const { isEmailSent } = this.state;
    return (
      <div className="auth-container theme-navbar">
        <AuthSideMenu/>
        {isEmailSent
          ? (
            <div className="login success-message">
              <h1><i className="fa fa-check-circle primary-color"/> Successfully</h1>
              <div>Instruction on how to reset your password are sent to your email</div>
              <button className="theme-btn theme-btn-primary theme-btn-submit theme-btn-link">
                <Link to="/login">Sign In</Link>
              </button>
            </div>
          )
          : (
            <div className="login">
              <h1>Forgot Password?</h1>
              <div className="login-or-divider">
                Enter your email, the instruction will be sent for password recovery
              </div>
              <Form className="theme-form">
                <div className="theme-form-field">
                  <CustomInput placeholder='Email' type="email"/>
                </div>
                <button className="theme-btn-submit" onClick={this.submit.bind(this)}>Submit</button>
              </Form>
              <div className="login-or-divider"/>
              <div className="flex-row">
                <div>Remember your password?</div>
                <button className="theme-btn theme-btn-filled-white theme-btn-link">
                  <Link to="/login">
                    Sign In <span className="fa fa-angle-right"/>
                  </Link>
                </button>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default ForgotPassword;
