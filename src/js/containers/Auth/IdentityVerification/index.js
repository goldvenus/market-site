import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Label} from 'reactstrap';
import {handleError, handleInfo} from "../../../core/actions/common.action";
import CustomStepBar from "../../../components/common/CustomStepBar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import VerifySuccess from "./VerifySuccess";
import VerifyFailed from "./VerifyFailed";
import Modal from "react-responsive-modal";
import RentalTermsComponent from "../../TermsAndPolicy/RentalTermsComponent";
import VerifyInProcess from "./VerifyInProcess";
import {doKycValidation, createMangoAccount, getUser} from "../../../core/actions/user.action";
import CustomSpinner from "../../../components/common/CustomSpinner";

class IdentityVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      busy: false,
      modalOpenState: 0,
      step: 5     // initial: -1
    };
    this.verificationData = {
      firstName: '',
      lastName: '',
      birthday: new Date(),
      email: '',
      phone: '',
      nationality: '',
      country: '',
      proofImg: '',
      selfieImg: '',
      verificationType: 0,
      checkResult: [0, 0, 0],
      mangoAccountId: 0
    };
    
    if (this.props.user && !this.props.user.kycValidated) {
      handleInfo('You are not verified');
    } else if (this.props.user && this.props.user.kycValidated) {
      handleInfo('You are already verified');
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.user && this.props.user !== nextProps.user) {
      if (nextProps.user.kycValidated) {
        handleInfo('You are already verified');
      } else {
        handleInfo('You are not verified');
      }
    }
  }
  
  handleInputChange = (e, val) => {
    console.log(e.target.value);
    this.verificationData[val] = e.target.value;
  };
  
  handleSelectType = (type) => {
    this.verificationData.verificationType = type;
  };
  
  handleSelectImg = (v, field) => {
    this.verificationData[field] = v;
  };
  
  onCloseModal = () => {
    this.setState({modalOpenState: 0});
  };
  
  doValidation = (step) => {
    let {firstName, lastName, email, phone, nationality, country, proofImg, selfieImg} = this.verificationData;
    if (step === 1) {
      // return true;
      return firstName && lastName && email && phone;
    } else if (step === 2) {
      // return true;
      return nationality && country && proofImg;
    } else if (step === 3) {
      // return true;
      return selfieImg !== '';
    }
    return true;
  };
  
  handleNextStep = async (step) => {
    if (!this.doValidation(step)) {
      handleError('Please input required information');
      return;
    }
    if (this.state.step === 1) {
      console.log('create account...');
      let {firstName, lastName, email, phone, nationality, country, birthday} = this.verificationData;
      let data = {firstName, lastName, email, phone, nationality: nationality.value, country: country.value, birthday: Math.floor(birthday.getTime()/1000)};
      this.setState({busy: true});
      let tempMangoAccountId = this.props.user.mangoAccountId;
      if (this.props.user && !this.props.user.kycValidated) {
        tempMangoAccountId = await createMangoAccount({step: 1, data});
      }
      this.setState({busy: false});
      console.log("*****************", tempMangoAccountId);
      if (tempMangoAccountId) {
        this.verificationData.mangoAccountId = tempMangoAccountId;
      } else {
        return;
      }
    } else if (this.state.step === 2) {
      console.log('do kyc validation...');
      let {firstName, lastName, email, phone, nationality, country, proofImg, selfieImg, verificationType, mangoAccountId} = this.verificationData;
      selfieImg = selfieImg.replace('data:image/png;base64,', '');
      proofImg = proofImg.replace('data:image/png;base64,', '');
      selfieImg = selfieImg.replace('data:image/jpeg;base64,', '');
      proofImg = proofImg.replace('data:image/jpeg;base64,', '');
      selfieImg = selfieImg.replace('data:image/jpg;base64,', '');
      proofImg = proofImg.replace('data:image/jpg;base64,', '');
      selfieImg = selfieImg.replace('data:image/gif;base64,', '');
      proofImg = proofImg.replace('data:image/gif;base64,', '');
      console.log(selfieImg);
      let data = {firstName, lastName, email, phone, nationality: nationality.value, country: country.value, proofImg, selfieImg, verificationType, mangoAccountId};
      this.setState({step});
      let validationResult = await doKycValidation({step: 2, data});
      if (validationResult) {
        await getUser();
        this.setState({step: 4});
      } else {
        this.setState({step: 5});
      }
      return;
    }
    this.setState({step});
  };
  
  render() {
    const {isChecked, step, modalOpenState, busy} = this.state;
    const {birthday} = this.verificationData;
    return (
      <div className="verify-container">
        {busy && <CustomSpinner/>}
        {step === -1 &&
          <div className="verify-initial-step">
            <h2 className="header">Identity Verification</h2>
            <div>
              <div className="theme-form-field identity-description">
                Creative Market relies on AI-based identity verification software to build a safe worldwide rental community.
              </div>
              <div className="theme-form-field">
                <div className="theme-form-field term-view-container-verify">
                  <div>
                    <div className="input_svg pretty p-svg p-plain">
                      <input  type="checkbox" onChange={() => this.setState({isChecked: !isChecked})} checked={isChecked ? 'checked' : ''}/>
                      <div className="state">
                        <img className="svg check_svg" alt="" src="/images/Icons/task.svg"/>
                      </div>
                    </div>
                    <Label for="save-address" className='checkbox-label'>
                      I agree to the <span className='term-view-btn' onClick={() => this.setState({modalOpenState: 7})}>Terms of Service</span>
                    </Label>
                  </div>
                </div>
              </div>
              {!isChecked ?
              <button type="submit" disabled className="theme-btn theme-btn-primary">Start Verification</button> :
              <button type="submit" className="theme-btn theme-btn-primary" onClick={() => this.handleNextStep(0)}>Start Verification</button>}
            </div>
          </div>}
        {((step >= 0 && step < 3) || step === 5) &&
          <div className='step-container'>
            <CustomStepBar curStep={step} totalStep={3} result={this.verificationData.checkResult} />
          </div>}
        {step === 0 ?
          <Step1 onNextStep={this.handleNextStep} onInputChange={this.handleInputChange} birthday={birthday} /> :
        step === 1 ?
          <Step2 onNextStep={this.handleNextStep} onInputChange={this.handleInputChange} onSelectType={this.handleSelectType} onSelectImg={this.handleSelectImg} /> :
        step === 2 ?
          <Step3 onNextStep={this.handleNextStep} onInputChange={this.handleInputChange} onSelectImg={this.handleSelectImg} /> :
        step === 3 ?
          <VerifyInProcess /> :
        step === 4 ?
          <VerifySuccess onNextStep={this.handleNextStep} /> :
        step === 5 ?
          <VerifyFailed onNextStep={this.handleNextStep} onSelectImg={this.handleSelectImg} /> : null}
        
        {modalOpenState === 7 ?
          <Modal open={true} onClose={this.onCloseModal} center classNames={{modal: "confirm-modal privacy-modal"}}>
            <div className='confirm-modal-header'>
              <span>Terms of Service</span>
            </div>
            <div className='confirm-modal-body'>
              <RentalTermsComponent/>
            </div>
          </Modal> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps, null)(IdentityVerification);
