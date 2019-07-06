import React, {Component} from 'react';
import CustomCountrySelect from "../../../components/common/CustomCountrySelect";
import CustomDropzone from "../../../components/common/CustomDropzone";

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0
    }
  }
  
  render() {
    let {type} = this.state;
    return (
      <div className='verify-inner-wrapper'>
        <h2 className="header">2. Proof of identity</h2>
        <div className="verify-form-wrapper">
          <div className="verify-input-wrapper verify-input-wrapper-1">
            <div><span>Nationality: </span></div>
            <CustomCountrySelect onHandleChange={(e) => this.props.onInputChange(e, 'nationality')} />
          </div>
          <div className="verify-input-wrapper verify-input-wrapper-1">
            <div><span>Country of Residence: </span></div>
            <CustomCountrySelect onHandleChange={(e) => this.props.onInputChange(e, 'country')} />
          </div>
          <div className="theme-form-field verify-main-wrapper">
            <p className='verify-type-title'>Choose your ID type</p>
            <div className='verify-type-btn-container'>
              <div className={`type-btn ${type === 0 && 'active'}`} onClick={() => {this.props.onSelectType(0);this.setState({type: 0})}}>ID Card</div>
              <div className={`type-btn ${type === 1 && 'active'}`} onClick={() => {this.props.onSelectType(1);this.setState({type: 1})}}>Passport</div>
              <div className={`type-btn ${type === 2 && 'active'}`} onClick={() => {this.props.onSelectType(2);this.setState({type: 2})}}>Driving License</div>
            </div>
            <div className='upload-photo-container'>
              <CustomDropzone
                heading='UPLOAD SELFIE WITH THE PROOF'
                description='by dragging & dropping or click for selecting them .jpg, .jpeg, .png, .mp4, .webm should be more than 100KB or 300DPI'
                onHandleLoad={(v) => this.props.onSelectImg(v, 'proofImg')}
              />
            </div>
          </div>
          <div className="theme-form-field">
            <button className='theme-btn theme-btn-primary' onClick={() => this.props.onNextStep(2)}>Next Step</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Step2;