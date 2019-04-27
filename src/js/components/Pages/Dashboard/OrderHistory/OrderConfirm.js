import React, { Component } from 'react';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import Modal from "react-responsive-modal";
import { days } from "../../../../actions/app.actions";
import { getDateStr } from "../../../common/Functions"
import {Link} from "react-router-dom";

class OrderConfirm extends Component {
    constructor(props) {
        super(props);
    }

    handleClose = () => {
        this.props.close();
    };

    render() {
        // const {card_number, expiration_year, expiration_month, card_holder, total, tax, fee, amount} = this.props.info;
        const { info } = this.props;
        const sold_items = info.SoldItems;
        const expiration_date = info.ExpirationDate.substr(0, 2) + '/' + info.ExpirationDate.substr(2, 2);
        return (
            <Modal open={true} onClose={this.handleClose} center classNames={{modal: "order-modal"}}>
                <div className="order-modal-header"><span>{info.ProjectName}<i className="edit_icon"/></span></div>
                <div className="paid-items order-modal-body">
                    <div>
                    {
                        sold_items.map((listItem, index) => {
                            const pick_status = 1*listItem.PickStatus;
                            const btn_label1 = pick_status < 1 ? "CONFIRM PICKUP" : "PICKUP CONFIRMED";
                            const btn_label2 = "CONFIRM RETURN";

                            return <div key={`cart-item-${index}`} className="paid-item">
                            <div className='pay-info pay-info-history'>
                                <div className='item-info'>
                                    <div>
                                        <div className='category-name'>{listItem.categoryName}</div>
                                        <div className='brand-model'>{listItem.brand + ' ' + listItem.model}</div>
                                    </div>
                                </div>
                                <div className='buyer-info'>
                                    <div className='buyer-info-left'>
                                        <div className='category-name'>{localStorage.username}</div>
                                        <div className='buyer-profile owner-profile'>
                                            <img src={listItem.numberOfUserImage[0]}></img>
                                            <div>
                                                <span>Jakob Storm</span>
                                                <span>+1 (123) 562-42-11</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='buyer-info-right'>
                                        <div className='category-name'>Address</div>
                                        <div className='period-price'>
                                            <div>{info.Addr},</div>
                                            <div>{info.Zip} {info.Region}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='payment-info'>
                                    <div>
                                        <div className="category-name">Period</div>
                                        <div>
                                            {getDateStr(listItem.startDate)} - {getDateStr(listItem.endDate)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="category-name">Price</div>
                                        <div>
                                            <b>${listItem.pricePerDay * days(Date(listItem.startDate), Date(listItem.endDate))}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='pickup-btn-container'>
                                <div>
                                    <button className={`theme-btn pickup-btn ${pick_status < 1 ? 'warning-btn' : 'success-btn disabled'}`}>{btn_label1}</button>
                                    <button className={`theme-btn return-btn ${pick_status < 1 ? 'disabled disabled-btn' : 'active-btn'}`}>{btn_label2}</button>
                                </div>
                            </div>
                        </div>;
                    })
                    }
                    </div>
                    <div className="payment-success-info">
                        <div>
                            <div className="checkout-total">
                                <div><span className="text-gray">Total </span> $ {info.Total}</div>
                                <div><span className="text-gray">Tax (21%) </span> $ {info.Tax}</div>
                                <div><span className="text-gray">Fee (15%) </span> $ {info.Fee}</div>
                            </div>
                            <div className="checkout-amount">
                                <div><span className="text-gray">Amount </span>
                                    <b>$ {info.Amount}</b>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div><span className="text-gray">Paid with</span></div>
                            <div className="payment-card">
                                <div className="flex-row">
                                    <img src="/images/cards/master-card.svg" alt=""/>
                                    <div className="payment-card-number">**** {info.CardNumber.substr(-4, 4)}</div>
                                </div>
                                <div className="flex-row payment-card-other">
                                    <span>{expiration_date}</span>
                                    <span>{info.CardHolder}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-gray">Payment status</div>
                            <div className="payment-status">COMPLETED</div>
                        </div>
                    </div>
                </div>
                <div className="order-modal-footer">
                    <button className='view-receipt-btn theme-btn theme-btn-secondery theme-btn-primary'>View Recipt</button>
                    <div className='space-between'></div>
                    <button className='theme-btn theme-btn-primary'><Link to='/dashboard/#rent'>Rent History</Link></button>
                </div>
        </Modal>)
    }
}

export default OrderConfirm