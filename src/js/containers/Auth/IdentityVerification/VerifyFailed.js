import React, {Component} from 'react';

class VerifyFailed extends Component {
  render() {
    return (
      <div className='verify-inner-wrapper'>
        <h2 className="header">Failed verification</h2>
        <div className="verify-form-wrapper">
          <div className="theme-form-field verify-main-wrapper">
            <p>Unfortunately, your documents have issues. Please correct them to complete verification process.</p>
          </div>
          <div className="theme-form-field verify-main-wrapper">
            <div className='upload-photo-container upload-again-container'>
              <i className="fas fa-times-circle" aria-hidden="true"/>
              <h3>Proof of identity</h3>
              <p>The uploaded photo does not meet our quality requirements. Please upload a new photo.</p>
              <button className='theme-btn btn-upload-new'>Upload New</button>
            </div>
          </div>
          <div className="theme-form-field verify-main-wrapper">
          
          </div>
        </div>
      </div>
    )
  }
}

export default VerifyFailed;