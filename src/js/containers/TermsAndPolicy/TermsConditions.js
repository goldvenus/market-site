import React, {Component} from 'react';
import {Container, Row, Col, Breadcrumb, BreadcrumbItem} from "reactstrap";
import BreadCrumbActive from "../../components/BreadCrumbActive";
import WebsiteTermsComponent from "./WebsiteTermsComponent";
import RentalTermsComponent from "./RentalTermsComponent";

class TermsConditions extends Component {
  
  componentWillReceiveProps(props) {
    this.forceUpdate();
  }
  
  render() {
    let id = 1*this.props.match.params.id;
    
    return (
      <div className="cart_view centered-content privacy-policy-container">
        <div className="privacy-policy-head">
          <Container>
            <Row>
              <Col>
                <Breadcrumb className="theme-text-small">
                  <BreadCrumbActive name="Home Page">Home </BreadCrumbActive>
                  <span className="space_slash_span">/</span>
                  <BreadcrumbItem active>Terms and Conditions</BreadcrumbItem>
                </Breadcrumb>
                <h2>{id === 2 ? 'Rental' : 'Website'} Terms and conditions</h2>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="terms-conditions-body">
          {id === 1 ? <WebsiteTermsComponent/> : <RentalTermsComponent/>}
        </div>
      </div>
    );
  }
}

export default TermsConditions;