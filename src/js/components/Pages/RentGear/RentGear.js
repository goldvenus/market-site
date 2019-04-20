import React, { Component } from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Sidebar from '../../Rent Gear/RG_sidebar';
import Main from '../../Rent Gear/RG_main';
import Urllink_class from "../../Urllink_class";
import connect from "react-redux/es/connect/connect";
import BarLoader from "react-bar-loader";

class RentGear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "category": "",
      "sel_sideid": 0
    };
  }

  componentWillMount() {
    let category = this.props.match.params.id;
    let sel_sideid = 0;
    let { categories } = this.props;

    if (category === undefined && categories === undefined)
      return;

    if (!categories) {
      categories = [''];
    } else {
      categories = categories.reduce((arr, cur) => {
        return arr.concat(cur.categoryName);
      }, []);
      if (category !== undefined) {
        sel_sideid = categories.indexOf(category);
      }
    }
    if (category === undefined) {
      category = categories[0];
    }

    this.setState({
      "sel_sideid": sel_sideid,
      "category": category
    });
  }

  selectedCategory = (value) => {
    this.setState({
      "category": value,
      "sel_sideid": this.props.categories.indexOf(value)
    });
  };

  render() {
    let { categories } = this.props;
    if (!categories || !categories.length) {
      return <BarLoader color="#F82462" height="5" />;
    }
    categories = categories.reduce((arr, cur) => {
      return arr.concat(cur.categoryName);
    }, []);
    console.log("======", categories);
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
                <Sidebar callback={this.selectedCategory} categories={categories} sideid={sel_sideid}/>
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
export default connect(state => {
    return {
        categories: state.app.categories
    };
})(RentGear);
