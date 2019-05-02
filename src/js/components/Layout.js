import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import routes from '../routes';
import Header from './Header';
import Footer from './Footer';
import { CartIcon, HeartIcon } from './common/IconComponent';
import { createNotification } from "./common/CustomNotification";
import CustomNotification from "./common/CustomNotification";

const Layout = ({ location, error, info, carts, favourites, isAuthenticated }) => {
  const showHeader = ['/login', '/register', '/forgotpassword', '/confirm'].indexOf(location.pathname) === -1;

  let output = null
  if(isAuthenticated) {
    output = <React.Fragment>
    <div className="fixed-sidebar">
      <Link to="/cart">
        <div className="sidebar-item">
          <div className="sidebar-item__icon">
            <CartIcon/>
          </div>
          <span className="sidebar-item__title">CART</span>
          {!!(carts && carts.length > 0) &&
          <span className="sidebar-item__badge">{carts.length}</span>
          }
          <div className="sidebar-item__bg"/>
        </div>
      </Link>

      <Link to="/favourites">
        <div className="sidebar-item">
          <div className="sidebar-item__icon">
            <HeartIcon/>
          </div>
          <span className="sidebar-item__title">FAVORITES</span>
          {!!(favourites && favourites.length > 0) &&
          <span className="sidebar-item__badge">{favourites.length}</span>
          }
          <div className="sidebar-item__bg"/>
        </div>
      </Link>
    </div>
    </React.Fragment>
  }

  return (
    <React.Fragment>

      {output}

      {showHeader && <Header/>}

      {routes}

      {showHeader && <Footer/>}

      {!!error && (
         <CustomNotification info = "error" title = {String(error)}/>
      )}

      {!!info && (
        <CustomNotification info = "info" title = {String(info)}/>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = store => ({
  error: store.common.errorMsg,
  info: store.common.infoMsg,
  carts: store.cart.carts,
  favourites: store.favourite.favourites,
  isAuthenticated: store.user.isAuthenticated
});

export default withRouter(connect(mapStateToProps)(Layout));
