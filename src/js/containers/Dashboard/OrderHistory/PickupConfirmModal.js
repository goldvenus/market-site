import Modal from "react-responsive-modal";
import React, {Component} from "react";
import {getUTCDateFormat} from "../../../core/helper";
import {getOrderHistory, setPickupState} from "../../../core/actions/dashboard.action";
import {Inline} from '@zendeskgarden/react-loaders'

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
    await setPickupState({paymentId, gearId, pickedTime: this.utc_time.join(' ')});
    await getOrderHistory();
    this.setState({busy: false});
    this.props.onSuccess();
  };
  
  render() {
    let {info} = this.props;
    let {open, busy} = this.state;
    let dlg_heading = 'Confirm gear pickup';
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
              {info.brand + ' ' + info.model}
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