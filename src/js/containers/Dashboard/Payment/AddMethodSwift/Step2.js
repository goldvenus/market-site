import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Select from 'react-select';
import countryList from 'react-select-country-list';

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.options = countryList().getData();
    let {
      IBAN,
      bankAccountHolderName,
      billingAddress1,
      city,
      state,
      country,
      phoneNumber
    } = this.props;
    
    this.state = {
      IBAN,
      bankAccountHolderName,
      billingAddress1,
      city,
      state,
      country,
      phoneNumber
    };
  }
  
  handleInputChange = (e, val) => {
    this.setState({[val]: e.target.value});
  };
  
  handleGoNext = () => {
    this.props.onGoNext(this.state);
  };
  
  render() {
    const {onGoBack} = this.props;
    let {
      IBAN,
      bankAccountHolderName,
      billingAddress1,
      city,
      state,
      country,
      phoneNumber
    } = this.state;
    
    return (
      <React.Fragment>
        <div className='content-wrapper'>
          <TextField
            className='custom-beautiful-textfield'
            label='IBAN number'
            placeholder='Full number without spacing'
            type="text"
            value={IBAN}
            onChange={e => this.handleInputChange(e, 'IBAN')}
          />
          <TextField
            className='custom-beautiful-textfield'
            label="NAME ON ACCOUNT"
            placeholder='Person or company legal name'
            type="text"
            value={bankAccountHolderName}
            onChange={e => this.handleInputChange(e, 'bankAccountHolderName')}
          />
          <TextField
            className='custom-beautiful-textfield'
            label='ADDRESS'
            placeholder='Add 8 or 11 character code'
            type="text"
            value={billingAddress1}
            onChange={e => this.handleInputChange(e, 'billingAddress1')}
          />
          <TextField
            className='custom-beautiful-textfield'
            label='City'
            type="text"
            value={city}
            onChange={e => this.handleInputChange(e, 'city')}
          />
          <TextField
            className='custom-beautiful-textfield'
            label='State'
            placeholder='City, state'
            type="text"
            value={state}
            onChange={e => this.handleInputChange(e, 'state')}
          />
          {/*<TextField*/}
            {/*className='custom-beautiful-textfield'*/}
            {/*label='COUNTRY'*/}
            {/*placeholder='Type to search'*/}
            {/*type="text"*/}
            {/*value={country}*/}
            {/*onChange={e => this.handleInputChange(e, 'country')}*/}
          {/*/>*/}
          <Select
            options={this.options}
            value={country}
            onChange={(e) => this.handleInputChange({target: {value: e}}, 'country')}
            className='myclass'
          />
          <TextField
            className='custom-beautiful-textfield'
            label='PHONE NUMBER'
            placeholder='+1 (123) 000-0000'
            type="text"
            value={phoneNumber}
            onChange={e => this.handleInputChange(e, 'phoneNumber')}
          />
        </div>
        <button className='theme-btn go-back-btn' onClick={onGoBack}>Go Back</button>
        <button className='theme-btn theme-btn-primary' onClick={this.handleGoNext}>NEXT</button>
      </React.Fragment>
    )
  }
}

export default Step2;