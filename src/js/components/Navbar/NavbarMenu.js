import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import withSizes from 'react-sizes'
import Transition from 'react-transition-group/Transition';
import { Container, Row, Col } from 'reactstrap';
import { addEndListener } from '../../utils/animation';
import {
  animateMenuIn,
  animateMenuOut,
} from './NavbarMenu.animation';

import NavbarDropdown from './NavbarDropdown';
import {CartIcon, CloseIcon, CloseIconMobile, HeartIcon, OpenIcon, OpenIconMobile} from "../common/IconComponent";
import { compose } from "redux";
import { throttle } from "lodash";

const CollapseMenu = ({ isOpen, children }) => (
  <Transition
    in={isOpen}
    addEndListener={addEndListener}
    onEnter={animateMenuIn}
    onExit={animateMenuOut}
    unmountOnExit
  >
    <div className="navbar-menu-wrapper">
      <div className="menu-content-scroll-wrapper">
        <div className="menu-content">
          {children}
        </div>
      </div>

      <div className="animated-bg">
        <div className="menu-bg"/>
      </div>
    </div>
  </Transition>
);

const NavbarToggleButton = ({ onClick, isOpen, isMobile }) => {
  return isOpen
    ? (
      <button className="button-toggle" onClick={onClick}>
        {isMobile ? <CloseIconMobile/> : <CloseIcon/>}
        <span>Close</span>
      </button>
    )
    : (
      <button className="button-toggle" onClick={onClick}>
        {isMobile ? <OpenIconMobile/> : <OpenIcon/>}
      </button>
    );
};

class NavbarMenu extends React.Component {
  state = {
    collapsed: true,
    scrolledDown: false,
    _isMounted: false
  };

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('scroll', throttle(this.handleScroll, 200, {trailing: true, leading: false}));
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY >= 200 && this._isMounted) {
      this.setState({scrolledDown: true});
    } else {
      this.setState({scrolledDown: false});
    }
  };

  toggleNavbar = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  render() {
    const { collapsed, scrolledDown } = this.state;
    const {
      carts,
      favourites,
      isMobile,
      location: {pathname},
      isAuthenticated
    } = this.props;
    const isHome = pathname === '/';
    const logoClassName = (!isHome || (isHome && (isMobile || scrolledDown))) ? 'visible-logo' : 'hidden-logo';
    let output = null;

    if (isAuthenticated === true) {
      output = <React.Fragment>
      <li className="navbar-sm__sidebar-item ml-auto">
        <Link to="/cart">
          <div className="sidebar-item__icon">
            <CartIcon/>
            {!!(carts && carts.length > 0) &&
            <span className="sidebar-item__badge">{carts.length}</span>
            }
          </div>
        </Link>
      </li>

      <li className="navbar-sm__sidebar-item">
        <Link to="/favourites">
          <div className="sidebar-item__icon">
            <HeartIcon/>
            {!!(favourites && favourites.length > 0) &&
            <span className="sidebar-item__badge">{favourites.length}</span>
            }
          </div>
        </Link>
      </li>
      </React.Fragment>
    }

    return (
      <div className="navbar-menu">
        <NavbarToggleButton onClick={this.toggleNavbar} isOpen={!collapsed} isMobile={isMobile}/>

        {/* sm only navbar */}
        <ul className={`navbar-menu__navbar-sm ${logoClassName}`}>
          {collapsed
            ? (
              <React.Fragment>
                <Link to='/'><li>
                  <svg width="158" height="34" viewBox="0 0 158 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M85.0234 9.93917C85.0234 8.99654 85.2393 8.12894 85.6711 7.33638C86.1076 6.53913 86.7173 5.90602 87.5002 5.43705C88.2878 4.96339 89.1608 4.72656 90.1192 4.72656C90.5605 4.72656 90.9685 4.76642 91.3433 4.84615C91.7182 4.92588 92.0645 5.04546 92.3824 5.20491C92.7003 5.36436 92.9826 5.53554 93.2294 5.71844C93.4808 5.89664 93.7513 6.11706 94.0407 6.37968L93.5496 6.88617C93.0562 6.41251 92.5366 6.04671 91.991 5.78878C91.4454 5.53085 90.8167 5.40188 90.105 5.40188C89.5024 5.40188 88.9354 5.51912 88.404 5.75361C87.8726 5.98809 87.4171 6.30699 87.0376 6.71031C86.658 7.10893 86.3567 7.58963 86.1337 8.15239C85.9154 8.71047 85.8063 9.30606 85.8063 9.93917C85.8063 10.5676 85.9178 11.1632 86.1408 11.7259C86.3638 12.284 86.6651 12.7647 87.0447 13.168C87.429 13.5713 87.8868 13.8902 88.4183 14.1247C88.9544 14.3592 89.5214 14.4765 90.1192 14.4765C90.8262 14.4765 91.4525 14.3475 91.9981 14.0896C92.5438 13.8316 93.0894 13.4377 93.635 12.9078L94.1475 13.4002C93.5544 13.977 92.9423 14.4155 92.3113 14.7156C91.6802 15.0111 90.94 15.1588 90.0908 15.1588C89.1371 15.1588 88.2712 14.929 87.493 14.4694C86.7149 14.0051 86.1076 13.3767 85.6711 12.5842C85.2393 11.7869 85.0234 10.9052 85.0234 9.93917Z" fill="white"/>
                    <path d="M95.9412 14.9829V4.89539H100.226C100.838 4.89539 101.39 4.9845 101.884 5.16271C102.382 5.34091 102.788 5.58478 103.101 5.8943C103.613 6.40079 103.87 7.0339 103.87 7.79363C103.87 8.60964 103.597 9.26385 103.051 9.75627C102.505 10.2487 101.782 10.5559 100.88 10.6778L104.247 14.9829H103.286L100.034 10.8044H96.6956V14.9829H95.9412ZM96.6956 10.1291H100.14C101.018 10.1291 101.732 9.92276 102.282 9.51006C102.838 9.09268 103.115 8.52053 103.115 7.79363C103.115 7.10893 102.857 6.57196 102.339 6.18272C101.822 5.78878 101.103 5.59181 100.183 5.59181H96.6956V10.1291Z" fill="white"/>
                    <path d="M106.183 14.9829V4.89539H113.442V5.59181H106.937V9.55227H112.787V10.2417H106.937V14.2936H113.513V14.9829H106.183Z" fill="white"/>
                    <path d="M114.781 14.9829L119.535 4.82505H120.261L125.015 14.9829H124.182L122.887 12.1621H116.866L115.571 14.9829H114.781ZM117.186 11.4797H122.567L119.883 5.64809L117.186 11.4797Z" fill="white"/>
                    <path d="M124.844 5.59181V4.89539H132.716V5.59181H129.157V14.9829H128.396V5.59181H124.844Z" fill="white"/>
                    <path d="M134.83 14.9829V4.89539H135.591V14.9829H134.83Z" fill="white"/>
                    <path d="M137.563 4.89539H138.41L142.403 14.174L146.409 4.89539H147.214L142.723 15.0533H142.054L137.563 4.89539Z" fill="white"/>
                    <path d="M149.079 14.9829V4.89539H156.338V5.59181H149.833V9.55227H155.683V10.2417H149.833V14.2936H156.409V14.9829H149.079Z" fill="white"/>
                    <path d="M85.4718 29.3897V19.3022H86.1835L90.2829 25.2675L94.3752 19.3022H95.094V29.3897H94.3325V20.6317L90.2971 26.4352H90.2402L86.1977 20.6317V29.3897H85.4718Z" fill="white"/>
                    <path d="M96.959 29.3897L101.713 19.2318H102.439L107.193 29.3897H106.361L105.065 26.5689H99.0442L97.7489 29.3897H96.959ZM99.3645 25.8865H104.745L102.062 20.0549L99.3645 25.8865Z" fill="white"/>
                    <path d="M109.058 29.3897V19.3022H113.343C113.955 19.3022 114.507 19.3913 115.001 19.5695C115.499 19.7477 115.905 19.9916 116.218 20.3011C116.73 20.8076 116.987 21.4407 116.987 22.2004C116.987 23.0164 116.714 23.6706 116.168 24.163C115.622 24.6555 114.899 24.9626 113.997 25.0846L117.364 29.3897H116.403L113.15 25.2112H109.813V29.3897H109.058ZM109.813 24.5359H113.257C114.135 24.5359 114.849 24.3295 115.399 23.9168C115.955 23.4995 116.232 22.9273 116.232 22.2004C116.232 21.5157 115.974 20.9787 115.456 20.5895C114.939 20.1956 114.22 19.9986 113.3 19.9986H109.813V24.5359Z" fill="white"/>
                    <path d="M119.3 29.3897V19.3022H120.054V25.9287L126.559 19.3022H127.591L123.136 23.755L127.783 29.3897H126.794L122.595 24.2897L120.054 26.8221V29.3897H119.3Z" fill="white"/>
                    <path d="M129.428 29.3897V19.3022H136.687V19.9986H130.182V23.959H136.032V24.6484H130.182V28.7003H136.758V29.3897H129.428Z" fill="white"/>
                    <path d="M138.175 19.9986V19.3022H146.046V19.9986H142.488V29.3897H141.726V19.9986H138.175Z" fill="white"/>
                    <path d="M3.49815 0H73.4613V34H0L3.49815 0Z" fill="white"/>
                    <path d="M18.1891 16.9324C18.1891 23.908 22.4696 29.4156 22.3272 29.3732C16.1157 27.3959 12.2891 24.0099 12.2891 17.0342C12.2891 10.0586 18.1891 4.8905 23.1548 4.69532C23.3061 4.68684 18.1891 9.95676 18.1891 16.9324Z" fill="#F82462"/>
                    <path d="M61.4556 4.69542H56.2764V29.3732H61.4556V4.69542Z" fill="#F82462"/>
                    <path d="M45.9714 17.6538V26.7595L32.7207 4.69542H38.336L45.9714 17.6538Z" fill="#F82462"/>
                  </svg>
                </li></Link>

                {output}
              </React.Fragment>
            ) : isMobile ? (
              <React.Fragment>
                <NavbarDropdown onCloseMenu={this.toggleNavbar}/>
              </React.Fragment>
            ) : null
          }
        </ul>
        {/* sm only navbar end */}

        <CollapseMenu isOpen={!collapsed}>
          <Container>
            <Row>
              <Col xs={24} lg={12}>
                <ul className="menu-links-wrapper">
                  <li className="animated-menu-item menu-item-sm">
                    <Link to="/rent-gear?type=all">
                      <h2 onClick={this.toggleNavbar} >
                        Rent Gear
                      </h2>
                    </Link>
                  </li>
                  {isAuthenticated &&
                  <li className="animated-menu-item menu-item-sm with-mb">
                    <Link to="/add-gear">
                      <h2 onClick={this.toggleNavbar} >
                        Add Gear
                      </h2>
                    </Link>
                  </li>}
  
                  <li className="animated-menu-item menu-item-lg">
                    <Link to="/rent-gear?type=all" onClick={this.toggleNavbar} >
                      <span className="dash"/>
                      Rent Gear
                    </Link>
                  </li>
                  {isAuthenticated &&
                  <li className="animated-menu-item menu-item-lg">
                    <Link to="/add-gear" onClick={this.toggleNavbar} >
                      <span className="dash"/>
                      Add Gear
                    </Link>
                  </li>}
                  
                  <li className="animated-menu-item">
                    <Link to="/about-us" onClick={this.toggleNavbar} >
                      <span className="dash"/>
                      About Us
                    </Link>
                  </li>
                  <li className="animated-menu-item">
                    <Link to="/faq" onClick={this.toggleNavbar} >
                      <span className="dash"/>
                      FAQ
                    </Link>
                  </li>
                </ul>
              </Col>

              <Col xs={24} lg={12}>
                <ul className="menu-info-wrapper">
                  <li className="menu-info-item animated-menu-item">
                    <span className="info__title">Address</span>
                    <h5 className="info__content">Katrinartun 2, Reykjavik, Iceland</h5>
                  </li>
                  <li className="menu-info-item animated-menu-item">
                    <span className="info__title">Phone</span>
                    <h5 className="info__content">
                      +354 787-0000<br />
                      +354 775-5666
                    </h5>
                  </li>
                  <li className="menu-info-item animated-menu-item">
                    <span className="info__title">Email</span>
                    <h5 className="info__content">
                      support@creative.market
                    </h5>
                  </li>
                  <li className="menu-info-item-links animated-menu-item">
                    <a href='https://www.facebook.com/thecreativemarket'><i className="fa fa-facebook-f"/></a>
                    <a href='https://www.instagram.com/therealcreativemarket'><i className="fab fa-instagram"/></a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </CollapseMenu>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  carts: store.cart.carts,
  favourites: store.favourite.favourites,
  isAuthenticated: store.user.isAuthenticated
});

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 768,
});

export default compose(
    withRouter,
    withSizes(mapSizesToProps),
    connect(mapStateToProps)
)(NavbarMenu);
