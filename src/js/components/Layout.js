import React, { Component } from 'react';
import { connect } from "react-redux";
import { Badge } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import routes from "../config/routes";
import Header from './Header';
import Footer from './Footer';
import { clearError } from '../actions/app.actions';

class Layout extends Component {
  render() {
    const { match, location, history, selectedView, error, carts, favourites } = this.props;
    let hideHeader = ['/login', '/register', '/forgotpassword', '/confirm'].indexOf(location.pathname) > -1;
    return (
      <div>
        <div className="fixed">
          <Link to="/cart">
          <div className="cart">
            {
              carts && carts.length ? <Badge color="light"> {carts.length} </Badge> : null
            }
            <span className="cart-icon"></span>
            <span>CART</span>
          </div>
          </Link>
          <Link to="/favourites">
          <div className="fav">
          {
            favourites && favourites.Items.length ? <Badge color="light"> {favourites.Items.length} </Badge> : null
          }
            <span className="fav-icon"></span>
            <span>FAVORITES</span>
          </div>
          </Link>
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
            <div className="app-error-text">{ String(error) }</div>
            <div className="app-error-close" onClick={ clearError }>X</div>
          </div> : null
        }
      </div>
    );
  }
}

export default withRouter(connect((store) => {
  return {
    error: store.app.error,
    carts: store.app.carts,
    favourites: store.app.favourites,
  };
})(Layout));
