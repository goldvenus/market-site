import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Container, Row, Col, Breadcrumb, Table,
  BreadcrumbItem, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { gearListdata } from './dummydata';
import classNames from 'classnames';

const ListGearItem =
  ({ listItem: { gear_img, gear_name, gear_category, status, price_per_day, price_per_month } }) => {

    let btnClass = classNames({
      'theme-btn': true,
      [`btn-${status}`.replace(' ' , '-')]: true
    });
    return <tr>
      <td width="15%">{<img src={gear_img} className="gear-img" />}</td>
      <td className="gear" width="25%">
        <p >{gear_name}</p>
        <p className="theme-text-small text-muted">{gear_category}</p>
      </td>
      <td width="20%">
        <button className={btnClass}>{status}</button>
      </td>
      <td width="15%">{price_per_day}</td>
      <td width="15%">{price_per_month}</td>
      <td width="10%">
        <span className="edit" ></span>
        <span className="close" ></span>
      </td>
    </tr>
  }

class ListGear extends Component {
  constructor() {

    super();
    // Data set of random length
    this.pageSize = 4;
    this.pagesCount = Math.ceil(gearListdata.length / this.pageSize);

    this.state = {
      currentPage: 0
    };

  }
  render() {
    const { currentPage } = this.state;

    return (
      <div className="list-gear">
        <div className="list-gear-head">
          <Container>
            <Row>
              <Col>
                <Breadcrumb>
                  <BreadcrumbItem>Home </BreadcrumbItem>
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
                    <th>A Month</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {gearListdata.slice(
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
  };
})(ListGear);
