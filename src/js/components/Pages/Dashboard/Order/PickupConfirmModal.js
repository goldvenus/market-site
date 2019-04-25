import Modal from "react-responsive-modal";
import React, {Component} from "react";
import { withRouter } from 'react-router-dom';
import { Inline } from '@zendeskgarden/react-loaders'
import moment from "moment";

/*
    Pickup Confirm Modal
 */
class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    }

    handleClose = () => {
        this.setState({open: false});
        this.props.onClose();
    };

    handlePickup = () => {

    };

    render() {
        const { info } = this.props;
        const dlg_heading = 'Confirm gear pickup';
        let btn_label1 = 'Cancel';
        let btn_label2 = 'Confirm';
        let cur_time = new Date();
        let utc_date = (cur_time.getUTCMonth()+1) + '.' + cur_time.getUTCDate() + '.' + cur_time.getUTCFullYear();
        let utc_time =  cur_time.getUTCHours() + ':' + cur_time.getUTCMinutes() + ' GMT';

        return (
            <Modal open={this.state.open} onClose={this.handleClose} center classNames={{modal: "cart-modal pickup-modal"}}>
                <div className='pickup-modal-header'>
                    <span>{dlg_heading}</span>
                </div>
                <div className='pickup-modal-body'>
                    <div className='pickup-item-name'>
                        {info.brand + ' ' + info.model}
                    </div>
                    <div className='pickup-confirm-time'>
                        <span>{utc_date}</span>&nbsp;{utc_time}
                    </div>
                    <div className='pickup-control'>
                        <button className='cart-control-left-button theme-btn theme-btn-primary' onClick={this.handleClose}>
                            {btn_label1}
                        </button>
                        <div className='cart-button-space'></div>
                        <button className='cart-control-right-button theme-btn theme-btn-primary' onClick={this.handlePickup}>
                            {btn_label2}
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withRouter(ConfirmModal);