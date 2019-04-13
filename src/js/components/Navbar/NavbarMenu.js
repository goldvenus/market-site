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
import { CartIcon, HeartIcon } from "../common/IconComponent";

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