import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo-2.png';

const CollapseMenu = props => {
  const className = props.isOpen ? "uncollapse" : "collapse";
  return <div className={className}>
    <div className="wrraper">
      {props.children}
    </div>
  </div>
};

const NavbarToggler = props =>{
  return <button className="button-toggle" onClick={props.onClick}>
    <span className="fa fa-bars"></span>
    {/* <span className="fa fa-window-close"></span>*/}
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
      <div>
        <NavbarToggler onClick={this.toggleNavbar} className="ml-2" />
        {hideLogo ? "" : <NavbarBrand src={logo} />}
        <CollapseMenu isOpen={!collapsed}>
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
                  <span className="theme-text-small text-gray">Address</span><br />
                  Spring Store London Oxford
                  </p>
                <p>
                  <span className="theme-text-small text-gray">Phone</span><br />
                  +1 3456 7890 <br />
                  +1 3427 7670
                  </p>
                <p>
                  <span className="theme-text-small text-gray">Email</span><br />
                  support@creativemarket.com
                  info@creativemarket.com
                  </p>
                <p>
                  <span className="fa fa-facebook"></span>
                  <span className="fa fa-vimeo"></span>
                  <span className="fa fa-instagram"></span>
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
