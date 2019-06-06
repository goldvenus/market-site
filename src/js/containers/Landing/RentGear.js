import React from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Sidebar from '../../components/Rent Gear/RG_sidebar';
import Main from '../../components/Rent Gear/RG_main';
import BreadCrumbActive from "../../components/BreadCrumbActive";
import connect from "react-redux/es/connect/connect";
import CustomLoaderLogo from "../../components/common/CustomLoaderLogo";

class RentGear extends React.Component {

  render() {
    let {categories, isLoading} = this.props;
    let category = this.props.match.params.id;
    if (isLoading) {
      return <CustomLoaderLogo/>;
    }
  
    categories = categories.reduce((arr, item) => arr.concat(item.categoryName), []);

    return (
      <div className="rent-gear">
        <div className="rent-gear-head">
          <Container>
            <Row>
              <Col>
                <Breadcrumb>
                  <BreadCrumbActive name="Home Page"/>
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
              <Sidebar category={category} categories={categories}/>
            </Col>
            <Col md="18" className="cardz-2">
              <Main category={category}/>
            </Col>
            <Row className="d-flex d-lg-none down-sidbar">
              <Sidebar category={category} categories={categories}/>
            </Row>
          </Row>
        </Container>
      </div>
    </div>
    )
  }
}

export default connect(state => {
  return {
    categories: state.category.categories,
    isLoading: state.category.isLoading
  };
})(RentGear);
