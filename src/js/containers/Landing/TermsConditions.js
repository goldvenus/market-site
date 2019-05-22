import React from 'react';
import {Container, Row, Col, Breadcrumb, BreadcrumbItem} from "reactstrap";
import BreadCrumbActive from "../../components/BreadCrumbActive";

const PrivacyPolicy = () => (
  <div className="cart_view centered-content privacy-policy-container">
    <div className="privacy-policy-head">
      <Container>
        <Row>
          <Col>
            <Breadcrumb className="theme-text-small">
              <BreadCrumbActive name="Home Page">Home </BreadCrumbActive>
              <span className="space_slash_span">/</span>
              <BreadcrumbItem active>Terms and Conditoins</BreadcrumbItem>
            </Breadcrumb>
            <h2>Terms and conditions</h2>
          </Col>
        </Row>
      </Container>
    </div>
    <div className="privacy-policy-body">
      <Container>
        <Row>
          <Col>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

export default PrivacyPolicy;