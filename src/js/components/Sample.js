import React, { Component } from 'react';
import { connect } from "react-redux";

class Sample extends Component {
  render() {
    return (
      <div>
        Sample
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Sample);
