import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'reactstrap';
import AuthSideMenu from '../../components/AuthSideMenu';
import { handleError } from '../../core/actions/common.action';
import { confirmUser } from '../../core/actions/user.action';
import TextField from "@material-ui/core/TextField/TextField";
import $ from "jquery";

class RegisterConfirm extends Component {
  constructor(props) {
    super(props);
  
    if (localStorage.userId) {
      this.props.history.push('/');
    }
    this.email = props.location.state && props.location.state.email;
    this.fullName = props.location.state && props.location.state.fullName;
    this.state = {
      code: '',
      email: this.email,
      fullName: this.fullName,
      isConfirmed: false
    };
  }
  
  componentDidMount() {
    $("#root").css('min-height', '70vh');
  }
  
  componentWillUnmount() {
    $("#root").css('min-height', '111.5vh');
  }

  async confirm(e) {
    e.preventDefault()

    const { code, email: aEmail, fullName } = this.state;
    const oEmail = this.email;

    if ((oEmail || aEmail) && fullName && code) {
      const response = await confirmUser(oEmail || aEmail, code, fullName);

      if (response) {
        this.setState({
          isConfirmed: true
        });
      }
    } else {
      handleError('Please enter valid email and verification code');
    }
  }

  render() {
    return (
      <div className="auth-container theme-navbar">
        <AuthSideMenu/>
        {this.state.isConfirmed
          ? (
            <div className="login success-message">
              <h1 className="header"><i className="fa fa-check-circle primary-color"/> Account successfully activated!</h1>
              <div className="flex-row navigation-buttons">
                <button className="theme-btn theme-btn-secondery theme-btn-link"><Link to="/">Home Page</Link></button>
                <button className="theme-btn theme-btn-primary theme-btn-link"><Link to="/login">Login</Link></button>
              </div>
            </div>
          )
          : (
            <div className="login success-message">
              <h1 className="header">Confirm</h1>
              <Form className="theme-form">
                {this.email
                  ? null
                  : (
                    <div>
                      <div className="theme-form-field verification-code-input-wrapper">
                        <TextField
                          label="Email"
                          type="text"
                          required="required"
                          className="custom-beautiful-textfield"
                          value={this.state.email}
                          onChange={(value) => this.setState({ email: value })}
                        />
                      </div>
                    </div>
                  )
                }
                <div className="theme-form-field verification-code-input-wrapper">
                  <TextField
                    label="Verification Code"
                    type="text"
                    className="custom-beautiful-textfield"
                    value={this.state.code}
                    onChange={(value) => this.setState({ code: value })}
                  />
                </div>
                <div className="flex-row verification-code">
                  <button className="theme-btn-submit" onClick={this.confirm.bind(this)}>Confirm</button>
                </div>
              </Form>
            </div>
          )
        }
      </div>
    );
  }
}

export default RegisterConfirm;
