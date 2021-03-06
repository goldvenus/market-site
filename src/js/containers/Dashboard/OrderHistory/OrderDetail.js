import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import {getOrderDetail} from "../../../core/actions/dashboard.action";
import {days, getDateStr} from "../../../core/helper"
import CustomSpinner from "../../../components/common/CustomSpinner";
import PickupConfirmModal from "./PickupConfirmModal";
import PickupSuccessModal from "./PickupSuccessModal";

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: null,
      modalOpenState: 0,
      curItem: 0
    };
    this.getHistory();
  }
  
  getHistory = async () => {
    const history = await getOrderDetail({payment_id: this.props.match.params.id});
    this.setState({history: history});
  };
  
  confirmPickup = (val) => {
    this.setState({modalOpenState: 1, curItem: val});
  };
  
  successPickup = (val) => {
    this.setState({modalOpenState: 2, curItem: val});
  };
  
  handleClose = () => {
    this.setState({modalOpenState: 0});
  };
  
  render() {
    if (!this.state.history) {
      return <CustomSpinner/>;
    }
    const info = this.state.history;
    const sold_items = info.SoldItems;
    const expiration_date = info.ExpirationDate.substr(0, 2) + '/' + info.ExpirationDate.substr(2, 2);
    return (
      <div className="payment payment-success-container order-detail-container centered-content">
        <div className="theme-page-title payment-title">
          <div className="payment-success-icon"><i className="fa fa-check success-color"/>
          </div>
          <span>Payment was successful</span>
          <div className="detail-top-button-container">
            <button className='view-receipt-btn theme-btn theme-btn-secondery'>PRINT RECEIPT</button>
            <div className='space-between'/>
            <button className='theme-btn theme-btn-secondery'>EMAIL RECEIPT</button>
          </div>
        </div>
        <div className="payment-success-body">
          <div>
            {
              sold_items.map((listItem, index) => {
                const pick_status = 1 * listItem.PickStatus;
                const btn_label1 = pick_status < 1 ? "CONFIRM PICKUP" : "PICKUP CONFIRMED";
                const btn_label2 = "CONFIRM RETURN";
                
                return <div key={`cart-item-${index}`} className="paid-item">
                  <div className='item-info-top'>
                    <div>
                      <div className='category-name'>{listItem.categoryName}</div>
                      <div className='brand-model'>{listItem.brand + ' ' + listItem.productName}</div>
                    </div>
                  </div>
                  <div className='item-info-bottom'>
                    <div className='pay-info pay-info-history'>
                      <div className='buyer-info'>
                        <div className='buyer-info-left'>
                          <div className='category-name'>Owner Name</div>
                          <div className='buyer-profile owner-profile'>
                            <img src={listItem.numberOfUserImage[0]} alt="number of user"/>
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
                        <button
                          className={`theme-btn pickup-btn ${pick_status < 1 ? 'warning-btn' : 'success-btn disabled'}`}
                          onClick={() => this.confirmPickup(index)}>{btn_label1}</button>
                        <button
                          className={`theme-btn return-btn ${pick_status < 1 ? 'disabled disabled-btn' : 'active-btn'}`}
                          onClick={() => this.successPickup(index)}>{btn_label2}</button>
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
                {/*<div><span className="text-gray">Tax (21%) </span> $ {info.Tax}</div>*/}
                <div><span className="text-gray">Fee (6%) </span> $ {info.Fee}</div>
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
          <button className='view-receipt-btn theme-btn theme-btn-secondery theme-btn-primary'>View Receipt</button>
          <div className='space-between'></div>
          <button className='theme-btn theme-btn-primary'><Link to='/dashboard/#rent'>Rent History</Link></button>
        </div>
        {
          this.state.modalOpenState === 1 ?
            <PickupConfirmModal onClose={this.handleClose} info={this.state.history.SoldItems[this.state.curItem]}/> :
            this.state.modalOpenState === 2 ? <PickupSuccessModal onClose={this.handleClose}
                                                                  info={this.state.history.SoldItems[this.state.curItem]}/> : null
        }
      </div>)
  }
}

export default OrderDetail