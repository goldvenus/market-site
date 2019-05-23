import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import AuthSideMenu from '../../components/AuthSideMenu';
import {handleError, readFileData} from "../../core/actions/common.action";
import {register} from '../../core/actions/user.action';
import {bindActionCreators} from "redux";
import CustomSpinner from "../../components/CustomSpinner";
import TextField from "@material-ui/core/TextField/TextField";
import Navbar from "../../components/common/Navbar/Navbar";
import Modal from "react-responsive-modal";
import PrivacyPolicyComponent from "../../components/PrivacyPolicyComponent";
import TermsConditionsComponent from "../../components/TermsConditionsComponent";

class Register extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      password: '',
      confirmPassword: '',
      username: '',
      phoneNumber: '',
      fullName: '',
      gender: '',
      address: '',
      picture: '',
      fileName: '',
      isChecked: false,
      modalOpenState: 0
    };
  }
  
  handleSetRead = () => {
    this.setState({isChecked: !this.state.isChecked});
  };
  
  handleOpenModal = (val) => {
    this.setState({modalOpenState: val});
  };
  
  handleCloseModal = () => {
    this.setState({modalOpenState: 0});
  };
  
  async addImage(event) {
    try {
      const fileName = event.target.files && event.target.files.length > 0 && event.target.files[0].name;
      let image = await readFileData(event);
      
      this.setState({
        picture: image,
        fileName
      });
    } catch {
      handleError('Please upload a valid image');
    }
  }
  
  async submit(e) {
    const {password, confirmPassword, username, phoneNumber, fullName, gender, address, picture} = this.state;
    
    if (fullName && username && password && confirmPassword && picture) {
      e.preventDefault();
      if (password !== confirmPassword) {
        handleError('Password and confirm password do not match');
      } else {
        await register({
          fullName,
          username,
          password,
          phoneNumber,
          gender,
          address,
          picture
        });
      }
    } else {
      e.preventDefault();
      handleError('Please provide all details');
    }
  }
  
  render() {
    const {password, confirmPassword, username, fullName, phoneNumber, isChecked, modalOpenState} = this.state;
    let {isRegistered, isRegistering} = this.props;
    
    return (
      <React.Fragment>
        <div className="auth-nav-bar">
          <header>
            <Navbar/>
          </header>
        </div>
        <div className="auth-container theme-navbar">
          <AuthSideMenu/>
          {
            isRegistering ? <CustomSpinner/> : null
          }
          {
            isRegistered ? (
              <div className="success-message-container">
                <div className="login success-message register-success-message">
                  <h1 className="header"><i className="fa fa-check-circle primary-color"/> Successfully</h1>
                  <div className="subheader">
                  <span>
                    To confirm your account,<br/> check your email for verification code
                  </span>
                  </div>
                  <div className="flex-row navigation-buttons">
                    <button className="theme-btn theme-btn-secondery theme-btn-link"><Link to="/">Home Page</Link>
                    </button>
                    <button className="theme-btn theme-btn-primary theme-btn-link"><Link
                      to={{pathname: '/confirm', state: {email: username}}}>Sign In</Link></button>
                  </div>
                </div>
              </div>) : (
              <div className="login register">
                <h2 className="header">Register</h2>
                <div className="subheader">Register via social networks</div>
                <div className="social-buttons">
                  <button className="theme-btn btn-social btn-fb">
                  <span>
                  <i className="fab fa-facebook-f"/>
                  <span>Facebook</span>
                  </span>
                  </button>
                  <button className="theme-btn btn-social btn-twitter">
                  <span>
                    <i className="fab fa-twitter"/>
                    <span>Twitter</span>
                  </span>
                  </button>
                  <button className="theme-btn btn-social btn-google-plus">
                  <span>
                    <i className="fab fa-google-plus-g"/>
                    <span>Google +</span>
                  </span>
                  </button>
                </div>
                <div className="login-or-divider">Or</div>
                <Form className="theme-form">
                  <div className="theme-form-field">
                    <TextField
                      id="standard-with-placeholder1"
                      className="custom-beautiful-textfield"
                      label="Name"
                      type="text"
                      value={fullName}
                      maxLength='50'
                      onChange={(e) => this.setState({fullName: (e && e.target && e.target.value) || ''})}
                    />
                  </div>
                  <div className="theme-form-field">
                    <TextField
                      id="standard-with-placeholder2"
                      className="custom-beautiful-textfield"
                      label="Email"
                      type="email"
                      value={username}
                      maxLength='50'
                      onChange={(e) => this.setState({username: (e && e.target && e.target.value) || ''})}
                    />
                  </div>
                  <div className="theme-form-field">
                    <TextField
                      id="standard-with-placeholder3"
                      className="custom-beautiful-textfield"
                      label="Phone Number"
                      type="text"
                      value={phoneNumber}
                      maxLength='50'
                      onChange={(e) => this.setState({phoneNumber: (e && e.target && e.target.value) || ''})}
                    />
                  </div>
                  <div className="theme-form-field">
                    <TextField
                      id="standard-with-placeholder4"
                      className="custom-beautiful-textfield"
                      label="Password"
                      type="password"
                      value={password}
                      maxLength='50'
                      onChange={(e) => this.setState({password: (e && e.target && e.target.value) || ''})}
                    />
                  </div>
                  <div className="theme-form-field">
                    <TextField
                      id="standard-with-placeholder5"
                      className="custom-beautiful-textfield"
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      maxLength='50'
                      onChange={(e) => this.setState({confirmPassword: (e && e.target && e.target.value) || ''})}
                    />
                  </div>
                  <div className="theme-form-field term-view-container">
                    <div className="input_svg pretty p-svg p-plain">
                      <input  type="checkbox" onChange={this.handleSetRead} checked={isChecked ? 'checked' : ''}/>
                      <div className="state">
                        <img className="svg check_svg" alt="" src="/images/Icons/task.svg"/>
                      </div>
                    </div>
                    <Label for="save-address" className='checkbox-label'>
                      Yes, I've read, understood and agree to the<br/>
                      <span className='term-view-btn' onClick={() => this.handleOpenModal(1)}>Rental Terms & Conditions</span> and <span className='term-view-btn' onClick={() => this.handleOpenModal(2)}>Privacy Policy</span>
                    </Label>
                  </div>
                  {/*<div className="flex-row  upload-photo-row">*/}
                    {/*<div className="theme-form-field">*/}
                      {/*<span>{fileName || 'Photo'}</span>*/}
                    {/*</div>*/}
                    {/*<div className="file-input-container">*/}
                      {/*<button className="theme-btn theme-btn-filled-white btn-photo-upload">Upload</button>*/}
                      {/*<input type="file" onChange={this.addImage.bind(this)}/>*/}
                    {/*</div>*/}
                  {/*</div>*/}
                  
                  <button className="theme-btn-submit" onClick={this.submit.bind(this)}>Sign up</button>
                </Form>
                <div className="login-or-divider"/>
                <div className="flex-row signin-link already-signin-wrapper">
                  <span>Already have an account?</span>
                  <button className="theme-btn theme-btn-filled-white theme-btn-link">
                    <Link to="/login">Sign in<i className="fa fa-angle-right"/></Link>
                  </button>
                </div>
              </div>)
          }
        </div>
        
        {modalOpenState ?
        <Modal open={true} onClose={this.handleCloseModal} center classNames={{modal: "confirm-modal privacy-modal"}}>
          <div className='confirm-modal-header'>
            <span>{modalOpenState === 1 ? 'Terms and Conditions' : 'Privacy and Cookie Policy'}</span>
          </div>
          <div className='confirm-modal-body'>
            {modalOpenState === 1 ? <TermsConditionsComponent/> : <PrivacyPolicyComponent/>}
          </div>
        </Modal> : null}
        
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isRegistering: state.user.isRegistering,
    isRegistered: state.user.isRegistered
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: bindActionCreators(register, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
