import React, { Component } from 'react';
import { connect } from "react-redux";

class Footer extends Component {
  render() {
    return (
      <footer>
        Footer
      </footer>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Footer);
