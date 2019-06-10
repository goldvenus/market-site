import React from 'react';
import Modal from "react-responsive-modal";
import { getDateStr } from "../../../core/helper/index"
import {days} from "../../../core/helper";

const AboutPeriod = ({ open, onClose, gear_info }) => {
    let btn_label1 = 'Close';

    return (
        <Modal open={open} onClose={onClose} center classNames={{modal: "cart-modal about-modal"}}>
            <div className='period-cart-header'>
                <span>About Period</span>
            </div>
            <div className='period-cart-body-1'>
                <div className='about-period-container row'>
                    <span className='period-carted-product-name'>{gear_info.brand} {gear_info.categoryName}</span>
                    <img src={gear_info.img_url} alt=''/>
                    <span className='owner-name'>{gear_info.renter_name}</span>
                    <span className='period-days'>{getDateStr(new Date(gear_info.startDate))} - {getDateStr(new Date(gear_info.endDate))}</span>
                    <span className='period-days-count'>{days(gear_info.startDate, gear_info.endDate)} days</span>
                </div>
                <div className='about-period-button-container row'>
                    <button className='cart-control-left-button theme-btn theme-btn-primary' onClick={onClose}>{btn_label1}</button>
                    <button className='theme-btn theme-btn-secondary mobile-about-modal-btn'>Delete Period</button>
                    <button className='theme-btn theme-btn-primary mobile-about-modal-btn'>Edit Period</button>
                </div>
            </div>
        </Modal>
    )
};

export default AboutPeriod;