import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Label } from 'reactstrap';
import { days } from '../../core/helper';
import {handleError, handleInfo} from '../../core/actions/common.action'
import {payment, getPaymentCards, createNummusCustomer, checkExistingNummusCustomer, doNummusCharge} from '../../core/actions/payment.action';
import Dropdown, {
    MenuItem,
} from '@trendmicro/react-dropdown';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import '@trendmicro/react-dropdown/dist/react-dropdown.css';
import TextField from '@material-ui/core/TextField';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as postscribe from "postscribe";
import $ from "jquery";
import moment from "moment";
import CustomSpinner from "../../components/common/CustomSpinner";
import { getUniqueObjectArray, validateCard, cc_format, checkDigitSpace } from "../../core/helper/index";
import {getUser} from "../../core/actions/user.action";
import Modal from "react-responsive-modal";
import RentalTermsComponent from "../TermsAndPolicy/RentalTermsComponent";
import {getCarts} from "../../core/actions/cart.action";
import {MANGOPAY_CLIENT_ID} from "../../core/constants"

class Payment extends Component {
  constructor(props) {
    super(props);
  
    if (!this.props.checkoutInfo || !this.props.user)
      window.location.href = "/";
  
    this.state = {
      age: '',
      cvv: '',
      tax: 0,
      fee: 0,
      cards: [],
      total: 0,
      save_card: false,
      card_number: '',
      card_holder: this.props.checkoutInfo.firstName + ' ' + this.props.checkoutInfo.lastName,
      expiration_month: '',
      expiration_year: '',
      modalOpenState: 0,
      isChecked: false,
      loading: false
    };
  
    this.config = {
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': ''
      }
    };
    this.credentials = {
      email: "sindri@ketchupcreative.com",
      hmacChargeKey: "75750b2a-1136-41ef-a323-6a7a022e37a2",
      apiPassword: "eb009d42-9c87-4946-8cb7-891a71fb74e1",
      publicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApQnGp86xQehNCuykMUbqmRHNxzEzG710itUWSiR/1p6c1WAhnNj7b1Eo+e1uuSvYzetTwHXD3nKk0B/BaSp/LnJET3Fj3EocapEmm8qBbGbA4C++u+Ixxg5hSINOnyuViE4bo6II+G+o1XguJuJlS9ccW56ahOXq5nfTc3biYQVL6oI8EL9sRR6x/t/wYBNg46MC8FQjqeARnve2YRF3rRJtiDTLuOtasCot0flpbvZ+qjffNdZPCJBCifcuqTfSYcoeYGvkuh2oFndWb/f+6DN86hpSkwMnUzt8GfvNHmD/qK1++H9MHmfntTMgCX8QFAjZ0zc+DUcOF7pDziiVzQIDAQAB",
      creditCardToken: null
    };
    this.checkoutInfo = {
      ...this.props.checkoutInfo,
      email: this.props.user.email,
      customerId: this.props.user.nummusId || ''
    };
    
    this.getUserPaymentCards();
  }
  
  componentDidMount() {
    postscribe('#nummus-container', '<script language="javascript" src="https://api.nummuspay.com/Content/js/v1/nummuspay.js"></script>');
  }
  
  /**********************\/
  \/ ***  nummus pay *** \/
  \/**********************/
  createCustomer = async () => {
    let user = this.props.user;
    let checkoutInfo = this.checkoutInfo;
    let email = checkoutInfo.email;
    let firstName = checkoutInfo.firstName;
    let lastName = checkoutInfo.lastName;
    let zip = checkoutInfo.zip;
    let billingAddress = checkoutInfo.addr;
    let city = checkoutInfo.city;
    let company = checkoutInfo.company;
    
    let data = {
      "Email": email,
      "ProjectSubdomain": "https://creativemarket.nummuspay.com",
      "FirstName": firstName,
      "LastName": lastName,
      "Company": company,
      "BillingAddress1": billingAddress,
      "BillingZip": zip,
      "BillingCountry": "US",
      "BillingState": "TX",
      "BillingCity": city,
    };
    
    let res = await createNummusCustomer({customerInfo: data, signUpInfo: {email: user.email, userType: user.userType}});
    return res;
  };
  
  chargeCustomer = async () => {
    let checkoutInfo = this.checkoutInfo;
    let cardToken = this.credentials.creditCardToken;
    let amount = checkoutInfo.amount;
    let currency = 'USD';
    let carts = this.props.carts;
    let productInfo = carts.map((item) => ({
      productName: item.productName,
      description: item.description
    }));
    
    let res = await doNummusCharge({cardToken, amount, currency, productInfo});
    return res;
  };
  
  createCardToken = async () => {
    let checkoutInfo = this.checkoutInfo;
    let { expiration_month, expiration_year, cvv, card_holder } = this.state;
    let model = {
      email: checkoutInfo.email,
      firstName: card_holder.split(' ')[0],
      lastName: card_holder.split(' ')[1],
      billingAddress: checkoutInfo.addr,
      zip: checkoutInfo.zip,
      number: checkoutInfo.cardNumber,
      month: expiration_month.toString(),
      year: expiration_year.toString(),
      cvv: cvv
    };

    try {
      // get credit card token, register payment method into account
      window.Nummuspay.SetPublicKey(this.credentials.publicKey);
      let res = await window.Nummuspay.CreateToken(model);
  
      if (res) {
        this.credentials.creditCardToken = res;
      } else {
        handleError("Please provide correct information");
        res = false;
      }
      return res;
    } catch (error) {
      if (error.responseJSON && error.responseJSON.Message) {
        console.log(error.responseJSON.Message);
      } else {
        console.log(error);
        error.response && error.response.data && handleError(error.response.data.message);
      }
    }
  };
  
  handleCharge = async () => {
    let checkoutInfo = this.checkoutInfo;
    let customerId = checkoutInfo.customerId;
    console.log("customer ID: ", customerId);
    
    // 1. create nummus account if not exists, or update existing customer info if needed
    if (customerId) {
      // checks if it really exists in nummuspay, if not, create one
      let customerInfo = await checkExistingNummusCustomer(customerId);
      if (!customerInfo) {
        console.log(`customer ${customerId} doesn't exist, will create new one`);
        customerId = null;
      } else {
        console.log(`customer ${customerId} exists`);
      }
    }
    if (!customerId) {
      let createdInfo = await this.createCustomer();
      // console.log(`created new customer ${createdInfo}`);
      if (createdInfo) {
        customerId = createdInfo;
      } else {
        // an account with your email already exists, error, return
        return;
      }
    }
    
    // 2. create card token - register customer's sensitive information
    this.checkoutInfo.customerId = customerId;
    let cardToken = await this.createCardToken();
    
    if (cardToken) {
      handleInfo("Billing information was sent successfully");
      let res = await this.chargeCustomer();
      console.log("customer charge info: ", res);
      
      if (res) {
        return res;
      } else {
        return false;
      }
    } else {
      // handleError("Credit card token was not created");
    }
    return false;
  };
  
  payNummus = async () => {
    let { carts } = this.props;
    let { card_number, expiration_year, expiration_month, cvv, card_holder, save_card, isChecked } = this.state;
    if (!card_number || !card_holder || !expiration_year || !expiration_month || !cvv) {
      handleError('Please provide required information!');
      return false;
    } else if (!validateCard(card_number)) {
      handleError('Your card is invalid!');
      return false;
    } else if (card_holder.split(' ').length < 2) {
      handleError('Please provide correct cardholder name');
      return false;
    } else if (!isChecked) {
      handleError("Do you agree with Reltal Terms and Conditions?");
      return false;
    }
    
    this.setState({loading: true});
    
    let user_id = this.props.user.userid;
    let total = 0;
    let sold_items = [];
    carts.forEach(listItem => {
      let d = days(listItem.startDate, listItem.endDate);
      total += d * listItem.pricePerDay;
      sold_items.push({...listItem, PickStatus: 0, ReturnStatus: 0});
    });
    let tax = total * 0;
    let fee = total * 0.06;
    let amount = total + tax + fee;
    let checkout_id = this.props.match.params.id;
    let expiration_date = expiration_month.toString() + expiration_year.toString();
    let nummus_id = this.props.user.nummusId;
    let data = {card_number, card_holder, expiration_date, cvv, save_card, user_id,
      total, tax, amount, fee, checkout_id, sold_items, nummus_id};
    
    data.card_number = card_number.replace(/ /g, '');   // eat spaces
    this.checkoutInfo.cardNumber = data.card_number;
    this.checkoutInfo.amount = amount;
    data.card_number = card_number.substr(-4, 4);
    data.project_name = this.checkoutInfo.projectName;
  
    let payResult = await this.handleCharge();
    console.log(payResult);
    if (payResult) {
      payResult['Products']['$values'] && console.log(payResult['Products']['$values']);
      payResult['Products']['$values'] && payResult['Products']['$values'][0] && console.log(payResult['Products']['$values'][0]);
      let response = await payment({...data, chargeInfo: payResult['Products']});
      // update user's cart info
      await getCarts();
      this.props.history.push(`/payment/${checkout_id}/${response}`);
    }

    this.setState({
      loading: false
    });
  };
  
  /**********************\/
  \/ ***  mango pay  *** \/
  \/**********************/
  payMango = async () => {
    let { carts } = this.props;
    let { card_number, expiration_year, expiration_month, cvv, card_holder, save_card, isChecked } = this.state;
    if (!card_number || !card_holder || !expiration_year || !expiration_month || !cvv) {
      handleError('Please provide required information!');
      return false;
    } else if (!validateCard(card_number)) {
      handleError('Your card is invalid!');
      return false;
    } else if (card_holder.split(' ').length < 2) {
      handleError('Please provide correct cardholder name');
      return false;
    } else if (!isChecked) {
      handleError("Do you agree with Reltal Terms and Conditions?");
      return false;
    }
    
    this.setState({loading: true});
    
    let {userid, mangoAccountId, mangoWalletId} = this.props.user;
    let total = 0;
    let sold_items = [];
    carts.forEach(listItem => {
      let d = days(listItem.startDate, listItem.endDate);
      total += d * listItem.pricePerDay;
      sold_items.push({...listItem, PickStatus: 0, ReturnStatus: 0});
    });
    let tax = total * 0;
    let fee = total * 0.06;
    let amount = total + tax + fee;
    let checkout_id = this.props.match.params.id;
    let expiration_date = expiration_month.toString() + expiration_year.toString();
    let nummus_id = this.props.user.nummusId;
    let data = {card_number, card_holder, expiration_date, cvv, save_card, userid,
      total, tax, amount, fee, checkout_id, sold_items, nummus_id};
    
    data.card_number = card_number.replace(/ /g, '');   // eat spaces
    this.checkoutInfo.amount = amount;
    data.card_number = card_number.substr(-4, 4);
    data.project_name = this.checkoutInfo.projectName;
    data.mangoWalletId = mangoWalletId;
    data.mangoAccountId = mangoAccountId;
    
    // 1. Create Card Registration Object
    let defaultCurrency = 'USD';
    let cardRegistrationData = await payment({mangoAccountId, defaultCurrency, step: 1});
    if (!cardRegistrationData) {
      this.setState({loading: false});
      return;
    }
    
    // 2. Send card details to Tokenization Server
    window.mangoPay.cardRegistration.baseURL = "https://api.sandbox.mangopay.com";
    window.mangoPay.cardRegistration.clientId = MANGOPAY_CLIENT_ID;
    // Initialize with card register data prepared on the server
    window.mangoPay.cardRegistration.init({
      cardRegistrationURL: cardRegistrationData.CardRegistrationURL,
      preregistrationData: cardRegistrationData.PreregistrationData,
      accessKey: cardRegistrationData.AccessKey,
      Id: cardRegistrationData.Id
    });
    // Card data collected from the user
    let cardData = {
      cardNumber: card_number.replace(/ /g, ''),
      cardExpirationDate: expiration_date,
      cardCvx: cvv,
      cardType: cardRegistrationData.CardType
    };
    // Register card
    let registrationData = await new Promise((resolve, reject) => {
      window.mangoPay.cardRegistration.registerCard(
        cardData,
        function(res) {
          resolve(res);
        },
        function(res) {
          handleError(res.ResultMessage);
          resolve(false);
        }
      );
    });
    if (!registrationData) {
      this.setState({loading: false});
      return;
    }
    
    // 3. Complete card registration, do pay-in direct card
    let payInResult = await payment({registrationData, data, checkoutInfo: this.checkoutInfo, step: 2});
    if (payInResult) {
      window.location.href = payInResult.redirectUrl;
    } else {
      this.setState({loading: false});
    }
  };
  
  getUserPaymentCards = async () => {
    let cards = await getPaymentCards();
    let cardsTemp = [];
    cards.forEach((item) => {
      if (item.type === 1) {
        cardsTemp.push({
          'card_number': item.cardNumber,
          'card_holder': item.cardHolder,
          'expiration_date': item.expirationDate,
          'cvv': item.cvv
        });
      }
    });
    this.setState({cards: cardsTemp});
    await getUser();
  };

  handleCardChange = (e, element) => {
    e.preventDefault();
    $(".select-card-btn").trigger('click');
    const month = element.expiration_date.toString().substr(0, 2);
    const year = element.expiration_date.toString().substr(2, 2);
    this.setState({
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
        handleError("Please input valid card number");
        value = this.state.card_number;
      }
    }
    this.setState({[type]: value});
  };
  
  handleOpenModal = (val) => {
    this.setState({modalOpenState: val});
  };
  
  handleCloseModal = () => {
    this.setState({modalOpenState: 0});
  };
  
  handleSetRead = () => {
    this.setState({isChecked: !this.state.isChecked});
  };

  renderCheckoutItems() {
    const { carts } = this.props;
    return (
      <div className="checkout-items">
        {
          carts.map((listItem, index) => {
            const d = days(listItem.startDate, listItem.endDate);
            return <div key={`cart-item-${index}`} className="checkout-item">
              <div>{listItem.productName}</div>
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
    let { carts, isLoading } = this.props;
    let {
      card_number,
      expiration_year,
      expiration_month,
      cvv,
      card_holder,
      save_card,
      modalOpenState,
      isChecked
    } = this.state;
    let total = 0;
    carts.forEach(listItem => {
      let d = days(listItem.startDate, listItem.endDate);
      total += d * listItem.pricePerDay;
    });
    let tax = total * 0;
    let fee = total * 0.06;
    let amount = total + tax + fee;
    let cards = getUniqueObjectArray(this.state.cards);

    return (
      <React.Fragment>
        {isLoading || this.state.loading ? <CustomSpinner/> : null}
        <div className="payment checkout">
          <div className="payment-head">
            <div className='container'>
              {/*<Breadcrumb className= "card_content_path">*/}
                {/*<BreadCrumbActive name="Home"/>*/}
                {/*<span className="space_slash_span">/</span>*/}
                {/*<BreadcrumbItem active>Payment</BreadcrumbItem>*/}
              {/*</Breadcrumb>*/}
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
                  <Dropdown className='d-block'>
                    <Dropdown.Toggle title="Saved Cards" className="select-card-btn" onClick={this.handleClickListButton}/>
                    <Dropdown.Menu>
                      {cards.map((element, index) =>
                        <React.Fragment key={index}>
                          <MenuItem className="dropdown-menu-item" onClick={(e) => this.handleCardChange(e, element)} value={element} key={index}>
                            <img src="/images/cards/master-card.svg" alt=""/>
                            {`  **** ` + element.card_number}, {element.expiration_date}, {element.card_holder}
                          </MenuItem>
                          {index === cards.length - 1 ? null : <MenuItem divider />}
                        </React.Fragment>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
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
                      <TextField
                        placeholder='Card Number'
                        type="text"
                        value={card_number}
                        maxLength='20'
                        className='checkout-textfield custom-beautiful-textfield'
                        onChange={e => this.handleInputChange(e, 'card_number')}
                      />
                    </div>
                    <div className="theme-form-field flex-md-12">
                      <TextField
                        placeholder='Card Holder'
                        type="text"
                        value={card_holder}
                        maxLength='20'
                        className='checkout-textfield custom-beautiful-textfield'
                        onChange={e => this.handleInputChange(e, 'card_holder')}
                      />
                    </div>
                  </div>
                  <div className="flex-row">
                    <div className="theme-form-field flex-md-12 date-select-container">
                      <FormControl id="select-month">
                        <Select
                          value={expiration_month}
                          onChange={(event) => {
                              event.preventDefault();
                              this.setState({expiration_month: event.target.value})
                            }}
                          inputProps={{id: 'age-required'}}>
                          {this.renderMonths()}
                        </Select>
                      </FormControl>
                      <FormControl id="select-day" >
                        <Select
                          value={expiration_year}
                          onChange={(event) => {
                              event.preventDefault();
                              this.setState({ expiration_year: event.target.value })
                            }}
                          inputProps={{id: 'age-required'}}>
                          {this.renderYears()}
                        </Select>
                      </FormControl>
                    </div>
  
                    <div className="theme-form-field flex-md-12">
                      <TextField
                        placeholder="CVV"
                        className='checkout-textfield
                        custom-beautiful-textfield'
                        value={cvv}
                        onChange={e => this.handleInputChange(e, 'cvv')}
                      />
                    </div>
                  </div>
                  <div className="theme-form-field checkbox-container">
                    <div>
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
              </div>
  
              <div className="order-info">
                <div className="order-info-header">
                    <div className="text-gray">ORDER INFO<span>RMATION</span></div>
                    <button className="theme-btn theme-btn-filled-white theme-btn-link btn-edit-order">
                      <Link to="/cart">Edit Order</Link>
                    </button>
                </div>
                <div className='order-info-body'>
                  {this.renderCheckoutItems()}

                  <div className="checkout-total">
                    <div><span className="text-gray">Total </span> <b>${parseFloat(total).toFixed(2)}</b></div>
                    {/*<div><span className="text-gray">Tax (21%) </span> <b>${parseFloat(tax).toFixed(2)}</b></div>*/}
                    <div><span className="text-gray">Fee (6%) </span> <b>${parseFloat(fee).toFixed(2)}</b></div>
                  </div>

                  <div className="checkout-amount">
                    <div><span className="text-gray">Amount </span> <b className='checkout-total-price'>${parseFloat(amount).toFixed(2)}</b></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="container flex-row">
              <div className="input_svg pretty p-svg p-plain">
                <input  type="checkbox" onChange={this.handleSetRead} checked={isChecked ? 'checked' : ''}/>
                <div className="state">
                  <img className="svg check_svg" alt="" src="/images/Icons/task.svg"/>
                </div>
              </div>
              <Label className='checkbox-label-agree'>
                Yes, I've read, understood and agree<br/>to the
                <span className='term-view-btn' onClick={() => this.handleOpenModal(2)}> Rental Terms & Conditions</span>
              </Label>
            </div>
            
            <div className="container flex-row">
              <div className="flex-row bottom-buttons">
                <button className="theme-btn theme-btn-secondery btn-edit-order-bottom">
                  <Link to="/checkout">Back To Checkout</Link>
                </button>
                <button className="theme-btn theme-btn-primary btn-payment" onClick={this.payMango} disabled={!isChecked ? 'disabled' : ''}>
                  Pay (${parseFloat(amount).toFixed(2)})
                </button>
              </div>
            </div>
            
            {modalOpenState ?
              <Modal open={true} onClose={this.handleCloseModal} center classNames={{modal: "confirm-modal privacy-modal"}}>
                <div className='confirm-modal-header'>
                  <span>Terms of Service</span>
                </div>
                <div className='confirm-modal-body'>
                  <RentalTermsComponent/>
                </div>
              </Modal> : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  carts: state.cart.carts,
  isLoading: state.payment.isLoading,
  checkoutInfo: state.checkout.checkoutInfo
});

export default connect(mapStateToProps)(Payment);
