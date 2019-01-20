import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Container, Row, Col, Breadcrumb, Table,
  BreadcrumbItem, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { getListGears } from '../actions/app.actions';

const ListGearItem =
  ({ listItem: { gearid, model = '', brand = '', categoryName = '', numberOfUserImage, pricePerDay, status = 'Available' } }) => {

    let btnClass = classNames({
      'theme-btn': true,
      [`btn-${status}`.replace(' ' , '-')]: true
    });

    return <tr>
      <td width="15%">{numberOfUserImage && numberOfUserImage.length > 0 ? <img src={numberOfUserImage[0]} className="gear-img" /> : null}</td>
      <td className="gear" width="25%">
        <p ><Link to={`/gear/${gearid}`}>{ model + ' ' + brand }</Link></p>
        <p className="theme-text-small text-muted">{categoryName}</p>
      </td>
      <td width="20%">
        <button className={btnClass}>{ status }</button>
      </td>
      <td width="15%">{ pricePerDay }</td>
      <td width="15%">{ pricePerDay }</td>
      <td width="10%">
        <span className="edit" ></span>
        <span className="close" ></span>
      </td>
    </tr>
  }

class ListGear extends Component {
  constructor(props) {

    super(props);
    // Data set of random length
    this.pageSize = 4;
    this.pagesCount = Math.ceil(props.listGears.length / this.pageSize);

    this.state = {
      currentPage: 0
    };

    // get list get gears
    getListGears();
  }
  render() {
    const { currentPage } = this.state;
    const { listGears } = this.props;
    return (
      <div className="list-gear">
        <div className="list-gear-head">
          <Container>
            <Row>
              <Col>
                <Breadcrumb>
                  <BreadcrumbItem>Home Page</BreadcrumbItem>
                  <BreadcrumbItem active>List Gear</BreadcrumbItem>
                </Breadcrumb>

                <div className="d-flex align-items-center">
                  <h2 className="theme-page-title">List Gear</h2>
                  <button className="theme-btn theme-btn-primary theme-btn-link ml-auto">
                    <Link to="/addgear"><span className="fa fa-plus"></span>&nbsp; Add Gear</Link>
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="list-gear-body">
          <Container>
            <div className="wrraper">
              <Table className="listing-data-slice" >
                <thead>
                  <tr className="text-muted theme-text-bold">
                    <th></th>
                    <th>Name & Category</th>
                    <th>Status</th>
                    <th>Price Per day</th>
                    <th>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {listGears.slice(
                    currentPage * this.pageSize,
                    (currentPage + 1) * this.pageSize
                  ).map((data, i) => {
                    return <ListGearItem listItem={data} key={i} />
                  })}
                </tbody>
              </Table>
              <Pagination aria-label="Page navigation example">
                <PaginationItem disabled={currentPage <= 0}>
                  <PaginationLink
                    onClick={e => this.handleClick(e, currentPage - 1)}
                    previous
                    href="#"
                  />
                </PaginationItem>

                {[...Array(this.pagesCount)].map((page, i) =>
                  <PaginationItem active={i === currentPage} key={i}>
                    <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                  <PaginationLink
                    onClick={e => this.handleClick(e, currentPage + 1)}
                    next
                    href="#"
                  />
                </PaginationItem>
              </Pagination>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    listGears: store.app.listGears
  };
})(ListGear);
