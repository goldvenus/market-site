import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col } from 'reactstrap'
import logo from '../../assets/images/logo-1.png';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer >
        <div className="news-letter bg-gray-light mb-5 py-5">
          <Container>
            <Row >
              <Col sm="6">
                <h5>EMAIL NEWSLETTERS</h5>
                <p className="theme-text-small">Keep me up to date with content ,updates ,and offers from Athena</p>
                <div className="theme-form-group">
                  <input placeholder="Your email..." className="theme-form-control" />
                  <button className="theme-btn theme-btn-primary">Subscribe</button>
                </div>
              </Col>
              <Col sm="3" className="text-center">
                <h3 className="theme-text-primary">12233</h3>
                <p>Community Memmbers</p>
              </Col>
              <Col sm="3" className="text-center">
                <h3 className="theme-text-primary">2143</h3>
                <p>Products</p>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="footer-nav">
          <Container>
            <Row>
              <Col sm="3">
                <img src={logo} alt="logo"></img>
              </Col>
              <Col sm="5">
                <ul className="nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="#">About us</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">Stories</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">Blog</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to="#">Contects</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to="#">FQAs</Link>
                  </li>
                </ul>
              </Col>
              <Col sm="4" className="text-right">
                <button className="theme-btn theme-btn-secondery">Login</button> &nbsp;
                <button className="theme-btn theme-btn-primary">Register</button>
              </Col>
            </Row>
          </Container>
        </div>
        <hr className="hr-light mb-5" />
        <div className="Social-contects mb-3">
          <Container>
            <Row>
              <Col sm="6">
                <button className="theme-btn btn-social btn-fb">
                  <span className="fa fa-facebook"></span>
                  Facebook</button> &nbsp;
                <button className="theme-btn btn-social btn-vimeo">
                  <span className="fa fa-vimeo"></span>
                  Vimeo</button> &nbsp;
                <button className="theme-btn btn-social btn-insta">
                  <span className="fa fa-instagram"></span>
                  Instagram</button>
              </Col>
              <Col sm="3">
                <div className="email">
                  <span className="fa fa-envelope-o"></span>&nbsp;
                  <p className="theme-text-small">
                    support@creativemarket.com
                    <br />
                    info@creativemarket.com
                  </p>
                </div>
              </Col>
              <Col sm="3">
                <div className="phone">
                  <span className="fa fa-phone"></span>
                  <p className="theme-text-small">
                    +1 3456 7890<br/>
                    +1 3427 7670
                  </p>
                </div>
              </Col>
            </Row>
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
