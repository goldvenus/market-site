import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { days, getPaidItems, handleError } from '../../actions/app.actions';
import BarLoader from "react-bar-loader";
import '@trendmicro/react-buttons/dist/react-buttons.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import moment from "moment";
import CustomSpinner from "../../components/CustomSpinner";
import ItemsCarousel from "react-items-carousel";

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

    const checkout_id = this.props.match.params.id;
    const payment_id = this.props.match.params.tid;
    if (payment_id === undefined || checkout_id === undefined)
      window.location.href = "http://localhost:3000";

    this.getUserPaidItems({checkout_id, payment_id});
  }

  getUserPaidItems = async (param) => {
    try {
      const ret = await getPaidItems(param);
      console.log(ret.sold_items);
      const pay_info =  ret.pay_info;
      const items = ret.sold_items;
      const buyer_info = ret.buyer_info;
      let card_number = pay_info.CardNumber;
      card_number = `**** ${card_number.substr(card_number.length-4, 4)}`;

      this.setState({
        items: items,
        card_number: card_number,
        card_holder: pay_info.CardHolder,
        expiration_month: pay_info.ExpirationDate.substr(0, 2),
        expiration_year: pay_info.ExpirationDate.substr(2, 2),
        total: pay_info.Total,
        tax: pay_info.Tax,
        fee: pay_info.Fee,
        amount: pay_info.Amount,
        buyer_info: buyer_info,
        loading: false
      });
    } catch(err) {
      handleError("Payment info loading failed!");
    }
  }

  renderCheckoutItems() {
    const { items } = this.state;
    return (
      <div className="paid-items">
        {
          items.map((listItem, index) => {
              console.log(listItem.type);
            const d = days(listItem.startDate, listItem.endDate);
            return <div key={`cart-item-${index}`} className="paid-item">
              <div className='item-info'>
                <div className='category-name'>{listItem.categoryName}</div>
                <div className='brand-model'>{listItem.brand + ' ' + listItem.model}</div>
                <div className="type-tabs">
                  <input name="type" id="new" type="radio" value="new"/>
                  <label className={`type-tab ${listItem.type === 'new' ? 'active' : ''}`} htmlFor="new">New</label>
                  <input name="type" id="like-new" type="radio" value="like_new"/>
                  <label className={`type-tab type-tab2 ${listItem.type === 'like_new' ? 'active' : ''}`} htmlFor="like-new">Like New</label>
                  <input name="type" id="slightly-worn" type="radio" value="slightly_worn"/>
                  <label className={`type-tab type-tab3 ${listItem.type === 'slightly_worn' ? 'active' : ''}`} htmlFor="slightly-worn">SlightlyWorn</label>
                  <input name="type" id="worn" type="radio" value="worn"/>
                  <label className={`type-tab type-tab4 ${listItem.type === 'worn' ? 'active' : ''}`} htmlFor="worn">Worn</label>
                </div>
                <div className="carousel-bottom-container">
                  {
                    this.renderCarousel(listItem.numberOfUserImage)
                  }
                </div>
              </div>
              <div className='pay-info'>
                <div className='item-info'>
                  <div>
                    <div className='category-name'>{listItem.categoryName}</div>
                    <div className='brand-model'>{listItem.brand + ' ' + listItem.model}</div>
                  </div>
                </div>
                <div className='buyer-info'>
                  <div className='buyer-info-left'>
                    <div className='category-name'>{localStorage.username}</div>
                    <div className='buyer-profile'>
                        <img src={this.state.buyer_info.cognitoPool.userAttributes.picture}></img>
                        <div>
                            <span>Jakob Storm</span>
                            <span>+1 (123) 562-42-11</span>
                        </div>
                    </div>
                    <div className='period-price'>

                    </div>
                  </div>
                  <div className='buyer-info-right'>
                      <div className='category-name'>{localStorage.username}</div>
                      <div className='period-price'>

                      </div>
                  </div>
                </div>
                <div className='payment-info'>
                  <div>
                      <div className="category-name">Period</div>
                      <div>
                          <b>${listItem.pricePerDay * d}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days
                      </div>
                  </div>
                  <div>
                      <div className="category-name">Price</div>
                      <div>
                          <b>${listItem.pricePerDay * d}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days
                      </div>
                  </div>
                </div>
              </div>
            </div>;
          })
        }
      </div>
    );
  }

  renderCarousel = (img_arr) => {
        // make img objects for bottom carousel
        const children = img_arr.map((item, i) => (
            <div key={i} className='carousel-image-container'>
                <img src={item} alt="" />
            </div>
        ));
        return (<ItemsCarousel
            // Placeholder configurations
            enablePlaceholder
            numberOfPlaceholderItems={img_arr.length}
            minimumPlaceholderTime={1000}
            placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}

            // Carousel configurations
            numberOfCards={5}
            gutter={12}
            showSlither={true}
            firstAndLastGutter={true}
            freeScrolling={false}

            // Active item configurations
            requestToChangeActive={this.changeActiveItem}
            activeItemIndex={this.state.activeItemIndex}
            activePosition={'center'}

            chevronWidth={24}
            rightChevron={'>'}
            leftChevron={'<'}
            outsideChevron={false}
        >
            {children}
        </ItemsCarousel>);
}

  render() {
    if (this.state.loading) {
        return <CustomSpinner/>;
    }

    const { card_number, expiration_year, expiration_month, card_holder, total, tax, fee, amount } = this.state;

    return (
      <div className="payment payment-success-container centered-content">
        <div className="theme-page-title payment-title">
          <div className="payment-success-icon"><i className="fa fa-check success-color"></i>
          </div>
          <span>Payment was successful</span>
        </div>
        <div className="payment-success-body">
          {this.renderCheckoutItems()}
        </div>

        <div className="payment-success-info">
          <div>
              <div className="checkout-total">
                  <div><span className="text-gray">Total </span> $ {total}</div>
                  <div><span className="text-gray">Tax (21%) </span> $ {tax}</div>
                  <div><span className="text-gray">Fee (15%) </span> $ {fee}</div>
              </div>
              <div className="checkout-amount">
                  <div><span className="text-gray">Amount </span>
                      <b>$ {amount}</b>
                  </div>
              </div>
          </div>
          <div>
            <div><span className="text-gray">Paid with</span></div>
            <div className="payment-card">
              <div className="flex-row">
                <img src="/images/cards/master-card.svg" alt=""/>
                <div className="payment-card-number">{card_number}</div>
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
          <button className="theme-btn theme-btn-primary theme-btn-link"><Link to="/dashboard/#order">My Rentals</Link></button>
        </div>
      </div>);
  }
}

const mapStateToProps = state => ({
  carts: state.app.carts
});

export default connect(mapStateToProps)(Payment);
