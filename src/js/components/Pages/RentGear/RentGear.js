import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Sidebar from '../../Rent Gear/RG_sidebar';
import Main from '../../Rent Gear/RG_main';

import { rentGearProductList } from '../../../actions/app.actions';

class RentGear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catagory: ''
    };
  }

  selectedCategory = (value) => {
    this.setState({
      catagory: value
    });

    rentGearProductList({
      categoryName: value,
      product_region: '',
      brand: ''
    });
  };

  render() {
    return (
      <div className="rent-gear">
        <div className="rent-gear-head">
          <Container>
            <Row>
              <Col >
                <Breadcrumb >
                <BreadcrumbItem>Home Page</BreadcrumbItem>
                  <BreadcrumbItem active>Rent Gear</BreadcrumbItem>
                </Breadcrumb>
                <div className="d-flex align-items-center">
                  <h2 className="theme-page-title rent-gear-title">Rent Gear</h2>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="rent-gear-body">
          <Container>
            <Row>
              <Col md="6 d-none d-lg-flex">
                <Sidebar callback={this.selectedCategory}/>
              </Col>
              <Col md="18" className="cardz-2">
                <Main catagory={this.state.catagory}/>
              </Col>
              <Row className="d-flex d-lg-none down-sidbar">
                <Sidebar callback={this.selectedCategory}/>
              </Row>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default RentGear;
