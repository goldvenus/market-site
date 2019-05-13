import Modal from "react-responsive-modal";
import React, {Component} from "react";

/*
    Confirm Modal
 */
class ConfirmModal extends Component {

    handleConfirm = () => {
        this.props.onConfirm();
    };

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const { heading } = this.props;
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
                            <button className='cart-control-left-button theme-btn theme-btn-primary' onClick={this.handleClose}>
                                {btn_label1}
                            </button>
                            <button className='cart-control-right-button theme-btn theme-btn-primary' onClick={this.handleConfirm}>
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