import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import routes from "../config/routes";
import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
  render() {
    const { match, location, history, selectedView } = this.props;
    let hideHeader = ['/login', '/register', '/forgotpassword'].indexOf(location.pathname) > -1;

    return (
      <div>
        <div className="fixed">
          <div className="cart">
            <span className="cart-icon"></span>
            <span>CART</span>
          </div>
          <div className="fav">
            <span className="fav-icon"></span>
            <span>FAVORITES</span>
          </div>
        </div>
        {
          hideHeader ? null : <Header />
        }
        { routes }
        {
          hideHeader ? null : <Footer />
        }
      </div>
    );
  }
}

export default withRouter(connect((store) => {
  return {
  };
})(Layout));
