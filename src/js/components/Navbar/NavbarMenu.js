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
import {CartIcon, CloseIcon, HeartIcon, OpenIcon} from "../common/IconComponent";
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

const NavbarToggleButton = ({ onClick, isOpen }) => {
  return isOpen
    ? (
      <button className="button-toggle" onClick={onClick}>
        <CloseIcon/>
        <span>Close</span>
      </button>
    )
    : (
      <button className="button-toggle" onClick={onClick}>
        <OpenIcon/>
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
        <NavbarToggleButton onClick={this.toggleNavbar} isOpen={!collapsed}/>

        {/* sm only navbar */}
        <ul className={`navbar-menu__navbar-sm ${logoClassName}`}>
          {collapsed
            ? (
              <React.Fragment>
                <Link to='/'><li>
                  <img className="navbar-sm__logo" src="/images/logo-small.svg" alt="CreativeMarket"/>
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
                  {isAuthenticated ?
                  <React.Fragment>
                    <li className="animated-menu-item menu-item-sm">
                      <Link to="/rent-gear?type=all">
                        <h2 onClick={this.toggleNavbar} >
                          Rent Gear
                        </h2>
                      </Link>
                    </li>
                    <li className="animated-menu-item menu-item-sm with-mb">
                      <Link to="/add-gear">
                        <h2 onClick={this.toggleNavbar} >
                          Add Gear
                        </h2>
                      </Link>
                    </li>
                  </React.Fragment> : null}
  
                  <li className="animated-menu-item menu-item-lg">
                    <Link to="/rent-gear?type=all" onClick={this.toggleNavbar} >
                      <span className="dash"/>
                      Rent Gear
                    </Link>
                  </li>
                  <li className="animated-menu-item menu-item-lg">
                    <Link to="/add-gear" onClick={this.toggleNavbar} >
                      <span className="dash"/>
                      Add Gear
                    </Link>
                  </li>
                  
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
                    <span className="fa fa-facebook-f"/>
                    <span className="fab fa-instagram"/>
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
