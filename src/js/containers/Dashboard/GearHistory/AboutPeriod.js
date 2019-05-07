import React from 'react';
import Modal from "react-responsive-modal";
import { getDateStr } from "../../../core/helper/index"

const AboutPeriod = ({ open, onClose, gear_info }) => {
    let btn_label1 = 'Close';

    return (
        <Modal open={open} onClose={onClose} center classNames={{modal: "cart-modal"}}>
            <div className='period-cart-header'>
                <img src={gear_info.img_url} alt=''/>
                <span>{gear_info.renter_name}</span>
            </div>
            <div className='period-cart-body-1'>
                <div className='about-period-container row'>
                    <span className='period-carted-product-name'>{gear_info.brand} {gear_info.categoryName}</span>
                    <span className='period-carted-product-name'>{getDateStr(new Date(gear_info.startDate))} - {getDateStr(new Date(gear_info.endDate))}</span>
                </div>
                <div className='about-period-button-container row'>
                    <button className='cart-control-left-button theme-btn theme-btn-primary' onClick={onClose}>{btn_label1}</button>
                </div>
            </div>
        </Modal>
    )
};

export default AboutPeriod;