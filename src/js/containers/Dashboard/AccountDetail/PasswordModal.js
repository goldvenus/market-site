import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { getDateStr } from "../../../core/helper/index"
import { Inline } from '@zendeskgarden/react-loaders'
import TextField from "@material-ui/core/es/TextField/TextField";

class PasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busy: false,
            password: '',
            confirmPassword: ''
        };
    }

    handleChange = async () => {
        this.setState({busy: true});
        await this.props.onSave();
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
        let { gear_info } = this.props;
        return (
            <Modal open={true} onClose={this.handleClose} center classNames={{modal: "cart-modal"}}>
                <div className='period-cart-header'>
                    {dlg_heading}
                </div>
                <div className='period-cart-body-1'>
                    <div className='about-period-container row'>
                        <TextField
                            id="standard-password-input"
                            className="custom-beautiful-textfield"
                            name="password"
                            label="PASSWORD"
                            type="password"
                            value={this.state.password}
                            maxLength='50'
                            onChange={e => this.setState({ password: (e && e.target && e.target.value) || ''})}
                        />
                        <TextField
                            id="standard-password-input1"
                            className="custom-beautiful-textfield"
                            name="confirm_password"
                            label="CONFIRM PASSWORD"
                            type="password"
                            value={this.state.confirmPassword}
                            maxLength='50'
                            onChange={e => this.setState({ confirmPassword: (e && e.target && e.target.value) || ''})}
                        />
                    </div>
                    <div className='delete-period-button-container row'>
                        <button className='cart-control-left-button theme-btn theme-btn-primary' onClick={(e) => this.handleClose(e)} disabled={this.state.busy ? 'disabled' : ''}
                        >CANCEL</button>
                        <div className='cart-button-space'></div>
                        <button className='cart-control-right-button theme-btn theme-btn-primary' onClick={this.handleChange}
                                disabled={this.state.busy ? 'disabled' : ''}
                        >
                            {
                                this.state.busy ? <Inline size={64} color={"#fff"} /> : 'CONFIRM'
                            }
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default PasswordModal;