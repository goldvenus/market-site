import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import moment from 'moment';
import EmptyRental from './Empty_Rental';


const MyRentalItem = ({ rentItem }) => (
    <tr>
      <td width="15%">{<img src={rentItem.numberOfUserImage[0]} className="gear-img" />}</td>
      <td className="gear" width="20%">
        <p >{rentItem.brand}</p>
        <p className="theme-text-small text-muted">{rentItem.categoryName}</p>
      </td>
      <td className="rental-period" width="20%">
        <p>
        {`${rentItem.startDate.split(' ')[0]} to ${rentItem.endDate.split(' ')[0]} `}
        </p>
        <p className="theme-text-small text-muted">
          {` ${rentItem.totalRentedNumerOfDay} days`}
        </p>
      </td>
      <td width="20%">
      <img src={rentItem.clientDP} className="landrord-img" />
      <span className="ml-1 "> {rentItem.clientName} </span>
      </td>
      <td width="15%">{`${rentItem.pricePerDay} $`}</td>
      <td width="15%">{`${rentItem.totalRentedNumerOfDay * rentItem.pricePerDay} $`}</td>
    </tr>
)
const days = (d1, d2) => { return moment(d2).diff(moment(d1), 'days') };
const RentNotEmpty = (currentPage,list)=> (
  <React.Fragment>
    <div className="table-responsive">
      <Table className="listing-data-slice" >
        <thead>
          <tr className="text-muted theme-text-bold">
            <th></th>
            <th>Name & Category</th>
            <th>Rental Period</th>
            <th>Landlord</th>
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
              <MyRentalItem rentItem={data} key={i} />
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
    </div>
  </React.Fragment>
)

export default class MyRentals extends React.Component {
  constructor() {

    super();
    // Data set of random length
    this.pageSize = 3;
    this.pagesCount = "";

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
    const { list } = this.props;
    console.log(list);
    const { currentPage } = this.state;

    this.pagesCount = Math.ceil(list ? list.length / this.pageSize : "");
    return (
      <Row className="my-listing">
        <Col sm="24">
          <div className="d-flex align-items-center">
            <h4 className="tab-title">My Rentals</h4>
            <Link to='/listGear' className="theme-btn theme-btn-primary ml-auto mb-3">Rent Gear</Link>
          </div>
          <div className="wrraper">
          {(currentPage <= 0) ?<EmptyRental/> : <RentNotEmpty currentPage={currentPage} list={list}/>}
            
          </div>
        </Col>
      </Row >
    )
  }
}
