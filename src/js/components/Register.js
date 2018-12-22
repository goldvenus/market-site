import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import CustomInput from './CustomInput';
import AuthSideMenu from './AuthSideMenu';
import { register } from '../actions/app.actions';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      isRegistered: false,
      password: "",
      confirmPassword: "",
    	username: "",
    	phoneNumber: "",
    	fullName: "",
  	  gender: "",
  	  address: "",
  	  picture: ""
    }
  }

  async submit(e) {
    e.preventDefault();

    const { password, confirmPassword, username, phoneNumber, fullName, gender, address, picture } = this.state;

    await register({
      fullName,
      username,
      password,
      phoneNumber,
      gender,
      address,
      picture
    });

    // if(response) {
    //   this.setState({
    //     isRegistered: true
    //   });
    // }
  }

  render() {
    const { isRegistered, password, confirmPassword, username, fullName } = this.state;
    return (
      <div className="auth-container theme-navbar">
        <AuthSideMenu />
        {
          isRegistered ? (
          <div className="login success-message">
            <h1><i className="fa fa-check-circle primary-color"></i> Successfully</h1>
            <div>To confirm your account, click on the link sent to you by email</div>
            <div className="flex-row">
              <button className="theme-btn theme-btn-secondery theme-btn-link"><Link to="/">Home Page</Link></button>
              <button className="theme-btn theme-btn-primary theme-btn-link"><Link to="/login">Sign In</Link></button>
            </div>
          </div>): (
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
                <CustomInput placeholder='Name' type="text" value={fullName} onChange={(value) => this.setState({ fullName: value })}/>
              </div>
              <div className="theme-form-field">
                <CustomInput placeholder='Email' type="email" value={username} onChange={(value) => this.setState({ username: value })} />
              </div>
              <div className="theme-form-field">
                <CustomInput placeholder='Password' type="Password" value={password} onChange={(value) => this.setState({ password: value })} />
              </div>
              <div className="theme-form-field">
                <CustomInput placeholder='Confirm Password' type="Password" value={confirmPassword} onChange={(value) => this.setState({ confirmPassword: value })}  />
              </div>
              <div className="flex-row">
                <div className="theme-form-field">
                  <CustomInput placeholder='Photo' disabled type="text"/>
                </div>
                <button className="theme-btn theme-btn-filled-white btn-photo-upload">Upload</button>
              </div>

              <button className="theme-btn-submit" onClick={this.submit.bind(this)}>Sign up</button>
            </Form>
            <div className="login-or-divider"></div>
            <div className="flex-row">
              <div>Already have an account?</div>
              <button className="theme-btn theme-btn-filled-white theme-btn-link"><Link to="/login">Login <span className="fa fa-angle-right" /></Link></button>
            </div>
          </div>)
        }
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Register);
