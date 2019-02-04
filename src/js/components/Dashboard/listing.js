import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import moment from 'moment';
import dataSet from './dataSet';
{/* <tr>
  <td width="15%">{<img src={rentItem.numberOfUserImage[0]} className="gear-img" />}</td>
  <td className="gear" width="20%">
    <p >{rentItem.brand}</p>
    <p className="theme-text-small text-muted">{rentItem.categoryName}</p>
  </td>
  <td className="rental-period" width="20%">
    <p>
      {`${rentItem.orderDate} to ${rentItem.endDate} `}
    </p>
    <p className="theme-text-small text-muted">
      {` ${days(rentItem.orderDate, rentItem.endDate)} days`}
    </p>
  </td>
  <td width="20%">
    <img src={rentItem.landrord_img} className="landrord-img" />
    <span className="ml-1 "> {rentItem.landrord_name} </span>
  </td>
  <td width="15%">{rentItem.pricePerDay}</td>
  <td width="15%">{rentItem.replacementValue}</td>
</tr> */}
const MyListingItem = ({ listItem }) => (
  <tr>
    <td width="15%">{<img src={listItem.numberOfUserImage[0]} className="gear-img"/>}</td>
    <td className="gear" width="20%">
      <p >{listItem.brand}</p>
      <p className="theme-text-small text-muted">{listItem.categoryName}</p>
    </td>
    <td className="rental-period" width="20%">
      <p>
        {`${listItem.orderDate.split(' ')[0]} to ${listItem.endDate.split(' ')[0]} `}
      </p>
      <p className="theme-text-small text-muted">
        {` ${days(listItem.orderDate, listItem.endDate)} days`}
      </p>
    </td>
    <td width="20%">
      <img src={listItem.clients_img} className="landrord-img" />
      <span className="ml-1 "> {listItem.clients_name} </span>
    </td>
    <td width="15%">{`${listItem.pricePerDay} $`} </td>
    <td width="15%">{`${listItem.replacementValue} $`}</td>
  </tr>
)
const days = (d1, d2) => { return moment(d2).diff(moment(d1) , 'days')};

export default class MyListings extends React.Component {
  constructor() {

    super();
    // Data set of random length
    this.pageSize = 3;
    this.pagesCount = 0;

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
    const { currentPage} = this.state;
    const { list} = this.props;
    // console.log(list);

    this.pagesCount = Math.ceil(list ? list.length / this.pageSize : "");
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
                  {list ? list
                    .slice(
                      currentPage * this.pageSize,
                      (currentPage + 1) * this.pageSize
                    )
                    .map((data, i) =>
                      <MyListingItem listItem={data} key={i} />
                  ) : ""}
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