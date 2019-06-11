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
    console.log(path);
    return (
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
                <h2>{path === '/terms-condition' ? 'Terms & Conditions' : 'Terms of Use'}</h2>
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