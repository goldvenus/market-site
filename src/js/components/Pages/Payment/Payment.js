import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Label, ListGroup, ListGroupItem } from 'reactstrap';
import { getCarts, days, payment } from '../../../actions/app.actions';
import BarLoader from "react-bar-loader";
import './payment.css';
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
      cardNumber: '',
      cardHolder: '',
      expirationMonth: '',
      expirationYear: '',
      cvv: '',
      isPaymentDone: false,
      saveCard: false,
      selectedCardName: 'Saved cards',
    };

    this.pay = this.pay.bind(this);
    // getCarts();
  }

  handleCardChange = (e, val) => {
    e.preventDefault();
    this.setState({selectedCardName: val});
  }

  handleSetSaveState = () => {
    this.setState(prev => ({saveCard: !prev.saveCard}));
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
            return <div key={`cart-item-${index}`} className="checkout-item">
              <div>{listItem.brand + ' ' + listItem.model}</div>
              <div><b>${listItem.pricePerDay * d}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days</div>
            </div>;
          })
        }
      </div>
    );
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderDays = () => {
    let arr = Array.apply(null, Array(31));
    return arr.map((v, i) => (<MenuItem value={i+1}>{i+1}</MenuItem>));
  }

  renderMonths = () => {
    let arr = Array.apply(null, Array(12));
    return arr.map((v, i) => (<MenuItem value={i+1}>{i+1}</MenuItem>));
  }

  renderPaymentSuccess = () => {
    const { cardNumber, expirationMonth, expirationYear, cardHolder } = this.state;
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
                      <b>${this.state.total + this.state.tax + this.state.fee}</b></div>
              </div>
          </div>
          <div>
            <div><span className="text-gray">Paid with</span></div>
            <div className="payment-card">
              <div className="flex-row">
                <img src="images/master-card.svg" onClick={this.handleSetSaveState}/>
                <div className="payment-card-number">{cardNumber}</div>
              </div>
              <div className="flex-row payment-card-other">
                <span>{expirationMonth} / {expirationYear}</span>
                <span>{cardHolder}</span>
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
    const { cardNumber, expirationYear, expirationMonth, cvv, cardHolder, saveCard } = this.state;
    const { isPaymentDone } = this.state;
    if (!isPaymentDone) {
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
    const cards = ['paypal', 'mastercard', '...'];

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
                  <Dropdown.Toggle title={this.state.selectedCardName} />
                  <Dropdown.Menu>
                    {
                      cards.map((element, index) => (
                        <React.Fragment>
                          <MenuItem key={index}>
                            {element}
                            <MenuItem onClick={(e) => this.handleCardChange(e)}>
                                level item one
                            </MenuItem>
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
                        { this.state.selectedCardName }
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </button>
                    </div>
                    <ListGroup style={{'display': 'none'}}>
                      {cards.map((element, index) =>
                        <ListGroupItem onClick={(e) => this.handleCardChange(e, element)} value={element} key={index}>
                          <div className='item-active'>
                            {element}
                          </div>
                        </ListGroupItem>
                      )}
                    </ListGroup>
                  </div>
                </aside>
              </div>

              <div className="theme-form card-info-wrapper">
                <div className="payment-card">
                  <img src="images/master-card.svg"/>
                  <div className="payment-card-number">{cardNumber}</div>
                  <div className="flex-row payment-card-other">
                    <span className='card-expiration-date'>{expirationMonth} / {expirationYear}</span>
                    <span className='card-holder'>{cardHolder}</span>
                  </div>
                </div>
                <div className="flex-row">
                  <div className="theme-form-field flex-md-12">
                    <TextField placeholder='Card Number' type="text" value={cardNumber} maxLength='20'
                      className='checkout-textfield'
                      onChange={(event) => {
                         event.preventDefault();
                         console.log(event.target.value);
                         this.setState({ cardNumber: event.target.value })
                      }}/>
                  </div>
                  <div className="theme-form-field flex-md-12">
                    <TextField placeholder='Card Holder' type="text" value={cardHolder} maxLength='20'
                      className='checkout-textfield'
                      onChange={(event) => {
                        event.preventDefault();
                        console.log(event.target.value);
                        this.setState({ cardHolder: event.target.value })
                      }}/>
                  </div>
                </div>

                <div className="flex-row">
                  <div className="theme-form-field flex-md-12 date-select-container">
                    <FormControl id="select-month">
                      <InputLabel htmlFor="age-required">Expiration</InputLabel>
                      <Select value={expirationMonth}
                        onChange={(event,child) => {
                            event.preventDefault();
                            console.log("chld", child.props.value);
                            this.setState({ expirationMonth: event.target.value,  age: child.props.value })
                        }}
                        defaultValue={this.state.age}
                        name="age"
                        inputProps={{
                            id: 'age-required',
                        }}>
                        {
                          this.renderMonths()
                        }
                      </Select>
                    </FormControl>
                    <FormControl id="select-day" >
                      <Select value={expirationYear}
                        onChange={(event, child) => {
                          event.preventDefault();
                          this.setState({ expirationYear: event.target.value,  age: child.props.value })
                        }}
                        defaultValue={this.state.age}
                        name="age"
                        inputProps={{
                          id: 'age-required',
                        }}>
                        {
                          this.renderDays()
                        }
                        </Select>
                    </FormControl>
                  </div>

                  <div className="theme-form-field flex-md-12">
                    <TextField placeholder="CVV" className='checkout-textfield' />
                  </div>
                </div>
                <div className="theme-form-field">
                  <div className="input_svg pretty p-svg p-plain">
                    <input  type="checkbox"/>
                    <div className="state">
                      <img className="svg check_svg" src="images/Icons/task.svg"/>
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
