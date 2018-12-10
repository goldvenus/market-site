import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Dropdown, DropdownToggle, Input, Label } from 'reactstrap';
import CustomInput from './CustomInput';
import moment from 'moment';
import dataSet from './Dashboard/dataSet';

const days = (d1, d2) => { return moment(d2).diff(moment(d1) , 'days')};

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNumber: '5300 1251 2150 3291',
      cardHolder: 'John Doe',
      expirationMonth: '09',
      expirationYear: '23',
      cvv: '032',
      isPaymentDone: false
    }

    this.pay = this.pay.bind(this);
  }

  pay() {
    this.setState({
      isPaymentDone: true
    })
  }

  renderCheckoutItems() {
    const items = dataSet.slice(0,5);
    return (
      <div className="checkout-items">
        {
          items.map((listItem, index) => {
            return <div key={`cart-item-${index}`} className="checkout-item theme-text-small">
              <div>{listItem.gear_name}</div>
              <div><b>{listItem.price_per_month}</b> for <b>{days(listItem.rental_period_start_date, listItem.rental_period_end_date)}</b> days</div>
            </div>
          })
        }
      </div>
    )
  }

  render() {
    const { cardNumber, expirationYear, expirationMonth, cvv, cardHolder} = this.state;

    const { isPaymentDone } = this.state;

    if(isPaymentDone) {
      return (
        <div className="payment payment-success-message centered-content">
          <h1><i className="fa fa-check-circle primary-color"></i></h1>
          <div className="theme-page-title">Payment was successful</div>

          <div className="payment-success-info theme-text-small">
            <div>
              <div className="checkout-total">
                <div><span className="text-gray">Total </span> $1180.00</div>
                <div><span className="text-gray">Tax (21%) </span> $247.80</div>
                <div><span className="text-gray">Fee </span> $0</div>
              </div>
              <div className="checkout-amount">
                <div><span className="text-gray">Amount </span> <b>$1427.80</b></div>
              </div>
            </div>
            <div>
              <div className="payment-card">
                <div><span className="text-gray">Paid with</span></div>
                <div className="flex-row">
                  <img src="images/master-card.png" />
                  <div className="payment-card-number">{cardNumber}</div>
                </div>
                <div className="flex-row payment-card-other">
                  <div>{expirationMonth} / {expirationYear}</div>
                  <div>{cardHolder}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-gray">Payment status</div>
              <div className="payment-status">COMPLETED</div>
            </div>
          </div>
          <div className="flex-row bottom-buttons">
            <button className="theme-btn theme-btn-secondery theme-btn-link"><Link to="/">Go to Home</Link></button>
            <button className="theme-btn theme-btn-primary theme-btn-link"><Link to="/rentgear">My Rentals</Link></button>
          </div>
        </div>)
      }

    return (
      <div className="payment checkout centered-content">
        <Breadcrumb>
          <BreadcrumbItem>Home </BreadcrumbItem>
          <BreadcrumbItem>Cart</BreadcrumbItem>
          <BreadcrumbItem>Checkout</BreadcrumbItem>
          <BreadcrumbItem active>Payment</BreadcrumbItem>
        </Breadcrumb>

        <div className="theme-page-title">Payment</div>

        <div className="flex-row flex-align-stretch">
          <div className="billing-address">
            <div className="checkout-header">
              <div className="text-gray">PAYMENT METHODS</div>
            </div>
            <div className="theme-form">
              <Dropdown className="theme-form-field">
                <DropdownToggle caret>
                  Saved Cards
                </DropdownToggle>
              </Dropdown>
              <div className="payment-card">
                <img src="images/master-card.png" />
                <div className="payment-card-number">{cardNumber}</div>
                <div className="flex-row payment-card-other">
                  <div>{expirationMonth} / {expirationYear}</div>
                  <div>{cardHolder}</div>
                </div>
              </div>
              <div className="flex-row">
                <div className="theme-form-field">
                  <CustomInput placeholder='Card Number' type="text" value={cardNumber}/>
                </div>
                <div className="theme-form-field">
                  <CustomInput placeholder='Card Holder' type="text" value={cardHolder}/>
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-row">
                  <div className="theme-form-field">
                    <CustomInput placeholder='Month' type="text" value={expirationMonth}/>
                  </div>
                  <div className="theme-form-field">
                    <CustomInput placeholder='Year' type="text" value={expirationYear}/>
                  </div>
                </div>
                <div className="theme-form-field">
                  <CustomInput placeholder='CVV' type="text" value={cvv}/>
                </div>
              </div>
              <div className="theme-form-field">
                <Input type="checkbox" id="save-address"/>
                <Label for="save-address">Save this payment method</Label>
              </div>
            </div>
          </div>

          <div className="order-info theme-text-small">
            <div className="checkout-header">
              <div className="text-gray">ORDER INFORMATION</div>
              <button className="theme-btn theme-btn-filled-white theme-btn-link"><Link to="/cart">Edit Order</Link></button>
            </div>

            {
              this.renderCheckoutItems()
            }

            <div className="checkout-total">
              <div><span className="text-gray">Total </span> <b>$1180.00</b></div>
              <div><span className="text-gray">Tax (21%) </span> <b>$247.80</b></div>
              <div><span className="text-gray">Fee </span> <b>$0</b></div>
            </div>

            <div className="checkout-amount">
              <div><span className="text-gray">Amount </span> <b>$1427.80</b></div>
            </div>
          </div>
        </div>

        <div className="flex-row bottom-buttons">
          <button className="theme-btn theme-btn-secondery theme-btn-link"><Link to="/cart">Edit Order</Link></button>
          <button className="theme-btn theme-btn-primary" onClick={this.pay}>Pay ($1427.80)</button>
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Payment);
