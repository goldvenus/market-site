import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Dropdown, DropdownToggle, Input, Label } from 'reactstrap';
import CustomInput from '../../CustomInput';
import { getCarts, days, payment } from '../../../actions/app.actions';
import BarLoader from "react-bar-loader";

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNumber: '',
      cardHolder: '',
      expirationMonth: '',
      expirationYear: '',
      cvv: '',
      isPaymentDone: false,
      saveCard: false
    };

    this.pay = this.pay.bind(this);

    // getCarts();
  }

  async pay() {
    const { cardNumber, cardHolder, expirationMonth, expirationYear, cvv, saveCard } = this.state;

    let data = {
      cardNumber, cardHolder, expirationYear, expirationMonth, cvv, saveCard
    };

    let response = await payment(data);
    if (response) {
      this.setState({
        isPaymentDone: true,
        total: response.total,
        tax: response.tax,
        fee: response.fee
      });
    }
  }

  renderCheckoutItems() {
    const { carts } = this.props;
    return (
      <div className="checkout-items">
        {
          carts.map((listItem, index) => {
            const d = days(listItem.startDate, listItem.endDate);
            return <div key={`cart-item-${index}`} className="checkout-item theme-text-small">
              <div>{listItem.brand + ' ' + listItem.model}</div>
              <div><b>{listItem.pricePerDay * d}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days</div>
            </div>;
          })
        }
      </div>
    );
  }

  render() {
    const { cardNumber, expirationYear, expirationMonth, cvv, cardHolder, saveCard } = this.state;
    const { isPaymentDone } = this.state;
    if (isPaymentDone) {
      return (
        <div className="payment payment-success-message centered-content">
          <h1><i className="fa fa-check-circle primary-color"></i></h1>
          <div className="theme-page-title payment-title">Payment was successful</div>

          <div className="payment-success-info theme-text-small">
            <div>
              <div className="checkout-total">
                <div><span className="text-gray">Total </span> ${this.state.total}</div>
                <div><span className="text-gray">Tax (21%) </span> ${this.state.tax}</div>
                <div><span className="text-gray">Fee </span> ${this.state.fee}</div>
              </div>
              <div className="checkout-amount">
                <div><span className="text-gray">Amount </span>
                  <b>${this.state.total + this.state.tax + this.state.fee}</b></div>
              </div>
            </div>
            <div>
              <div className="payment-card">
                <div><span className="text-gray">Paid with</span></div>
                <div className="flex-row">
                  <img src="images/master-card.png"/>
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
            <button className="theme-btn theme-btn-primary theme-btn-link"><Link to="/rentgear">My Rentals</Link>
            </button>
          </div>
        </div>);
    }

    const { carts } = this.props;
    if (!carts) {
      return <BarLoader color="#F82462" height="5" />;
    }

    let total = 0;
    carts.forEach(listItem => {
      const d = days(listItem.startDate, listItem.endDate);
      total += d * listItem.pricePerDay;
    });
    const tax = total * 0.21;
    const amount = total + tax;

    return (
      <div className="payment checkout">
        <div className="payment-head">
          <div className='container'>
            <Breadcrumb>
              <BreadcrumbItem>Home </BreadcrumbItem>
              <BreadcrumbItem>Cart</BreadcrumbItem>
              <BreadcrumbItem>Checkout</BreadcrumbItem>
              <BreadcrumbItem active>Payment</BreadcrumbItem>
            </Breadcrumb>
            <div className="d-flex align-items-center checkout-title">Payment</div>
          </div>
        </div>

        <div className="payment-body">
          <div className='container flex-row flex-align-stretch '>
            <div className='row'>
              <div className="billing-address">
                <div className="checkout-header">
                  PAYMENT METHODS
                </div>
                <div className="theme-form">
                  <Dropdown className="theme-form-field">
                    <DropdownToggle caret>
                      Saved Cards
                    </DropdownToggle>
                  </Dropdown>
                  <div className="payment-card">
                    <img src="images/master-card.png"/>
                    <div className="payment-card-number">{cardNumber}</div>
                    <div className="flex-row payment-card-other">
                      <div>{expirationMonth} / {expirationYear}</div>
                      <div>{cardHolder}</div>
                    </div>
                  </div>
                  <div className="flex-row">
                    <div className="theme-form-field">
                      <CustomInput placeholder='Card Number' type="text" value={cardNumber}
                                   onChange={(value) => this.setState({ cardNumber: value })}/>
                    </div>
                    <div className="theme-form-field">
                      <CustomInput placeholder='Card Holder' type="text" value={cardHolder}
                                   onChange={(value) => this.setState({ cardHolder: value })}/>
                    </div>
                  </div>
                  <div className="flex-row">
                    <div className="flex-row">
                      <div className="theme-form-field">
                        <CustomInput placeholder='Month' type="text" value={expirationMonth}
                                     onChange={(value) => this.setState({ expirationMonth: value })}/>
                      </div>
                      <div className="theme-form-field">
                        <CustomInput placeholder='Year' type="text" value={expirationYear}
                                     onChange={(value) => this.setState({ expirationYear: value })}/>
                      </div>
                    </div>
                    <div className="theme-form-field">
                      <CustomInput placeholder='CVV' type="text" value={cvv}
                                   onChange={(value) => this.setState({ cvv: value })}/>
                    </div>
                  </div>
                  <div className="theme-form-field">
                    <Input type="checkbox" id="save-address" checked={saveCard}
                           onChange={(e) => this.setState({ saveCard: e.target.checked })}/>
                    <Label for="save-address">Save this payment method</Label>
                  </div>
                </div>
              </div>

              <div className="order-info theme-text-small">
                <div className="checkout-header">
                  <div className="text-gray">ORDER INFORMATION</div>
                  <button className="theme-btn theme-btn-filled-white theme-btn-link"><Link to="/cart">Edit Order</Link>
                  </button>
                </div>

                {
                  this.renderCheckoutItems()
                }

                <div className="checkout-total">
                  <div><span className="text-gray">Total </span> <b>${total}</b></div>
                  <div><span className="text-gray">Tax (21%) </span> <b>${tax}</b></div>
                  <div><span className="text-gray">Fee </span> <b>$0</b></div>
                </div>

                <div className="checkout-amount">
                  <div><span className="text-gray">Amount </span> <b>${amount}</b></div>
                </div>
              </div>
            </div>
            <div className="flex-row bottom-buttons">
              <button className="theme-btn theme-btn-secondery theme-btn-link"><Link to="/cart">Edit Order</Link></button>
              <button className="theme-btn theme-btn-primary" onClick={this.pay}>Pay (${amount})</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.app.carts
});

export default connect(mapStateToProps)(Payment);
