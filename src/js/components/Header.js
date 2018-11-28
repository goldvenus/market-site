import React, { Component } from 'react';
import { connect } from "react-redux";

class Header extends Component {
  render() {
    return (
      <header>
        Header
      </header>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Header);
