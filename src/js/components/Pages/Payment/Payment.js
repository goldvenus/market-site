import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Label, ListGroup, ListGroupItem } from 'reactstrap';
import { days, payment, getPaymentCards, handleError } from '../../../actions/app.actions';
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
import moment from "moment";
import CustomSpinner from "../../CustomSpinner";
import { getUniqueObjectArray, validateCard, cc_format, checkDigitSpace } from "../../common/Functions";

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
      total: 0,
      tax: 0,
      fee: 0,
      loading: true
    };

    this.getUserPaymentCards();
  }

  getUserPaymentCards = async () => {
    const ret = await getPaymentCards(localStorage.userId);
    const cards = ret.card_list;
    if (cards) {
      this.setState({
        cards: cards,
        loading: false
      });
    }
  };

  handleCardChange = (e, element) => {
    e.preventDefault();
    $(".select-card-btn").trigger('click');
    const month = element.expiration_date.substr(0, 2);
    const year = element.expiration_date.substr(2, 2);
    this.setState({
        card_number: cc_format(element.card_number),
        card_holder: element.card_holder,
        expiration_month: month,
        expiration_year: year,
        cvv: element.cvv
    });
  };

  handleSetSaveState = () => {
    this.setState({save_card: !this.state.save_card});
  };

  handleInputChange = (e, type) => {
    let value = e.target.value;
    if (type === 'card_number') {
      // only allow digits and space
      if (checkDigitSpace(value)) {
        value = cc_format(value);
      } else {
        handleError("Please input right number!");
        value = this.state.card_number;
      }
    }
    this.setState({[type]: value});
  };

  handleClickCardList = () => {
    if($('.addr-dropdown').hasClass('active')){
      $('.addr-dropdown').removeClass('active') ;
      $('.addr-dropdown ul').css('display', 'none');
    } else {
      if (this.state.cards.length > 0) {
        $('.addr-dropdown').addClass('active');
        $('.addr-dropdown ul').css('display', 'block');
      }
    }
  };

  pay = async () => {
    const { carts } = this.props;
    const { card_number, expiration_year, expiration_month, cvv, card_holder, save_card } = this.state;
    if (!card_number || !card_holder || !expiration_year || !expiration_month || !cvv) {
        handleError('Please provide required information!');
        return false;
    } else if (!validateCard(card_number)) {
        handleError('Your card is invalid!');
        return false;
    }

    let user_id = localStorage.userId;
    let total = 0;
    let sold_items = [];
    carts.forEach(listItem => {
      let d = days(listItem.startDate, listItem.endDate);
      total += d * listItem.pricePerDay;
      sold_items.push({...listItem, PickStatus: 0});
    });
    const tax = total * 0.21;
    const fee = total * 0.15;
    const amount = total + tax + fee;
    const checkout_id = this.props.match.params.id;
    const expiration_date = expiration_month + expiration_year;
    let data = { card_number, card_holder, expiration_date, cvv, save_card, user_id,
        total, tax, amount, fee, checkout_id, sold_items};

    data.card_number = card_number.replace(/ /g, '');   // eat spaces
    this.setState({loading: true});
    let response = await payment(data);

    if (response.status === 'payin-success') {
      // take user to other page to confirm payment
      window.location.href = response.trans_data.SecureModeRedirectURL;
    } else {
      if (response.status === 'invalid-account') {
        handleError("Your 'MangoPay Account' is invalid!");
      } else if (response.status === 'no-account') {
        handleError("You must register into 'MangoPay' in OrderHistory to pay!");
      } else if (response.status === 'pay-in-failed') {
        handleError("Your pay was failed unexpectedly! Try again please.");
      } else if (response.status === 'invalid-credit-wallet') {
        handleError("Your 'Client's Wallet' is invalid!");
      } else {
        handleError(response.status);
      }
      this.setState({
          loading: false
      });
    }
  };

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

  renderYears = () => {
    const year = 1*moment(new Date()).format('YY');
    const arr = Array.apply(null, Array(10));
    return arr.map((v, i) => (<MenuItem key={i} value={i+year}>{i+year}</MenuItem>));
  };

  renderMonths = () => {
    let arr = Array.apply(null, Array(12));
    return arr.map((v, i) => {
      let val = i + 1;
      if (val < 10)
        val = '0' + val;
      return <MenuItem key={i} value={val}>{val}</MenuItem>;
    });
  };

  render() {
    const { carts } = this.props;
    if (!carts) {
      return <BarLoader color="#F82462" height="5" />;
    }

    const { card_number, expiration_year, expiration_month, cvv, card_holder, save_card } = this.state;
    let total = 0;
    carts.forEach(listItem => {
      const d = days(listItem.startDate, listItem.endDate);
      total += d * listItem.pricePerDay;
    });
    const tax = total * 0.21;
    const amount = total + tax;
    const cards = getUniqueObjectArray(this.state.cards);

    return (
      <React.Fragment>
      {
        this.state.loading ? <CustomSpinner/> : null
      }
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
                  <Dropdown.Toggle title="Saved Cards" className="select-card-btn" onClick={this.handleClickListButton}/>
                  <Dropdown.Menu>
                    {
                      cards.map((element, index) => (
                        <React.Fragment key={index}>
                          <MenuItem className="dropdown-menu-item" onClick={(e) => this.handleCardChange(e, element)} value={element} key={index}>
                            <img src="/images/cards/master-card.svg" alt=""/>
                            {`  ` + element.card_number.substr(12, 4)}, {element.expiration_date}, {element.card_holder}
                          </MenuItem>
                          {
                            index === cards.length - 1 ? null : <MenuItem divider />
                          }
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
                  <img src="/images/cards/master-card.svg" alt=""/>
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
                        onChange={(event) => {
                            event.preventDefault();
                            this.setState({expiration_month: event.target.value})
                        }}
                        inputProps={{id: 'age-required'}}>
                        {
                          this.renderMonths()
                        }
                      </Select>
                    </FormControl>
                    <FormControl id="select-day" >
                      <Select value={expiration_year}
                        onChange={(event) => {
                          event.preventDefault();
                          this.setState({ expiration_year: event.target.value })
                        }}
                        inputProps={{id: 'age-required'}}>
                        {
                          this.renderYears()
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
                      <img className="svg check_svg" src="/images/Icons/task.svg" alt=""/>
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.app.carts
});

export default connect(mapStateToProps)(Payment);
