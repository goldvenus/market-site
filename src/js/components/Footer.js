import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col } from 'reactstrap'
import logo from '../../assets/images/logo-1.png';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <React.Fragment>
        <footer >
          <div className="news-letter mb-5 py-5">
            <Container className="news-letter-container">
              <Row className="align-items-center">
                <Col sm="12">
                  <h5>EMAIL NEWSLETTERS</h5>
                  <p className="theme-text-small">Keep me up to date with content ,updates ,and offers from Athena</p>
                  <div className="theme-form-group d-none d-md-flex">
                    <input placeholder="Your email..." className="theme-form-control" />
                    <button className="theme-btn theme-btn-primary subscribe-btn">Subscribe</button>
                  </div>
                  <div className="theme-form-group d-flex d-sm-none">
                    <input placeholder="Your email..." className="theme-form-control" />
                    <button className="theme-btn theme-btn-primary subscribe-btn"><i className="fas fa-arrow-right"></i></button>
                  </div>
                </Col>
                <Col sm="6" className="text-xs-center mt-xs">
                <hr className="hr-light mb-5 d-block d-sm-none"/>
                  <h3 className="theme-text-primary">12233</h3>
                  <p>Community Members</p>
                </Col>
                <Col sm="6" className="text-xs-center">
                  <h3 className="theme-text-primary">2143</h3>
                  <p>Products</p>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="footer-nav d-none d-lg-block">
            <Container style={{    marginTop: -35}}>
              <div className="row">
                <div className="col">
                  <img src={logo} alt="logo" className="logo"/>
                </div>
                <div className="row">
                  <ul className="nav text-xs-right">
                    <li className="nav-item">
                      <Link className="nav-link" to="#"><span style={{ fontSize: 16, color: '#252525' }}>About us</span></Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="#"><span style={{ fontSize: 16, color: '#252525' }}>Stories</span></Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="#"><span style={{ fontSize: 16, color: '#252525' }}>Blog</span></Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link " to="#"><span style={{ fontSize: 16, color: '#252525' }}>Contacts</span></Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link " to="#"><span style={{ fontSize: 16, color: '#252525' }}>FAQs</span></Link>
                    </li>
                  </ul>
                </div>
                {
                  !isAuthenticated ?
                  <div  className=" col d-flex align-items-center justify-content-center justify-content-sm-end">
                    <button className="theme-btn theme-btn-secondery">Login</button> &nbsp;
                    <button className="theme-btn theme-btn-primary">Register</button>
                  </div>
                  :
                  ""
                }
              </div>
            </Container>
          </div>
          <hr className="hr-light mb-5 d-sm-none d-block"/>
          <div className="Social-contects mb-3">
            <Container>
              <div className="row">
                <div className="col">
                  <div className="social-buttons">
                  <button className="theme-btn btn-social btn-fb">
                      <i className="fab fa-facebook-f"/>
                      <span>Facebook</span></button> &nbsp;
                      <button className="theme-btn btn-social btn-vimeo">
                      <i className="fab fa-vimeo-v"/>
                      <span>Vimeo</span></button> &nbsp;
                      <button className="theme-btn btn-social btn-insta">
                      <i className="fab fa-instagram"/>
                      <span>Instagram</span></button>
                  </div>
                </div>
                <div className="col d-none d-lg-flex">
                  <div className="email" style={{ marginRight: -80 }}>
                    <img src={'/images/email_icon.png'} style={{ width: 44, height: 33, marginTop: 4 }} alt="" />&nbsp;&nbsp;
                    <p className="theme-text-small">
                      support@creativemarket.com
                      <br />
                      info@creativemarket.com
                    </p>
                  </div>
                </div>
                <div className="col d-none d-lg-flex">
                  <div className="phone">
                    <img src={'/images/phone_icon.png'} style={{ width: 39, height: 38, marginTop: 4 }} alt="" />&nbsp;&nbsp;&nbsp;&nbsp;
                    <p className="theme-text-small">
                      +1 3456 7890<br />
                      +1 3427 7670
                    </p>
                  </div>
                </div>
              </div>
            </Container>
          </div>
          <div className="footer-bottom bg-gray-light">
            <Container>
              <Row>
                <Col>
                  <div className="copyright">
                    <p>© 2018 Creative Market - All Rights Reserved. Made by Ketchup Creative</p>
                  </div>
                </Col>
                <Col className="footer-privaci-policy">
                  <ul className="nav justify-content-end d-none d-md-flex">
                    <li className="nav-item">
                      <a className="nav-link" href='/localhost:3000'>Privacy Policy</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href='/localhost:3000'>Terms &amp; Condition</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href='/localhost:3000'>Partners</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href='/localhost:3000'>Help</a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </div>
        </footer>
        <div className='mobile-bottom-margin'></div>
      </React.Fragment>
    );
  }
}

export default connect((store) => {
  return {
    isAuthenticated: store.user.isAuthenticated
  };
})(Footer);
