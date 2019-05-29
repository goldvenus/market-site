import React, {Component} from 'react';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import Modal from "react-responsive-modal";
import {days, getDateStr} from "../../../../core/helper/index"
import {Link, withRouter} from "react-router-dom";
import PickupConfirmModal from "../PickupConfirmModal";
import PickupSuccessModal from "../PickupSuccessModal";
import Rating from "react-rating";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";

class OwnerConfirmModal extends Component {
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
  
  handleReturnConfirm = (item) => {
    this.setState({
      modalOpenState: 2,
      curItem: item
    });
  };
  
  render() {
    let {info} = this.props;
    let expiration_date = info.ExpirationDate.toString();
    let sold_items = info.SoldItems;
    let renter = info.renter;
    expiration_date = expiration_date.substr(0, 2) + '/' + expiration_date.substr(2, 2);

    return (
      <Modal open={true} onClose={this.handleClose} center classNames={{modal: "order-modal"}}>
        <div className="order-modal-desktop-tablet">
          <div className="order-modal-header">
            <span>RENTER<svg className="edit_icon"/></span>
          </div>
          <div className="order-modal-body">
            <div className='buyer-info owner-top-info'>
              <div className='owner-info-inner-wrapper'>
                <div className='buyer-info-left'>
                  <div className='grey-small-text'>Landlord</div>
                  <div className='buyer-profile owner-profile'>
                    <img src={renter.picture} alt=""/>
                    <div>
                      <span className="duration">{renter.given_name}</span>
                      <span className="phone-number">{renter.phone_number}</span>
                    </div>
                  </div>
                </div>
                <div className='buyer-info-right'>
                  <div className='grey-small-text'>Address</div>
                  <div className='period-price'>
                    <div>Laufacar 58,</div>
                    <div>101 Reykjavik</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="paid-items">
              {
                sold_items.map((listItem, index) => {
                  let pick_status = 1 * listItem.PickStatus;
                  let btn_label1 = pick_status < 2 ? "CONFIRM PICKUP" : "PICKUP CONFIRMED";
                  let btn_label2 = "CONFIRM RETURN";
                  let pickupBtnState = pick_status < 1 ? 'return-btn disabled-btn disabled' :
                    pick_status < 2 ? 'return-btn active-btn' : 'success-btn disabled';
                  let isRatingMode = false;

                  return <div key={`cart-item-${index}`} className="paid-item">
                    <div className='pay-info pay-info-history'>
                      <div className='item-info'>
                        <span className='category-name'>{listItem.categoryName}</span>
                        <span className='brand-model'>{listItem.brand + ' ' + listItem.model}</span>
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
                            <b>${listItem.pricePerDay * days(new Date(listItem.startDate), new Date(listItem.endDate))}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='pickup-btn-container'>
                      {!isRatingMode ?
                        <div>
                          <button className={`theme-btn pickup-btn ${pickupBtnState}`}
                            onClick={() => pick_status === 1 && this.handlePickupConfirm(listItem)}
                          >
                            {btn_label1}
                          </button>
                          <button
                            className={`theme-btn return-btn ${pick_status < 2 ? 'disabled disabled-btn' : 'active-btn'}`}
                            onClick={() => pick_status > 1 && this.handleReturnConfirm(listItem)}
                          >
                            {btn_label2}
                          </button>
                        </div> :
                        <div className='rating-select-container'>
                          <div className='rating-select-inner'>
                            <div className="row rating-select-top">
                              HOW WAS YOUR EXPERIENCE?
                            </div>
                            <div className="row rating-select-bottom">
                              <div>
                                <span>Gear</span>
                                <Rating
                                  initialRating={0}
                                  emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon"/>}
                                  fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon"/>}
                                />
                              </div>
                              <div>
                                <span>Owner</span>
                                <Rating
                                  initialRating={0}
                                  emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon"/>}
                                  fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon"/>}
                                />
                              </div>
                              <div>
                                <span>Platform</span>
                                <Rating
                                  initialRating={0}
                                  emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon"/>}
                                  fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon"/>}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>;
                })
              }
            </div>
            <div className="payment-success-info">
              <div className="payment-method">
                <div className="checkout-total">
                  <div><span className="text-gray">Total </span> $ {parseFloat(info.Total).toFixed(2)}</div>
                  <div><span className="text-gray">Tax (21%) </span> $ {parseFloat(info.Tax).toFixed(2)}</div>
                  <div><span className="text-gray">Fee (15%) </span> $ {parseFloat(info.Fee).toFixed(2)}</div>
                </div>
                <div className="checkout-amount">
                  <div><span className="text-gray">Amount </span>
                    <b>$ {parseFloat(info.Amount).toFixed(2)}</b>
                  </div>
                </div>
              </div>
              <div className="payment-result">
                <div><span className="text-gray">Paid with</span></div>
                <div className="payment-card">
                  <div className="flex-row payment-card-info">
                    <img src="/images/cards/master-card.svg" alt=""/>
                    <div className="payment-card-number">{info.CardNumber}</div>
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
            <div className='space-between'/>
            <button className='theme-btn theme-btn-primary'><Link to='/dashboard/#rent'>Rent History</Link></button>
          </div>
        </div>
        <div className="order-modal-mobile">
          <div className="order-modal-header">
            <span>{info.ProjectName}
              <svg className="edit_icon"/></span>
          </div>
          <div className="order-modal-body">
            <div className="paid-items">
              {
                sold_items.map((listItem, index) => {
                  let pick_status = 1 * listItem.PickStatus;
                  let btn_label1 = pick_status < 1 ? "CONFIRM PICKUP" : "PICKUP CONFIRMED";
                  let btn_label2 = "CONFIRM RETURN";
                  let pickupBtnState = pick_status < 1 ? 'return-btn active-btn'
                    : pick_status < 2 ? 'disabled-btn warning-btn disabled' : 'disabled-btn success-btn disabled';
                  
                  return <div key={`cart-item-${index}`} className="paid-item d-block">
                    <div className='pay-info pay-info-history'>
                      <div className='item-info d-block'>
                        <img src={listItem.numberOfUserImage[0]} alt=""/>
                        <div className="gear-info">
                          <div className='category-name'>{listItem.categoryName}</div>
                          <div className='brand-model'>{listItem.brand + ' ' + listItem.model}</div>
                          <div className='category-name'>Tripod Anti-glare-lenses</div>
                        </div>
                      </div>
                      <div className='buyer-info'>
                        <div className='buyer-info-left'>
                          <div className='buyer-profile owner-profile'>
                            <img src={listItem.OwnerInfo.picture} alt=""/>
                            <div>
                              <span>{listItem.OwnerInfo.given_name}</span>
                            </div>
                          </div>
                        </div>
                        <span>&nbsp;<i className="fa fa-phone" aria-hidden="true"/>{listItem.OwnerInfo.phone_number}</span>
                        <div className='buyer-info-right'>
                          <div className='period-price'>
                            <i className="fa fa-map-marker" aria-hidden="true"/>&nbsp;
                            <span> {info.address}, {listItem.postalCode} {listItem.city}</span>
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
                            <b>${listItem.pricePerDay * days(new Date(listItem.startDate), new Date(listItem.endDate))}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='pickup-btn-container'>
                      <div>
                        <button className={`theme-btn pickup-btn ${pickupBtnState}`}
                          onClick={() => pick_status < 1 && this.handlePickupConfirm(listItem)}>
                          {btn_label1}
                        </button>
                        <button className={`theme-btn return-btn ${pick_status < 2 ? 'disabled disabled-btn' : 'active-btn'}`}
                          onClick={() => pick_status > 1 && this.handleReturnConfirm(listItem)}>
                          {btn_label2}
                        </button>
                      </div>
                    </div>
                  </div>
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
                      <div className="payment-card-number">{info.CardNumber}</div>
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
                      <span> $ {parseFloat(info.Total).toFixed(2)}</span>
                      <span> $ {parseFloat(info.Tax).toFixed(2)}</span>
                      <span> $ {parseFloat(info.Fee).toFixed(2)}</span>
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
        {this.state.modalOpenState === 1 &&
        <PickupConfirmModal
          info={this.state.curItem}
          paymentId={info.PaymentId}
          onClose={this.handleClosePickup}
          onSuccess={this.handlePickupSuccess}
          isRenter={false}
        />}
        {this.state.modalOpenState === 2 &&
        <PickupSuccessModal
          info={this.state.curItem}
          onClose={this.handleClosePickup}
          onSuccess={this.handlePickupSuccess}
        />}
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
});

export default compose(
  connect(mapStateToProps),
  withRouter
)(OwnerConfirmModal);
