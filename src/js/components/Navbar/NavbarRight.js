import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
    const { location } = this.props;
    let hideUser = ['/', '/home',].indexOf(location.pathname) > -1;
    return (
      <ul className="theme-nav-right">
        <li>
          <Link to="/listgear" >List Gear</Link>
        </li>
        <li>
          <Link to="/rentgear" >Rent Gear</Link>
        </li>
        <li>
          <button className="theme-btn theme-btn-outline-white ml-3 theme-btn-link">
            <Link to="/login">Login</Link>
          </button>
        </li>
        <li>
          <button className="theme-btn theme-btn-filled-white ml-3 theme-btn-link">
            <Link to="/register">Register</Link>
          </button>
        </li>
        {hideUser ? "" : <li>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              <div className="flex-row">
                <img src="/static/media/profile-pic.41adcd33.jpg"/>
                <div>Hello Markus</div>
              </div>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem><Link to="/dashboard">My Account</Link></DropdownItem>
              <DropdownItem>Logout</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </li>}
      </ul>
    );
  }
}

export default withRouter(NavbarRight);
