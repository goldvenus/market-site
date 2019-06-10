import React from 'react';
import {Container, Row, Col} from "reactstrap";
import PrivacyPolicyComponent from "./PrivacyPolicyComponent";

const PrivacyPolicy = () => (
  <div className="cart_view centered-content privacy-policy-container">
    <div className="privacy-policy-head">
      <Container>
        <Row>
          <Col>
            {/*<Breadcrumb className="theme-text-small">*/}
              {/*<BreadCrumbActive name="Home Page">Home </BreadCrumbActive>*/}
              {/*<span className="space_slash_span">/</span>*/}
              {/*<BreadcrumbItem active>Privacy Policy</BreadcrumbItem>*/}
            {/*</Breadcrumb>*/}
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