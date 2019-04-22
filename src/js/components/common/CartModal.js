import Modal from "react-responsive-modal";
import React, {Component} from "react";
import { withRouter } from 'react-router-dom';
import { Inline } from '@zendeskgarden/react-loaders'
import { calcDaysDiff, getDateStr } from "./Functions";

/*
    Modal Interface for CART_CONFIRM and CART_DONE (Rend Gear Detail Page)
 */
class CartModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            busy: false
        };
    }

    render() {
        const {gear, carted, start_date, end_date, open, onClose, addToCart, history, location} = this.props;
        const {brand, model, pricePerDay} = gear;
        const duration = calcDaysDiff(start_date, end_date) + 1;
        const start_date_str = getDateStr(start_date);
        const end_date_str = getDateStr(end_date);
        const total_price = pricePerDay * duration;
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
                        <button className='cart-control-left-button theme-btn theme-btn-primary' onClick={() => {
                            !carted ? onClose() : history.push('/cart');
                        }}>{btn_label1}</button>
                        <div className='cart-button-space'></div>
                        <button className='cart-control-right-button theme-btn theme-btn-primary' onClick={() => {
                            if (!carted) {
                                this.setState({busy: true});
                                addToCart();
                            } else if (location.pathname.indexOf('/gear/detail') >= 0) {
                                this.setState({busy: false});
                                onClose();
                            }
                        }}>{btn_label2}</button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withRouter(CartModal);