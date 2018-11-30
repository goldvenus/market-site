import React, { Component } from 'react';
import { connect } from "react-redux";

class Header extends Component {
  render() {
    return (
      <header>
        <h1>Header</h1>
      </header>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Header);
