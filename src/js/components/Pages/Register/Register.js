import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import CustomInput from '../../CustomInput';
import AuthSideMenu from '../../AuthSideMenu';
import { register, handleError, readFileData } from '../../../actions/app.actions';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      isRegistered: false,
      password: '',
      confirmPassword: '',
      username: '',
      phoneNumber: '',
      fullName: '',
      gender: '',
      address: '',
      picture: '',
      fileName: ''
    };
  }

  async addImage(event) {
    try {
      const fileName = event.target.files && event.target.files.length > 0 && event.target.files[0].name;
      let image = await readFileData(event);

      this.setState({
        picture: image,
        fileName
      });
    } catch {
      handleError('Please upload a valid image');
    }
  }

  async submit(e) {

    const { password, confirmPassword, username, phoneNumber, fullName, gender, address, picture } = this.state;

    if (fullName && username && password && confirmPassword && picture) {
      if (password !== confirmPassword) {
        handleError('Password and confirm password do not match');
      } else {
        e.preventDefault();
        let response = await register({
          fullName,
          username,
          password,
          phoneNumber,
          gender,
          address,
          picture
        });

        if (response) {
          this.setState({
            isRegistered: true
          });
        }
      }
    } else {
      handleError('Please provide all details');
    }
  }

  render() {
    const { isRegistered, password, confirmPassword, username, fullName, fileName } = this.state;
    return (
      <div className="auth-container theme-navbar">
        <AuthSideMenu/>
        {
          isRegistered ? (
            <div className="login success-message">
              <h1 className="header"><i className="fa fa-check-circle primary-color"></i> Successfully</h1>
              <div className="subheader">
                <span>
                  To confirm your account,<br/> check your email for verification code
                </span>
              </div>
              <div className="flex-row navigation-buttons">
                <button className="theme-btn theme-btn-secondery theme-btn-link"><Link to="/">Home Page</Link></button>
                <button className="theme-btn theme-btn-primary theme-btn-link"><Link
                  to={{ pathname: '/confirm', state: { email: username } }}>Confirm</Link></button>
              </div>
            </div>) : (
            <div className="login register">
              <h1 className="header">Register</h1>
              <div className="subheader">Register via social networks</div>
              <div className="social-buttons">
                <button className="theme-btn btn-social btn-fb">
                  <span>
                  <i className="fab fa-facebook-f"></i>
                  <span>Facebook</span>
                  </span>
                </button>
                <button className="theme-btn btn-social btn-twitter">
                  <span>
                    <i className="fab fa-twitter"></i>
                    <span>Twitter</span>
                  </span>
                </button>
                <button className="theme-btn btn-social btn-google-plus">
                  <span>
                    <i className="fab fa-google-plus-g"></i>
                    <span>Google +</span>
                  </span>
                </button>
              </div>
              <div className="login-or-divider">Or</div>
              <Form className="theme-form">
                <div className="theme-form-field">
                  <CustomInput placeholder='Name' type="text" required="required" value={fullName}
                               onChange={(value) => this.setState({ fullName: value })}/>
                </div>
                <div className="theme-form-field">
                  <CustomInput placeholder='Email' type="email" required="required" value={username}
                               onChange={(value) => this.setState({ username: value })}/>
                </div>
                <div className="theme-form-field">
                  <CustomInput placeholder='Password' type="Password" required="required" value={password}
                               onChange={(value) => this.setState({ password: value })}/>
                </div>
                <div className="theme-form-field">
                  <CustomInput placeholder='Confirm Password' type="Password" required="required"
                               value={confirmPassword} onChange={(value) => this.setState({ confirmPassword: value })}/>
                </div>
                <div className="flex-row  upload-photo-row">
                  <div className="theme-form-field">
                    <label>{fileName || 'Photo'}</label>
                  </div>
                  <div className="file-input-container">
                    <button className="theme-btn theme-btn-filled-white btn-photo-upload">Upload</button>
                    <input type="file" onChange={this.addImage.bind(this)}/>
                  </div>
                </div>

                <button className="theme-btn-submit" onClick={this.submit.bind(this)}>Sign up</button>
              </Form>
              <div className="login-or-divider"></div>
              <div className="flex-row signin-link ">
                <span>Already have an account?</span>
                <button className="theme-btn theme-btn-filled-white theme-btn-link"><Link to="/login">Sign in<i
                  className="fa fa-angle-right"/></Link></button>
              </div>
            </div>)
        }
      </div>
    );
  }
}

export default Register;
