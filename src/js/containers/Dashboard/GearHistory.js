import React from 'react';
import {Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Pagination, PaginationItem, PaginationLink, Table} from 'reactstrap';
import "react-tabs/style/react-tabs.css";
import EmptyList from './GearHistory/EmptyList'
import {deleteGear, getListGears} from '../../core/actions/gear.action';
import connect from "react-redux/es/connect/connect";
import RentalCalendarModal from "./GearHistory/RentalCalendarModal";
import GearEditModal from "./GearHistory/GearEditModal";
import BarLoader from "react-bar-loader";
import $ from 'jquery';
import {fetchCategories} from "../../core/actions/category.action";
import ConfirmModal from "../../components/common/ConfirmModal";

const MyListingItem = ({listItem, openEdit, openDelete, openCalendar}) => (
  <React.Fragment>
    <tr className="desktop-gear-item">
      <td width="5%" className="d-lg-table-cell listing-data-image">
        <img src={listItem.numberOfUserImage[0]} className="gear-img" alt=""/>
      </td>
      <td className="d-lg-table-cell" width="20%">
        <p className="gear-brand">{listItem.brand}</p>
        <p className="theme-text-small gear-category text-muted">{listItem.categoryName}</p>
      </td>
      <td className="d-lg-table-cell gear-price-per-day" width="15%">${listItem.pricePerDay} </td>
      <td className="d-lg-table-cell gear-replacement-value" width="15%">${listItem.replacementValue}</td>
      <td className="d-lg-table-cell" width="15%">
        <button className='theme-btn rent-cal-btn' onClick={() => openCalendar(listItem.gearid)}>Rental Calendar
        </button>
      </td>
      <td width="10%" className="edit-gear-td">
        <span className="edit_my_gear" onClick={() => openEdit(listItem.gearid)}/>
      </td>
      <td width="10%" className="edit-gear-td">
        <span className="delete_my_gear" onClick={() => openDelete(listItem.gearid)}/>
      </td>
    </tr>
    <tr className="tablet-gear-item">
      <td width="15%" className="listing-data-image">
        <img src={listItem.numberOfUserImage[0]} className="gear-img" alt=""/>
      </td>
      <td width="45%">
        <div className="brand-category-wrapper">
          <p className="gear-brand">{listItem.brand}</p>
          <p className="theme-text-small gear-category text-muted">{listItem.categoryName}</p>
        </div>
      </td>
      <td width="40%">
        <div className="price-wrapper">
          <div>
            <div className="gear-category">Price per day</div>
            <div className="gear-price-per-day">${listItem.pricePerDay}</div>
          </div>
          <div>
            <div className="gear-category">Amouth</div>
            <div className="gear-replacement-value">${listItem.replacementValue}</div>
          </div>
        </div>
        <div className="control-wrapper">
          <span className='edit-rental-calendar' onClick={() => openCalendar(listItem.gearid)}/>
          <span className="edit_my_gear" onClick={() => openEdit(listItem.gearid)}/>
          <span className="delete_my_gear" onClick={() => openDelete(listItem.gearid)}/>
        </div>
      </td>
    </tr>
  </React.Fragment>
);

const MyListingItemSm = ({listItem, openEdit, openDelete, openCalendar}) => (
  <div className="mylistingitem_sm_parent_div">
    <div className="d-flex mlspd_first">
      <div className="listing-data-image">
        {<img src={listItem.numberOfUserImage[0]} className="gear-img" alt=""/>}
      </div>
      <div className="d-block mlspdf_name_tag">
        <p className="theme-text-small text-muted mlspdf_name_tag_categoryName">{listItem.categoryName}</p>
        <p className="mlspdf_name_tag_brandName">{listItem.brand}</p>
      </div>
    </div>
    <div className="d-flex mlspd_second">
      <div className="d-block col-12 mlspds_child mlspd_second_first">
        <p className="mlspdf_name_tag_brandName">Price per day</p>
        <div>${listItem.pricePerDay} </div>
      </div>
      <div className="d-block col-12 mlspds_child">
        <p className="mlspdf_name_tag_brandName">Value</p>
        <div className="mlspd_second_replacementValue">${listItem.replacementValue}</div>
      </div>
    </div>
    <div className="d-flex slspd_third">
      <div className="slspdt_rental_btn">
        <span className='edit-rental-calendar' onClick={() => openCalendar(listItem.gearid)}/>
      </div>
      <div className="edit-gear-td slspdt_edit_icon">
        <span className="edit_my_gear" onClick={() => openEdit(listItem.gearid)}/>
      </div>
      <div className="delete-gear-td slspdt_edit_icon">
        <span className="delete_my_gear" onClick={() => openDelete(listItem.gearid)}/>
      </div>
    </div>
  </div>
);

class MyListings extends React.Component {
  constructor(props) {
    super(props);
    // Data set of random length
    this.pageSize = 5;
    this.pagesCount = 0;
    this.state = {
      currentPage: 0,
      modal_open_st: 0,
      cur_gear: null,
      isFirstLoading: true,
      isDeleting: false
    };
  }
  
  async componentDidMount() {
    await getListGears();
    await fetchCategories();
    this.setState({isFirstLoading: false});
  }
  
  componentDidUpdate() {
    $(function () {
      $(".pagination .page-item:first-child a").html("<");
      $(".pagination .page-item:last-child a").html(">");
    })
  }
  
  handleOpenRentalCalendar = (gearid) => {
    this.setState({modal_open_st: 1, cur_gear: gearid});
  };
  
  handleOpenGearEdit = (gearid) => {
    this.setState({modal_open_st: 2, cur_gear: gearid});
  };
  
  handleGearDelete = async (gearid) => {
    this.setState({modal_open_st: 3, cur_gear: gearid});
  };
  
  performDelete = async () => {
    this.setState({isDeleting: true});
    await deleteGear({gearid: this.state.cur_gear});
    this.pagesCount = Math.ceil((this.props.list.length-1) / this.pageSize);
    let curPage = this.state.currentPage;
    console.log(this.state.currentPage, this.pagesCount);
    if (this.state.currentPage >= this.pagesCount)
      curPage = curPage - 1;
    this.setState({modal_open_st: 0, isDeleting: false, currentPage: curPage});
  };
  
  handleClose = () => {
    this.setState({modal_open_st: 0});
  };
  
  handleClick(e, index) {
    e.preventDefault();
    this.setState({
      currentPage: index
    });
  }
  
  render() {
    const {currentPage, isFirstLoading} = this.state;
    const {list, isLoading, isLoadingCategories} = this.props;
    if (isLoading && isFirstLoading && isLoadingCategories) {
      return <BarLoader color="#F82462" height="5"/>;
    }
    
    this.pagesCount = Math.ceil(list ? list.length / this.pageSize : "");
    
    return (
      <React.Fragment>
        <Row className="my-listing my-listing-tabs gear-history-top-panel">
          <div className="listing-body">
            <div className="d-flex align-items-center">
              <h4 className="tab-title tab-title-listings">My Gear</h4>
              <button className="theme-btn theme-btn-primary ml-auto add-gear-btn"><Link to="/addgear">Add Gear</Link>
              </button>
            </div>
            
            <div className="wrraper_dashboard wrraper-region gear-history-body">
              {(list.length <= 0) ? <EmptyList/> :
                (
                  <React.Fragment>
                    <div className="table-responsive">
                      <Table className="listing-data-slice">
                        <thead className="list-table-head">
                        <tr className="text-muted theme-text-bold listing-data-thead">
                          <th/>
                          <th>Name & Category</th>
                          <th>Price Per day</th>
                          <th>Value</th>
                          <th/>
                          <th/>
                          <th/>
                        </tr>
                        </thead>
                        <tbody className="listing-data-tbody">
                        {list ? list
                          .slice(
                            currentPage * this.pageSize,
                            (currentPage + 1) * this.pageSize
                          )
                          .map((data, i) =>
                            <MyListingItem
                              listItem={data} key={i}
                              openEdit={this.handleOpenGearEdit}
                              openDelete={this.handleGearDelete}
                              openCalendar={this.handleOpenRentalCalendar}
                            />
                          ) : ""}
                        {list ? list
                          .slice(
                            currentPage * this.pageSize,
                            (currentPage + 1) * this.pageSize
                          )
                          .map((data, i) =>
                            <MyListingItemSm
                              listItem={data}
                              key={i}
                              openEdit={this.handleOpenGearEdit}
                              openDelete={this.handleGearDelete}
                              openCalendar={this.handleOpenRentalCalendar}
                            />
                          ) : ""}
                        </tbody>
                      </Table>
                    </div>
                    <Pagination aria-label="Page navigation example" className="dashboard-pagination">
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
                )
              }
            </div>
          </div>
        </Row>
        {
          this.state.modal_open_st === 2 ?
            <GearEditModal
              gearid={this.state.cur_gear}
              onClose={this.handleClose}
              onCalendar={this.handleOpenRentalCalendar}
            /> :
          this.state.modal_open_st === 1 ?
            <RentalCalendarModal
              gearid={this.state.cur_gear}
              onClose={this.handleClose}
              listGears={list}
            /> :
          this.state.modal_open_st === 3 ?
            <ConfirmModal
              heading='Gear Delete'
              onConfirm={this.performDelete}
              onClose={this.handleClose}
            /> : null
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  list: state.gear.listGears,
  isLoading: state.gear.isLoading,
  isLoadingCategories: state.category.isLoading,
});

export default connect(mapStateToProps)(MyListings);
