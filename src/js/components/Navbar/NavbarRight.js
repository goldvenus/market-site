import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavbarDropdown from './NavbarDropdown';
 
const NavbarRight = ({ isAuthenticated }) => (
  <ul className="navbar-right theme-text-small">
    {
      isAuthenticated ?
        <React.Fragment>
          <li>
            <Link to="/listgear">List Gear</Link>
          </li>
          <li>
            <Link to="/rentgear">Rent Gear</Link>
          </li>
        </React.Fragment>
        : null
    }
    <NavbarDropdown/>
  </ul>
)

const mapStateToProps = store => ({
  isAuthenticated: store.app.isAuthenticated,
  user: store.app.user,
});

export default withRouter(
  connect(mapStateToProps)(NavbarRight)
);
