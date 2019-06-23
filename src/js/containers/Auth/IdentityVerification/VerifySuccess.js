import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class VerifySuccess extends Component {
  render() {
    return (
      <div className='verify-inner-wrapper'>
        <p className="header"><img src='/images/auth/verified.svg' alt=''/></p>
        <h2 className="header verify-success-heading">Verification Completed</h2>
        <div className="verify-form-wrapper">
          <div className="theme-form-field verify-main-wrapper">
            <p>Well done! Your identity is completed</p>
          </div>
          <div className="theme-form-field">
            <button className='theme-btn theme-btn-primary'><Link to='/'>To Home Page</Link></button>
          </div>
        </div>
      </div>
    )
  }
}

export default VerifySuccess;