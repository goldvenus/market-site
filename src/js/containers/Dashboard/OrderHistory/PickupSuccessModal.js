import Modal from "react-responsive-modal";
import React, {Component} from "react";
import { withRouter } from 'react-router-dom';
import { Inline } from '@zendeskgarden/react-loaders'

/*
    Pickup Confirm Modal
 */
class ConfirmModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true
        };
    }

    handleClose = () => {
        this.setState({open: false});
        this.props.onClose();
    };

    render() {
        let dlg_heading = 'Pickup Successful';
        let dlg_sub_heading = 'Waiting for gear owner confirmation';

        return (
            <Modal open={this.state.open} onClose={this.handleClose} center classNames={{modal: "cart-modal pickup-modal"}}>
                <div className='pickup-modal-header pickup-success-header'>
                    <div>
                        <div><img src='/images/Icons/check/big-check.svg' alt=''></img></div>
                        <div className='pickup-heading'>{dlg_heading}</div>
                        <div className='pickup-sub-heading'>{dlg_sub_heading}</div>
                    </div>
                </div>
                <div className='pickup-modal-body pickup-success-body'>
                    <button className='theme-btn theme-btn-primary'>Close</button>
                </div>
            </Modal>
        )
    }
}

export default withRouter(ConfirmModal);