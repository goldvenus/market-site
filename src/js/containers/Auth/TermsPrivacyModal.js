import Modal from "react-responsive-modal";
import React, {Component} from "react";

class TermsPrivacyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busy: false
    }
  }
  
  handleConfirm = async () => {
    this.setState({busy: true});
    await this.props.onConfirm();
  };
  
  handleClose = () => {
    if (this.state.busy)
      return;
    this.props.onClose();
  };
  
  render() {
    let {heading} = this.props;
    let {busy} = this.state;
    let btn_label1 = 'Cancel';
    let btn_label2 = 'Confirm';
    
    return (
      <React.Fragment>
        <Modal open={true} onClose={this.handleClose} center classNames={{modal: "cart-modal confirm-modal"}}>
          <div className='confirm-modal-header'>
            <span>{heading}</span>
          </div>
          <div className='confirm-modal-body'>
            <div className='confirm-control'>
              <button className={`cart-control-left-button theme-btn theme-btn-primary ${busy && 'disabled'}`} onClick={this.handleClose}>
                {btn_label1}
              </button>
              <button className={`cart-control-right-button theme-btn theme-btn-primary ${busy && 'disabled'}`} onClick={this.handleConfirm}>
                {busy ? <Inline size={64} color={"#fff"}/> : btn_label2}
              </button>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

export default TermsPrivacyModal;