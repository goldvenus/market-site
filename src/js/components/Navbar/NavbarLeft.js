import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo-2.png';

const CollapseMenu = props => {
  const className = props.isOpen ? "uncollapse" : "collapse";
  return <div className={`${className} theme-menu `}>
    <div className="wrraper theme-menu-content">
      {props.children}
    </div>
    <div className="theme-menu-bg"></div>
    <i className="fa fa-arrow-right"></i>
  </div>
};

const NavbarToggler = props =>{
  return <button className="button-toggle" onClick={props.onClick}>
    {props.isOpen ? <span className="fa fa-times "> Close</span> : <span className="fa fa-bars"></span>   }
  </button>

}
const NavbarBrand = props =>{
  return <img className="app-nav-logo" src={props.src}  alt={props.alt}/>
}
class NavbarLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }
  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { location} = this.props;
    let hideLogo = ['/','/home',].indexOf(location.pathname) > -1;

    const {collapsed} =this.state;
    return (
      <div className="theme-nav-left">
        <NavbarToggler onClick={this.toggleNavbar} className="ml-2" isOpen={!collapsed}/>
        {hideLogo ? "" : <NavbarBrand src={logo} />}
        <CollapseMenu isOpen={!collapsed} >
          <Container>
            <Row>
              <Col sm={{size: 4, offset: 2}}>
                <ul>
                  <li>
                    <Link to="/aboutus">About Us</Link>
                  </li>
                  <li>
                    <Link to="/Stories">Stories</Link>
                  </li>
                  <li>
                    <Link to="/Partners">Partners</Link>
                  </li>
                  <li>
                    <Link to="/FAQ">FAQ</Link>
                  </li>
                </ul>
              </Col>
              <Col sm="4">
                <p>
                  <span className="theme-text-small">Address</span><br />
                  Spring Store London Oxford
                  </p>
                <p>
                  <span className="theme-text-small">Phone</span><br />
                  +1 3456 7890 <br />
                  +1 3427 7670
                  </p>
                <p>
                  <span className="theme-text-small">Email</span><br />
                  support@creativemarket.com
                  info@creativemarket.com
                  </p>
                <p>
                  <span className="fab fa-facebook-f"></span>
                  <span className="fab fa-vimeo-v"></span>
                  <span className="fab fa-instagram"></span>
                </p>
              </Col>
            </Row>
          </Container>
        </CollapseMenu>
      </div>
    )
  }
}

export default withRouter(NavbarLeft);
