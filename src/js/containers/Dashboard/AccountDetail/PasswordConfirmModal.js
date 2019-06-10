import React, {Component} from 'react';
import Modal from "react-responsive-modal";
import {Inline} from '@zendeskgarden/react-loaders';
import TextField from "@material-ui/core/es/TextField/TextField";
import {handleError} from "../../../core/actions/common.action";

class PasswordConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busy: false,
      password: '',
      confirmPassword: ''
    };
  }
  
  handleUpdate = async () => {
    let {password, confirmPassword} = this.state;
    if (password === '' || confirmPassword === '') {
      handleError('Input password!');
      return;
    } else if (this.state.password !== this.state.confirmPassword) {
      handleError('Passwords don\'t match!');
      return;
    }
    
    this.setState({busy: true});
    await this.props.onConfirm(password);
    this.setState({busy: false});
  };
  
  handleClose = (e) => {
    if (this.state.busy)
      e.preventDefault();
    else
      this.props.onClose();
  };
  
  render() {
    let dlg_heading = 'Input Password';
    
    return (
      <Modal open={true} onClose={this.handleClose} center classNames={{modal: "cart-modal confirm-modal"}}>
        <div className='confirm-modal-header'>
          {dlg_heading}
        </div>
        <div className='confirm-modal-body'>
          <div className='about-period-container row'>
            <TextField
              id="standard-password-input"
              className="custom-beautiful-textfield"
              name="password"
              label="PASSWORD"
              type="password"
              value={this.state.password}
              maxLength='50'
              onChange={e => this.setState({password: (e && e.target && e.target.value) || ''})}
            />
            <TextField
              id="standard-password-input1"
              className="custom-beautiful-textfield"
              name="confirm_password"
              label="CONFIRM PASSWORD"
              type="password"
              value={this.state.confirmPassword}
              maxLength='50'
              onChange={e => this.setState({confirmPassword: (e && e.target && e.target.value) || ''})}
            />
          </div>
          <div className='confirm-control'>
            <button className='cart-control-left-button theme-btn theme-btn-primary'
                    onClick={(e) => this.handleClose(e)} disabled={this.state.busy ? 'disabled' : ''}
            >CANCEL</button>
            <button className='cart-control-right-button theme-btn theme-btn-primary' onClick={this.handleUpdate}
                    disabled={this.state.busy ? 'disabled' : ''}
            >{this.state.busy ? <Inline size={64} color={"#fff"}/> : 'CONFIRM'}</button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default PasswordConfirmModal;