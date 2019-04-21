import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from "react-responsive-modal";
class AboutPeriod extends Component {
    // model1: Add to Cart, model2: Edit
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { open, onClose, gearname, imgurl, person_name, startday, endday } = this.props;
        let dlg_heading = 'About Period';
        let btn_label1 = 'Cancel';



        return (
            <Modal open={open} onClose={onClose} center>
                <div className='Period-cart-header'>
                    <span >{dlg_heading}</span>
                </div>
                <div className='period-cart-body-1'>
                    <div className='modal-cart-info row'>
                        <span className='period-carted-product-name'>{gearname}</span>
                    </div>


                    <div className='modal-cart-control row'>
                        <button className='cart-control-left-button theme-btn theme-btn-primary' onClick={onClose}>{btn_label1}</button>
                        <div className='cart-button-space'></div>
                      </div>
                </div>
            </Modal>
        )
    }
}
export default withRouter(AboutPeriod);