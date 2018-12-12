import React, { Component } from 'react';
import { connect } from "react-redux";

class RentGear extends Component {
  render() {
    return (
      <div className="rent-gear">
        <div className="rent-gear-head"></div>
        <div className="rent-gear-body"></div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(RentGear);
