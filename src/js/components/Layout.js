import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import routes from '../routes';
import Header from './Header';
import Footer from './Footer';
import { CartIcon, HeartIcon } from './common/IconComponent';
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import {getUser} from "../core/actions/user.action";
import {getCarts} from "../core/actions/cart.action";
import {getFavourites} from "../core/actions/favourite.action";
import {rentGearProductList} from "../core/actions/gear.action";
import {fetchCategories} from "../core/actions/category.action";

class Layout extends Component {
  constructor(props) {
    super(props);

    const curPath = this.props.location.pathname;
    if (curPath !== '/login' && curPath !== '/register') {
      getUser();
      getCarts();
      getFavourites();
      fetchCategories();
      rentGearProductList({
        categoryName: '',
        product_region: '',
        brand: ''
      });
    }
  }
  
  render() {
    const { location, carts, favourites, isAuthenticated } = this.props;
    const showHeader = ['/login', '/register', '/forgotpassword', '/confirm'].indexOf(location.pathname) === -1;
    let output = null;

    if (isAuthenticated) {
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

        <NotificationContainer/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  carts: store.cart.carts,
  favourites: store.favourite.favourites,
  isAuthenticated: store.user.isAuthenticated
});

export default withRouter(connect(mapStateToProps)(Layout));
