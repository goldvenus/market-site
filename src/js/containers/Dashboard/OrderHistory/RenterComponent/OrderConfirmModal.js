import React, {Component} from 'react';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import Rating from 'react-star-rating-lite';
import {Link} from "react-router-dom";
import Modal from "react-responsive-modal";
import {Inline} from '@zendeskgarden/react-loaders';
import ContentEditable from 'react-contenteditable';
import $ from 'jquery';
import {days, getDateStr} from "../../../../core/helper/index";
import PickupConfirmModal from "../PickupConfirmModal";
import PickupSuccessModal from "../PickupSuccessModal";
import {getOrderHistory, saveProjectName, setRating} from "../../../../core/actions/dashboard.action";

class OrderConfirmModal extends Component {
  constructor(props) {
    super(props);
    
    let {info} = this.props;
    this.rating = [];
    this.projectName = info.ProjectName;
    
    info.SoldItems.forEach((item, key) => {
      this.rating[key] = item.ratingRenter ? item.ratingRenter : [0, 0, 0];
    });
    
    this.state = {
      curItem: null,
      modalOpenState: 0,
      isRating: false,
      isNameEditing: false
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
  
  handleRating = async (gearId, index) => {
    if (this.rating[index][0] === 0 && this.rating[index][1] === 0 && this.rating[index][2] === 0)
      return;
    
    this.setState({isRating: index+1});
    let paymentId = this.props.info.PaymentId;
    await setRating({
      rating1: this.rating[index][0],
      rating2: this.rating[index][1],
      rating3: this.rating[index][2],
      isRenter: true,
      gearId,
      paymentId
    });
    await getOrderHistory();
    this.setState({isRating: false});
  };
  
  handleRatingChange = (possible, val, index, item) => {
    if (!possible)
      return;
    
    this.rating[item][index] = val;
  };
  
  handleSaveProjectName = async () => {
    let {info} = this.props;
    if (this.projectName !== info.ProjectName && this.projectName !== "") {
      await saveProjectName({newName: this.projectName, paymentId: info.PaymentId});
      await getOrderHistory();
    }
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
    let expiration_date = info.ExpirationDate.toString();
    let sold_items = info.SoldItems;
    let payout_finished = true;
    expiration_date = expiration_date.substr(0, 2) + '/' + expiration_date.substr(2, 2);

    return (
      <Modal open={true} onClose={this.handleClose} center classNames={{modal: "order-modal"}} closeOnOverlayClick={false}>
        <div className="order-modal-desktop-tablet">
          <div className="order-modal-header">
            <ContentEditable
              className='content-editable'
              html={this.projectName} // innerHTML of the editable div
              disabled={false} // use true to disable edition
              onChange={(e) => {
                this.projectName = e.target.value.replace(/<div>/g, '');
                this.projectName = this.projectName.replace(/<\/div>/g, '');
                this.projectName = this.projectName.replace(/&nbsp;/g, '');
                this.projectName = this.projectName.replace(/<br>/g, '');
              }}
              onBlur={this.handleSaveProjectName}
            />
            <svg className='edit_icon' onClick={() => $(".content-editable").trigger('focus')}/>
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
                  let isRatingPossible = listItem.ratingRenter === undefined;
  
                  if (this.state.isRating) {
                    isRatingPossible = false;
                  }
                  
                  if (pick_status < 2) {
                    payout_finished = false;
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
                              <span className="phone-number">Open In chat</span>
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
                                {isRatingPossible ?
                                <Rating
                                  value={`${this.rating[index][0]}`}
                                  color="#f82462"
                                  weight="22"
                                  onClick={(v) => this.handleRatingChange(isRatingPossible, v, 0, index)}
                                /> : this.renderStars(this.rating[index][0])
                                }
                              </div>
                              <div>
                                <span>Owner</span>
                                {isRatingPossible ?
                                <Rating
                                  value={`${this.rating[index][1]}`}
                                  color="#f82462"
                                  weight="22"
                                  onClick={(v) => this.handleRatingChange(isRatingPossible, v, 1, index)}
                                /> : this.renderStars(this.rating[index][1])
                                }
                              </div>
                              <div>
                                <span>Platform</span>
                                {isRatingPossible ?
                                <Rating
                                  value={`${this.rating[index][2]}`}
                                  color="#f82462"
                                  weight="22"
                                  onClick={(v) => this.handleRatingChange(isRatingPossible, v, 2, index)}
                                /> : this.renderStars(this.rating[index][2])
                                }
                              </div>
                            </div>
                          </div>
                          {this.state.isRating === index+1 || isRatingPossible ?
                          <button
                            className='theme-btn theme-btn-primary'
                            onClick={() => !this.state.isRating && isRatingPossible && this.handleRating(listItem.gearid, index)}
                          >
                            {this.state.isRating === index+1 ? <Inline size={64} color={"#fff"}/> : 'Submit Rating'}
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
                    <p className="text-gray">Tax (21%) </p>
                    <p className="text-gray">Fee (15%) </p>
                  </div>
                  <div className="bill-right">
                    <p>$ {parseFloat(info.Total).toFixed(2)}</p>
                    <p>$ {parseFloat(info.Tax).toFixed(2)}</p>
                    <p>$ {parseFloat(info.Fee).toFixed(2)}</p>
                  </div>
                </div>
                <div className="checkout-amount">
                  <div><span className="text-gray">Amount </span></div>
                  <div><b>$ {parseFloat(info.Amount).toFixed(2)}</b></div>
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
            <ContentEditable
              className='content-editable'
              html={this.projectName} // innerHTML of the editable div
              disabled={false} // use true to disable edition
              onChange={(e) => {
                this.projectName = e.target.value.replace(/<div>/g, '');
                this.projectName = this.projectName.replace(/<\/div>/g, '');
                this.projectName = this.projectName.replace(/&nbsp;/g, '');
                this.projectName = this.projectName.replace(/<br>/g, '');
              }}
              onBlur={this.handleSaveProjectName}
            />
            <svg className='edit_icon' onClick={() => $(".content-editable").trigger('focus')}/>
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
                  let isRatingPossible = listItem.ratingRenter === undefined;
  
                  if (this.state.isRating) {
                    isRatingPossible = false;
                  }

                  if (pick_status < 2) {
                    payout_finished = false;
                  }
  
                  return <div key={`cart-item-${index}`} className="paid-item d-block">
                    <div className='pay-info pay-info-history'>
                      <div className='item-info d-block'>
                        <img src={listItem.numberOfUserImage[0]} alt=""/>
                        <div className="gear-info">
                          <div className='category-name'>{listItem.categoryName}</div>
                          <div className='brand-model'>{listItem.brand + ' ' + listItem.model}</div>
                          <div className='category-name'>{listItem.accessories.join(' ')}</div>
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
                        <span>&nbsp;<i className="fa fa-phone" aria-hidden="true"/>Open In chat</span>
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
                                {isRatingPossible ?
                                  <Rating
                                    value={`${this.rating[index][0]}`}
                                    color="#f82462"
                                    weight="22"
                                    onClick={(v) => this.handleRatingChange(isRatingPossible, v, 0, index)}
                                  /> : this.renderStars(this.rating[index][0])
                                }
                              </div>
                              <div>
                                <span>Owner</span>
                                {isRatingPossible ?
                                  <Rating
                                    value={`${this.rating[index][1]}`}
                                    color="#f82462"
                                    weight="22"
                                    onClick={(v) => this.handleRatingChange(isRatingPossible, v, 1, index)}
                                  /> : this.renderStars(this.rating[index][1])
                                }
                              </div>
                              <div>
                                <span>Platform</span>
                                {isRatingPossible ?
                                  <Rating
                                    value={`${this.rating[index][2]}`}
                                    color="#f82462"
                                    weight="22"
                                    onClick={(v) => this.handleRatingChange(isRatingPossible, v, 2, index)}
                                  /> : this.renderStars(this.rating[index][2])
                                }
                              </div>
                            </div>
                          </div>
                          {this.state.isRating === index+1 || isRatingPossible ?
                            <button
                              className='theme-btn theme-btn-primary'
                              onClick={() => !this.state.isRating && isRatingPossible && this.handleRating(listItem.gearid, index)}
                            >
                              {this.state.isRating === index+1 ? <Inline size={64} color={"#fff"}/> : 'Submit Rating'}
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
          model={this.state.curItem.PickStatus === 0 ? 1 : 2}
        />}
        {this.state.modalOpenState === 2 &&
        <PickupSuccessModal
          info={this.state.curItem}
          onClose={this.handleClosePickup}
          onSuccess={this.handlePickupSuccess}
          isOwner={false}
          model={this.state.curItem.PickStatus === 0 ? 1 : 2}
        />}
      </Modal>
    )
  }
}

export default OrderConfirmModal;