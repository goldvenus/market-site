import Modal from "react-responsive-modal";
import React, {Component} from "react";

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
  
  render() {
    let {model, isOwner} = this.props;
    let dlg_heading = model === 1 ? 'Pickup Successful' : 'Return Successful';
    let dlg_sub_heading = !isOwner ? 'Waiting for gear owner confirmation' : '';
    
    return (
      <Modal open={this.state.open} onClose={this.handleClose} center classNames={{modal: "cart-modal pickup-modal"}}>
        <div className='pickup-modal-header pickup-success-header'>
          <div>
            <div><img src='/images/Icons/check/big-check.svg' alt=''/></div>
            <div className='pickup-heading'>{dlg_heading}</div>
            <div className='pickup-sub-heading'>{dlg_sub_heading}</div>
          </div>
        </div>
        <div className='pickup-modal-body pickup-success-body'>
          <button className='theme-btn theme-btn-primary' onClick={this.props.onClose}>Close</button>
        </div>
      </Modal>
    )
  }
}

export default ConfirmModal;