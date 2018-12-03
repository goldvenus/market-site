import React, { Component } from 'react';
import { connect } from "react-redux";
import NavbarLeft from './Navbar/NavbarLeft';

class AuthSideMenu extends Component {
  render() {
    return (
      <div className="auth-sidemenu">
        <NavbarLeft />
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(AuthSideMenu);
