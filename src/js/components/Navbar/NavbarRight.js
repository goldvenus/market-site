import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {logout} from '../../actions/app.actions';

class NavbarRight extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const { location, isAuthenticated, user } = this.props;
    return (
      <ul className="theme-nav-right theme-text-small">
        <li>
          <Link to="/listgear" >List Gear</Link>
        </li>
        <li>
          <Link to="/rentgear" >Rent Gear</Link>
        </li>
        {isAuthenticated ? <li>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              <div className="flex-row">
                {user.picture ? <img src={user.picture} /> : <img src={'/images/avatar.png'} /> }
                <div>{user.given_name}</div>
              </div>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem><Link to="/dashboard">My Account</Link></DropdownItem>
              <DropdownItem onClick={logout}>Logout</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </li> : <li>
          <button className="theme-btn theme-btn-outline-pink ml-3 theme-btn-link">
            <Link to="/login">Login</Link>
          </button>
          <button className="theme-btn theme-btn-filled-white ml-3 theme-btn-link">
            <Link to="/register">Register</Link>
          </button>
        </li>}
      </ul>
    );
  }
}

export default withRouter(connect((store) => {
  return {
    isAuthenticated: store.app.isAuthenticated,
    user: store.app.user,
  };
})(NavbarRight));
