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
import CustomMetaTag from "../containers/Landing/CustomMetaTag";
import CookieConsent from "react-cookie-consent";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {showKycWarning: false};
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
    address.results && address.results.forEach(item => {
      if (item.types.indexOf('locality') >= 0) {
        formattedAddr = item.formatted_address;
      }
    });
    // address.plus_code.compound_code
    address && localStorage.setItem("addr", formattedAddr);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.user && this.props.user !== nextProps.user) {
      if (nextProps.user.kycValidated) {
        this.setState({showKycWarning: false});
      } else {
        this.setState({showKycWarning: true});
      }
    }
  }
  
  render() {
    const { location, carts, favourites, isAuthenticated } = this.props;
    const showHeader = ['/login', '/register', '/forgot-password', '/confirm'].indexOf(location.pathname) === -1;
    let output = null;
    let {showKycWarning} = this.state;

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
        <CustomMetaTag path={window.location.pathname} query={window.location.search}/>
        {/*<div className='back-header'/>*/}

        {output}

        {showHeader && <Header/>}
        
        {showHeader && showKycWarning && isAuthenticated && location.pathname !== '/' &&
        <div className='kyc-warning-wrapper'>
          <span>You have to verify your identity to rent and list gears. Click <Link to='/verify-profile'>here</Link>.</span>
        </div>}
        
        {routes}

        {showHeader && <Footer location={this.props.location}/>}

        <ToastContainer/>
  
        <CookieConsent
          location="bottom"
          buttonText="I agree"
          style={{ margin: "0", padding: "15px",background: "white", textAlign: "center", color: "#f82462", "boxShadow": "rgba(173, 173, 173, 0.2) 0px 0px 26px 4px" }}
          buttonStyle={{ background: "#f82462", color: "white", fontSize: "15px", padding: "5px 15px", margin: '0' }}
          onAccept={() => {}}
        >
          Before using this site you must agree to the <span style={{textDecoration: 'underline'}}><Link to='/privacy'>privacy and cookie policy</Link></span>.
        </CookieConsent>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  user: store.user.user,
  carts: store.cart.carts,
  favourites: store.favourite.favourites,
  isAuthenticated: store.user.isAuthenticated
});

export default withRouter(connect(mapStateToProps)(Layout));
