import React, {Component} from 'react';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import Rating from 'react-star-rating-lite';
import {Link} from "react-router-dom";
import Modal from "react-responsive-modal";
import {Inline} from '@zendeskgarden/react-loaders'
import {days, getDateStr} from "../../../../core/helper/index"
import PickupConfirmModal from "../PickupConfirmModal";
import PickupSuccessModal from "../PickupSuccessModal";
import {getOrderHistory, setRating} from "../../../../core/actions/dashboard.action";

class OrderConfirmModal extends Component {
  constructor(props) {
    super(props);
    
    this.rating = [0, 0, 0];
    
    this.state = {
      curItem: null,
      modalOpenState: 0,
      rating1: 0,
      rating2: 0,
      rating3: 0,
      isRating: false
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
      modalOpenState: 1,
      curItem: item
    });
  };
  
  handleRating = async (gearId) => {
    if (this.rating[0] === 0 && this.rating[1] === 0 && this.rating[2] === 0)
      return;
    
    this.setState({isRating: true});
    let paymentId = this.props.info.PaymentId;
    await setRating({
      rating1: this.rating[0],
      rating2: this.rating[1],
      rating3: this.rating[2],
      isRenter: true,
      gearId,
      paymentId
    });
    await getOrderHistory();
    this.setState({isRating: false});
  };
  
  handleRatingChange = (possible, val, index) => {
    if (!possible)
      return;
    
    this.rating[index] = val;
  };
  
  render() {
    let {info} = this.props;
    let expiration_date = info.ExpirationDate.toString();
    let sold_items = info.SoldItems;
    let payout_finished = true;
    expiration_date = expiration_date.substr(0, 2) + '/' + expiration_date.substr(2, 2);

    return (
      <Modal open={true} onClose={this.handleClose} center classNames={{modal: "order-modal"}} closeOnOverlayClick={false}>
        <div className="order-modal-desktop-tablet">
          <div className="order-modal-header">
            <span>{info.ProjectName}<svg className="edit_icon"/></span>
          </div>
          <div className="order-modal-body">
            <div className="paid-items">
              {
                sold_items.map((listItem, index) => {
                  let pick_status = 1 * listItem.PickStatus;
                  let return_status = listItem.ReturnStatus;
                  let btn_label1 = pick_status < 1 ? "CONFIRM PICKUP" : "PICKUP CONFIRMED";
                  let btn_label2 = return_status < 1 ? "CONFIRM RETURN" : 'RETURN CONFIRMED';
                  let pickupBtnState = pick_status < 1 ? 'return-btn active-btn'
                    : pick_status < 2 ? 'warning-btn disabled' : 'success-btn disabled';
                  let returnBtnState = pick_status < 2 ? 'return-btn disabled-btn disabled' :
                    return_status < 1 ? 'return-btn active-btn' :
                    return_status < 2 ? 'warning-btn disabled' : 'success-btn disabled';
                  let isRatingMode = pick_status > 1 && return_status > 1;
                  let rating = listItem.ratingRenter ? listItem.ratingRenter : [0, 0, 0];
                  let isRatingPossible = false;
                  if (rating[0] === 0 && rating[1] === 0 && rating[2] === 0) {
                    isRatingPossible = true;
                  }
                  if (pick_status < 2) {
                    payout_finished = false;
                  }

                  if (this.rating[0] === 0 && this.rating[1] === 0 && this.rating[2] === 0) {
                    this.rating = rating;
                  }

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
                            <img src={listItem.OwnerInfo.picture} alt=""/>
                            <div>
                              <span className="duration">{listItem.OwnerInfo.given_name}</span>
                              <span className="phone-number">{listItem.OwnerInfo.phone_number}</span>
                            </div>
                          </div>
                        </div>
                        <div className='buyer-info-right'>
                          <div className='grey-small-text'>Address</div>
                          <div className='period-price'>
                            <div>{listItem.address},</div>
                            <div>{listItem.postalCode} {listItem.city}</div>
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
                            <b>${listItem.pricePerDay * days(new Date(listItem.startDate), new Date(listItem.endDate))}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='pickup-btn-container'>
                      {!isRatingMode ?
                        <div>
                          <button className={`theme-btn pickup-btn ${pickupBtnState}`}
                            onClick={() => pick_status < 1 && this.handlePickupConfirm(listItem)}
                          >
                            {btn_label1}
                          </button>
                          <button
                            className={`theme-btn ${returnBtnState}`}
                            onClick={() => pick_status > 1 && return_status < 1 && this.handleReturnConfirm(listItem)}
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
                                  value={`${this.rating[0]}`}
                                  color="#f82462"
                                  weight="22"
                                  onClick={(v) => this.handleRatingChange(isRatingPossible, v, 0)}
                                />
                              </div>
                              <div>
                                <span>Owner</span>
                                <Rating
                                  value={`${this.rating[1]}`}
                                  color="#f82462"
                                  weight="22"
                                  onClick={(v) => this.handleRatingChange(isRatingPossible, v, 1)}
                                />
                              </div>
                              <div>
                                <span>Platform</span>
                                <Rating
                                  value={`${this.rating[2]}`}
                                  color="#f82462"
                                  weight="22"
                                  onClick={(v) => this.handleRatingChange(isRatingPossible, v, 2)}
                                />
                              </div>
                            </div>
                          </div>
                          {this.state.isRating || isRatingPossible ?
                          <button
                            className='theme-btn theme-btn-primary'
                            onClick={() => isRatingPossible && this.handleRating(listItem.gearid)}
                          >
                            {this.state.isRating ? <Inline size={64} color={"#fff"}/> : 'Submit Rating'}
                          </button> : null}
                        </div>
                      }
                    </div>
                  </div>
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
              <div className="payment-status-wrapper">
                <div>
                  <div className="text-gray">Payment Status</div>
                  <div className="payment-status">COMPLETED</div>
                </div>
                <div>
                  <div className="text-gray">Payout Status</div>
                  <div className={`payment-status ${payout_finished ? '' : 'warning-btn'}`}>{payout_finished ? 'COMPLETED' : 'IN ESCROW'}</div>
                </div>
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
                  let return_status = listItem.ReturnStatus;
                  let btn_label1 = pick_status < 1 ? "CONFIRM PICKUP" : "PICKUP CONFIRMED";
                  let btn_label2 = return_status < 1 ? "CONFIRM RETURN" : 'RETURN CONFIRMED';
                  let pickupBtnState = pick_status < 1 ? 'return-btn active-btn'
                    : pick_status < 2 ? 'warning-btn disabled' : 'success-btn disabled';
                  let returnBtnState = pick_status < 2 ? 'return-btn disabled-btn disabled' :
                    return_status < 1 ? 'return-btn active-btn' :
                      return_status < 2 ? 'warning-btn disabled' : 'success-btn disabled';
                  let isRatingMode = pick_status > 1 && return_status > 1;
                  let rating = listItem.ratingRenter ? listItem.ratingRenter : [0, 0, 0];
                  let isRatingPossible = false;
                  if (rating[0] === 0 && rating[1] === 0 && rating[2] === 0) {
                    isRatingPossible = true;
                  }
                  if (pick_status < 2) {
                    payout_finished = false;
                  }
  
                  if (this.rating[0] === 0 && this.rating[1] === 0 && this.rating[2] === 0) {
                    this.rating = rating;
                  }
  
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
                      {!isRatingMode ?
                        <div>
                          <button className={`theme-btn pickup-btn ${pickupBtnState}`}
                                  onClick={() => pick_status < 1 && this.handlePickupConfirm(listItem)}
                          >
                            {btn_label1}
                          </button>
                          <button
                            className={`theme-btn ${returnBtnState}`}
                            onClick={() => pick_status > 1 && return_status < 1 && this.handleReturnConfirm(listItem)}
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
                                  value={`${this.rating[0]}`}
                                  color="#f82462"
                                  weight="22"
                                  onClick={(v) => this.handleRatingChange(isRatingPossible, v, 0)}
                                />
                              </div>
                              <div>
                                <span>Owner</span>
                                <Rating
                                  value={`${this.rating[1]}`}
                                  color="#f82462"
                                  weight="22"
                                  onClick={(v) => this.handleRatingChange(isRatingPossible, v, 1)}
                                />
                              </div>
                              <div>
                                <span>Platform</span>
                                <Rating
                                  value={`${this.rating[2]}`}
                                  color="#f82462"
                                  weight="22"
                                  onClick={(v) => this.handleRatingChange(isRatingPossible, v, 2)}
                                />
                              </div>
                            </div>
                          </div>
                          {this.state.isRating || isRatingPossible ?
                            <button
                              className='theme-btn theme-btn-primary'
                              onClick={() => isRatingPossible && this.handleRating(listItem.gearid)}
                            >
                              {this.state.isRating ? <Inline size={64} color={"#fff"}/> : 'Submit Rating'}
                            </button> : null}
                        </div>
                      }
                    </div>
                  </div>
                })
              }
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
                  <div className="text-gray">Payment Status</div>
                  <div className="payment-status">COMPLETED</div>
                  <div className="text-gray">Payout Status</div>
                  <div className={`payment-status ${payout_finished ? '' : 'warning-btn'}`}>{payout_finished ? 'COMPLETED' : 'IN ESCROW'}</div>
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
          isRenter={true}
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

export default OrderConfirmModal;