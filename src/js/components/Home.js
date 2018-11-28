import React, { Component } from 'react';
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <div className="home">
        Home Page
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Home);
