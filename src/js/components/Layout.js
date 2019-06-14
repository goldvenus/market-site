import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from '../routes';
import Header from './Header';
import Footer from './Footer';
import {CartIcon, HeartIcon } from './common/IconComponent';
import {getUser} from "../core/actions/user.action";
import {getCarts} from "../core/actions/cart.action";
import {getFavourites} from "../core/actions/favourite.action";
import {getGearsBriefInfo} from "../core/actions/gear.action";
import {detectLocation, getAddress, ipLookUp} from "../core/helper/location.helper";

class Layout extends Component {
  constructor(props) {
    super(props);

    const curPath = this.props.location.pathname;
    if (curPath !== '/login' && curPath !== '/register') {
      getUser();
      getCarts();
      getFavourites();
      getGearsBriefInfo();
    }
  }
  
  async componentDidMount() {
    let location = await detectLocation();
    if (!location) {
      location = await ipLookUp();
    }
    localStorage.setItem("lat", location.latitude);
    localStorage.setItem("lng", location.longitude);
    let address = location && await getAddress(location.latitude, location.longitude);
    // get only city + country
    let formattedAddr = '';
    address.results.forEach(item => {
      if (item.types.indexOf('locality') >= 0) {
        formattedAddr = item.formatted_address;
      }
    });
    // address.plus_code.compound_code
    address && localStorage.setItem("addr", formattedAddr);
  }
  
  render() {
    const { location, carts, favourites, isAuthenticated } = this.props;
    const showHeader = ['/login', '/register', '/forgot-password', '/confirm'].indexOf(location.pathname) === -1;
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
        <div className='back-header'/>

        {output}

        {showHeader && <Header/>}

        {routes}

        {showHeader && <Footer location={this.props.location}/>}

        <ToastContainer />
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
