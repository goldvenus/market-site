import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import routes from "../config/routes";
import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          { routes }
          <Footer />  
        </div>
      </BrowserRouter>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Layout);
