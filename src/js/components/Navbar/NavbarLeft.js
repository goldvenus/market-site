import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Transition from 'react-transition-group/Transition';

import { addEndListener } from '../../utils/animation';
import {
  animateMenuIn,
  animateMenuOut,
} from './NavbarMenu.animation';

import imgMenuIcon from './menu-icon.svg';
import imgMenuClose from './menu-close.svg';

const CollapseMenu = ({ isOpen, children }) => {
  // const className = isOpen ? 'open' : 'closed';

  return (
    <Transition
      in={isOpen}
      addEndListener={addEndListener}
      onEnter={animateMenuIn}
      onExit={animateMenuOut}
      unmountOnExit
    >
      <div className="theme-menu">
        <div className="theme-menu-inner-wrapper">
          <div className="wrraper theme-menu-content">
            {children}
          </div>
          <div className="animated-bg">
            <div className="theme-menu-bg"/>
          </div>
          <i className="fa fa-arrow-right"/>
        </div>
      </div>
    </Transition>
  );
};

const NavbarToggler = ({ onClick, isOpen }) => {
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

const NavbarBrand = props => {
  return <img className="app-nav-logo" src={props.src} alt={props.alt}/>;
};

class NavbarLeft extends React.Component {
  state = {
    collapsed: true,
  };

  toggleNavbar = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  render() {
    // const { location } = this.props;
    // let hideLogo = ''; //['/','/home',].indexOf(location.pathname) > -1;

    const { collapsed } = this.state;
    return (
      <div className="theme-nav-left">
        <NavbarToggler onClick={this.toggleNavbar} className="ml-2" isOpen={!collapsed}/>
        <CollapseMenu isOpen={!collapsed}>
          <Container>
            <Row>
              <Col sm={{ size: 4, offset: 2 }}>
                <ul>
                  <li className="animated-menu-item">
                    <Link to="/aboutus">About Us</Link>
                  </li>
                  <li className="animated-menu-item">
                    <Link to="/Stories">Stories</Link>
                  </li>
                  <li className="animated-menu-item">
                    <Link to="/Partners">Partners</Link>
                  </li>
                  <li className="animated-menu-item">
                    <Link to="/FAQ">FAQ</Link>
                  </li>
                </ul>
              </Col>
              <Col sm="4">
                <p className="animated-menu-item">
                  <span className="theme-text-small">Address</span><br/>
                  Spring Store London Oxford
                </p>
                <p className="animated-menu-item">
                  <span className="theme-text-small">Phone</span><br/>
                  +1 3456 7890 <br/>
                  +1 3427 7670
                </p>
                <p className="animated-menu-item">
                  <span className="theme-text-small">Email</span><br/>
                  support@creativemarket.com
                  info@creativemarket.com
                </p>
                <p className="animated-menu-item">
                  <span className="fab fa-facebook-f"/>
                  <span className="fab fa-vimeo-v"/>
                  <span className="fab fa-instagram"/>
                </p>
              </Col>
            </Row>
          </Container>
        </CollapseMenu>
      </div>
    );
  }
}

export default withRouter(NavbarLeft);
