import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import moment from 'moment';
import dataSet from './dataSet';

const MyListingItem = ({ listItem }) => (
  <tr>
    <td width="15%">{<img src={listItem.gear_img} className="gear-img"/>}</td>
    <td className="gear" width="20%">
      <p >{listItem.gear_name}</p>
      <p className ="theme-text-small text-muted">{listItem.gear_category}</p>
    </td>
    <td className="rental-period" width="20%">
      <p>
        {`${listItem.rental_period_start_date} to ${listItem.rental_period_end_date} `}
      </p>
      <p className="theme-text-small text-muted">
        {` ${days(listItem.rental_period_start_date, listItem.rental_period_end_date)} days`}
      </p>
    </td>
    <td width="20%">
      <img src={listItem.landrord_img} className="landrord-img" />
      <span className="ml-1 "> {listItem.landrord_name} </span>
    </td>
    <td width="15%">{listItem.price_per_day}</td>
    <td width="15%">{listItem.price_per_month}</td>
  </tr>
)
const days = (d1, d2) => { return moment(d2).diff(moment(d1) , 'days')};

export default class MyListings extends React.Component {
  constructor() {

    super();
    // Data set of random length
    this.pageSize = 3;
    this.pagesCount = Math.ceil(dataSet.length / this.pageSize);

    this.state = {
      currentPage: 0
    };

  }
  handleClick(e, index) {

    e.preventDefault();

    this.setState({
      currentPage: index
    });

  }
  render() {
    const { currentPage } = this.state;

    return (
      <Row className="my-listing">
        <Col sm="12">
          <div className="d-flex align-items-center">
            <h4 className="tab-title">My Listings</h4>
            <Link to='/listGear' className="theme-btn theme-btn-primary ml-auto mb-3">List Gear</Link>
          </div>
          <div className="wrraper">
            <React.Fragment>
              <Table className="listing-data-slice" >
                <thead>
                  <tr className="text-muted theme-text-bold">
                    <th></th>
                    <th>Name & Category</th>
                    <th>Rental Period</th>
                    <th>Client</th>
                    <th>Price Per day</th>
                    <th>A Month</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSet
                    .slice(
                      currentPage * this.pageSize,
                      (currentPage + 1) * this.pageSize
                    )
                    .map((data, i) =>
                      <MyListingItem listItem={data} key={i} />
                    )}
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
            </React.Fragment>
          </div>
        </Col>
      </Row >
    )
  }
}