import React, {Component} from 'react';
import CustomDropzone from "../../../components/common/CustomDropzone";

class Step3 extends Component {
  render() {
    return (
      <div className='verify-inner-wrapper'>
        <h2 className="header">3. Selfie with the ID</h2>
        <div className="verify-form-wrapper">
          <div className="theme-form-field verify-main-wrapper">
            <p>Please take a photo of yourself with the document.
              The photo should be bright and clear, and all parts of your face and document must be visible.</p>
          </div>
          <div className="theme-form-field verify-main-wrapper">
            <div className='upload-photo-container'>
              <CustomDropzone
                heading='UPLOAD SELFIE WITH THE PROOF'
                description='by dragging & dropping or click for selecting them .jpg, .jpeg, .png, .mp4, .webm should be more than 100KB or 300DPI'
                onHandleLoad={(v) => this.props.onSelectImg(v, 'selfieImg')}
              />
            </div>
          </div>
          <div className="theme-form-field verify-main-wrapper">
            <button className='theme-btn theme-btn-primary' onClick={() => this.props.onNextStep(3)}>Next Step</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Step3;