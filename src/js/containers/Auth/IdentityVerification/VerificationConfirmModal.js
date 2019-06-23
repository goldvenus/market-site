import Modal from "react-responsive-modal";
import React, {Component} from "react";
import {Link} from "react-router-dom";

/**
 * Confirm Modal
 */
class VerificationConfirmModal extends Component {
  handleClose = () => {
    this.props.onClose();
  };
  
  render() {
    let btn_label1 = 'Cancel';
    let btn_label2 = 'Verify';
    
    return (
      <React.Fragment>
        <Modal open={true} onClose={this.handleClose} center classNames={{modal: "cart-modal confirm-modal verification-modal"}}>
          <div className='confirm-modal-body'>
            <div className='confirm-body'>
              <img src='/images/auth/IDCard.svg' alt=''/>
              <h3>Identity Verification Required</h3>
              <p>Before you can engage in rentals, please verify your identity</p>
            </div>
            <div className='confirm-control'>
              <button
                className={`cart-control-left-button theme-btn theme-btn-primary`}
                onClick={this.handleClose}
              >
                {btn_label1}
              </button>
              <button className={`cart-control-right-button theme-btn theme-btn-primary`}>
                <Link to='/verify-profile'>{btn_label2}</Link>
              </button>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

export default VerificationConfirmModal;