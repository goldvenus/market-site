import React from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Sidebar from '../../components/Rent Gear/RG_sidebar';
import Main from '../../components/Rent Gear/RG_main';
import UrllinkClass from "../../components/UrllinkClass";
import connect from "react-redux/es/connect/connect";
import BarLoader from "react-bar-loader";
import { fetchCategories } from "../../core/actions/category.action";

class RentGear extends React.Component {
  constructor(props) {
    super(props);
    fetchCategories();
  }

  render() {
    let {categories, isLoading} = this.props;
    let category = this.props.match.params.id;
    if (isLoading) {
      return <BarLoader color="#F82462" height="5"/>;
    }

    categories = categories.reduce((arr, item) => arr.concat(item.categoryName), []);
    if (category === undefined) {
      this.props.history.push('/rentgear/' + categories[0]);
      return null;
    }

    return (
      <div className="rent-gear">
        <div className="rent-gear-head">
          <Container>
            <Row>
              <Col>
                <Breadcrumb>
                  <UrllinkClass name="Home Page"/>
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
