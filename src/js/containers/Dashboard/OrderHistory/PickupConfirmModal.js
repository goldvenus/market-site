import Modal from "react-responsive-modal";
import React, {Component} from "react";
import {getUTCDateFormat, getYearMonthStr} from "../../../core/helper";
import {getOrderHistory, setPickupState} from "../../../core/actions/dashboard.action";
import {Inline} from '@zendeskgarden/react-loaders'
import {getTransHistory} from "../../../core/actions/payment.action";
import {getUser} from "../../../core/actions/user.action";

/**
 *  Pickup Confirm Modal
 */
class ConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      busy: false
    };
  
    this.utc_time = getUTCDateFormat(new Date()).split(' ');
  }
  
  handleClose = () => {
    if (this.state.busy)
      return;
    this.setState({open: false});
    this.props.onClose();
  };
  
  handlePickup = async () => {
    this.setState({busy: true});
    // pickup setting
    let paymentId = this.props.paymentId;
    let gearId = this.props.info.gearid;
    await setPickupState({paymentId, gearId, pickedTime: this.utc_time.join(' '), isRenter: this.props.isRenter});
    await getOrderHistory();
    if (this.props.isRenter) {
      getTransHistory(getYearMonthStr(new Date()));
      getUser();
    }
    this.setState({busy: false});
    this.props.onSuccess();
  };
  
  render() {
    let {info, model} = this.props;
    let {open, busy} = this.state;
    let dlg_heading = model === 1 ? 'Confirm gear pickup' : 'Confirm gear return';
    let btn_label1 = 'Cancel';
    let btn_label2 = 'Confirm';
    
    return (
      <React.Fragment>
        <Modal open={open} onClose={this.handleClose} center classNames={{modal: "cart-modal pickup-modal"}}>
          <div className='pickup-modal-header'>
            <span>{dlg_heading}</span>
          </div>
          <div className='pickup-modal-body'>
            <div className='pickup-item-name'>
              {info.brand + ' ' + info.productName}
            </div>
            <div className='pickup-confirm-time'>
              <span>{this.utc_time[0]}</span>&nbsp;{this.utc_time[1]} {this.utc_time[2]}
            </div>
            <div className='pickup-control'>
              <button
                className={`cart-control-left-button theme-btn theme-btn-primary ${busy && 'disabled'}`}
                onClick={this.handleClose}>
                {btn_label1}
              </button>
              <button
                className={`cart-control-right-button theme-btn theme-btn-primary ${busy && 'disabled'}`}
                onClick={this.handlePickup}>
                {busy ? <Inline size={64} color={"#fff"}/> : btn_label2}
              </button>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

export default ConfirmModal;