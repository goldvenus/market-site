import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import {Col} from "reactstrap";

class AddMethodSwift extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      firstName: '',
      lastName: '',
      billingAddress1: '',
      billingAddress2: '',
      billingAddress3: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      bankAccountHolderName: '',
      IBAN: '',
      swiftCode: '',
      bankFullName: '',
      bankBranchCity: '',
      bankBranchCountry: '',
      intermediaryBankCode: '',
      intermediaryBankName: '',
      intermediaryBankCity: '',
      intermediaryBankCountry: ''
    };
  }
  
  handleSaveMethod = () => {
    this.props.onSaveMethod(this.state);
  };
  
  handleInputChange = (e, val) => {
    e.preventDefault();
    this.setState({[val]: e.target.value});
  };
  
  render() {
    return (
      <React.Fragment>
        <Col lg={12} md={24}>
        <TextField
          className='custom-beautiful-textfield'
          label='First Name'
          type="text"
          onChange={e => this.handleInputChange(e, 'firstName')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='Last Name'
          type="text"
          onChange={e => this.handleInputChange(e, 'lastName')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='Billing Address Line 1 *'
          type="text"
          onChange={e => this.handleInputChange(e, 'billingAddress1')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='Billing Address Line 2'
          type="text"
          onChange={e => this.handleInputChange(e, 'billingAddress2')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='Billing Address Line 3'
          type="text"
          onChange={e => this.handleInputChange(e, 'billingAddress3')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='City'
          type="text"
          onChange={e => this.handleInputChange(e, 'city')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='State'
          type="text"
          onChange={e => this.handleInputChange(e, 'state')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='Postcode*'
          type="text"
          onChange={e => this.handleInputChange(e, 'postalCode')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='Country'
          type="text"
          onChange={e => this.handleInputChange(e, 'country')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label="Postcode*Bank Account Holder's Name *"
          type="text"
          onChange={e => this.handleInputChange(e, 'bankAccountHolderName')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='Bank Account Number/IBAN *'
          type="text"
          onChange={e => this.handleInputChange(e, 'IBAN')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='SWIFT Code *'
          type="text"
          onChange={e => this.handleInputChange(e, 'swiftCode')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='Bank Name in Full *'
          type="text"
          onChange={e => this.handleInputChange(e, 'bankFullName')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='Bank Branch City *'
          type="text"
          onChange={e => this.handleInputChange(e, 'bankBranchCity')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='Bank Branch Country *'
          type="text"
          onChange={e => this.handleInputChange(e, 'bankBranchCountry')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='Intermediary Bank - Bank Code'
          type="text"
          onChange={e => this.handleInputChange(e, 'intermediaryBankCode')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='Intermediary Bank - Name'
          type="text"
          onChange={e => this.handleInputChange(e, 'intermediaryBankName')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='Intermediary Bank - City'
          type="text"
          onChange={e => this.handleInputChange(e, 'intermediaryBankCity')}
        />
        <TextField
          className='custom-beautiful-textfield'
          label='Intermediary Bank - Country'
          type="text"
          onChange={e => this.handleInputChange(e, 'intermediaryBankCountry')}
        />
        <button className='add-method-btn theme-btn theme-btn-primary' onClick={this.handleSaveMethod}>Add Card</button>
      </Col>
        <Col lg={12} md={24}>
        
        </Col>
      </React.Fragment>
    );
  }
}

export default AddMethodSwift;