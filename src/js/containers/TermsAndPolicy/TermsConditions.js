import React, {Component} from 'react';
import {Container, Row, Col } from "reactstrap";
import WebsiteTermsComponent from "./WebsiteTermsComponent";
import RentalTermsComponent from "./RentalTermsComponent";

class TermsConditions extends Component {
  
  componentWillReceiveProps(props) {
    this.forceUpdate();
  }
  
  render() {
    let path = this.props.location.pathname;
    return (
      <div className="cart_view centered-content privacy-policy-container">
        <div className="privacy-policy-head">
          <Container>
            <Row>
              <Col>
                <h2>{path === '/terms-condition' ? 'Website Terms of Use' : 'Terms of Use'}</h2>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="terms-conditions-body">
          {path === '/terms-condition' ? <WebsiteTermsComponent/> : <RentalTermsComponent/>}
        </div>
      </div>
    );
  }
}

export default TermsConditions;