import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Transition from 'react-transition-group/Transition';

import { Container, Row, Col } from 'reactstrap';

import { addEndListener } from '../../utils/animation';
import imgLogo from './logo-sm.png';
import {
  animateMenuIn,
  animateMenuOut,
} from './NavbarMenu.animation';

import imgMenuIcon from './menu-icon.svg';
import imgMenuClose from './menu-close.svg';
import imgLogoSm from './logo-sm.png';
import NavbarDropdown from './NavbarDropdown';

const CartIcon = () => (
  <svg className="svg-icon icon-cart" width="36" height="28" viewBox="0 0 36 28" fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M31 3.5H4.06188C2.04346 3.5 0.600954 5.4531 1.19454 7.38226L3.34839 14.3823C3.7357 15.641 4.89871 16.5 6.21572 16.5H26M31 3.5L26 16.5M31 3.5H33.1537C33.6648 3.5 34.1245 3.18881 34.3143 2.71424V2.71424C34.6427 1.89316 34.038 1 33.1537 1H32.189C31.7438 1 31.3127 1.15609 30.9707 1.4411L28.5 3.5M26 16.5L25.23 18.5534C24.7909 19.7243 23.6715 20.5 22.421 20.5H6"
      stroke="#F82462" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
    <circle cx="8.5" cy="25.5" r="1.5" stroke="#F82462" strokeWidth="2"/>
    <circle cx="20.5" cy="25.5" r="1.5" stroke="#F82462" strokeWidth="2"/>
  </svg>
);

const HeartIcon = () => (
  <svg className="svg-icon icon-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
    />
  </svg>
);

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
  };

  toggleNavbar = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  render() {
    const { collapsed } = this.state;

    console.log(collapsed)

    const {
      carts,
      favourites,
    } = this.props;

    let output = null

    if(this.props.isAuthenticated === true) {
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
            {!!(favourites && favourites.Items && favourites.Items.length > 0) &&
            <span className="sidebar-item__badge">{favourites.Items.length}</span>
            }
          </div>
        </Link>
      </li>
      </React.Fragment>
    }

    return (
      <div className="navbar-menu">
        {/* sm only navbar */}

        <ul className="navbar-menu__navbar-sm">

          {collapsed
            ? (
              <React.Fragment>
                <Link to='/home'><li>
                  <img className="navbar-sm__logo" src={imgLogoSm} alt="CreativeMarket"/>
                </li></Link>

                {output}
              </React.Fragment>
            )
            : (
              <React.Fragment>
                <NavbarDropdown/>
              </React.Fragment>
            )
          }
        </ul>
        {/* sm only navbar end */}

        <NavbarToggleButton onClick={this.toggleNavbar} isOpen={!collapsed}/>

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
                    <Link to="/listgear">
                      <h2 onClick={this.toggleNavbar} >
                        List Gear 
                        
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
                  <li className="animated-menu-item">
                    <Link to="/Stories" onClick={this.toggleNavbar} >
                      <span className="dash"/>
                      Stories
                    </Link>
                  </li>
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
  error: store.app.error,
  carts: store.app.carts,
  favourites: store.app.favourites,
  isAuthenticated: store.app.isAuthenticated
});

export default withRouter(connect(mapStateToProps)(NavbarMenu));
