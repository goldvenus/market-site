import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Sidebar from '../../Rent Gear/RG_sidebar';
import Main from '../../Rent Gear/RG_main';
import { rentGearProductList } from '../../../actions/app.actions';
import Urllink_class from "../../Urllink_class";
import {Rent_category} from "../../Rent Gear/Rent_category";

class RentGear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catagory: '',
      sel_sideid: 0
    };
  }

  componentWillMount() {
      // console.log("RentGear", this.props.match.params.id);
      // if(this.props.match.params.id!==undefined)
      //   this.setState({"sel_sideid": Rent_category.indexOf(this.props.match.params.id)});
  }

  selectedCategory = (value) => {

    this.setState({
      catagory: value
    });
      console.log("change_state_value", this.state.category);
    rentGearProductList({
      categoryName: value,
      product_region: '',
      brand: ''
    });
  };

  render() {
    let sideid = this.props.match.params.id;
    const {category} = this.state;
    if(sideid!==undefined)
      this.state.category=sideid;

    sideid = sideid === undefined ? 0 : Rent_category.indexOf(sideid);

    return (
      <div className="rent-gear">
        <div className="rent-gear-head">
          <Container>
            <Row>
              <Col >
                <Breadcrumb >
                <Urllink_class name="Home Page"></Urllink_class>
                    <span className="space_slash_span">/</span>
                  <BreadcrumbItem active>Rent Gear </BreadcrumbItem>
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
                <Sidebar callback={this.selectedCategory} sideid={sideid}/>
              </Col>
              <Col md="18" className="cardz-2">
                {console.log("Rent Gear_Main_beber", this.state.category)}
                <Main catagory={this.state.catagory}/>
              </Col>
              <Row className="d-flex d-lg-none down-sidbar">

                <Sidebar callback={this.selectedCategory} sideid={sideid}/>
              </Row>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default RentGear;
