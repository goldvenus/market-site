import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getPaidItems} from '../../core/actions/payment.action';
import {days, getDateStr} from '../../core/helper';
import {handleError} from '../../core/actions/common.action';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import ItemsCarousel from "react-items-carousel";
import CustomLoaderLogo from "../../components/common/CustomLoaderLogo";

class Payment extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      items: [],
      card_number: '',
      card_holder: '',
      expiration_month: '',
      expiration_year: '',
      total: 0,
      tax: 0,
      fee: 0,
      amount: 0,
      buyer_info: {},
      loading: true
    };
    
    let checkout_id = this.props.match.params.id;
    let payment_id = this.props.match.params.tid;
    
    this.getUserPaidItems({checkout_id, payment_id});
  }
  
  getUserPaidItems = async (param) => {
    try {
      let res = await getPaidItems(param);
      let pay_info = res.pay_info;
      let items = res.pay_info.SoldItems;
      let buyer_info = res.buyer_info;
      let card_number = pay_info.CardNumber;
      
      this.setState({
        items: items,
        card_number: card_number,
        card_holder: pay_info.CardHolder,
        expiration_month: pay_info.ExpirationDate.toString().substr(0, 2),
        expiration_year: pay_info.ExpirationDate.toString().substr(2, 2),
        total: pay_info.Total,
        tax: pay_info.Tax,
        fee: pay_info.Fee,
        amount: pay_info.Amount,
        buyer_info: buyer_info,
        loading: false
      });
    } catch (err) {
      handleError("Failed to load information");
    }
  };
  
  renderCheckoutItems() {
    let {items} = this.state;
    return (
      <div className="paid-items">
        {
          items.map((listItem, index) => {
            let duration = days(listItem.startDate, listItem.endDate);
            let ownerInfo = listItem.ownerInfo;
            let accessories = ["abc", 'def'];
            
            return <div key={`cart-item-${index}`} className="paid-item">
              <div className='item-info'>
                <div className='category-name'>{listItem.categoryName}</div>
                <h3 className='brand-model'>{listItem.productName}</h3>
                <div className="type-tabs">
                  <input name="type" id="new" type="radio" value="new"/>
                  <label className={`type-tab ${listItem.type === 'new' ? 'active' : ''}`} htmlFor="new">New</label>
                  <input name="type" id="like-new" type="radio" value="like_new"/>
                  <label className={`type-tab type-tab2 ${listItem.type === 'like_new' ? 'active' : ''}`}
                         htmlFor="like-new">Like New</label>
                  <input name="type" id="slightly-worn" type="radio" value="slightly_worn"/>
                  <label className={`type-tab type-tab3 ${listItem.type === 'slightly_worn' ? 'active' : ''}`}
                         htmlFor="slightly-worn">SlightlyWorn</label>
                  <input name="type" id="worn" type="radio" value="worn"/>
                  <label className={`type-tab type-tab4 ${listItem.type === 'worn' ? 'active' : ''}`}
                         htmlFor="worn">Worn</label>
                </div>
                <div className="carousel-bottom-container">
                  {this.renderCarousel(listItem.numberOfUserImage)}
                </div>
              </div>
              <div className='pay-info'>
                <div className='item-info'>
                  <div>
                    <div className='category-name'>Accessories</div>
                    <div className='accessories-content'>
                      {accessories.map((item, index) => <span key={index}>{item}<br/></span>)}
                    </div>
                  </div>
                </div>
                <div className='buyer-info'>
                  <div className='buyer-info-left'>
                    <div className='category-name'>Landlord</div>
                    <div className='buyer-profile'>
                      <img src={ownerInfo.picture} alt=''/>
                      <div>
                        <span>{ownerInfo.given_name}</span>
                        <span><b>{ownerInfo.phone_number}</b></span>
                      </div>
                    </div>
                    <div className='period-price'>
                    
                    </div>
                  </div>
                  <div className='buyer-info-right'>
                    <div className='category-name'>Address</div>
                    <div className='period-price'>
                      <div>{listItem.address},</div>
                      <div>{listItem.postalCode} {listItem.city}</div>
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
                      <b>${listItem.pricePerDay * duration}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days
                    </div>
                  </div>
                </div>
              </div>
            </div>
          })
        }
      </div>
    );
  }
  
  renderCarousel = (img_arr) => {
    // make img objects for bottom carousel
    const children = img_arr.map((item, i) => (
      <div key={i} className='payment-carousel-image-container'>
        <img src={item} alt=""/>
      </div>
    ));
    return (<ItemsCarousel
      // Placeholder configurations
      enablePlaceholder
      numberOfPlaceholderItems={img_arr.length}
      minimumPlaceholderTime={1000}
      placeholderItem={<div style={{height: 200, background: '#900'}}>Placeholder</div>}
      
      // Carousel configurations
      numberOfCards={4}
      gutter={12}
      showSlither={true}
      firstAndLastGutter={true}
      freeScrolling={false}
      
      // Active item configurations
      requestToChangeActive={(val) => this.setState({activeItemIndex: val})}
      activeItemIndex={this.state.activeItemIndex}
      activePosition={'center'}
      
      chevronWidth={24}
      rightChevron={'>'}
      leftChevron={'<'}
      outsideChevron={false}
    >
      {children}
    </ItemsCarousel>);
  };
  
  render() {
    if (this.state.loading) {
      return <CustomLoaderLogo/>;
    }
    
    let {card_number, expiration_year, expiration_month, card_holder, total, tax, fee, amount} = this.state;
    
    return (
      <div className="payment payment-success-container centered-content">
        <div className="theme-page-title payment-title">
          <div className="payment-success-icon"><i className="fa fa-check success-color"/>
          </div>
          <span>Payment was successful</span>
        </div>
        <div className="payment-success-body">
          {this.renderCheckoutItems()}
        </div>
        
        <div className="payment-success-info">
          <div className="payment-bill">
            <div className="checkout-total">
              <div className="bill-left">
                <p className="text-gray">Total </p>
                <p className="text-gray">Tax (21%) </p>
                <p className="text-gray">Fee (6%) </p>
              </div>
              <div className="bill-right">
                <p>$ {parseFloat(total).toFixed(2)}</p>
                <p>$ {parseFloat(tax).toFixed(2)}</p>
                <p>$ {parseFloat(fee).toFixed(2)}</p>
              </div>
            </div>
            <div className="checkout-amount">
              <div><span className="text-gray">Amount </span></div>
              <div><b>$ {parseFloat(amount).toFixed(2)}</b></div>
            </div>
          </div>
          <div>
            <div><span className="text-gray">Paid with</span></div>
            <div className="payment-card">
              <div className="flex-row">
                <img src="/images/cards/master-card.svg" alt=""/>
                <div className="payment-card-number">**** {card_number}</div>
              </div>
              <div className="flex-row payment-card-other">
                <span>{expiration_month} / {expiration_year}</span>
                <span>{card_holder}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-gray">Payment status</div>
            <div className="payment-status">COMPLETED</div>
          </div>
        </div>
        <div className="flex-row bottom-buttons">
          <button className="theme-btn theme-btn-secondery theme-btn-link"><Link to="/">Home Page</Link></button>
          <button className="theme-btn theme-btn-primary theme-btn-link"><Link to="/dashboard/#order">Order History</Link>
          </button>
        </div>
      </div>);
  }
}

const mapStateToProps = state => ({
  carts: state.cart.carts
});

export default connect(mapStateToProps)(Payment);
