import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import {Col, Label} from "reactstrap";
import {handleError} from "../../../core/actions/common.action";
import Modal from "react-responsive-modal";
import RentalTermsComponent from "../../TermsAndPolicy/RentalTermsComponent";

class AddMethodSwift extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      firstName: '',
      lastName: '',
      birthday: '',
      billingAddress1: '',
      billingAddress2: '',
      billingAddress3: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      idNumber: '',
      bankAccountHolderName: '',
      IBAN: '',
      routingNumber: '',
      swiftCode: '',
      bankFullName: '',
      bankBranchCity: '',
      bankBranchCountry: '',
      intermediaryBankCode: '',
      intermediaryBankName: '',
      intermediaryBankCity: '',
      intermediaryBankCountry: '',
      type: 2,
      isChecked: false,
      modalOpenState: 0
    };
  }
  
  doValidation = () => {
    let {
      firstName, lastName, birthday,
      country,
      billingAddress1,
      postalCode,
      bankAccountHolderName,
      IBAN,
      swiftCode,
      bankBranchCity,
      bankBranchCountry,
      idNumber,
      routingNumber
    } = this.state;
    
    if (billingAddress1 === '' || birthday === '' || postalCode === '' || bankAccountHolderName === '' || IBAN === '' ||
      swiftCode === '' || bankBranchCity === '' || bankBranchCountry === '' || idNumber === '' || routingNumber === '' ||
      firstName === '' || lastName === '' || country === '') {
      return false;
    }
    if (country.length < 2 || country.length > 2 || bankBranchCountry.length < 2 || bankBranchCountry.length > 2) {
      handleError("Please input right country code!");
      return false;
    }
    
    return true;
  };
  
  handleSaveMethod = () => {
    if (this.doValidation()) {
      let data = this.state;
      Object.keys(data).forEach(key => {
        if (data[key] === '')
          delete data[key];
      });

      this.props.onSaveMethod(data);
    } else {
      handleError('Please provide required information');
    }
  };
  
  handleInputChange = (e, val) => {
    e.preventDefault();
    this.setState({[val]: e.target.value});
  };
  
  handleOpenModal = () => {
    this.setState({modalOpenState: 1});
  };
  
  handleCloseModal = () => {
    this.setState({modalOpenState: 0});
  };
  
  handleSetRead = () => {
    this.setState({isChecked: !this.state.isChecked});
  };
  
  render() {
    const {isChecked, modalOpenState} = this.state;
    
    return (
      <React.Fragment>
        <Col lg={12} md={24}>
          <TextField
            className='custom-beautiful-textfield'
            label='First Name *'
            type="text"
            onChange={e => this.handleInputChange(e, 'firstName')}
          />
          <TextField
            className='custom-beautiful-textfield'
            label='Last Name *'
            type="text"
            onChange={e => this.handleInputChange(e, 'lastName')}
          />
          <TextField
            className='custom-beautiful-textfield'
            label='Birthday *'
            type="text"
            onChange={e => this.handleInputChange(e, 'birthday')}
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
            label='City *'
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
            label='Postcode *'
            type="text"
            onChange={e => this.handleInputChange(e, 'postalCode')}
          />
          <TextField
            className='custom-beautiful-textfield'
            label='Country *'
            type="text"
            onChange={e => this.handleInputChange(e, 'country')}
          />
          <TextField
            className='custom-beautiful-textfield'
            label='Identification Number *'
            type="text"
            onChange={e => this.handleInputChange(e, 'idNumber')}
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
            label='Bank Routing Number *'
            type="text"
            onChange={e => this.handleInputChange(e, 'routingNumber')}
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
          
          <div>
            <div className="input_svg pretty p-svg p-plain">
              <input  type="checkbox" onChange={this.handleSetRead} checked={isChecked ? 'checked' : ''}/>
              <div className="state">
                <img className="svg check_svg" alt="" src="/images/Icons/task.svg"/>
              </div>
            </div>
            <Label for="save-address" className='checkbox-label'>
              Yes, I agree to the<br/>
              <span className='term-view-btn' onClick={() => this.handleOpenModal(1)}>Rental Terms & Conditions</span>
            </Label>
          </div>
          
          <button
            className='add-method-btn theme-btn theme-btn-primary'
            onClick={this.handleSaveMethod}
            disabled={!isChecked ? 'disabled' : ''}
          >Add SWIFT</button>
        </Col>
        <Col lg={12} md={24}>
          <div className='swift-container'>
            <img src='/images/swift.svg' alt=''/>
            <div className='swift-info-wrapper'>
              <p>SWIFT (International Transfer) get paid directly into your bank </p>
              <p>Connected with over 9000 banking organisations, security institutions and customers in more than 200 countries</p>
            </div>
            <span className='view-more-btn'>More about SWIFT</span>
          </div>
        </Col>
  
        {modalOpenState === 1 ?
        <Modal open={true} onClose={this.handleCloseModal} center classNames={{modal: "confirm-modal privacy-modal"}}>
          <div className='confirm-modal-header'>
            <span>Rental Terms and Conditions</span>
          </div>
          <div className='confirm-modal-body'>
            <RentalTermsComponent/>
          </div>
        </Modal> : null}
      </React.Fragment>
    );
  }
}

export default AddMethodSwift;