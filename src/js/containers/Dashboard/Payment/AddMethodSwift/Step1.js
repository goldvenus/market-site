import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import {handleError} from "../../../../core/actions/common.action";
import {extractBIC} from 'ibantools';
// require(["ibantools"], function(ibantools) {
//   console.log(ibantools.isValidIBAN('NL91 ABNA 0517 1643 00'));
//   console.log(ibantools.isValidBIC('ABNANL2A'));
// });

class Step1 extends Component {
  state = {
    swiftCode: this.props.swiftCode,
    isValidated: this.props.isValidated,
    bankInfo: this.props.bankInfo
  };
  
  handleChange = (e, val) => {
    this.setState({[val]: e.target.value});
  };
  
  handleGoNext = () => {
    this.props.onGoNext(this.state);
  };
  
  handleValidate = () => {
    const {swiftCode} = this.state;
    if (swiftCode === '') {
      handleError('Please input swift code');
      return;
    }
  
    let info = extractBIC(swiftCode);
    if (!info.valid) {
      handleError('Swift code is invalid!');
      return;
    }
    this.setState({isValidated: true, bankInfo: info});
  };
  
  render() {
    const {swiftCode, isValidated, bankInfo} = this.state;
    
    return (
      <React.Fragment>
        <div className='content-wrapper'>
          <TextField
            className='custom-beautiful-textfield'
            label='SWIFT CODE'
            type="text"
            placeholder='Add 8 or 11 character code'
            value={swiftCode}
            onChange={(e) => this.handleChange(e, 'swiftCode')}
          />
          {isValidated ?
            <div className='bank-info-wrapper'>
              <p>BANK</p>
              <p className='bank-name'>{bankInfo.bankCode}</p>
              <p className='bank-info'>{bankInfo.countryName}</p>
            </div> : ''
          }
        </div>
        {!isValidated ?
          <button
            className={`theme-btn theme-btn-primary validate-swift-btn ${swiftCode === '' ? 'disabled' : ''}`}
            onClick={this.handleValidate}
          >VALIDATE</button> :
          <React.Fragment>
            <button className='theme-btn theme-btn-primary' onClick={this.handleGoNext}>NEXT</button>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

export default Step1;