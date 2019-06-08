import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { logout } from '../../core/actions/user.action';
import {DownArrow, RightArrow, UpArrow} from "../common/IconComponent";

class NavbarDropdown extends React.PureComponent {
  state = {
    isDropdownOpen: false
  };

  toggleDropdown = () => {
    this.setState(prevState => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  render() {
    const { isAuthenticated, user, onCloseMenu } = this.props;
    const { isDropdownOpen } = this.state;

    return (
      <React.Fragment>
        {isAuthenticated
          ? (
            <li className="navbar-drop-menu logged-in">
              <ButtonDropdown isOpen={isDropdownOpen} toggle={this.toggleDropdown}>
                <DropdownToggle className="dropdown-toggle">
                  <div className="flex-row">
                    {user.picture
                      ? <img src={user.picture} alt=""/>
                      : <img src={'/images/avatar.png'} alt=""/>
                    }
                    <div>Hello <span>{user.given_name}</span></div>
                    {isDropdownOpen
                      ? <UpArrow/>
                      : <DownArrow/>
                    }
                  </div>
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem>
                    <RightArrow/>
                    <Link to="/dashboard" onClick={onCloseMenu}>My Account</Link>
                  </DropdownItem>

                  <DropdownItem>
                    <RightArrow/>
                    <Link to="/messages" onClick={onCloseMenu}>Messages</Link>
                  </DropdownItem>

                  <DropdownItem onClick={() => {
                    logout();
                    this.props.history.push('/');
                  }}
                  >
                    <RightArrow/>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </li>
          ) : (
            <li className="navbar-drop-menu">
              <button className="theme-btn theme-btn-filled-white ml-3 theme-btn-link theme-nav__btn">
                <Link to="/login">Login</Link>
              </button>
              <button className="theme-btn theme-btn-outline-pink ml-3 theme-btn-link theme-nav__btn">
                <Link to="/register">Register</Link>
              </button>
            </li>
          )
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  isAuthenticated: store.user.isAuthenticated,
  user: store.user.user,
});

export default withRouter(
  connect(mapStateToProps)(NavbarDropdown)
);
