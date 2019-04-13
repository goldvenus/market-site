import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Col, Breadcrumb, Table,
  BreadcrumbItem, Pagination, PaginationItem, PaginationLink, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {getListGears, deleteGear, getAllGears, addCart, formatDate, handleError} from '../../../actions/app.actions';
import BarLoader from "react-bar-loader";

const ListGearItem =
  ({ listItem: { gearid, model = '', brand = '', categoryName = '', numberOfUserImage, pricePerDay, orderStatus: status } }) => {

    let btnClass = classNames({
      'theme-btn': true,
      [`btn-${status}`.replace(' ', '-')]: true
    });

    return <Fragment>
      <tr className="list-gear-large">
      <td width="10%">
        {numberOfUserImage && numberOfUserImage.length > 0
          ? <img src={numberOfUserImage[0]} className="gear-img" alt=""/>
          : null
        }
      </td>
      <td className="gear button-tablet " width="26%">
        <p className="gear_name_first"><Link to={`/gear/${gearid}`}>{model + ' ' + brand}</Link></p>
        <p className="theme-text-small text-muted gear_name_second">{categoryName}</p>
        <button className={btnClass}>{status}</button>
      </td>
      <td className="table-btn button-desktop" width="21.9%">
        <button className={`${btnClass} gear_button_available`}>{status}</button>
      </td>
      <td width="18%" className="span-tablet "><span>Price Per day</span><span className="gear_price_day">${pricePerDay}</span></td>
      <td width="12%" className="span-tablet "><span>Amount</span><span className="gear_price_amount">${pricePerDay}</span></td>
      <td width="3%" className="d-md-none d-lg-table-cell ">
          <Link to={`/editgear/${gearid}`}><span className="edit_gear"/></Link>
      </td>
      <td width="5.5%" className="d-md-none d-lg-table-cell">
        <span
          className="close"
          onClick={async () => {
            await deleteGear({ gearid });
            getListGears();
          }}
        />
      </td>
      <td className="d-lg-none button_md_edit_del" width="8.8%">
          <div >
              <Link to={`/editgear/${gearid}`}><span className="edit_gear"/></Link>
          </div>
          <div >
        <span
            className="close"
            onClick={async () => {
                await deleteGear({ gearid });
                getListGears();
            }}
        />
          </div>

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

          <span
          className="close"

          onClick={async () => {
            await deleteGear({ gearid });
            getListGears();
          }}
          ></span>
            <Link to={`/editgear/${gearid}`}><span className="edit_gear"/></Link>
        </div>
        </div>
          <div className="list-gear-small-line"></div>

        <button className={btnClass}>{status}</button>
          <div className="list-gear-small-line"></div>
        <div className="list-prices">
            <div><CardText><p>Price Per day</p><span>${pricePerDay}</span></CardText></div>
            <div className="list-gear-small-line-ver"></div>
            <div><CardText><p>Amount</p><span>${pricePerDay}</span></CardText></div>
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
      currentPage: 0,
      loadingstate: false
    };
    this.doGetListGears();

  }

  async doGetListGears () {
      try {
          let res = await getListGears();
          this.setState({loadingstate: true})

      } catch {
          handleError('Gear is not added to cart');
      }
  }

  render() {
    const { currentPage } = this.state;
    const { listGears } = this.props;
      if (!this.state.loadingstate) {
          return (<BarLoader color="#F82462" height="5" />
          );
      }
      else
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
                { !listGears.length ? (
                <div className="empety-list">
                  <svg className="empety-img" width="76" height="62" viewBox="0 0 76 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M70.3013 12.4075H63.4007L61.8153 5.21692C61.1383 2.14529 58.4765 0 55.3424 0H31.3858C28.2516 0 25.5898 2.14514 24.9126 5.21677L23.3273 12.4075H21.6898V9.33939C21.6898 7.61047 20.2884 6.20373 18.5657 6.20373H8.46458C6.74196 6.20373 5.34048 7.61047 5.34048 9.33939V12.4075H5.11996C2.29682 12.4075 0 14.7129 0 17.5468V52.3539C0 55.1878 2.29682 57.4932 5.12011 57.4932H10.3564H28.8655C33.0452 60.2108 38.0239 61.791 43.3639 61.791C48.7039 61.791 53.6828 60.2108 57.8623 57.4932H70.3013C73.1246 57.4932 75.4214 55.1878 75.4214 52.3539V17.5468C75.4214 14.7129 73.1246 12.4075 70.3013 12.4075ZM27.7889 5.85567C28.1653 4.14908 29.6443 2.95704 31.3856 2.95704H55.3422C57.0835 2.95704 58.5625 4.14893 58.9387 5.85567L60.3832 12.4075H57.8623C53.6826 9.68981 48.7039 8.10964 43.3639 8.10964C38.0239 8.10964 33.0452 9.68981 28.8655 12.4075H26.3445L27.7889 5.85567ZM8.28663 9.33939C8.28663 9.24091 8.36647 9.16092 8.46458 9.16092H18.5656C18.6637 9.16092 18.7435 9.24106 18.7435 9.33939V12.4075H8.28663V9.33939ZM11.8295 54.5359V38.4758C11.8295 37.6592 11.17 36.9972 10.3564 36.9972C9.54287 36.9972 8.88337 37.6592 8.88337 38.4758V54.536H5.12011C3.92147 54.536 2.94615 53.557 2.94615 52.3539V17.5468C2.94615 16.3435 3.92147 15.3647 5.12011 15.3647H6.8137H20.2166H24.5099H25.1003C19.8869 20.2656 16.6233 27.2321 16.6233 34.9503C16.6233 42.6684 19.8869 49.6349 25.1003 54.5359H11.8295ZM56.9648 54.536C55.2089 55.7683 53.2805 56.7685 51.2236 57.4932C48.7618 58.3605 46.1171 58.8338 43.3639 58.8338C40.6107 58.8338 37.9658 58.3604 35.5042 57.4932C33.4473 56.7685 31.5191 55.7683 29.763 54.536C23.6054 50.2148 19.5695 43.0473 19.5695 34.9504C19.5695 26.8535 23.6054 19.686 29.763 15.3648C31.5189 14.1325 33.4473 13.1323 35.5042 12.4076C37.966 11.5403 40.6107 11.067 43.3639 11.067C46.1171 11.067 48.762 11.5404 51.2236 12.4076C53.2805 13.1323 55.2087 14.1325 56.9648 15.3648C63.1224 19.686 67.1583 26.8535 67.1583 34.9504C67.1583 43.0473 63.1224 50.2148 56.9648 54.536ZM72.4752 52.3537C72.4752 53.557 71.5001 54.5359 70.3013 54.5359H61.6275C66.8409 49.6349 70.1045 42.6684 70.1045 34.9503C70.1045 27.2321 66.8409 20.2656 61.6275 15.3647H62.2179H70.3013C71.5001 15.3647 72.4752 16.3435 72.4752 17.5468V52.3537Z" fill="#252525"/>
                      <path d="M43.3633 15.5378C32.6993 15.5378 24.0234 24.2462 24.0234 34.9503C24.0234 45.6543 32.6993 54.3626 43.3633 54.3626C44.9171 54.3626 46.4637 54.1769 47.96 53.8106C48.7505 53.6171 49.2348 52.8172 49.0421 52.0239C48.8494 51.2305 48.0524 50.744 47.2621 50.9377C45.9939 51.2482 44.6821 51.4056 43.3633 51.4056C34.3238 51.4056 26.9696 44.0238 26.9696 34.9504C26.9696 25.8771 34.3238 18.4952 43.3633 18.4952C52.4028 18.4952 59.757 25.8769 59.757 34.9504C59.757 38.2575 58.7841 41.446 56.9432 44.1715C56.4867 44.8474 56.6626 45.7669 57.336 46.2252C58.0089 46.6832 58.9253 46.507 59.3819 45.831C61.5547 42.614 62.7031 38.8516 62.7031 34.9506C62.7031 24.2462 54.0273 15.5378 43.3633 15.5378Z" fill="#252525"/>
                      <path d="M10.3561 20.4753C7.33157 20.4753 4.87109 22.9452 4.87109 25.9809C4.87109 29.0166 7.33172 31.4864 10.3561 31.4864C13.3805 31.4864 15.8411 29.0166 15.8411 25.9809C15.8411 22.9452 13.3805 20.4753 10.3561 20.4753ZM10.3561 28.5294C8.95622 28.5294 7.81724 27.3861 7.81724 25.981C7.81724 24.5759 8.95622 23.4327 10.3561 23.4327C11.7559 23.4327 12.8949 24.5759 12.8949 25.981C12.8949 27.3861 11.7561 28.5294 10.3561 28.5294Z" fill="#252525"/>
                      <path d="M55.2539 49.2108C55.2346 49.1176 55.2067 49.0245 55.1698 48.9343C55.133 48.8456 55.0873 48.7598 55.0343 48.68C54.9814 48.5986 54.9194 48.5232 54.8516 48.4552C54.7839 48.3872 54.7074 48.3251 54.6277 48.2704C54.5467 48.2172 54.4613 48.1713 54.3729 48.1344C54.2845 48.0974 54.1919 48.0693 54.0976 48.0501C53.9076 48.0116 53.7116 48.0116 53.5216 48.0501C53.4272 48.0693 53.3344 48.0974 53.2461 48.1344C53.1576 48.1713 53.0723 48.2172 52.9913 48.2704C52.9118 48.3251 52.8366 48.3872 52.7674 48.4552C52.6996 48.5232 52.6378 48.5986 52.5847 48.68C52.5317 48.7598 52.486 48.8456 52.4492 48.9343C52.4124 49.0245 52.3844 49.1176 52.3652 49.2108C52.3461 49.3069 52.3359 49.4045 52.3359 49.5006C52.3359 49.5967 52.3461 49.6943 52.3652 49.7889C52.3844 49.8835 52.4124 49.9767 52.4492 50.0654C52.486 50.1556 52.5317 50.2414 52.5847 50.3212C52.6378 50.4025 52.6996 50.4779 52.7674 50.5459C52.8366 50.614 52.9116 50.6761 52.9913 50.7293C53.0725 50.7825 53.1578 50.8284 53.2461 50.8653C53.3345 50.9023 53.4272 50.9304 53.5216 50.9496C53.6172 50.9688 53.7131 50.9792 53.8089 50.9792C53.9059 50.9792 54.0018 50.9688 54.0976 50.9496C54.1919 50.9304 54.2847 50.9023 54.3729 50.8653C54.4614 50.8284 54.5469 50.7825 54.6277 50.7293C54.7073 50.6761 54.7839 50.614 54.8516 50.5459C55.1256 50.2709 55.2819 49.8894 55.2819 49.5006C55.2819 49.4045 55.2729 49.3069 55.2539 49.2108Z" fill="#252525"/>
                  </svg>
                  <p>YOUR LIST GEAR IS EMPTY</p>
                  <Link to='/addgear' className="theme-btn theme-btn-primary ml-auto mb-3">Add Gear</Link>
                </div>
                ) :
                (<Fragment>
                  <Table className="listing-data-slice">
                    <thead className="table-head">
                    <tr className="text-muted theme-text-bold">
                      <th/>
                      <th>Name & Category</th>
                      <th>Status</th>
                      <th>Price Per day</th>
                      <th>Amount</th>
                        <th></th>
                        <th></th>
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
           </Fragment>) }
           </div>
              </Container>
            </div>
          </div>
        );
  }
}

const mapStateToProps = state => ({
  listGears: state.app.listGears,
    categories: state.app.categories
});

export default connect(mapStateToProps)(ListGear);
