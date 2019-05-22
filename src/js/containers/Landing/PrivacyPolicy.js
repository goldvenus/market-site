import React from 'react';
import {Container, Row, Col, Breadcrumb, BreadcrumbItem} from "reactstrap";
import BreadCrumbActive from "../../components/BreadCrumbActive";
import PrivacyPolicyComponent from "../../components/PrivacyPolicyComponent";

const PrivacyPolicy = () => (
  <div className="cart_view centered-content privacy-policy-container">
    <div className="privacy-policy-head">
      <Container>
        <Row>
          <Col>
            <Breadcrumb className="theme-text-small">
              <BreadCrumbActive name="Home Page">Home </BreadCrumbActive>
              <span className="space_slash_span">/</span>
              <BreadcrumbItem active>Privacy Policy</BreadcrumbItem>
            </Breadcrumb>
            <h2>Privacy and Cookie Policy</h2>
          </Col>
        </Row>
      </Container>
    </div>
    <div className="privacy-policy-body">
      <PrivacyPolicyComponent/>
    </div>
  </div>
);

export default PrivacyPolicy;