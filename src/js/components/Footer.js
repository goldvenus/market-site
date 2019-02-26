import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col } from 'reactstrap'
import logo from '../../assets/images/logo-1.png';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer >
        <div className="news-letter mb-5 py-5">
          <Container>
            <Row className="align-items-center">
              <Col sm="6">
                <h5>EMAIL NEWSLETTERS</h5>
                <p className="theme-text-small">Keep me up to date with content ,updates ,and offers from Athena</p>
                <div className="theme-form-group">
                  <input placeholder="Your email..." className="theme-form-control" />
                  <button className="theme-btn theme-btn-primary">Subscribe</button>
                </div>
              </Col>
              <Col sm="3" className="text-xs-center mt-xs">
                <h3 className="theme-text-primary">12233</h3>
                <p>Community Members</p>
              </Col>
              <Col sm="3" className="text-xs-center">
                <h3 className="theme-text-primary">2143</h3>
                <p>Products</p>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="footer-nav">
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
              <div  className=" col d-flex align-items-center justify-content-center justify-content-sm-end">
                <button className="theme-btn theme-btn-secondery">Login</button> &nbsp;
                <button className="theme-btn theme-btn-primary">Register</button>
              </div>
            </div>
          </Container>
        </div>
        <hr className="hr-light mb-5" />
        <div className="Social-contects mb-3">
          <Container>
            <div className="row">
              <div className="col">
                <div className="social-buttons">
                <button className="theme-btn btn-social btn-fb">
                    <span style={{marginRight:41}} className="fab fa-facebook-f"/>
                    Facebook</button> &nbsp;
                    <button className="theme-btn btn-social btn-vimeo">
                    <span style={{marginRight:56}} className="fab fa-vimeo-v"/>
                    Vimeo</button> &nbsp;
                    <button className="theme-btn btn-social btn-insta">
                    <span style={{marginRight:33}} className="fab fa-instagram"/>
                    Instagram</button>
                </div>
              </div>
              <div className="col">
                <div className="email" style={{ marginRight: -80 }}>
                  <img src={'/images/email_icon.png'} style={{ width: 44, height: 33, marginTop: 4 }} alt="" />&nbsp;&nbsp;
                  <p className="theme-text-small">
                    support@creativemarket.com
                    <br />
                    info@creativemarket.com
                  </p>
                </div>
              </div>
              <div className="col">
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
              <Col>
                <ul className="nav justify-content-end">
                  <li className="nav-item">
                    <a className="nav-link" href="#">Privacy Policy</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Terms &amp; Condition</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Partners</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Help</a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Footer);
