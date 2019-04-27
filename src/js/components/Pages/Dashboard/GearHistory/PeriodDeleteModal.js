import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { getDateStr } from "../../../common/Functions"

class PeriodDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busy: false
        };
    }

    render() {
        let dlg_heading = 'Delete Period';
        let { gear_info, onClose, onDelete } = this.props;
        return (
            <Modal open={true} onClose={onClose} center classNames={{modal: "cart-modal"}}>
                <div className='period-cart-header'>
                    {dlg_heading}
                </div>
                <div className='period-cart-body-1'>
                    <div className='about-period-container row'>
                        <span className='period-carted-product-name'>{gear_info.brand} {gear_info.categoryName}</span>
                        <span className='period-carted-product-name'>{getDateStr(new Date(gear_info.startDate))} - {getDateStr(new Date(gear_info.endDate))}</span>
                    </div>
                    <div className='about-period-button-container row'>
                        <button className='cart-control-left-button theme-btn theme-btn-primary' onClick={onClose}>CANCEL</button>
                        <button className='cart-control-left-button theme-btn theme-btn-primary' onClick={onDelete}>DELETE</button>
                    </div>
                </div>
            </Modal>
        )
    }
};

export default PeriodDeleteModal;