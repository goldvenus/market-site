import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom';
import withSizes from "react-sizes";
import {compose} from "redux";

class Footer extends Component {
  render() {
    const { isMobile } = this.props;
    let isAddGear = this.props.location.pathname.indexOf('/add-gear') >= 0;
    
    return (
      <React.Fragment>
        <footer style={isAddGear && isMobile ? {paddingBottom: '70px'} : {}}>
          <div className="Social-contects mb-3 footer-top-container">
            <Container>
              <div className="row footer-top-wrapper">
                <div>
                  <Link to='/'><img className='logo-img' src='/images/logo-small-bottom.svg' alt=''/></Link>
                </div>
                <div>
                  <img src='/images/Emails.png' alt=''/>
                  <a className='email' href='mailto:support@creative.market'>support@creative.market</a>
                </div>
                <div>
                  <a href='https://www.facebook.com/thecreativemarket'><i className='fa fa-facebook'/></a>
                  <a href='https://www.instagram.com/therealcreativemarket'><i className="fa fa-instagram"/></a>
                </div>
              </div>
            </Container>
          </div>
          <div className="footer-bottom bg-gray-light">
            <Container>
              <Row>
                <div className='col-6'>
                  <div className="copyright">
                    <p>© 2019 Creative Market - Ketchup Creative ehf.</p>
                  </div>
                </div>
                <div className="footer-privaci-policy col-12">
                  <ul className="nav justify-content-end d-none d-md-flex">
                    <li className="nav-item">
                      <Link className="nav-link" to='/privacy'>Privacy and Cookies</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/terms-use'>Terms of Service</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/terms-condition'>Website Terms of Use</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/terms-payment'>Payment Terms of Service</Link>
                    </li>
                  </ul>
                </div>
                <div className='col-6 mango-logo'>
                  <div>
                    <img src="/images/powered-by-mangopay.png"/>
                  </div>
                </div>
              </Row>
            </Container>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 768,
});

export default compose(
  withSizes(mapSizesToProps),
  connect(mapStateToProps)
)(Footer);
