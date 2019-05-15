import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import withSizes from 'react-sizes'
import Transition from 'react-transition-group/Transition';

import { Container, Row, Col } from 'reactstrap';

import { addEndListener } from '../../../utils/animation';
import {
  animateMenuIn,
  animateMenuOut,
} from './NavbarMenu.animation';

import imgMenuIcon from './menu-icon.svg';
import imgMenuClose from './menu-close.svg';
import imgLogoSm from './logo-sm.png';
import NavbarDropdown from './NavbarDropdown';
import { CartIcon, HeartIcon } from "../IconComponent";
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

      <i className="fa fa-arrow-right"/>
    </div>
  </Transition>
);

const NavbarToggleButton = ({ onClick, isOpen }) => {
  return isOpen
    ? (
      <button className="button-toggle" onClick={onClick}>
        <img src={imgMenuClose} alt=""/>
        <span>Close</span>
      </button>
    )
    : (
      <button className="button-toggle" onClick={onClick}>
        <img src={imgMenuIcon} alt="Menu"/>
      </button>
    );
};

class NavbarMenu extends React.Component {
  state = {
    collapsed: true,
    scrolledDown: false
  };

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.handleScroll, 200, {trailing: true, leading: false}));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY >= 200) {
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
      location: {pathname}
    } = this.props;
    const isHome = pathname === '/home' || pathname === '/';
    const logoClassName = (!isHome || (isHome && (isMobile || scrolledDown))) ? 'visible-logo' : 'hidden-logo';

    let output = null;

    if (this.props.isAuthenticated === true) {
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
                <Link to='/home'><li>
                  <img className="navbar-sm__logo" src={imgLogoSm} alt="CreativeMarket"/>
                </li></Link>

                {output}
              </React.Fragment>
            ) : isMobile ? (
              <React.Fragment>
                <NavbarDropdown/>
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
                  {/* sm only menu */}
                  <li className="animated-menu-item menu-item-sm">
                    <Link to="/rentgear">
                      <h2 onClick={this.toggleNavbar} >
                        Rent Gear
                      </h2>
                    </Link>
                  </li>
                  <li className="animated-menu-item menu-item-sm with-mb">
                    <Link to="/addgear">
                      <h2 onClick={this.toggleNavbar} >
                        Add Gear
                      </h2>
                    </Link>
                  </li>
                  {/* sm only menu end */}

                  <li className="animated-menu-item">
                    <Link to="/aboutus" onClick={this.toggleNavbar} >
                      <span className="dash"/>
                      About Us
                    </Link>
                  </li>
                  {/*<li className="animated-menu-item">*/}
                    {/*<Link to="/Stories" onClick={this.toggleNavbar} >*/}
                      {/*<span className="dash"/>*/}
                      {/*Stories*/}
                    {/*</Link>*/}
                  {/*</li>*/}
                  <li className="animated-menu-item">
                    <Link to="/Partners" onClick={this.toggleNavbar} >
                      <span className="dash"/>
                      Partners
                    </Link>
                  </li>
                  <li className="animated-menu-item">
                    <Link to="/FAQ" onClick={this.toggleNavbar} >
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
                    <h5 className="info__content">Spring Store London Oxford</h5>
                  </li>
                  <li className="menu-info-item animated-menu-item">
                    <span className="info__title">Phone</span>
                    <h5 className="info__content">
                      +1 3456 7890 <br/>
                      +1 3456 7890
                    </h5>
                  </li>
                  <li className="menu-info-item animated-menu-item">
                    <span className="info__title">Email</span>
                    <h5 className="info__content">
                      support@creativemarket.com <br/>
                      info@creativemarket.com
                    </h5>
                  </li>
                  <li className="menu-info-item-links animated-menu-item">
                    <span className="fab fa-facebook-f"/>
                    <span className="fab fa-vimeo-v"/>
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
