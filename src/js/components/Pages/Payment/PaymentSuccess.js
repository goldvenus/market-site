import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { days, getPaidItems, handleError } from '../../../actions/app.actions';
import BarLoader from "react-bar-loader";
import '@trendmicro/react-buttons/dist/react-buttons.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import moment from "moment";
import CustomSpinner from "../../CustomSpinner";

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
      console.log(ret);
      const pay_info = ret.pay_info;
      const items = pay_info.SoldItems;

      this.setState({
        items: items,
        card_number: pay_info.CardNumber,
        card_holder: pay_info.CardHolder,
        expiration_month: pay_info.ExpirationDate,
        expiration_year: pay_info.ExpirationDate,
        total: pay_info.Total,
        tax: pay_info.Tax,
        fee: pay_info.Fee,
        amount: pay_info.Amount,
        loading: false
      });
    } catch(err) {
      handleError("Payment info laoding failed!");
    }
  }

  renderCheckoutItems() {
    const { items } = this.state;
    return (
      <div className="checkout-items">
        {
          items.map((listItem, index) => {
            const d = days(listItem.startDate, listItem.endDate);
            return <div key={`cart-item-${index}`} className="checkout-item">
              <div>{listItem.brand + ' ' + listItem.model}</div>
              <div><b>${listItem.pricePerDay * d}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days</div>
            </div>;
          })
        }
      </div>
    );
  }

  render() {
    if (this.state.loading) {
        return <CustomSpinner/>;
    }

    const { card_number, expiration_year, expiration_month, card_holder, total, tax, fee, amount } = this.state;

    return (
      <div className="payment payment-success-message centered-content">
        <h1><i className="fa fa-check-circle primary-color"></i></h1>
        <div className="theme-page-title payment-title">Payment was successful</div>

        <div className="payment-success-body">
          {this.renderCheckoutItems()}
        </div>

        <div className="payment-success-info">
          <div>
              <div className="checkout-total">
                  <div><span className="text-gray">Total </span> $ {total}</div>
                  <div><span className="text-gray">Tax (21%) </span> $ {tax}</div>
                  <div><span className="text-gray">Fee </span> $ {fee}</div>
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
          <button className="theme-btn theme-btn-primary theme-btn-link"><Link to="/rentgear">My Rentals</Link></button>
        </div>
      </div>);
  }
}

const mapStateToProps = state => ({
  carts: state.app.carts
});

export default connect(mapStateToProps)(Payment);
