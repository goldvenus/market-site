import React, {Component} from 'react';
import {Label} from "reactstrap";

class Step3 extends Component {
  state = {
    isChecked: false
  };
  
  handleSetRead = () => {
    this.setState({isChecked: !this.state.isChecked});
  };
  
  render() {
    const {isChecked} = this.state;
    const {
      onSaveMethod,
      onGoBack,
      swiftCode,
      bankInfo,
      IBAN,
      bankAccountHolderName
    } = this.props;
    
    return (
      <React.Fragment>
        <div className='content-wrapper'>
          <div className='content-info-wrapper'>
            <p>SWIFT CODE</p>
            <p>{swiftCode}</p>
          </div>
          <div className='content-info-wrapper'>
            <p>BANK</p>
            <p>{bankInfo.name}</p>
            <p>{bankInfo.addr}</p>
          </div>
          <div className='content-info-wrapper'>
            <p>IBAN NUMBER</p>
            <p>{IBAN}</p>
          </div>
          <div className='content-info-wrapper'>
            <p>NAME ON ACCOUNT</p>
            <p>{bankAccountHolderName}</p>
          </div>
        </div>
        
        <div>
          <div className="input_svg pretty p-svg p-plain">
            <input  type="checkbox" onChange={this.handleSetRead} checked={isChecked ? 'checked' : ''}/>
            <div className="state">
              <img className="svg check_svg" alt="" src="/images/Icons/task.svg"/>
            </div>
          </div>
          <Label for="save-address" className='checkbox-label'>
            I attest that I am the owner and have<br/>full authorization to this bank account.
          </Label>
        </div>
        
        <button className='theme-btn go-back-btn' onClick={onGoBack}>Go Back</button>
        <button
          className={`theme-btn theme-btn-primary validate-swift-btn ${!isChecked ? 'disabled' : ''}`}
          onClick={() => isChecked && onSaveMethod()}
        >CONFIRM</button>
      </React.Fragment>
    )
  }
}

export default Step3;