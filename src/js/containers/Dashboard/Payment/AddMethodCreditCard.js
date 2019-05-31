import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import {Col} from "reactstrap";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import moment from "moment";
import {MenuItem} from "@trendmicro/react-dropdown";

class AddMethodSwift extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      cvv: '',
      cardNumber: '',
      cardHolder: '',
      expirationMonth: '',
      expirationYear: '',
      modalOpenState: 0,
      type: 1
    };
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
  
  handleSaveMethod = () => {
    let data = this.state;
    data.cardNumber = data.cardNumber.substr(-4, 4);
    data.expirationDate = data.expirationMonth + '' + data.expirationYear;
    delete data.expirationMonth;
    delete data.expirationYear;
    delete data.modalOpenState;
    this.props.onSaveMethod(data);
  };
  
  handleInputChange = (e, val) => {
    e.preventDefault();
    this.setState({[val]: e.target.value});
  };
  
  render() {
    let {
      cardNumber,
      expirationYear,
      expirationMonth,
      cvv,
      cardHolder
    } = this.state;
    
    return (
      <React.Fragment>
        <Col lg={12} md={24}>
          <div className='add-method-credit-card-outer-wrapper'>
            <div className='card card-body card-model-wrapper'>
              <div className="card-text">
                <div className="payment-card">
                  <div className='image-container'>
                    <img src="/images/cards/master-card.svg" alt=""/>
                  </div>
                  <div className="payment-card-number"><span>{cardNumber}</span></div>
                  <div className="flex-row payment-card-other">
                    <span>{expirationMonth}/{expirationYear}</span>
                    <span>{cardHolder}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-row">
              <div className="theme-form-field flex-md-12">
                <TextField
                  label='Card Number'
                  type="text"
                  value={cardNumber}
                  maxLength='20'
                  className='checkout-textfield custom-beautiful-textfield'
                  onChange={e => this.handleInputChange(e, 'cardNumber')}
                />
              </div>
              <div className="theme-form-field flex-md-12">
                <TextField
                  label='Card Holder'
                  type="text"
                  value={cardHolder}
                  maxLength='20'
                  className='checkout-textfield custom-beautiful-textfield'
                  onChange={e => this.handleInputChange(e, 'cardHolder')}
                />
              </div>
            </div>
            <div className="flex-row">
              <div className="theme-form-field flex-md-12 date-select-container">
                <FormControl id="select-month">
                  <Select
                    value={expirationMonth}
                    onChange={(event) => {
                      event.preventDefault();
                      this.setState({expirationMonth: event.target.value})
                    }}
                    inputProps={{id: 'age-required'}}>
                    {this.renderMonths()}
                  </Select>
                </FormControl>
                <FormControl id="select-day" >
                  <Select
                    value={expirationYear}
                    onChange={(event) => {
                      event.preventDefault();
                      this.setState({ expirationYear: event.target.value })
                    }}
                    inputProps={{id: 'age-required'}}>
                    {this.renderYears()}
                  </Select>
                </FormControl>
              </div>
    
              <div className="theme-form-field flex-md-12">
                <TextField
                  label="CVV"
                  className='checkout-textfield custom-beautiful-textfield'
                  value={cvv}
                  onChange={e => this.handleInputChange(e, 'cvv')}
                />
              </div>
            </div>
          </div>
          <button className='add-method-btn theme-btn theme-btn-primary' onClick={this.handleSaveMethod}>Add Card</button>
        </Col>
        <Col lg={12} md={24}>
        
        </Col>
      </React.Fragment>
    );
  }
}

export default AddMethodSwift;