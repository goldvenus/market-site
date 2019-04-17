import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Label, ListGroup, ListGroupItem } from 'reactstrap';
import {days, payment, getPaymentCards} from '../../../actions/app.actions';
import BarLoader from "react-bar-loader";
import Dropdown, {
    MenuItem,
} from '@trendmicro/react-dropdown';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import '@trendmicro/react-dropdown/dist/react-dropdown.css';

import TextField from '@material-ui/core/TextField';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import $ from "jquery";

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      age: '',
      card_number: '',
      card_holder: '',
      expiration_month: '',
      expiration_year: '',
      cvv: '',
      cards: [],
      save_card: false,
      isPaymentDone: false
    };
    this.getUserPaymentCards();
  }

  getUserPaymentCards = async () => {
    const ret = await getPaymentCards(localStorage.userId);
    console.log(ret.card_list);
    const cards = ret.card_list;
    if (cards) {
      this.setState({
        cards: cards
      });
    }
  }

  handleCardChange = (e, element) => {
    e.preventDefault();
    $(".select-card-btn").trigger('click');
    this.setState({
        card_number: element.card_number,
        card_holder: element.card_holder,
        expiration_month: element.expiration_date,
        expiration_year: element.expiration_date,
        cvv: element.cvv
    });
  }

  handleSetSaveState = () => {
    this.setState({save_card: !this.state.save_card});
  }

  handleInputChange = (e, val) => {
      this.setState({[val]: e.target.value});
  }

  handleClickCardList = () => {
      if($('.addr-dropdown').hasClass('active')){
          $('.addr-dropdown').removeClass('active') ;
          $('.addr-dropdown ul').css('display', 'none');
      } else {
          $('.addr-dropdown').addClass('active') ;
          $('.addr-dropdown ul').css('display', 'block');
      }
  }

  pay = async () => {
    const { carts } = this.props;
    const { card_number, expiration_year, expiration_month, cvv, card_holder, save_card } = this.state;
    let user_id = localStorage.userId;
    let total = 0;
    let sold_items = [];
    carts.forEach(listItem => {
      let d = days(listItem.startDate, listItem.endDate);
      total += d * listItem.pricePerDay;
      sold_items.push(listItem.gearid)
    });
    const tax = total * 0.21;
    const amount = total + tax;
    const checkout_id = this.props.match.params.id;
    const fee = 0;
    const expiration_date = expiration_year + '/' + expiration_month;
    const data = { card_number, card_holder, expiration_date, cvv, save_card, user_id,
        total, tax, amount, fee, checkout_id, sold_items};
    console.log(data);

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
            return <div key={`cart-item-${index}`} className="checkout-item">
              <div>{listItem.brand + ' ' + listItem.model}</div>
              <div><b>${listItem.pricePerDay * d}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days</div>
            </div>;
          })
        }
      </div>
    );
  }

  renderDays = () => {
    let arr = Array.apply(null, Array(31));
    return arr.map((v, i) => (<MenuItem key={i} value={i+1}>{i+1}</MenuItem>));
  }

  renderMonths = () => {
    let arr = Array.apply(null, Array(12));
    return arr.map((v, i) => (<MenuItem key={i} value={i+1}>{i+1}</MenuItem>));
  }

  renderPaymentSuccess = () => {
    const { card_number, expiration_year, expiration_month, cvv, card_holder, save_card, cards } = this.state;
    return (
      <div className="payment payment-success-message centered-content">
        <h1><i className="fa fa-check-circle primary-color"></i></h1>
        <div className="theme-page-title payment-title">Payment was successful</div>

        <div className="payment-success-info">
          <div>
              <div className="checkout-total">
                  <div><span className="text-gray">Total </span> ${this.state.total}</div>
                  <div><span className="text-gray">Tax (21%) </span> ${this.state.tax}</div>
                  <div><span className="text-gray">Fee </span> ${this.state.fee}</div>
              </div>
              <div className="checkout-amount">
                  <div><span className="text-gray">Amount </span>
                      <b>${this.state.total + this.state.tax + this.state.fee}</b>
                  </div>
              </div>
          </div>
          <div>
            <div><span className="text-gray">Paid with</span></div>
            <div className="payment-card">
              <div className="flex-row">
                <img src="/images/master-card.svg" onClick={this.handleSetSaveState}/>
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

  render() {
    const { card_number, expiration_year, expiration_month, cvv, card_holder, save_card, cards } = this.state;
    const { isPaymentDone } = this.state;
    if (isPaymentDone) {
      return this.renderPaymentSuccess();
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
            <div className="billing-address">
              <div className="checkout-header">
                <div className="text-gray">PAYMENT METHODS</div>
              </div>

              <div className="address-select">
                <Dropdown className='d-none d-lg-block'>
                  <Dropdown.Toggle title="Saved Cards" className="select-card-btn"/>
                  <Dropdown.Menu>
                    {
                      cards.map((element, index) => (
                        <React.Fragment key={index}>
                          <MenuItem onClick={(e) => this.handleCardChange(e, element)} value={element} key={index}>
                            {element.card_holder}
                            {/*<MenuItem onClick={(e) => this.handleCardChange(e)}>*/}
                                {/*level item one*/}
                            {/*</MenuItem>*/}
                          </MenuItem>
                          <MenuItem divider />
                        </React.Fragment>))
                    }
                  </Dropdown.Menu>
                </Dropdown>
                <aside className="sidebar">
                  <div className="addr-dropdown d-block d-lg-none">
                    <div className="catagory-header">
                      <button className="sidebar-title   category-action-btn" onClick={this.handleClickCardList}>
                        { card_holder }
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </button>
                    </div>
                    <ListGroup style={{'display': 'none'}}>
                      {cards.map((element, index) =>
                        <ListGroupItem onClick={(e) => this.handleCardChange(e, element)} value={element} key={index}>
                          <div className='item-active'>
                            {element.card_holder}
                          </div>
                        </ListGroupItem>
                      )}
                    </ListGroup>
                  </div>
                </aside>
              </div>

              <div className="theme-form card-info-wrapper">
                <div className="payment-card">
                  <img src="/images/master-card.svg"/>
                  <div className="payment-card-number">{card_number}</div>
                  <div className="flex-row payment-card-other">
                    <span className='card-expiration-date'>{expiration_month} / {expiration_year}</span>
                    <span className='card-holder'>{card_holder}</span>
                  </div>
                </div>
                <div className="flex-row">
                  <div className="theme-form-field flex-md-12">
                    <TextField placeholder='Card Number' type="text" value={card_number} maxLength='20'
                      className='checkout-textfield'
                      onChange={e => this.handleInputChange(e, 'card_number')}/>
                  </div>
                  <div className="theme-form-field flex-md-12">
                    <TextField placeholder='Card Holder' type="text" value={card_holder} maxLength='20'
                      className='checkout-textfield'
                      onChange={e => this.handleInputChange(e, 'card_holder')}/>
                  </div>
                </div>

                <div className="flex-row">
                  <div className="theme-form-field flex-md-12 date-select-container">
                    <FormControl id="select-month">
                      <InputLabel htmlFor="age-required">Expiration</InputLabel>
                      <Select value={expiration_month}
                        onChange={(event, child) => {
                            event.preventDefault();
                            this.setState({ expiration_month: event.target.value,  age: child.props.value })
                        }}
                        name="age"
                        inputProps={{id: 'age-required'}}>
                        {
                          this.renderMonths()
                        }
                      </Select>
                    </FormControl>
                    <FormControl id="select-day" >
                      <Select value={expiration_year}
                        onChange={(event, child) => {
                          event.preventDefault();
                          this.setState({ expiration_year: event.target.value,  age: child.props.value })
                        }}
                        name="age"
                        inputProps={{id: 'age-required'}}>
                        {
                          this.renderDays()
                        }
                        </Select>
                    </FormControl>
                  </div>

                  <div className="theme-form-field flex-md-12">
                    <TextField placeholder="CVV" className='checkout-textfield' value={cvv}
                               onChange={e => this.handleInputChange(e, 'cvv')}/>
                  </div>
                </div>
                <div className="theme-form-field">
                  <div className="input_svg pretty p-svg p-plain">
                    <input  type="checkbox" onChange={this.handleSetSaveState} value={save_card} checked={save_card ? 'checked' : ''}/>
                    <div className="state">
                      <img className="svg check_svg" src="/images/Icons/task.svg"/>
                    </div>
                  </div>
                  <Label for="save-address" className='checkbox-label'>Save this payment method</Label>
                </div>
              </div>
            </div>

            <div className="order-info">
              <div className="order-info-header">
                  <div className="text-gray">ORDER INFO<span>RMATION</span></div>
                  <button className="theme-btn theme-btn-filled-white theme-btn-link btn-edit-order"><Link to="/cart">Edit Order</Link>
                  </button>
              </div>
                <div className='order-info-body'>
                  {this.renderCheckoutItems()}

                  <div className="checkout-total">
                    <div><span className="text-gray">Total </span> <b>${parseFloat(total).toFixed(2)}</b></div>
                    <div><span className="text-gray">Tax (21%) </span> <b>${parseFloat(tax).toFixed(2)}</b></div>
                    <div><span className="text-gray">Fee </span> <b>$0</b></div>
                  </div>

                  <div className="checkout-amount">
                    <div><span className="text-gray">Amount </span> <b className='checkout-total-price'>${parseFloat(amount).toFixed(2)}</b></div>
                  </div>
                </div>
              </div>
          </div>
          <div className="container flex-row flex-align-stretch ">
            <div className="flex-row bottom-buttons">
              <button className="theme-btn theme-btn-secondery theme-btn-link btn-edit-order-bottom"><Link to="/cart">Edit Order</Link></button>
              <button className="theme-btn theme-btn-primary btn-payment" onClick={this.pay}>Pay (${parseFloat(amount).toFixed(2)})</button>
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
