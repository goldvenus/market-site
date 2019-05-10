import React, {Component} from 'react';
import { Form, FormGroup } from 'reactstrap';
import TextField from "@material-ui/core/TextField/TextField";
import connect from "react-redux/es/connect/connect";
import BarLoader from "react-bar-loader";
import {getUser, updatePassword, updateUser} from "../../core/actions/user.action";
import { handleError } from "../../core/actions/common.action";
import CustomSpinner from "../../components/CustomSpinner";
import {Link} from "react-router-dom";

class AccountDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      phone: '',
      curPwd: '',
      newPwd: '',
      confirmPwd: ''
    };
    getUser();
  }

  componentWillReceiveProps(props) {
    if (props.user) {
      this.setState({
        fullname: props.user.given_name,
        email: props.user.email,
        phone: props.user.phoneNumber
      });
    }
  }

  handleInputChange = (e, v) => {
    this.setState({[v]: e.target.value});
  };

  handleUserSave = (e) => {
    e.preventDefault();
    let newUser = this.state;
    let curUser = this.props.user;
    if (!newUser.email || !newUser.fullname || !newUser.phone || !newUser.curPwd) {
      handleError('Please provide all information!');
      return false;
    }

    updateUser({
      curUser: {
        email: curUser.email,
        password: newUser.curPwd
      },
      newUser: {
        email: newUser.email,
        given_name: newUser.fullname,
        phoneNumber: newUser.phone,
        password: newUser.newPwd,
        picture: 'asd'
      }
    });
  };

  handlePasswordReset = (e) => {
    e.preventDefault();
    let newUser = this.state;
    let curUser = this.props.user;
    if (!newUser.email || !newUser.curPwd || !newUser.newPwd || !newUser.confirmPwd) {
      handleError('Please provide all information!');
      return false;
    } else if (newUser.newPwd !== newUser.confirmPwd) {
      handleError('New password and confirm password does not match!');
      return false;
    }

    updatePassword({
      curUser: {
        email: curUser.email,
        password: newUser.curPwd
      },
      newUser: {
        password: newUser.newPwd,
      }
    });
  };

  render() {
    const { isUpdating } = this.props;
    if (!this.state.email) {
      return <BarLoader color="#F82462" height="5"/>;
    }

    return (
      <React.Fragment>
        {isUpdating && <CustomSpinner/>}
        <div className="account-detail">
          <h4 className="tab-title">Account Details</h4>
          <div className="wrapper-detail">
              <div className="detail-left-wrapper">
                <div className="account-detail-heading" >INFO</div>
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
                <div className="account-detail-heading">CHANGE <br className="d-block d-sm-none"/>PASSWORD<Link className="theme-form-link forgot-pwd-btn" to="/forgotpassword">Forgot password?</Link></div>
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
                    <button className='theme-btn theme-btn-primary' onClick={this.handlePasswordReset}>Change Password</button>
                  </Form>
              </div>
              </div>
            </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
    user: state.user.user,
    isUpdating: state.user.isUpdating
});
export default connect(mapStateToProps)(AccountDetail);
