import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import formSerialize from "form-serialize";
import AuthSideMenu from '../../components/AuthSideMenu';
import { login } from '../../core/actions/user.action';
import { FACEBOOK_LOGIN_URL } from '../../core/constants';
import CustomSpinner from "../../components/CustomSpinner";
import TextField from "@material-ui/core/TextField/TextField";
import Navbar from "../../components/Navbar/Navbar";
import {handleError} from "../../core/actions/common.action";

class Login extends Component {
  constructor(props) {
    super(props);

    if (props.isAuthenticated) {
      this.props.history.push('/');
    }

    this.state = {
      password: '',
      username: '',
      saveState: false
    };

  }

  submit = e => {
      e.preventDefault();
      if (!e.target.username.value || !e.target.password.value) {
          handleError("Please input email and password");
          return;
      }
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
    const { username, password, saveState } = this.state;
    return (
      <React.Fragment>
      <div className="auth-nav-bar">
        <header>
          <Navbar/>
        </header>
      </div>
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
          <div className="login-form-wrapper">
            <form className="theme-form" method="POST" onSubmit={this.submit}>
              <div className="theme-form-field auth-input-wrapper">
                <TextField
                  id="standard-with-placeholder"
                  className="custom-beautiful-textfield"
                  name="username"
                  label="EMAIL"
                  type="text"
                  value={username}
                  maxLength='50'
                  onChange={(e) => this.setState({ username: (e && e.target && e.target.value) || ''})}
                />
              </div>
              <div className="flex-row">
                <div className="theme-form-field auth-input-wrapper">
                  <TextField
                    id="standard-password-input"
                    className="custom-beautiful-textfield"
                    name="password"
                    label="PASSWORD"
                    type="password"
                    value={password}
                    maxLength='50'
                    onChange={e => this.setState({ password: (e && e.target && e.target.value) || ''})}
                  />
                </div>
                <Link className="theme-form-link forgot-pwd-link" to="/forgotpassword">Forgot password?</Link>
              </div>
              <div className="theme-form-field login-remember-input">
                <div className="theme-form-field save-addr-btn">
                  <div className="input_svg pretty p-svg p-plain">
                    <input
                      type="checkbox"
                      onClick={() => this.setState({saveState: !saveState})}
                      value={saveState}
                      checked={saveState ? 'checked' : ''}
                      onChange={() => {}}
                    />
                    <div className="state">
                      <img className="svg check_svg" alt="" src="/images/Icons/task.svg"/>
                    </div>
                  </div>
                  <Label for="save-address" className='checkbox-label'>Remember on this device</Label>
                </div>
              </div>
                {
                    isAuthorizing ?
                        <button type="submit" disabled className="theme-btn-submit">Sign In</button>
                        :
                        <button type="submit" className="theme-btn-submit">Sign In</button>
                }

            </form>
          </div>
          <div className="login-or-divider"></div>
          <div className="flex-row signup-link">
            <span>Don't have an account?</span>
            <button className="theme-btn theme-btn-filled-white theme-btn-link"><Link to="/register">Get Started <i
              className="fa fa-angle-right"/></Link></button>
          </div>
        </div>
      </div>
      </React.Fragment>
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
