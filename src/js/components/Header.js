import React, { Component } from 'react';
import { connect } from "react-redux";
import Navbar from "./Navbar/Navbar";

class Header extends Component {
  render() {
    return (
      <header>
        <Navbar/>
      </header>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Header);
