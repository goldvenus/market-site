import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import routes from "../config/routes";
import Header from './Header';
import Footer from './Footer';
import { clearError } from '../actions/app.actions';

class Layout extends Component {
  render() {
    const { match, location, history, selectedView, error } = this.props;
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
        {
          error ?
          <div className="alert alert-danger app-error" role="alert">
            <div className="app-error-text">{ error }</div>
            <div className="app-error-close" onClick={ clearError }>X</div>
          </div> : null
        }
      </div>
    );
  }
}

export default withRouter(connect((store) => {
  return {
    error: store.app.error
  };
})(Layout));
