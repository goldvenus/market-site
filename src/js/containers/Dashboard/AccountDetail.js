import React, {Component} from 'react';
import {Form, FormGroup} from 'reactstrap';
import TextField from "@material-ui/core/TextField/TextField";
import connect from "react-redux/es/connect/connect";
import BarLoader from "react-bar-loader";
import {updatePassword, updateUser} from "../../core/actions/user.action";
import {handleError, readFileData} from "../../core/actions/common.action";
import CustomSpinner from "../../components/common/CustomSpinner";
import PasswordConfirmModal from "./AccountDetail/PasswordConfirmModal";
import ForgotPasswordModal from "./AccountDetail/ForgotPasswordModal";
import {Inline} from '@zendeskgarden/react-loaders';
import imageCompression from "browser-image-compression";

class AccountDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: props.user.given_name,
      email: props.user.email,
      phone: props.user.phone_number,
      curPwd: '',
      newPwd: '',
      confirmPwd: '',
      picture: '',
      fileName: '',
      modalOpenState: 0,
      busy: false
    };
  }
  
  componentWillReceiveProps(props) {
    if (props.user) {
      this.setState({
        fullname: props.user.given_name,
        email: props.user.email,
        phone: props.user.phone_number,
        picture: props.user.picture
      });
    }
  }
  
  handleInputChange = (e, v) => {
    this.setState({[v]: e.target.value});
  };
  
  handleCloseModal = () => {
    this.setState({modalOpenState: 0});
  };
  
  handleUserSave = (e) => {
    e.preventDefault();
    let newUser = this.state;
    if (!newUser.email || !newUser.fullname || !newUser.phone) {
      handleError('Please provide all information!');
      return false;
    }
    this.setState({modalOpenState: 1});
  };
  
  performUserUpdate = (pwd) => {
    let newUser = this.state;
    let curUser = this.props.user;
    this.setState({modalOpenState: 0});
    
    updateUser({
      curUser: {
        email: curUser.email,
        password: pwd
      },
      newUser: {
        email: newUser.email,
        given_name: newUser.fullname,
        phone_number: newUser.phone,
        password: newUser.newPwd,
        picture: newUser.picture
      }
    });
  };
  
  handlePasswordReset = async (e) => {
    e.preventDefault();
    if (this.state.busy)
      return;
    let newUser = this.state;
    let curUser = this.props.user;
    if (!newUser.email || !newUser.curPwd || !newUser.newPwd || !newUser.confirmPwd) {
      handleError('Please input passwords!');
      return false;
    } else if (newUser.newPwd !== newUser.confirmPwd) {
      handleError('Passwords don\'t match!');
      return false;
    }
    
    this.setState({busy: true});
    await updatePassword({
      curUser: {
        email: curUser.email,
        password: newUser.curPwd
      },
      newUser: {
        password: newUser.newPwd,
      }
    });
    this.setState({busy: false});
  };
  
  addImage = async (event) => {
    try {
      const fileName = event.target.files && event.target.files.length > 0 && event.target.files[0].name;
      const imageFile = event.target.files[0];
      let options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }
      try {
        const compressedFile = await imageCompression(imageFile, options);
        let image = await readFileData(compressedFile);
        this.setState({
          picture: image,
          fileName
        });
      } catch (error) {
        console.log(error);
      }
    } catch {
      handleError('Please upload a valid image');
    }
  };
  
  render() {
    const {isUpdating, isLoading, user} = this.props;
    const {fileName, modalOpenState, busy} = this.state;
    
    if (isLoading) {
      return <BarLoader color="#F82462" height="5"/>;
    }
    
    return (
      <React.Fragment>
        {isUpdating && <CustomSpinner/>}
        <div className="account-detail">
          <h4 className="tab-title">Account Details</h4>
          <div className="wrapper-detail">
            <div className="detail-left-wrapper">
              <div className="account-detail-heading">
                <span>INFO</span>
                <div className="flex-row  upload-photo-row">
                  <div className="theme-form-field">
                    <span>{fileName || 'Select...'}</span>
                  </div>
                  <div className="file-input-container">
                    <button className="theme-btn theme-btn-filled-white btn-photo-upload">Photo</button>
                    <input type="file" onChange={this.addImage}/>
                  </div>
                </div>
              </div>
              <div className="account-detail-body">
                <Form>
                  <FormGroup>
                    <TextField
                      id="standard-password-input11"
                      className='custom-beautiful-textfield'
                      label='NAME'
                      type="text"
                      value={this.state.fullname}
                      onChange={e => this.handleInputChange(e, 'fullname')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      id="standard-password-input1"
                      className='custom-beautiful-textfield'
                      label='EMAIL'
                      type="text"
                      value={this.state.email}
                      onChange={e => this.handleInputChange(e, 'email')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      id="standard-password-input2"
                      className='custom-beautiful-textfield'
                      label='PHONE'
                      type="text"
                      value={this.state.phone}
                      onChange={e => this.handleInputChange(e, 'phone')}
                    />
                  </FormGroup>
                  <button className='theme-btn theme-btn-primary' onClick={this.handleUserSave}>Save</button>
                </Form>
              </div>
            </div>
            <div className="detail-right-wrapper">
              <div className="account-detail-heading">CHANGE <br className="d-block d-sm-none"/>PASSWORD
                <span onClick={() => this.setState({modalOpenState: 2})} className='forgot-pwd-btn'>Forgot Password?</span>
              </div>
              <div className="account-detail-body">
                <Form>
                  <FormGroup>
                    <TextField
                      id="standard-password-input3"
                      className=' custom-beautiful-textfield'
                      label='Current Password'
                      type="password"
                      value={this.state.curPwd}
                      onChange={e => this.handleInputChange(e, 'curPwd')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      id="standard-password-input4"
                      className=' custom-beautiful-textfield'
                      label='New Password'
                      type="password"
                      value={this.state.newPwd}
                      onChange={e => this.handleInputChange(e, 'newPwd')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      id="standard-password-input5"
                      className=' custom-beautiful-textfield'
                      label='Confirm Password'
                      type="password"
                      value={this.state.confirmPwd}
                      onChange={e => this.handleInputChange(e, 'confirmPwd')}
                    />
                  </FormGroup>
                  <button className='theme-btn theme-btn-primary' onClick={this.handlePasswordReset}>{busy ? <Inline size={64} color={"#fff"}/> : 'Change Password'}</button>
                </Form>
              </div>
            </div>
          </div>
        </div>
        
        {modalOpenState === 1 ?
          <PasswordConfirmModal onConfirm={this.performUserUpdate} onClose={this.handleCloseModal}/> :
        modalOpenState === 2 ?
          <ForgotPasswordModal user={user} onClose={this.handleCloseModal}/> : null}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  isLoading: state.user.isLoading,
  isUpdating: state.user.isUpdating
});

export default connect(mapStateToProps)(AccountDetail);
