import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import routes from '../routes';
import Header from './Header';
import Footer from './Footer';
import { CartIcon, HeartIcon } from './common/IconComponent';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from "react-toasts";
import { createNotification } from "./common/CustomNotification";
import CustomNotification from "./common/CustomNotification";

const Layout = ({ location, error, carts, favourites, isAuthenticated }) => {
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
          {!!(favourites && favourites.Items && favourites.Items.length > 0) &&
          <span className="sidebar-item__badge">{favourites.Items.length}</span>
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

        // <div className="alert alert-danger app-error" role="alert">
        //   <div className="app-error-text">{String(error)}</div>
        //   <div className="app-error-close" onClick={clearError}>X</div>
        // </div>
      )}


      <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
    </React.Fragment>
  );
};

const mapStateToProps = store => ({
  error: store.user.error,
  carts: store.cart.carts,
  favourites: store.favourite.favourites,
  isAuthenticated: store.user.isAuthenticated
});

export default withRouter(connect(mapStateToProps)(Layout));
