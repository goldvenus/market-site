import Modal from "react-responsive-modal";
import React from "react";
import { withRouter } from 'react-router-dom';

/*
    Modal Interface for CART_CONFIRM(Favorites Page) and CART_EDIT(Cart Page - CART_EDIT)
 */
const CartModal = ({gear, carted, open, onClose, addToCart, history}) => {
    const {brand, model, duration, start_date_str, end_date_str, pricePerDay, total_price} = gear;
    let dlg_heading = 'Add to Cart';
    let btn_label1 = '';
    let btn_label2 = '';
    if (!carted) {
        btn_label1 = 'Cancel';
        btn_label2 = 'Add to Cart';
    } else {
        btn_label1 = 'Cart';
        btn_label2 = 'Continue Shopping';
        dlg_heading = 'Added to Cart';
    }

    return (
        <Modal open={open} onClose={onClose} center>
            <div className='modal-cart-header'>
                {
                    carted ? <i className='fas fa-check-circle'></i> : null
                }
                <span>{dlg_heading}</span>
            </div>
            <div className='modal-cart-body'>
                <div className='modal-cart-info row'>
                    <span className='modal-carted-product-name'>{brand} {model}</span>
                    <span className='modal-carted-days'>{duration} DAYS</span>
                    <span className='modal-carted-duration'>{start_date_str} - {end_date_str}</span>
                </div>
                <div className='modal-cart-price-container row'>
                    <div className='modal-cart-price-left'>
                        <div className="theme-form-small text-gray replacement">Price per day</div>
                        <div className="price-per-day">${pricePerDay}</div>
                    </div>
                    <div className='modal-cart-price-right'>
                        <div className="theme-form-small text-gray replacement">Total</div>
                        <div className="price-per-day">${total_price}</div>
                    </div>
                </div>
                <div className='modal-cart-control row'>
                    <button className='cart-confirm-button theme-btn theme-btn-primary' onClick={() => {
                        !carted ? onClose() : history.push('/cart');
                    }}>{btn_label1}</button>
                    <div className='cart-button-space'></div>
                    <button className='cart-continue-button theme-btn theme-btn-primary' onClick={() => {
                        !carted ? addToCart() : history.push('/rentgear');
                    }}>{btn_label2}</button>
                </div>
            </div>
        </Modal>
    )
}

export default withRouter(CartModal);