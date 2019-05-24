import React, {Component} from 'react'
import {Col} from "reactstrap";
import TextField from "@material-ui/core/TextField/TextField";

class AddMethodContainer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedMode: 1*this.props.match.params.id
    };
  }
  
  handleSelectMode = (val) => {
    this.setState({selectedMode: val});
  };
  
  handleInputChange = (e, val) => {
    e.preventDefault();
    this.setState({[val]: e.target.value});
  };
  
  render() {
    let {selectedMode} = this.state;
    
    return (
      <div className='container'>
        <h3 className='add-method-heading'>
          <i className='fa fa-arrow-left' onClick={() => this.props.history.push('/dashboard')}/> Add Payout Method
        </h3>
        <div className='wrapper-add-method'>
          <div className='method-select-tab-wrapper'>
            <div className={selectedMode === 1 ? 'tab tab-selected' : 'tab'} onClick={() => this.handleSelectMode(1)}>
              <span>CREDIT CARD</span>
              <span>Minimum - $50.00, Fees - 3.5%</span>
            </div>
            <div className={selectedMode === 2 ? 'tab tab-selected' : 'tab'} onClick={() => this.handleSelectMode(2)}>
              <span>SWIFT</span>
              <span>Minimum - $50.00, Fees - 3.5%</span>
            </div>
          </div>
          <div className='method-select-tab-content'>
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
                onChange={e => this.handleInputChange(e, 'fullBankName')}
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
          <div className='method-select-button-wrapper'>
            <Col>
              <button className='swift-btn theme-btn theme-btn-primary'>Add SWIFT</button>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

export default AddMethodContainer;