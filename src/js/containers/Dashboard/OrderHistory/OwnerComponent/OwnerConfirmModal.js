import React, {Component} from 'react';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import Modal from "react-responsive-modal";
import {days, getDateStr} from "../../../../core/helper/index"
import {Link, withRouter} from "react-router-dom";
import {Inline} from '@zendeskgarden/react-loaders';
import PickupConfirmModal from "../PickupConfirmModal";
import PickupSuccessModal from "../PickupSuccessModal";
import Rating from 'react-star-rating-lite';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {getOrderHistory, setRating, setReturnGearStatus} from "../../../../core/actions/dashboard.action";

class OwnerConfirmModal extends Component {
  constructor(props) {
    super(props);
    
    let {info} = this.props;
    this.rating = [0, 0];
    if (info.ratingOwner) {
      let ratingTemp = info.ratingOwner.filter((item) => item[0] === localStorage.userId);
      if (ratingTemp.length > 0) {
        this.rating = ratingTemp[0].slice(1, 3);
      }
    }
    
    let gearStatus = [];
    let emptyStatus = [];
    info.SoldItems.forEach((item, key) => {
      gearStatus[key] = item.returnGearStatus ? item.returnGearStatus : 0;
      emptyStatus[key] = false;
    });
    
    this.state = {
      curItem: null,
      modalOpenState: 0,
      returnGearStatus: gearStatus,
      isSettingStatus: emptyStatus,
      isRating: false
    };
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
  
  handleRatingChange = (possible, val, index) => {
    if (!possible)
      return;
    
    this.rating[index] = val;
  };
  
  handleRating = async () => {
    if (this.rating[0] === 0 && this.rating[1] === 0)
      return;
  
    this.setState({isRating: true});
    let paymentId = this.props.info.PaymentId;
    await setRating({
      rating4: this.rating[0],
      rating5: this.rating[1],
      isRenter: false,
      renterId: this.props.info.UserId,
      paymentId
    });
    await getOrderHistory();
    this.setState({isRating: false});
  };
  
  handleReturnGearStatusChange = async (index, val) => {
    let status = this.state.returnGearStatus;
    status[index] = val;
    this.setState({returnGearStatus: status});
  };
  
  handleSetReturnGearStatus = async (index, gearId) => {
    let status = this.state.isSettingStatus;
    let returnFlag = false;
    status.forEach(item => {
      if (item) {
        returnFlag = true;
      }
    });
    if (returnFlag) return;
    
    status[index] = true;
    this.setState({isSettingStatus: status});
    
    let paymentId = this.props.info.PaymentId;
    let userId = this.props.info.UserId;
    await setReturnGearStatus({status: this.state.returnGearStatus[index], paymentId: paymentId, gearId, userId: userId});
    await getOrderHistory();
    status[index] = false;
    this.setState({isSettingStatus: status});
  };
  
  renderStars = (count) => {
    let stars = [1, 2, 3, 4, 5].map(i => {
      return i <= count ?
        <i className="fa fa-star star-selected" key={i}/> :
        <i className="fa fa-star-o" key={i}/>
    });
    return <div className='star-rating-wrapper'>{stars}</div>;
  };
  
  render() {
    let {info} = this.props;
    let {returnGearStatus} = this.state;
    let sold_items = info.SoldItems;
    let renter = info.renter;
    let payout_finished = true;
    let ratingOwner = this.rating;
    let isRatingMode = true;
    let isRatingPossible = true;

    sold_items.forEach((item) => {
      if (item.ReturnStatus < 2 || item.PickStatus < 2) {
        isRatingMode = false;
        isRatingPossible = false;
      }
    });
    
    if (ratingOwner[0] !== 0 || ratingOwner[1] !== 0) {
      isRatingPossible = false;
    }
    
    return (
      <Modal open={true} onClose={this.handleClose} center classNames={{modal: "order-modal"}} closeOnOverlayClick={false}>
        <div className="order-modal-desktop-tablet">
          <div className="order-modal-header">
            <span>Renter</span>
          </div>
          <div className="order-modal-body">
            <div className="paid-items">
              <div className='paid-item owner-info-wrapper' style={isRatingMode ? {} : {'justifyContent': 'center'}}>
                <div className='pay-info pay-info-history'>
                  <div className='buyer-info'>
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
                {isRatingMode ?
                <div className='pickup-btn-container'>
                  <div className='renter-rating-container'>
                    <div>
                      <span>Renter</span>
                      {isRatingPossible ?
                      <Rating
                        value={`${this.rating[0]}`}
                        color="#f82462"
                        weight="22"
                        onClick={(v) => this.handleRatingChange(isRatingMode, v, 0)}
                      /> : this.renderStars(this.rating[0])
                      }
                    </div>
                    <div>
                      <span>Platform</span>
                      {isRatingPossible ?
                      <Rating
                        value={`${this.rating[1]}`}
                        color="#f82462"
                        weight="22"
                        onClick={(v) => this.handleRatingChange(isRatingMode, v, 1)}
                      /> : this.renderStars(this.rating[1])
                      }
                    </div>
                    {this.state.isRating || isRatingPossible ?
                    <button
                      className='theme-btn theme-btn-primary owner-rating-btn'
                      onClick={this.handleRating}
                    >
                      {this.state.isRating ? <Inline size={64} color={"#fff"}/> : 'Submit'}
                    </button> : null}
                  </div>
                </div> : null}
              </div>
              
              {
                sold_items.map((listItem, index) => {
                  let pick_status = 1 * listItem.PickStatus;
                  let return_status = 1 * listItem.ReturnStatus;
                  let btn_label1 = pick_status < 2 ? "CONFIRM PICKUP" : "PICKUP CONFIRMED";
                  let btn_label2 = return_status < 1 ? "CONFIRM RETURN" : 'RETURN CONFIRMED';
                  let isReturnFinished = return_status > 1;
                  let pickupBtnState = pick_status < 1 ? 'return-btn disabled-btn disabled' :
                    pick_status < 2 ? 'return-btn active-btn' : 'success-btn disabled';
                  let returnBtnState = pick_status < 2 || return_status < 1 ? 'return-btn disabled-btn disabled' :
                    return_status < 2 ? 'return-btn active-btn' : 'success-btn disabled';
                  if (pick_status < 2) {
                    payout_finished = false;
                  }
                  let isSetReturnGearStatusPossible = listItem.returnGearStatus === undefined;
                  
                  return <div key={`cart-item-${index}`} className="paid-item">
                    <div className='pay-info pay-info-history'>
                      <div className='item-info'>
                        <span className='category-name'>{listItem.categoryName}</span>
                        <span className='brand-model'>{listItem.brand + ' ' + listItem.productName}</span>
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
                      {!isReturnFinished ?
                        <div>
                          <button className={`theme-btn pickup-btn ${pickupBtnState}`}
                            onClick={() => pick_status === 1 && this.handlePickupConfirm(listItem)}
                          >
                            {btn_label1}
                          </button>
                          <button
                            className={`theme-btn ${returnBtnState}`}
                            onClick={() => pick_status > 1 && return_status === 1 && this.handleReturnConfirm(listItem)}
                          >
                            {btn_label2}
                          </button>
                        </div> :
                        <div className='rating-select-container'>
                          <div className='rating-select-inner'>
                            <div className="row">
                              Return Condition
                            </div>
                            <div className="row rating-select-bottom rating-select-bottom-1">
                              <button className={`theme-btn status-new-btn ${returnGearStatus[index] === 0 ? 'active-btn' : ''}`} onClick={() => isSetReturnGearStatusPossible && this.handleReturnGearStatusChange(index, 0)}>Like New</button>
                              <button className={`theme-btn status-worn-btn ${returnGearStatus[index] === 1 ? 'active-btn' : ''}`} onClick={() => isSetReturnGearStatusPossible && this.handleReturnGearStatusChange(index, 1)}>Slightly Worn</button>
                              <button className={`theme-btn status-damaged-btn ${returnGearStatus[index] === 2 ? 'active-btn' : ''}`} onClick={() => isSetReturnGearStatusPossible && this.handleReturnGearStatusChange(index, 2)}>Damaged</button>
                            </div>
                          </div>
                          {isSetReturnGearStatusPossible ?
                          <button
                            className='theme-btn theme-btn-primary'
                            onClick={() => this.handleSetReturnGearStatus(index, listItem.gearid)}
                          >
                            {this.state.isSettingStatus[index] ? <Inline size={64} color={"#fff"}/> : 'Submit'}
                          </button> : null}
                        </div>
                      }
                    </div>
                  </div>
                })
              }
            </div>
            <div className="payment-success-info">
              <div className="payment-bill">
                <div className="checkout-total">
                  <div className="bill-left">
                    <p className="text-gray">Total </p>
                    {/*<p className="text-gray">Tax (21%) </p>*/}
                    <p className="text-gray">Fee (6%) </p>
                  </div>
                  <div className="bill-right">
                    <p>$ {parseFloat(info.Total).toFixed(2)}</p>
                    {/*<p>$ {parseFloat(info.Tax).toFixed(2)}</p>*/}
                    <p>$ {parseFloat(info.Fee).toFixed(2)}</p>
                  </div>
                </div>
                <div className="checkout-amount">
                  <div><span className="text-gray">Amount </span></div>
                  <div><b>$ {parseFloat(info.Amount).toFixed(2)}</b></div>
                </div>
              </div>
              <div className="payment-result">
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
            <span>Renter</span>
          </div>
          <div className="order-modal-body">
            <div className="paid-items">
              {
                sold_items.map((listItem, index) => {
                  let pick_status = 1 * listItem.PickStatus;
                  let return_status = 1 * listItem.ReturnStatus;
                  let btn_label1 = pick_status < 2 ? "CONFIRM PICKUP" : "PICKUP CONFIRMED";
                  let btn_label2 = return_status < 1 ? "CONFIRM RETURN" : 'RETURN CONFIRMED';
                  let isReturnFinished = return_status > 1;
                  let pickupBtnState = pick_status < 1 ? 'return-btn disabled-btn disabled' :
                    pick_status < 2 ? 'return-btn active-btn' : 'success-btn disabled';
                  let returnBtnState = pick_status < 2 || return_status < 1 ? 'return-btn disabled-btn disabled' :
                    return_status < 2 ? 'return-btn active-btn' : 'success-btn disabled';
                  if (pick_status < 2) {
                    payout_finished = false;
                  }
                  let isSetReturnGearStatusPossible = listItem.returnGearStatus === undefined;
                  
                  return <div key={`cart-item-${index}`} className="paid-item d-block">
                    <div className='pay-info pay-info-history'>
                      <div className='buyer-info'>
                        <div className='owner-info-mobile'>
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
                      {isRatingMode ?
                      <div className='pickup-btn-container'>
                          <div className='renter-rating-container'>
                            <div>
                              <span>Renter</span>
                              {isRatingPossible ?
                                <Rating
                                  value={`${this.rating[0]}`}
                                  color="#f82462"
                                  weight="22"
                                  onClick={(v) => this.handleRatingChange(isRatingMode, v, 0)}
                                /> : this.renderStars(this.rating[0])
                              }
                            </div>
                            <div>
                              <span>Platform</span>
                              {isRatingPossible ?
                                <Rating
                                  value={`${this.rating[1]}`}
                                  color="#f82462"
                                  weight="22"
                                  onClick={(v) => this.handleRatingChange(isRatingMode, v, 1)}
                                /> : this.renderStars(this.rating[1])
                              }
                            </div>
                            {isRatingPossible ?
                              <button
                                className='theme-btn theme-btn-primary owner-rating-btn'
                                onClick={this.handleRating}
                              >
                                {this.state.isRating ? <Inline size={64} color={"#fff"}/> : 'Submit'}
                              </button> : null}
                          </div>
                        </div> : null}
                    </div>
                    <div className='pay-info pay-info-history'>
                      <div className='item-info d-block'>
                        <img src={listItem.numberOfUserImage[0]} alt=""/>
                        <div className="gear-info">
                          <div className='category-name'>{listItem.categoryName}</div>
                          <div className='brand-model'>{listItem.brand + ' ' + listItem.productName}</div>
                          <div className='category-name'>{listItem.accessories.join(' ')}</div>
                        </div>
                      </div>
                      {/*<div className='buyer-info'>*/}
                        {/*<div className='buyer-info-left'>*/}
                          {/*<div className='buyer-profile owner-profile'>*/}
                            {/*<img src={listItem.OwnerInfo.picture} alt=""/>*/}
                            {/*<div>*/}
                              {/*<span>{listItem.OwnerInfo.given_name}</span>*/}
                            {/*</div>*/}
                          {/*</div>*/}
                        {/*</div>*/}
                        {/*<span>&nbsp;<i className="fa fa-phone" aria-hidden="true"/>{listItem.OwnerInfo.phone_number}</span>*/}
                        {/*<div className='buyer-info-right'>*/}
                          {/*<div className='period-price'>*/}
                            {/*<i className="fa fa-map-marker" aria-hidden="true"/>&nbsp;*/}
                            {/*<span> {info.address}, {listItem.postalCode} {listItem.city}</span>*/}
                          {/*</div>*/}
                        {/*</div>*/}
                      {/*</div>*/}
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
                      {!isReturnFinished ?
                        <div>
                          <button
                            className={`theme-btn pickup-btn ${pickupBtnState}`}
                            onClick={() => pick_status === 1 && this.handlePickupConfirm(listItem)}
                          >
                            {btn_label1}
                          </button>
                          <button
                            className={`theme-btn ${returnBtnState}`}
                            onClick={() => pick_status > 1 && return_status === 1 && this.handleReturnConfirm(listItem)}
                          >
                            {btn_label2}
                          </button>
                        </div> :
                        <div className='rating-select-container'>
                          <div className='rating-select-inner'>
                            <div className="row">
                              Return Condition
                            </div>
                            <div className="row rating-select-bottom rating-select-bottom-1">
                              <button className={`theme-btn status-new-btn ${returnGearStatus[index] === 0 ? 'active-btn' : ''}`} onClick={() => isSetReturnGearStatusPossible && this.handleReturnGearStatusChange(index, 0)}>Like New</button>
                              <button className={`theme-btn status-worn-btn ${returnGearStatus[index] === 1 ? 'active-btn' : ''}`} onClick={() => isSetReturnGearStatusPossible && this.handleReturnGearStatusChange(index, 1)}>Slightly Worn</button>
                              <button className={`theme-btn status-damaged-btn ${returnGearStatus[index] === 2 ? 'active-btn' : ''}`} onClick={() => isSetReturnGearStatusPossible && this.handleReturnGearStatusChange(index, 2)}>Damaged</button>
                            </div>
                          </div>
                          {isSetReturnGearStatusPossible ?
                            <button
                              className='theme-btn theme-btn-primary'
                              onClick={() => this.handleSetReturnGearStatus(index, listItem.gearid)}
                            >
                              {this.state.isSettingStatus[index] ? <Inline size={64} color={"#fff"}/> : 'Submit'}
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
                  {/*<div><span className="text-gray">Paid with</span></div>*/}
                  {/*<div className="payment-card">*/}
                    {/*<div className="flex-row">*/}
                      {/*<img src="/images/cards/master-card.svg" alt=""/>*/}
                      {/*<div className="payment-card-number">{info.CardNumber}</div>*/}
                    {/*</div>*/}
                    {/*<div className="flex-row payment-card-other">*/}
                      {/*<span>{expiration_date}</span>*/}
                      {/*<span>{info.CardHolder}</span>*/}
                    {/*</div>*/}
                  {/*</div>*/}
                </div>
              </div>
              <div>
                <div className="payment-result">
                  <div className="checkout-total">
                    <div>
                      <span className="text-gray">Total </span>
                      {/*<span className="text-gray">Tax (21%) </span>*/}
                      <span className="text-gray">Fee (6%) </span>
                    </div>
                    <div>
                      <span> $ {parseFloat(info.Total).toFixed(2)}</span>
                      {/*<span> $ {parseFloat(info.Tax).toFixed(2)}</span>*/}
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
          isRenter={false}
          model={this.state.curItem.PickStatus === 1 ? 1 : 2}
        />}
        {this.state.modalOpenState === 2 &&
        <PickupSuccessModal
          info={this.state.curItem}
          onClose={this.handleClosePickup}
          onSuccess={this.handlePickupSuccess}
          isOwner={true}
          model={this.state.curItem.PickStatus === 1 ? 1 : 2}
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
