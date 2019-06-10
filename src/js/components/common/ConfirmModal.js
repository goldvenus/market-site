import Modal from "react-responsive-modal";
import React, {Component} from "react";
import {Inline} from '@zendeskgarden/react-loaders'

/*
    Confirm Modal
 */
class ConfirmModal extends Component {
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
    let {heading, confirmLabel, oneButtonMode} = this.props;
    let {busy} = this.state;
    let btn_label1 = 'Cancel';
    let btn_label2 = confirmLabel ? confirmLabel : 'Confirm';
    
    return (
      <React.Fragment>
        <Modal open={true} onClose={this.handleClose} center classNames={{modal: "cart-modal confirm-modal"}}>
          <div className='confirm-modal-header'>
            <span>{heading}</span>
          </div>
          <div className='confirm-modal-body'>
            <div className='confirm-control'>
              {!oneButtonMode ?
              <button
                className={`cart-control-left-button theme-btn theme-btn-primary ${busy && 'disabled'}`}
                onClick={this.handleClose}
              >
                {btn_label1}
              </button> : null}
              <button
                className={`cart-control-right-button theme-btn theme-btn-primary ${busy && 'disabled'}`}
                onClick={this.handleConfirm}
                style={oneButtonMode ? {'margin': '0 auto'} : {}}
              >
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