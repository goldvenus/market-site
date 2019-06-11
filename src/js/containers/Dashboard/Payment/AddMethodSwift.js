import React, {Component} from 'react';
import {Col} from "reactstrap";
import {handleError} from "../../../core/actions/common.action";
// import Modal from "react-responsive-modal";
import Step1 from "./AddMethodSwift/Step1";
import Step2 from "./AddMethodSwift/Step2";
import Step3 from "./AddMethodSwift/Step3";
import AddSwiftStepBar from "./AddMethodSwift/AddSwiftStepBar";

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
      phoneNumber: '',
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
      // modalOpenState: 0,
      step: 0
    };
  }
  
  doValidation = () => {
    let {
      country,
      billingAddress1,
      bankAccountHolderName,
      IBAN,
      swiftCode,
      city
      // bankBranchCity,
      // bankBranchCountry,
      // idNumber,
      // routingNumber
    } = this.state;
    
    if (!country || !billingAddress1 || !city || !IBAN || !swiftCode || !bankAccountHolderName) {
      return false;
    }
    
    return true;
  };
  
  handleSaveMethod = () => {
    if (this.doValidation()) {
      let data = Object.assign({}, this.state);
      Object.keys(data).forEach(key => {
        if (data[key] === '')
          delete data[key];
      });
      data.country = data.country.value;
      console.log(data.country);
      console.log(this.state.country);
      this.props.onSaveMethod(data);
    } else {
      handleError('Please provide required information');
    }
  };
  
  // handleOpenModal = () => {
  //   this.setState({modalOpenState: 1});
  // };
  
  // handleCloseModal = () => {
  //   this.setState({modalOpenState: 0});
  // };
  
  handleGoNext = (data) => {
    let {step} = this.state;
    step ++;
    this.setState({step, ...data});
  };
  
  handleGoBack = () => {
    let {step} = this.state;
    step --;
    this.setState({step});
  };
  
  render() {
    const {step} = this.state;
    
    return (
      <React.Fragment>
        <div className='method-select-tab-wrapper'>
          <div className='tab tab-selected'>
            <span>BANK WIRE TRANSFER (SWIFT)</span>
            <span>Minimum - $50.00, Fees - 3.5%</span>
          </div>
        </div>
        <div className='row'>
          <Col lg={12} md={24} className='left-wrapper'>
            <div className='add-swift-progress'>
              <AddSwiftStepBar curStep={step}/>
            </div>
            <div className='add-swift-container'>
              {step === 0 ? <Step1 onGoNext={this.handleGoNext} onGoBack={this.handleGoBack} {...this.state}/> :
              step === 1 ? <Step2 onGoNext={this.handleGoNext} onGoBack={this.handleGoBack} {...this.state}/> :
              step === 2 ? <Step3 onGoNext={this.handleGoNext} onGoBack={this.handleGoBack} {...this.state} onSaveMethod={this.handleSaveMethod}/> : null}
            </div>
            {/*<TextField*/}
              {/*className='custom-beautiful-textfield'*/}
              {/*label='First Name *'*/}
              {/*type="text"*/}
              {/*onChange={e => this.handleInputChange(e, 'firstName')}*/}
            {/*/>*/}
            {/*<TextField*/}
              {/*className='custom-beautiful-textfield'*/}
              {/*label='Last Name *'*/}
              {/*type="text"*/}
              {/*onChange={e => this.handleInputChange(e, 'lastName')}*/}
            {/*/>*/}
            {/*<TextField*/}
              {/*className='custom-beautiful-textfield'*/}
              {/*label='Birthday *'*/}
              {/*type="text"*/}
              {/*onChange={e => this.handleInputChange(e, 'birthday')}*/}
            {/*/>*/}
            {/*<TextField*/}
              {/*className='custom-beautiful-textfield'*/}
              {/*label='Postcode *'*/}
              {/*type="text"*/}
              {/*onChange={e => this.handleInputChange(e, 'postalCode')}*/}
            {/*/>*/}
            {/*<TextField*/}
              {/*className='custom-beautiful-textfield'*/}
              {/*label='Country *'*/}
              {/*type="text"*/}
              {/*onChange={e => this.handleInputChange(e, 'country')}*/}
            {/*/>*/}
            {/*<TextField*/}
              {/*className='custom-beautiful-textfield'*/}
              {/*label='Identification Number *'*/}
              {/*type="text"*/}
              {/*onChange={e => this.handleInputChange(e, 'idNumber')}*/}
            {/*/>*/}
            {/*<TextField*/}
              {/*className='custom-beautiful-textfield'*/}
              {/*label='Bank Routing Number *'*/}
              {/*type="text"*/}
              {/*onChange={e => this.handleInputChange(e, 'routingNumber')}*/}
            {/*/>*/}
            {/*<TextField*/}
              {/*className='custom-beautiful-textfield'*/}
              {/*label='Bank Name in Full *'*/}
              {/*type="text"*/}
              {/*onChange={e => this.handleInputChange(e, 'bankFullName')}*/}
            {/*/>*/}
            {/*<TextField*/}
              {/*className='custom-beautiful-textfield'*/}
              {/*label='Bank Branch City *'*/}
              {/*type="text"*/}
              {/*onChange={e => this.handleInputChange(e, 'bankBranchCity')}*/}
            {/*/>*/}
            {/*<TextField*/}
              {/*className='custom-beautiful-textfield'*/}
              {/*label='Bank Branch Country *'*/}
              {/*type="text"*/}
              {/*onChange={e => this.handleInputChange(e, 'bankBranchCountry')}*/}
            {/*/>*/}
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
        </div>
  
        {/*{modalOpenState === 1 ?*/}
        {/*<Modal open={true} onClose={this.handleCloseModal} center classNames={{modal: "confirm-modal privacy-modal"}}>*/}
          {/*<div className='confirm-modal-header'>*/}
            {/*<span>Rental Terms and Conditions</span>*/}
          {/*</div>*/}
          {/*<div className='confirm-modal-body'>*/}
            {/*<RentalTermsComponent/>*/}
          {/*</div>*/}
        {/*</Modal> : null}*/}
      </React.Fragment>
    );
  }
}

export default AddMethodSwift;