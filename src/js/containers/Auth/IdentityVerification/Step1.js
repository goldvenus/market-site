import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";

class Step1 extends Component {
  render() {
    return (
      <div className='verify-inner-wrapper'>
        <h2 className="header">1. Applicant Data</h2>
        <div className="verify-form-wrapper">
          <div className="verify-input-wrapper">
            <div className="theme-form-field auth-input-wrapper">
              <TextField
                id="standard-with-placeholder"
                className="custom-beautiful-textfield"
                label="First Name"
                type="text"
                maxLength='50'
                onChange={(e) => this.props.onInputChange(e, 'firstName')}
              />
            </div>
            <div className="theme-form-field auth-input-wrapper">
              <TextField
                id="standard-with-placeholder"
                className="custom-beautiful-textfield"
                label="Last Name"
                type="text"
                maxLength='50'
                onChange={(e) => this.props.onInputChange(e || '', 'lastName')}
              />
            </div>
            <div className="theme-form-field auth-input-wrapper">
              <TextField
                id="standard-with-placeholder"
                className="custom-beautiful-textfield"
                label="Email"
                type="text"
                maxLength='50'
                onChange={(e) => this.props.onInputChange(e || '', 'email')}
              />
            </div>
            <div className="theme-form-field auth-input-wrapper">
              <TextField
                id="standard-with-placeholder"
                className="custom-beautiful-textfield"
                label="Phone"
                type="text"
                maxLength='50'
                onChange={(e) => this.props.onInputChange(e || '', 'phone')}
              />
            </div>
          </div>
          <div className="theme-form-field">
            <button className='theme-btn theme-btn-primary' onClick={() => this.props.onNextStep(1)}>Next Step</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Step1;