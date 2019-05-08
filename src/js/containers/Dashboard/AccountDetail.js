import React, {Component} from 'react';
import { Card, CardTitle, Row, Col } from 'reactstrap';
import { Form, FormGroup } from 'reactstrap';
import TextField from "@material-ui/core/TextField/TextField";
import connect from "react-redux/es/connect/connect";
import BarLoader from "react-bar-loader";
import { updatePassword, updateUser } from "../../core/actions/user.action";
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
  }

  componentDidMount() {
    let curUser = this.props.user;
    this.setState({
      fullname: curUser.given_name,
      email: curUser.email,
      phone: curUser.phoneNumber
    })
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
    const { user, isUpdating } = this.props;
    if (!user) {
      return <BarLoader color="#F82462" height="5"/>;
    }

    return (
      <React.Fragment>
        {isUpdating && <CustomSpinner/>}
        <Row className="account-detail">
          <Col sm="24">
            <h4 className="tab-title">Account Details</h4>
            <div className="wrraper_dashboard">
              <Row>
                <div className='account-detail-left'>
                  <Card body>
                    <CardTitle className="text-muted" >INFO</CardTitle>
                    <div className="card-text">
                      <Form>
                        <FormGroup>
                          <TextField className='checkout-textfield custom-beautiful-textfield' placeholder='NAME' type="text" value={this.state.fullname}
                              onChange={e => this.handleInputChange(e, 'fullname')}/>
                        </FormGroup>
                        <FormGroup>
                          <TextField className='checkout-textfield custom-beautiful-textfield' placeholder='EMAIL' type="text" value={this.state.email}
                              onChange={e => this.handleInputChange(e, 'email')}/>
                        </FormGroup>
                        <FormGroup>
                          <TextField className='checkout-textfield custom-beautiful-textfield' placeholder='PHONE' type="text" value={this.state.phone}
                              onChange={e => this.handleInputChange(e, 'phone')}/>
                        </FormGroup>
                        <button className='theme-btn theme-btn-primary' onClick={this.handleUserSave}>Save</button>
                      </Form>
                    </div>
                  </Card>
                  <Card body>
                    <CardTitle className="text-muted">CHANGE <br className="d-block d-sm-none"/>PASSWORD<Link className="theme-form-link forgot-pwd-btn" to="/forgotpassword">Forgot password?</Link></CardTitle>
                    <div className="card-text">
                      <Form>
                        <FormGroup>
                          <TextField className='checkout-textfield custom-beautiful-textfield' placeholder='Current Password' type="password" value={this.state.curPwd}
                              onChange={e => this.handleInputChange(e, 'curPwd')}/>
                        </FormGroup>
                        <FormGroup>
                          <TextField className='checkout-textfield custom-beautiful-textfield' placeholder='New Password' type="password" value={this.state.newPwd}
                              onChange={e => this.handleInputChange(e, 'newPwd')}/>
                        </FormGroup>
                        <FormGroup>
                          <TextField className='checkout-textfield custom-beautiful-textfield' placeholder='Confirm Password' type="password" value={this.state.confirmPwd}
                              onChange={e => this.handleInputChange(e, 'confirmPwd')}/>
                        </FormGroup>
                        <button className='theme-btn theme-btn-primary' onClick={this.handlePasswordReset}>Change Password</button>
                      </Form>
                    </div>
                  </Card>
                </div>
                <div className='account-detail-right'>
                  <Card body>
                    <CardTitle className="text-muted">PAYMENT METHOD</CardTitle>
                    <div className="card-text">
                      <Row>
                        <Col sm="12">
                          <div className="payment-card">
                            <div className="flex-row">
                              <div>
                                <img src="/images/cards/master-card.svg" alt=""/>
                                <img src="/images/Icons/cross.svg" alt=""/>
                              </div>
                              <div className="payment-card-number">**** **** **** 1938</div>
                            </div>
                            <div className="flex-row payment-card-other">
                              <span>07 / 20</span>
                              <span>Josh Williams</span>
                            </div>
                          </div>
                        </Col>
                        <Col sm="12">
                          <div className="add-payment-method center">
                            <div className="add center">
                              <span className="fa fa-plus"></span>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
    user: state.user.user,
    isUpdating: state.user.isUpdating
});
export default connect(mapStateToProps)(AccountDetail);
