import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Button, Form, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import formSerialize from "form-serialize";
import CustomInput from '../../components/CustomInput';
import AuthSideMenu from '../../components/AuthSideMenu';
import { login } from '../../../core/actions/user.action';
import { FACEBOOK_LOGIN_URL } from '../../../core/constants';
import CustomSpinner from "../../CustomSpinner";

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

  submit = e => {
      e.preventDefault();
      const data = formSerialize(e.target, {hash: true});
      this.props.login(data);
  };

  componentWillReceiveProps(nextProps) {
      if (nextProps.isAuthenticated && !this.props.isAuthenticated) {
          this.props.history.push('/');
      }
  }

  render() {
    const { isAuthorizing } = this.props;
    const { username, password } = this.state;
    return (
      <div className="auth-container">
        {
          isAuthorizing ? <CustomSpinner/> : null
        }
        <AuthSideMenu/>
        <div className="login">
          <h2 className="header">Login</h2>
          <div className="social-buttons">
            <button className="theme-btn btn-social btn-fb text-center"
                    onClick={() => { window.location.href = FACEBOOK_LOGIN_URL; }}>
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
            <button className="theme-btn btn-social btn-google-plus text-center"
                    onClick={() => { window.location.href = FACEBOOK_LOGIN_URL; }}>
              <span>
                <i className="fab fa-google-plus-g"></i>
                <span>Google +</span>
              </span>
            </button>
          </div>
          <div className="login-or-divider">Or</div>
          <form className="theme-form" method="POST" onSubmit={this.submit}>
            <div className="theme-form-field">
              <CustomInput placeholder='EMAIL' type="email" name="username" required="required" value={username}
                           onChange={(value) => this.setState({ username: value })}/>
            </div>
            <div className="flex-row">
              <div className="theme-form-field">
                <CustomInput placeholder='PASSWORD' type="Password" name="password" required="required" value={password}
                             onChange={(value) => this.setState({ password: value })}/>
              </div>
              <Link className="theme-form-link" to="/forgotpassword">Forgot password?</Link>
            </div>
            <div className="theme-form-field login-remember-input">
              <Input type="checkbox" id="login-remember"/>
              <Label for="login-remember">Remember me on this device</Label>
            </div>
              {
                  isAuthorizing ?
                      <button type="submit" disabled className="theme-btn-submit">Sign In</button>
                      :
                      <button type="submit" className="theme-btn-submit">Sign In</button>
              }

          </form>
          <div className="login-or-divider"></div>
          <div className="flex-row signup-link">
            <span>Don't have an account?</span>
            <button className="theme-btn theme-btn-filled-white theme-btn-link"><Link to="/register">Get Started <i
              className="fa fa-angle-right"/></Link></button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      isAuthorizing: state.user.isAuthorizing,
      isAuthenticated: state.user.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
      login: bindActionCreators(login, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
