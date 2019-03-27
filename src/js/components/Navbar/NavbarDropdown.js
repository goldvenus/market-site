import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { logout } from '../../actions/app.actions';

const RightArrow = () => (
  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L7 7L1 13" stroke="white"/>
  </svg>
);

const DownArrow = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.7" d="M1 1L5 5L9 1" stroke="white"/>
  </svg>
);

const UpArrow = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 5L5 1L1 5" stroke="white"/>
  </svg>
);

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
    const { isAuthenticated, user } = this.props;
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
                    <Link to="/dashboard">My Account</Link>
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
  isAuthenticated: store.app.isAuthenticated,
  user: store.app.user,
});

export default withRouter(
  connect(mapStateToProps)(NavbarDropdown)
);
