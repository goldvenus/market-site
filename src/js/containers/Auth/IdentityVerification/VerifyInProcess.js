import React, {Component} from 'react';

class VerifyInProcess extends Component {
  render() {
    return (
      <div className='verify-inner-wrapper'>
        <h2 className="header"><img src='/images/auth/circular-arrow.svg' className='fa-spin' alt=''/> </h2>
        <h2 className="header">The system is reviewing your documents.</h2>
        <div className="verify-form-wrapper">
          <div className="theme-form-field verify-main-wrapper">
            <p>This process usually takes between 1 to 3 mitutes, but may take up to 24 hours.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default VerifyInProcess;