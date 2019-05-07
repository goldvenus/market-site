import React, { Component } from 'react';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import Modal from "react-responsive-modal";
import { getDateStr, days } from "../../../core/helper"
import Rating from "react-rating";
import { Link } from "react-router-dom";

class OrderRating extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true
        };
    }

    handleClose = () => {
        this.props.close();
    };

    render() {
        const { info } = this.props;
        const sold_items = info.SoldItems;
        const expiration_date = info.ExpirationDate.substr(0, 2) + '/' + info.ExpirationDate.substr(2, 2);
        return (

                <Modal open={this.state.open} onClose={this.handleClose} center classNames={{modal: "order-modal"}}>
                    <div className="d-lg-block d-md-none d-sm-none d-none">
                        <div className="order-modal-header">
                            <span>{info.ProjectName}<i className="edit_icon"/></span>
                        </div>
                            <div className="paid-items order-modal-body">
                                <div>
                                    {
                                        sold_items.map((listItem, index) => {
                                            // const pick_status = 1*listItem.PickStatus;
                                            // const btn_label1 = pick_status < 1 ? "CONFIRM PICKUP" : "PICKUP CONFIRMED";
                                            // const btn_label2 = "CONFIRM RETURN";
                                            // console.log(listItem);

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
                                                            <div className='category-name'>Owner Name</div>
                                                            <div className='buyer-profile owner-profile'>
                                                                <img src={listItem.numberOfUserImage[0]} alt="number of user" ></img>
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
                                                <div className='rating-select-container'>
                                                    <div className='rating-select-inner'>
                                                        <div className="row rating-select-top">
                                                            HOW WAS YOUR EXPERIENCE?
                                                        </div>
                                                        <div className="row rating-select-bottom">
                                                            <div>
                                                                <span>Gear</span>
                                                                <Rating
                                                                    initialRating={3}
                                                                    emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon" />}
                                                                    fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon" />}
                                                                    />
                                                            </div>
                                                            <div>
                                                                <span>Owner</span>
                                                                <Rating
                                                                    initialRating={3}
                                                                    emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon" />}
                                                                    fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon" />}
                                                                    />
                                                            </div>
                                                            <div>
                                                                <span>Platform</span>
                                                                <Rating
                                                                    initialRating={3}
                                                                    emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon" />}
                                                                    fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon" />}
                                                                    />
                                                            </div>
                                                        </div>
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
                    </div>
                    <div className="d-sm-block d-md-none d-lg-none order_rating_dialog_sm_parent">
                        <div className="order-modal-header">
                            <span>{info.ProjectName}<i className="edit_icon"/></span>
                        </div>
                        <div className="paid-items order-modal-body">
                            <div>
                                {
                                    sold_items.map((listItem, index) => {
                                        // const pick_status = 1*listItem.PickStatus;
                                        // const btn_label1 = pick_status < 1 ? "CONFIRM PICKUP" : "PICKUP CONFIRMED";
                                        // const btn_label2 = "CONFIRM RETURN";
                                        // console.log(listItem);

                                        return <div key={`cart-item-${index}`} className="paid-item d-block">
                                            <div className='pay-info pay-info-history'>
                                                <div className='item-info d-block'>
                                                    <img src={listItem.numberOfUserImage[0]} alt="number of user" />
                                                    <div className="order_history_gear_name_sm">
                                                        <div className='category-name'>{listItem.categoryName}</div>
                                                        <div className='brand-model'>{listItem.brand + ' ' + listItem.model}</div>
                                                        <div className='category-name'>Tripod Anti-glare-lenses</div>
                                                    </div>
                                                </div>
                                                <div className='buyer-info'>
                                                    <div className='buyer-info-left'>
                                                        <div className='buyer-profile owner-profile'>
                                                            <img src={listItem.numberOfUserImage[0]} alt="number of user" />
                                                            <div>
                                                                <span>Jakob Storm</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span>+1 (123) 562-42-11</span>
                                                    <div className='buyer-info-right'>
                                                        <div className='period-price'>
                                                            <div>{info.Addr},</div>
                                                            <div>{info.Zip} {info.Region}</div>
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
                                            <div className='rating-select-container'>
                                                <div className='rating-select-inner'>
                                                    <div className="row rating-select-top">
                                                        HOW WAS YOUR EXPERIENCE?
                                                    </div>
                                                    <div className="row rating-select-bottom">
                                                        <div>
                                                            <span>Gear</span>
                                                            <Rating
                                                                initialRating={3}
                                                                emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon" />}
                                                                fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon" />}
                                                            />
                                                        </div>
                                                        <div>
                                                            <span>Owner</span>
                                                            <Rating
                                                                initialRating={3}
                                                                emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon" />}
                                                                fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon" />}
                                                            />
                                                        </div>
                                                        <div>
                                                            <span>Platform</span>
                                                            <Rating
                                                                initialRating={3}
                                                                emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon" />}
                                                                fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon" />}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>;
                                    })
                                }
                            </div>
                            <div className="payment-success-info">
                                <div className="payment-success-info-sm-div">
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
                                <div className="order_history_competed_div_sm">
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
                </Modal>
            )
    }
}

export default OrderRating