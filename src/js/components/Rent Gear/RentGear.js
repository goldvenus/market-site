import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Container, Row, Col, Breadcrumb, Table, Form, ListGroup, ListGroupItem,
  BreadcrumbItem, Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';
import Sidebar from './RG_sidebar';
import Main from './RG_main';
import { rentGearProductList } from '../../actions/app.actions';

class RentGear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catagory: ""
    }
  }

  selectedCategory = (value) => {
    this.setState({
      catagory: value
    })

    rentGearProductList({
      categoryName: value,
      product_region: "",
      brand: ""
    });
  }

  render() {
    return (
      <div className="rent-gear">
        <div className="rent-gear-head">
          <Container>
            <Row>
              <Col>
                <Breadcrumb>
                  <BreadcrumbItem>Home Page</BreadcrumbItem>
                  <BreadcrumbItem active>Rent Gear</BreadcrumbItem>
                </Breadcrumb>
                <div className="d-flex align-items-center">
                  <h2 className="theme-page-title">Rent Gear</h2>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="rent-gear-body">
          <Container>
            <Row>
              <Col sm="3">
                <Sidebar callback={this.selectedCategory}/>
              </Col>
              <Col sm="9">
                <Main catagory={this.state.catagory}/>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(RentGear);
