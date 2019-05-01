import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import CustomInput from '../../components/CustomInput';
import AuthSideMenu from '../../components/AuthSideMenu';
import { sendResetPasswordEmail, confirmResetPassword } from '../../core/actions/user.action';

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {

      isEmailSent: false,
      isConfirmed: false,

      email: "",
      verification_code: "",
      password: "",
      password_new: ""
    };
  }

  async submit(e) {
    e.preventDefault()

    const state = this.state

    if(!state.isEmailSent){
      let { email } = state

      if(email) {
        const res = await sendResetPasswordEmail({email: email})
        console.log(res)

        if(res) {
          // this.setState({isEmailSent: true})
        }
      }
    } else if(!state.isConfirmed) {
      let {password, password_new, verification_code, email} = state

      if(password && password_new && verification_code && email) {
        const res = await confirmResetPassword({
          email: email,
          password: password,
          password_new: password_new,
          verification_code: verification_code
        })

        if(res) {
          this.setState({isConfirmed: true})
        }
      }
    }
  }

  render() {
    const { isConfirmed, email, verification_code, password, password_new } = this.state;
    const { isSentFWDEmail, isSendingFWDEmail } = this.props;

    let content;
    if(isConfirmed) {
      content = (
        <div className="login success-message">
          <h1 class="header"><i className="fa fa-check-circle primary-color"/> Successfully</h1>
          <div class="subheader">Your password has been set!</div>
          <button className="theme-btn theme-btn-primary theme-btn-submit theme-btn-link">
            <Link to="/login">Sign In</Link>
          </button>
        </div>
      )
    } else if(isSentFWDEmail){
      content = (
        <div className="login forgot-password">
          <h1 className="header">Confirm your password</h1>
          <div className="login-or-divider">
            <span>
              Enter the verification code and type your new password.
            </span>
          </div>
          <Form className="theme-form">
            <div className="theme-form-field">
              <CustomInput placeholder='Verification code' type="text" required="required" value={verification_code}
                           onChange={(value) => this.setState({ verification_code: value })}/>
            </div>
            <div className="theme-form-field">
              <CustomInput placeholder='New password' type="password" required="required" value={password}
                           onChange={(value) => this.setState({ password: value })}/>
            </div>
            <div className="theme-form-field">
              <CustomInput placeholder='Repeat password' type="password" required="required" value={password_new}
                           onChange={(value) => this.setState({ password_new: value })}/>
            </div>
            <button className="theme-btn-submit" onClick={this.submit.bind(this)}>Submit</button>
          </Form>
        </div>
      )
    } else {
      content = (
        <div className="login forgot-password">
            <h1 class="header">Forgot Password?</h1>
            <div className="login-or-divider">
                <span>
                    Enter your email, the instruction will be <br/>sent for password recovery
                </span>
            </div>
            <Form className="theme-form">
                <div className="theme-form-field">
                    <CustomInput placeholder='Email' type="email" required="required" value={email}
                           onChange={(value) => this.setState({ email: value })}/>
                </div>
                {
                    isSendingFWDEmail ?
                        <button className="theme-btn-submit" disabled={true}>Submitting...</button>
                        :
                        <button className="theme-btn-submit" disabled={true} onClick={this.submit.bind(this)}>Submit</button>
                }

            </Form>
          <div className="login-or-divider"/>
          <div className="flex-row signup-link">
            <span>Remember your password?</span>
            <button className="theme-btn theme-btn-filled-white theme-btn-link">
              <Link to="/login">
                Sign In <i className="fa fa-angle-right"/>
              </Link>
            </button>
          </div>
        </div>
      )
    }


    return (
      <div className="auth-container theme-navbar">
        <AuthSideMenu/>
          {content}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        isSendingFWDEmail: state.user.isSendingFWDEmail,
        isSentFWDEmail: state.user.isSentFWDEmail,
        isSendingFWDEmailFailed: state.user.isSendingFWDEmailFailed,
        errorMessage: state.user.errMsg
    };
}

export default connect(mapStateToProps)(ForgotPassword);
