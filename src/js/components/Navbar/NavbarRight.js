import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavbarDropdown from './NavbarDropdown';

const NavbarRight = ({ isAuthenticated }) => (
  <ul className="navbar-right theme-text-small">
    {isAuthenticated &&
      <React.Fragment>
        <li>
          <Link to="/rent-gear?type=all">Rent Gear</Link>
        </li>
        <li>
          <Link to="/add-gear">Add Gear</Link>
        </li>
      </React.Fragment>}
    <NavbarDropdown/>
  </ul>
);

const mapStateToProps = store => ({
  isAuthenticated: store.user.isAuthenticated,
  user: store.user.user,
});

export default withRouter(
  connect(mapStateToProps)(NavbarRight)
);
