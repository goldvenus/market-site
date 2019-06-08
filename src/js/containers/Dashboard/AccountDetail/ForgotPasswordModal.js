import React, {Component} from 'react';
import Modal from "react-responsive-modal";
import {Inline} from '@zendeskgarden/react-loaders';
import TextField from "@material-ui/core/es/TextField/TextField";
import {handleError, handleInfo} from "../../../core/actions/common.action";
import {
  confirmResetPassword,
  sendResetPasswordEmail
} from "../../../core/actions/user.action";

class ForgotPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busy: false,
      password: '',
      confirmPassword: '',
      verificationCode: '',
      email: this.props.user.email,
      step: 0
    };
  }
  
  handleSendCode = async () => {
    const {user} = this.props;
    const {email} = this.state;
    if (!email) {
      handleError('Please input email');
      return;
    }
    this.setState({busy: true});
    const res = await sendResetPasswordEmail({email: user.email});
  
    if (res) {
      this.setState({step: 1, busy: false});
    } else {
      this.setState({busy: false});
    }
  };
  
  handlePasswordReset = async (e) => {
    e.preventDefault();
    let {password, confirmPassword, verificationCode} = this.state;
    let {onClose, user} = this.props;

    if (!password || !confirmPassword) {
      handleError('Please input password!');
      return false;
    } else if (password !== confirmPassword) {
      handleError('Passwords don\'t match!');
      return false;
    }
    
    this.setState({busy: true});
    const res = await confirmResetPassword({
      email: user.email,
      password: password,
      password_new: confirmPassword,
      verification_code: verificationCode
    });
  
    if (res) {
      handleInfo('Password was reset successfully');
      onClose();
    } else {
      this.setState({busy: false});
    }
  };
  
  render() {
    let {password, confirmPassword, busy, step, email, verificationCode} = this.state;
    let dlg_heading = step === 0 ? 'Forgot Password?' : 'Update Password';
    
    return (
      <Modal open={true} onClose={this.props.onClose} center classNames={{modal: "cart-modal confirm-modal"}} closeOnOverlayClick={false}>
        <div className='confirm-modal-header'>
          {dlg_heading}
        </div>
        <div className='confirm-modal-body'>
          <div className='about-period-container row'>
            {step === 0 ?
            <TextField
              id="standard-password-input"
              className="custom-beautiful-textfield"
              name="email"
              label="EMAIL"
              type="text"
              value={email}
              maxLength='50'
              onChange={e => this.setState({password: (e && e.target && e.target.value) || ''})}
            /> :
            <React.Fragment>
              <TextField
                id="standard-password-input"
                className="custom-beautiful-textfield"
                name="varificationCode"
                label="Verification Code"
                type="text"
                value={verificationCode}
                maxLength='50'
                onChange={e => this.setState({verificationCode: (e && e.target && e.target.value) || ''})}
              />
              <TextField
                id="standard-password-input"
                className="custom-beautiful-textfield"
                name="password"
                label="New Password"
                type="password"
                value={password}
                maxLength='50'
                onChange={e => this.setState({password: (e && e.target && e.target.value) || ''})}
              />
              <TextField
                id="standard-password-input1"
                className="custom-beautiful-textfield"
                name="confirm_password"
                label="Repeat Password"
                type="password"
                value={confirmPassword}
                maxLength='50'
                onChange={e => this.setState({confirmPassword: (e && e.target && e.target.value) || ''})}
              />
            </React.Fragment>}
          </div>
          <div className='confirm-control'>
            <button className='cart-control-left-button theme-btn theme-btn-primary'
                    onClick={this.props.onClose} disabled={busy ? 'disabled' : ''}
            >CANCEL</button>
            {step === 0 ?
            <button
              className='cart-control-right-button theme-btn theme-btn-primary'
              onClick={this.handleSendCode}
              disabled={busy ? 'disabled' : ''}
            >{busy ? <Inline size={64} color={"#fff"}/> : 'CONFIRM'}</button> :
            <button
              className='cart-control-right-button theme-btn theme-btn-primary'
              onClick={this.handlePasswordReset}
              disabled={busy ? 'disabled' : ''}
            >{busy ? <Inline size={64} color={"#fff"}/> : 'UPDATE'}</button>}
          </div>
        </div>
      </Modal>
    )
  }
}

export default ForgotPasswordModal;