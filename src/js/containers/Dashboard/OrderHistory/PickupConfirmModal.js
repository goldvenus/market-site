import Modal from "react-responsive-modal";
import React, {Component} from "react";
import CustomSpinner from "../../../components/CustomSpinner";
import {getUTCDateFormat} from "../../../core/helper";

/*
    Pickup Confirm Modal
 */
class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            busy: false
        };
    }

    handleClose = () => {
        this.setState({open: false});
        this.props.onClose();
    };

    handlePickup = () => {
        this.setState({busy: true});
        // pickup setting
        console.log(this.props.info);
        this.setState({busy: false});
        this.props.onSuccess();
    };

    render() {
        console.log(this.props.info);
        const { info } = this.props;
        const dlg_heading = 'Confirm gear pickup';
        let btn_label1 = 'Cancel';
        let btn_label2 = 'Confirm';
        let cur_time = getUTCDateFormat(new Date()).split(' ');
        let utc_date = cur_time[0];
        let utc_time =  cur_time[1];

        return (
            <React.Fragment>
                {this.state.busy && <CustomSpinner/>}
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
                            <button className='cart-control-right-button theme-btn theme-btn-primary' onClick={this.handlePickup}>
                                {btn_label2}
                            </button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

export default ConfirmModal;