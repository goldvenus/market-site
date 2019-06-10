import React from 'react';
import {Container, Row, Col} from "reactstrap";
import WebsiteTermsComponent from "./WebsiteTermsComponent";

const PrivacyPolicy = () => (
  <div className="cart_view centered-content privacy-policy-container">
    <div className="privacy-policy-head">
      <Container>
        <Row>
          <Col>
            {/*<Breadcrumb className="theme-text-small">*/}
              {/*<BreadCrumbActive name="Home Page">Home </BreadCrumbActive>*/}
              {/*<span className="space_slash_span">/</span>*/}
              {/*<BreadcrumbItem active>Terms and Conditions</BreadcrumbItem>*/}
            {/*</Breadcrumb>*/}
            <h2>Website Terms and conditions</h2>
          </Col>
        </Row>
      </Container>
    </div>
    <div className="terms-conditions-body">
      <WebsiteTermsComponent/>
    </div>
  </div>
);

export default PrivacyPolicy;