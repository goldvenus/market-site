import React from 'react';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';

import routes from '../config/routes';
import Header from './Header';
import Footer from './Footer';
import { clearError } from '../actions/app.actions';

const Layout = ({ location, error, carts, favourites }) => {
  const showHeader = ['/login', '/register', '/forgotpassword', '/confirm'].indexOf(location.pathname) === -1;

  return (
    <React.Fragment>
      <div className="fixed">
        <Link to="/cart">
          <div className="cart">
            {carts && carts.length
              ? <Badge color="light"> {carts.length} </Badge>
              : null
            }
            <span className="cart-icon"/>
            <span>CART</span>
          </div>
        </Link>

        <Link to="/favourites">
          <div className="fav">
            {!!(favourites && favourites.Items && favourites.Items.length) &&
            <Badge color="light"> {favourites.Items.length} </Badge>
            }
            <span className="fav-icon"/>
            <span>FAVORITES</span>
          </div>
        </Link>
      </div>

      {showHeader && <Header/>}

      {routes}

      {showHeader && <Footer/>}

      {!!error && (
        <div className="alert alert-danger app-error" role="alert">
          <div className="app-error-text">{String(error)}</div>
          <div className="app-error-close" onClick={clearError}>X</div>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = store => ({
  error: store.app.error,
  carts: store.app.carts,
  favourites: store.app.favourites,
});

export default withRouter(connect(mapStateToProps)(Layout));
