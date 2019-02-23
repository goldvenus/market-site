import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CustomInput from '../../CustomInput';
import AuthSideMenu from '../../AuthSideMenu';
import { handleError, confirmUser } from '../../../actions/app.actions';

class RegisterConfirm extends Component {
  constructor(props) {
    super(props);

    this.email = props.location.state && props.location.state.email;
    this.state = {
      code: '',
      email: this.email,
      isConfirmed: false
    };
  }

  async confirm() {
    const { code, email: aEmail } = this.state;
    const oEmail = this.email;

    if ((oEmail || aEmail) && code) {
      const response = await confirmUser(oEmail || aEmail, code);

      if (response) {
        this.setState({
          isConfirmed: true
        });
      }
    } else {
      handleError('Please enter valid email and verification code');
    }
  }

  render() {
    return (
      <div className="auth-container theme-navbar">
        <AuthSideMenu/>
        {this.state.isConfirmed
          ? (
            <div className="login success-message">
              <h1><i className="fa fa-check-circle primary-color"/> Successfully</h1>
              <div>Your account has been verified</div>
              <div className="flex-row">
                <button className="theme-btn theme-btn-secondery theme-btn-link"><Link to="/">Home Page</Link></button>
                <button className="theme-btn theme-btn-primary theme-btn-link"><Link to="/login">Login</Link></button>
              </div>
            </div>
          )
          : (
            <div className="login success-message">
              <h1>Confirm</h1>
              {this.email
                ? null
                : (
                  <div>
                    <div>Please enter email</div>
                    <div className="verification-code">
                      <CustomInput
                        placeholder="Email"
                        type="text"
                        required="required"
                        value={this.state.email}
                        onChange={(value) => this.setState({ email: value })}
                      />
                    </div>
                  </div>
                )
              }
              <div className="verification-code">Please enter verification code</div>
              <div className="verification-code">
                <CustomInput
                  placeholder="Verification Code"
                  type="text"
                  required="required"
                  value={this.state.code}
                  onChange={(value) => this.setState({ code: value })}
                />
              </div>
              <div className="flex-row verification-code">
                <button className="theme-btn-submit" onClick={this.confirm.bind(this)}>Confirm</button>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default RegisterConfirm;
