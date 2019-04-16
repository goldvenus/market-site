import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Sidebar from '../../Rent Gear/RG_sidebar';
import Main from '../../Rent Gear/RG_main';

import { rentGearProductList } from '../../../actions/app.actions';
import Urllink_class from "../../Urllink_class";

class RentGear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catagory: ''
    };
  //=this.props.match.id;
  //     console.log("Venus++++++++++++",this.state.typename);
  //     this.selectedCategory(this.typename);
  // if(this.state.typename!=''){
  //    console.log(this.state.category);
  //   //   this.state.category=this.state.typename;
  //     this.selectedCategory(this.typename);
  // }
  }

  componentWillMount() {
      //alert(this.props.match.id);
      this.selectedCategory(this.props.match.params.id);
      //console.log("Venus+++++++++++++++",this.props);

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
                <Urllink_class name="Home Page"></Urllink_class>
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
