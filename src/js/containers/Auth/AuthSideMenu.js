import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';

class AuthSideMenu extends Component {
  render() {
    return (
      <div className="auth-sidemenu">
        <header>
          <Navbar/>
        </header>
      </div>
    );
  }
}

export default AuthSideMenu;
