import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavbarDropdown from './NavbarDropdown';
 
class NavbarRight extends Component {
  render() {
    return (
      <ul className="navbar-right theme-text-small">
        <li>
          <Link to="/listgear">List Gear</Link>
        </li>
        <li>
          <Link to="/rentgear">Rent Gear</Link>
        </li>

        <NavbarDropdown/>
      </ul>
    );
  }
}

const mapStateToProps = store => ({
  isAuthenticated: store.app.isAuthenticated,
  user: store.app.user,
});

export default withRouter(
  connect(mapStateToProps)(NavbarRight)
);
