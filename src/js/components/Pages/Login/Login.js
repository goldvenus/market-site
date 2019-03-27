import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import CustomInput from '../../CustomInput';
import AuthSideMenu from '../../AuthSideMenu';
import { login } from '../../../actions/app.actions';
import { FACEBOOK_LOGIN_URL } from '../../../constants';

class Login extends Component {
  constructor(props) {
    super(props);

    if (props.isAuthenticated) {
      this.props.history.push('/');
    }

    this.state = {
      password: '',
      username: ''
    };

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
        this.props.history.push('/');
      }
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="auth-container">
        <AuthSideMenu/>
        <div className="login">
          <h2 className="header">Login</h2>
          <div className="social-buttons">
            <button className="theme-btn btn-social btn-fb text-center"
                    onClick={() => { window.location.href = FACEBOOK_LOGIN_URL; }}>
              <span>
                <i className="fab fa-facebook-f"></i>
                Facebook
              </span>
            </button>
            <button className="theme-btn btn-social btn-twitter">
              <span>
                <i className="fab fa-twitter"></i>
                Twitter
              </span>
            </button>
            <button className="theme-btn btn-social btn-google-plus text-center"
                    onClick={() => { window.location.href = FACEBOOK_LOGIN_URL; }}>
              <span>
                <i className="fab fa-google-plus-g"></i>
                Google +
              </span>
            </button>
          </div>
          <div className="login-or-divider">Or</div>
          <Form className="theme-form">
            <div className="theme-form-field">
              <CustomInput placeholder='Email' type="email" required="required" value={username}
                           onChange={(value) => this.setState({ username: value })}/>
            </div>
            <div className="flex-row">
              <div className="theme-form-field">
                <CustomInput placeholder='Password' type="Password" required="required" value={password}
                             onChange={(value) => this.setState({ password: value })}/>
              </div>
              <Link className="theme-form-link" to="/forgotpassword">Forgot password?</Link>
            </div>
            <div className="theme-form-field">
              <Input type="checkbox" id="login-remember"/>
              <Label for="login-remember">Remember me on this device</Label>
            </div>

            <button className="theme-btn-submit" onClick={this.submit.bind(this)}>Sign In</button>
          </Form>
          <div className="login-or-divider"></div>
          <div className="flex-row signup-link">
            <span>Don't have an account?</span>
            <button className="theme-btn theme-btn-filled-white theme-btn-link"><Link to="/">Get Started <i
              className="fa fa-angle-right"/></Link></button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.app.isAuthenticated
});

export default connect(mapStateToProps)(Login);
