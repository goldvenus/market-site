import React, { Component } from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Sidebar from '../../Rent Gear/RG_sidebar';
import Main from '../../Rent Gear/RG_main';
import Urllink_class from "../../Urllink_class";
import {Rent_category} from "../../Rent Gear/Rent_category";

class RentGear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "category": "Cameras",
      "sel_sideid": 0
    };
  }

  componentWillMount() {
    const param = this.props.match.params.id;
    if (param !== undefined) {
      this.setState({
        "sel_sideid": Rent_category.indexOf(param),
        "category": param
      });
    }
  }

  selectedCategory = (value) => {
    this.setState(() => ({
      "category": value,
      "sel_sideid": Rent_category.indexOf(value)
    }), () => {
      console.log("parent state changed", this.state);
    });
  };

  render() {
    const { sel_sideid } = this.state;

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
                <Sidebar callback={this.selectedCategory} sideid={sel_sideid}/>
              </Col>
              <Col md="18" className="cardz-2">
                <Main category={this.state.category}/>
              </Col>
              <Row className="d-flex d-lg-none down-sidbar">
                <Sidebar callback={this.selectedCategory} sideid={sel_sideid}/>
              </Row>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default RentGear;
