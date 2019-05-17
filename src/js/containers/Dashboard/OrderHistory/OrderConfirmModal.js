import React, { Component } from 'react';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import Modal from "react-responsive-modal";
import { days, getDateStr } from "../../../core/helper"
import { Link } from "react-router-dom";
import PickupConfirmModal from "./PickupConfirmModal";
import PickupSuccessModal from "./PickupSuccessModal";

class OrderConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curItem: null,
            modalOpenState: 0
        }
    }

    handleClose = () => {
        this.props.close();
    };

    handleClosePickup = () => {
        this.setState({modalOpenState: 0});
    };

    handlePickupConfirm = (item) => {
        this.setState({
            modalOpenState: 1,
            curItem: item
        });
    };

    handlePickupSuccess = () => {
        this.setState({
            modalOpenState: 2
        });
    };

    render() {
        // const {card_number, expiration_year, expiration_month, card_holder, total, tax, fee, amount} = this.props.info;
        const { info } = this.props;
        const sold_items = info.SoldItems;
        const expiration_date = info.ExpirationDate.substr(0, 2) + '/' + info.ExpirationDate.substr(2, 2);
        return (
            <Modal open={true} onClose={this.handleClose} center classNames={{modal: "order-modal"}}>
                <div className="order-modal-desktop-tablet">
                    <div className="order-modal-header"><span>{info.ProjectName}<svg className="edit_icon"/></span></div>
                    <div className="order-modal-body">
                        <div className="paid-items">
                        {
                            sold_items.map((listItem, index) => {
                                const pick_status = 1*listItem.PickStatus;
                                const btn_label1 = pick_status < 1 ? "CONFIRM PICKUP" : "PICKUP CONFIRMED";
                                const btn_label2 = "CONFIRM RETURN";

                                return <div key={`cart-item-${index}`} className="paid-item">
                                <div className='pay-info pay-info-history'>
                                    <div className='item-info'>
                                        <span className='category-name'>{listItem.categoryName}</span>
                                        <span className='brand-model'>{listItem.brand + ' ' + listItem.model}</span>
                                    </div>
                                    <div className='buyer-info'>
                                        <div className='buyer-info-left'>
                                            <div className='grey-small-text'>Landlord</div>
                                            <div className='buyer-profile owner-profile'>
                                                <img src={listItem.OwnerInfo.picture} alt="" />
                                                <div>
                                                    <span className="duration">{listItem.OwnerInfo.region}</span>
                                                    <span className="phone-number">{listItem.OwnerInfo.phone_number}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='buyer-info-right'>
                                            <div className='grey-small-text'>Address</div>
                                            <div className='period-price'>
                                                <div>{info.Addr},</div>
                                                <div>{info.Zip} {info.Region}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='payment-info'>
                                        <div>
                                            <div className="grey-small-text">Period</div>
                                            <div className="duration">
                                                {getDateStr(listItem.startDate)} - {getDateStr(listItem.endDate)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="grey-small-text">Price</div>
                                            <div>
                                                <b>${listItem.pricePerDay * days(Date(listItem.startDate), Date(listItem.endDate))}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='pickup-btn-container'>
                                    <div>
                                        <button className={`theme-btn pickup-btn ${pick_status < 1 ? 'warning-btn' : 'success-btn disabled'}`} onClick={() => this.handlePickupConfirm(listItem)}>{btn_label1}</button>
                                        <button className={`theme-btn return-btn ${pick_status < 1 ? 'disabled disabled-btn' : 'active-btn'}`}>{btn_label2}</button>
                                    </div>
                                </div>
                            </div>;
                        })
                        }
                        </div>
                        <div className="payment-success-info">
                            <div className="payment-method">
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
                            <div className="payment-result">
                                <div><span className="text-gray">Paid with</span></div>
                                <div className="payment-card">
                                    <div className="flex-row payment-card-info">
                                        <img src="/images/cards/master-card.svg" alt=""/>
                                        <div className="payment-card-number">**** {info.CardNumber.substr(-4, 4)}</div>
                                    </div>
                                    <div className="flex-row payment-card-other">
                                        <span>{expiration_date}</span>
                                        <span className="card-holder">{info.CardHolder}</span>
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
                </div>
                <div className="order-modal-mobile">
                    <div className="order-modal-header">
                        <span>{info.ProjectName}<svg className="edit_icon"/></span>
                    </div>
                    <div className="order-modal-body">
                        <div className="paid-items">
                            {
                                sold_items.map((listItem, index) => {
                                    const pick_status = 1*listItem.PickStatus;
                                    const btn_label1 = pick_status < 1 ? "CONFIRM PICKUP" : "PICKUP CONFIRMED";
                                    const btn_label2 = "CONFIRM RETURN";

                                    return <div key={`cart-item-${index}`} className="paid-item d-block">
                                        <div className='pay-info pay-info-history'>
                                            <div className='item-info d-block'>
                                                <img src={listItem.numberOfUserImage[0]} alt="" />
                                                <div className="gear-info">
                                                    <div className='category-name'>{listItem.categoryName}</div>
                                                    <div className='brand-model'>{listItem.brand + ' ' + listItem.model}</div>
                                                    <div className='category-name'>Tripod Anti-glare-lenses</div>
                                                </div>
                                            </div>
                                            <div className='buyer-info'>
                                                <div className='buyer-info-left'>
                                                    <div className='buyer-profile owner-profile'>
                                                        <img src={listItem.OwnerInfo.picture} alt="" />
                                                        <div>
                                                            <span>{listItem.OwnerInfo.given_name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span><i className="fa fa-phone" aria-hidden="true"/> +1 (123) 562-42-11</span>
                                                <div className='buyer-info-right'>
                                                    <div className='period-price'>
                                                        <i className="fa fa-map-marker" aria-hidden="true"/>
                                                        <span> {info.Addr}, {info.Zip} {info.Region}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='payment-info d-block'>
                                                <div>
                                                    <div>
                                                        {getDateStr(listItem.startDate)} - {getDateStr(listItem.endDate)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <b>${listItem.pricePerDay * days(Date(listItem.startDate), Date(listItem.endDate))}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pickup-btn-container'>
                                            <div>
                                                <button className={`theme-btn pickup-btn ${pick_status < 1 ? 'warning-btn' : 'success-btn disabled'}`} onClick={() => this.handlePickupConfirm(listItem)}>{btn_label1}</button>
                                                <button className={`theme-btn return-btn ${pick_status < 1 ? 'disabled disabled-btn' : 'active-btn'}`}>{btn_label2}</button>
                                            </div>
                                        </div>
                                    </div>;
                                })
                            }
                            {/*<div className='rating-select-container'>*/}
                                {/*<div className='rating-select-inner'>*/}
                                    {/*<div className="row rating-select-top">*/}
                                        {/*HOW WAS YOUR EXPERIENCE?*/}
                                    {/*</div>*/}
                                    {/*<div className="row rating-select-bottom">*/}
                                        {/*<div>*/}
                                            {/*<span>Gear</span>*/}
                                            {/*<Rating*/}
                                                {/*initialRating={3}*/}
                                                {/*emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon" />}*/}
                                                {/*fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon" />}*/}
                                            {/*/>*/}
                                        {/*</div>*/}
                                        {/*<div>*/}
                                            {/*<span>Owner</span>*/}
                                            {/*<Rating*/}
                                                {/*initialRating={3}*/}
                                                {/*emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon" />}*/}
                                                {/*fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon" />}*/}
                                            {/*/>*/}
                                        {/*</div>*/}
                                        {/*<div>*/}
                                            {/*<span>Platform</span>*/}
                                            {/*<Rating*/}
                                                {/*initialRating={3}*/}
                                                {/*emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon" />}*/}
                                                {/*fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon" />}*/}
                                            {/*/>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        </div>
                        <div className="payment-success-info">
                            <div>
                                <div className="payment-method">
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
                            </div>
                            <div>
                                <div className="payment-result">
                                    <div className="checkout-total">
                                        <div>
                                            <span className="text-gray">Total </span>
                                            <span className="text-gray">Tax (21%) </span>
                                            <span className="text-gray">Fee (15%) </span>
                                        </div>
                                        <div>
                                            <span> $ {info.Total}</span>
                                            <span> $ {info.Tax}</span>
                                            <span> $ {info.Fee}</span>
                                        </div>
                                    </div>
                                    <div className="checkout-amount">
                                        <div><span className="text-gray">Amount </span>
                                            <b>$ {parseFloat(info.Amount).toFixed(2)}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="payment-status-container">
                                    <div className="text-gray">Payment status</div>
                                    <div className="payment-status">COMPLETED</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-modal-footer">
                        <button className='view-receipt-btn theme-btn theme-btn-secondery theme-btn-primary'>View Recipt</button>
                        <button className='theme-btn theme-btn-primary'><Link to='/dashboard/#rent'>Rent History</Link></button>
                    </div>
                </div>
                {this.state.modalOpenState === 1 && <PickupConfirmModal info={this.state.curItem} onClose={this.handleClosePickup} onSuccess={this.handlePickupSuccess}/>}
                {this.state.modalOpenState === 2 && <PickupSuccessModal info={this.state.curItem} onClose={this.handleClosePickup} onSuccess={this.handlePickupSuccess}/>}
            </Modal>
        )
    }
}

export default OrderConfirmModal