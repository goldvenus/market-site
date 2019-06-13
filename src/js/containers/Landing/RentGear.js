import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Sidebar from '../../components/Rent Gear/RG_sidebar';
import Main from '../../components/Rent Gear/RG_main';
import connect from "react-redux/es/connect/connect";
import queryString from 'query-string'
import CustomLoaderLogo from "../../components/common/CustomLoaderLogo";
import {fetchCategories} from "../../core/actions/category.action";

class RentGear extends React.Component {
  constructor(props) {
    super(props);
    fetchCategories();
  }
  
  render() {
    let {categories, isLoading, location, history} = this.props;
    let category = queryString.parse(location.search).type;
    if (!category) {
      history.push('/rent-gear/?type=all');
    }
    if (isLoading || !categories) {
      return <CustomLoaderLogo/>;
    }
    categories = categories.reduce((arr, item) => arr.concat(item.categoryName), []);

    return (
      <div className="rent-gear">
        <div className="rent-gear-head">
          <Container>
            <Row>
              <Col>
                {/*<Breadcrumb>*/}
                  {/*<BreadCrumbActive name="Home Page"/>*/}
                  {/*<span className="space_slash_span">/</span>*/}
                  {/*<BreadcrumbItem active>Rent Gear </BreadcrumbItem>*/}
                {/*</Breadcrumb>*/}
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
              <Main category={category} categories={categories} history={history}/>
            </Col>
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
