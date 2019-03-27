import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Col, Breadcrumb, Table,
  BreadcrumbItem, Pagination, PaginationItem, PaginationLink, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { getListGears, deleteGear } from '../../../actions/app.actions';

const ListGearItem =
  ({ listItem: { gearid, model = '', brand = '', categoryName = '', numberOfUserImage, pricePerDay, orderStatus: status } }) => {

    let btnClass = classNames({
      'theme-btn': true,
      [`btn-${status}`.replace(' ', '-')]: true
    });

    return <Fragment> 
      
      <tr className="list-gear-large">
      <td width="15%">
        {numberOfUserImage && numberOfUserImage.length > 0
          ? <img src={numberOfUserImage[0]} className="gear-img" alt=""/>
          : null
        }
      </td>
      <td className="gear button-tablet " width="25%">
        <p><Link to={`/gear/${gearid}`}>{model + ' ' + brand}</Link></p>
        <p className="theme-text-small text-muted">{categoryName}</p>
        <button className={btnClass}>{status}</button>
      </td>
      <td className="table-btn button-desktop" width="20%">
        <button className={btnClass}>{status}</button>
      </td>
      <td width="15%" className="span-tablet"><span className="">Price Per day</span>${pricePerDay}</td>
      <td width="15%" className="span-tablet"><span>Amount</span>${pricePerDay}</td>
      <td width="10%">
        <span className="edit" ></span>
        <span
          className="close"
          onClick={async () => {
            await deleteGear({ gearid });
            getListGears();
          }}
        />
      </td>
    </tr>

    <Card className="list-gear-small d-flex d-md-none">
      <CardBody>    
        <div className="list-img">{numberOfUserImage && numberOfUserImage.length > 0
          ? <CardImg src={numberOfUserImage[0]} className="gear-img" alt=""/>
          : null
        }
        <div className="list-text">
          <p><Link to={`/gear/${gearid}`}>{model + ' ' + brand}</Link></p>
          <p className="theme-text-small text-muted">{categoryName}</p>
        </div>
        <div className="list-icons">
          <span className="edit"></span>
          <span
          className="close"
          
          onClick={async () => {
            await deleteGear({ gearid });
            getListGears();
          }}
          > <i className="fa fa-times"></i> </span>
        </div>
        </div>
        

        <button className={btnClass}>{status}</button>
        <div className="list-prices">
          <CardText><p>Price Per day</p><span>${pricePerDay}</span></CardText>
          <CardText><p>Amount</p><span>${pricePerDay}</span></CardText>
        </div>
    </CardBody>
  </Card>
  </Fragment>
  };

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

                <div className="d-none d-lg-flex align-items-center ">
                  <h2 className="theme-page-title">List Gear</h2>
                  <button className="theme-btn theme-btn-primary theme-btn-link ml-auto">
                    <Link to="/addgear"><span className="fa fa-plus"/>&nbsp; Add Gear</Link>
                  </button>
                </div>
              </Col>

            </Row>
            <h2 className="d-flex d-lg-none theme-page-title list-gear-title">List Gear</h2>
              <button className="d-flex d-lg-none theme-btn theme-btn-primary theme-btn-link ml-auto add-gear-btn">
                    <Link to="/addgear"><span className="fa fa-plus"/>&nbsp; Add Gear</Link>
              </button>
          </Container>
        </div>
        <div className="list-gear-body">
          <Container>
            <div className="wrraper">
              <Table className="listing-data-slice">
                <thead className="table-head">
                <tr className="text-muted theme-text-bold">
                  <th/>
                  <th>Name & Category</th>
                  <th>Status</th>
                  <th>Price Per day</th>
                  <th>Amount</th>
                  <th/>
                </tr>
                </thead>
                <tbody>
                {listGears.slice(
                  currentPage * this.pageSize,
                  (currentPage + 1) * this.pageSize
                ).map((data, i) => {
                  return <ListGearItem listItem={data} key={i}/>;
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

const mapStateToProps = state => ({
  listGears: state.app.listGears
});

export default connect(mapStateToProps)(ListGear);
