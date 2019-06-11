import React, {Component} from 'react';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import $ from "jquery";
import {Table, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import {days, getDateStr} from "../../../../core/helper";
import EmptyRental from "../../OrderHistory/EmptyRental";
import OwnerConfirmModal from "./OwnerConfirmModal";

class OwnerComponent extends Component {
  constructor(props) {
    super(props);
    
    this.pageSize = 5;
    this.pagesCount = 0;
    this.statusClass = ['starting-status', 'pending-status', 'completed-status'];
    this.state = {
      currentPage: 0,
      modal_open_st: 0,
      cur_proj: 0
    };
    
  }
  
  componentDidUpdate() {
    $(function () {
      $(".pagination .page-item:first-child a").html("<");
      $(".pagination .page-item:last-child a").html(">");
    })
  }
  
  handleControl = (val) => {
    this.setState({cur_proj: val, modal_open_st: 1});
  };
  
  handleRating = (val) => {
    this.setState({cur_proj: val, modal_open_st: 2});
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
  
  renderItemsMobile() {
    let {histories} = this.props;
    let {currentPage} = this.state;
    if (!histories) {
      return null;
    }
    histories = histories.slice(
      currentPage * this.pageSize,
      (currentPage + 1) * this.pageSize
    );
    
    return (
      histories.map((listItem, index) => {
        const first_item = listItem.SoldItems[0];
        let product_name = first_item.brand + ' ' + first_item.productName;
        product_name = product_name.substr(0, 13) + '...';
        
        let pickStatus = 0, returnStatus = 0, ratingStatus = 0;
        let firstSoldItem = listItem.SoldItems[0];
        if (firstSoldItem.PickStatus === 1) {
          pickStatus = 1;
        } else if (firstSoldItem.PickStatus > 1) {
          pickStatus = 2;
        }
        if (firstSoldItem.ReturnStatus === 1) {
          returnStatus = 1;
        } else if (firstSoldItem.ReturnStatus > 1) {
          returnStatus = 2;
        }
  
        let ratingOwner = listItem.ratingOwner && listItem.ratingOwner.filter((item) => item[0] === localStorage.userId).length > 0;
        if (firstSoldItem.returnGearStatus && ratingOwner && firstSoldItem.ratingRenter) {
          ratingStatus = 3;
        } else if (ratingOwner && firstSoldItem.ratingRenter) {
          ratingStatus = 2;
        } else if (ratingOwner || firstSoldItem.ratingRenter) {
          ratingStatus = 1;
        }
        
        return (
          <div key={`cart-item-${index}`} className="mobile-gear-item" onClick={() => this.handleControl(currentPage*this.pageSize+index)}>
            <div className="order-item-top">
              <div className="order-item-img-wrapper">
                {first_item.numberOfUserImage && first_item.numberOfUserImage.length > 0 &&
                <img src={first_item.numberOfUserImage[0]} alt='' className="order-item-img"/>}
              </div>
              <div className="order-item-name-category">
                <p className="tb-project-name">{listItem.ProjectName}</p>
                <p className="theme-text-small text-muted tb-category-name">
                  <span>{listItem.SoldItems.length} Items:</span> {product_name}</p>
              </div>
            </div>
            <div className="order-item-state">
              <div className="status-bar-container">
                {returnStatus <= 2 && ratingStatus === 0 ?
                  <React.Fragment>
                    <div className={`status-bar status-bar1 completed-status`}>Payment</div>
                    <div className={`status-bar status-bar2 ${this.statusClass[pickStatus]}`}>Pickup</div>
                    <div className={`status-bar3 ${this.statusClass[returnStatus]}`}>Return</div>
                  </React.Fragment> :
                ratingStatus === 1 ?
                  <React.Fragment>
                    <div className='pending-status final-status'>Rating Pending</div>
                  </React.Fragment> :
                ratingStatus >= 2 ?
                  <React.Fragment>
                    <div className='completed-status-big final-status'>Completed</div>
                  </React.Fragment> : null
                }
              </div>

            </div>
            <div className="duration">
              <span className='history-rental-period' onClick={() => this.handleRating(index)}>
                {getDateStr(first_item.startDate)} - {getDateStr(first_item.endDate)}
              </span>
              <span className='grey-small-text'>
                {days(first_item.startDate, first_item.endDate)} days
              </span>
            </div>
            <div className="owner">
              <img src={first_item.OwnerInfo.picture} alt=''/>
              <div>
                <span className="grey-small-text">Landlord</span>
                <span className="owner-name">{first_item.OwnerInfo.given_name}</span>
              </div>
            </div>
            <div className="order-item-bottom">
              <div className="order-price-per-day">
                <span className="grey-small-text">Price per day</span>
                <span className="gear-price-per-day-value">${first_item.pricePerDay}</span>
              </div>
              <div className="amouth">
                <span className="grey-small-text">Amount</span>
                <span className="gear-amouth-value">${parseFloat(listItem.Amount).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )
      })
    );
  }
  
  renderItemsDesktop() {
    let {histories} = this.props;
    let {currentPage} = this.state;
    if (!histories) {
      return null;
    }
    histories = histories.slice(
      currentPage * this.pageSize,
      (currentPage + 1) * this.pageSize
    );
    
    return (
      histories.map((listItem, index) => {
        const first_item = listItem.SoldItems[0];
        let product_name = first_item.brand + ' ' + first_item.productName;
        product_name = product_name.substr(0, 13) + '...';
  
        let pickStatus = 0, returnStatus = 0, ratingStatus = 0;
        let firstSoldItem = listItem.SoldItems[0];
        if (firstSoldItem.PickStatus === 1) {
          pickStatus = 1;
        } else if (firstSoldItem.PickStatus > 1) {
          pickStatus = 2;
        }
        if (firstSoldItem.ReturnStatus === 1) {
          returnStatus = 1;
        } else if (firstSoldItem.ReturnStatus > 1) {
          returnStatus = 2;
        }
  
        let ratingOwner = listItem.ratingOwner && listItem.ratingOwner.filter((item) => item[0] === localStorage.userId).length > 0;
        if (firstSoldItem.returnGearStatus && ratingOwner && firstSoldItem.ratingRenter) {
          ratingStatus = 3;
        } else if (ratingOwner && firstSoldItem.ratingRenter) {
          ratingStatus = 2;
        } else if (ratingOwner || firstSoldItem.ratingRenter) {
          ratingStatus = 1;
        }
  
        return (
          <tr key={`cart-item-${index}`} onClick={() => this.handleControl(currentPage*this.pageSize+index)} className={pickStatus === 1 || returnStatus === 1 ? 'new-order-shadow' : ''}>
            <td width="10%">
              {pickStatus === 1 || returnStatus === 1 ?
                <div className="new-order-sign"/> : null}
  
              {first_item.numberOfUserImage && first_item.numberOfUserImage.length > 0 &&
              <img src={first_item.numberOfUserImage[0]} alt='' className="gear-img"/>}
            </td>
            <td className="gear" width="25%">
              <p className="tb-project-name">{listItem.ProjectName}</p>
              <p className="theme-text-small text-muted tb-category-name">
                <span>{listItem.SoldItems.length} Items:</span> {product_name}</p>
            </td>
            <td width="25%">
              <div
                className='history-rental-period'>{getDateStr(first_item.startDate)} - {getDateStr(first_item.endDate)}</div>
              <div
                className='history-rental-duration'>{days(first_item.startDate, first_item.endDate)} days
              </div>
            </td>
            
            <td width="25%">
              <div className="status-bar-container">
                {returnStatus <= 2 && ratingStatus === 0 ?
                  <React.Fragment>
                    <div className={`status-bar status-bar1 completed-status`}>Payment</div>
                    <div className = {`status-bar status-bar2 ${this.statusClass[pickStatus]}`}>Pickup</div>
                    <div className={`status-bar3 ${this.statusClass[returnStatus]}`}>Return</div>
                  </React.Fragment> :
                ratingStatus <3 ?
                  <React.Fragment>
                    <div className='pending-status final-status'>Rating Pending</div>
                  </React.Fragment> :
                ratingStatus === 3 ?
                  <React.Fragment>
                    <div className='completed-status-big final-status'>Completed</div>
                  </React.Fragment> : null
                }
              </div>
            </td>
            <td className="tb_pay_per" width="10%">${parseFloat(listItem.Amount).toFixed(2)}</td>
            <td width="5%">
              <div className="to-payment-detail"><i className="fa fa-angle-right"/></div>
            </td>
          </tr>
        )
      })
    );
  }
  
  renderItemsTablet() {
    let {histories} = this.props;
    let {currentPage} = this.state;
  
    if (!histories) {
      return null;
    }
    histories = histories.slice(
      currentPage * this.pageSize,
      (currentPage + 1) * this.pageSize
    );
    
    return (
      histories.map((listItem, index) => {
        const first_item = listItem.SoldItems[0];
        let product_name = first_item.brand + ' ' + first_item.productName;
        product_name = product_name.substr(0, 13) + '...';
  
        let pickStatus = 0, returnStatus = 0, ratingStatus = 0;
        let firstSoldItem = listItem.SoldItems[0];
        if (firstSoldItem.PickStatus === 1) {
          pickStatus = 1;
        } else if (firstSoldItem.PickStatus > 1) {
          pickStatus = 2;
        }
        if (firstSoldItem.ReturnStatus === 1) {
          returnStatus = 1;
        } else if (firstSoldItem.ReturnStatus > 1) {
          returnStatus = 2;
        }
  
        let ratingOwner = listItem.ratingOwner && listItem.ratingOwner.filter((item) => item[0] === localStorage.userId).length > 0;
        if (firstSoldItem.returnGearStatus && ratingOwner && firstSoldItem.ratingRenter) {
          ratingStatus = 3;
        } else if (ratingOwner && firstSoldItem.ratingRenter) {
          ratingStatus = 2;
        } else if (ratingOwner || firstSoldItem.ratingRenter) {
          ratingStatus = 1;
        }
        
        return (
          <div key={`cart-item-${index}`} className="tablet-gear-item" onClick={() => this.handleControl(index)}>
            <div className="order-item-top">
              <div className="order-item-img-wrapper">
                {first_item.numberOfUserImage && first_item.numberOfUserImage.length > 0 &&
                <img src={first_item.numberOfUserImage[0]} alt='' className="order-item-img"/>}
              </div>
              <div className="order-item-name-category">
                <p className="tb-project-name">{listItem.ProjectName}</p>
                <p className="theme-text-small text-muted tb-category-name">
                  <span>{listItem.SoldItems.length} Items:</span> {product_name}</p>
              </div>
              <div className="order-item-state">
                <div className="status-bar-container">
                  {returnStatus <= 2 && ratingStatus === 0 ?
                    <React.Fragment>
                      <div className={`status-bar status-bar1 completed-status`}>Payment</div>
                      <div className = {`status-bar status-bar2 ${this.statusClass[pickStatus]}`}>Pickup</div>
                      <div className={`status-bar3 ${this.statusClass[returnStatus]}`}>Return</div>
                    </React.Fragment> :
                  ratingStatus === 1 ?
                    <React.Fragment>
                      <div className='pending-status final-status'>Rating Pending</div>
                    </React.Fragment> :
                  ratingStatus >= 2 ?
                    <React.Fragment>
                      <div className='completed-status-big final-status'>Completed</div>
                    </React.Fragment> : null
                  }
                </div>
              </div>
            </div>
            <div className="order-item-bottom">
              <div className="duration">
                <span className='history-rental-period' onClick={() => this.handleRating(index)}>
                  {getDateStr(first_item.startDate)} - {getDateStr(first_item.endDate)}
                </span>
                <span className='grey-small-text'>
                  {days(first_item.startDate, first_item.endDate)} days
                </span>
              </div>
              <div className="owner">
                <img src={first_item.OwnerInfo.picture} alt=''/>
                <div>
                  <span className="grey-small-text">Landlord</span>
                  <span className="owner-name">{first_item.OwnerInfo.given_name}</span>
                </div>
              </div>
              <div className="order-price-per-day">
                <span className="grey-small-text">Price per day</span>
                <span className="gear-price-per-day-value">${first_item.pricePerDay}</span>
              </div>
              <div className="amouth">
                <span className="grey-small-text">Amount</span>
                <span className="gear-amouth-value">${parseFloat(listItem.Amount).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )
      })
    );
  }
  
  render() {
    const {currentPage} = this.state;
    const {histories} = this.props;
    this.pagesCount = Math.ceil(histories ? histories.length / this.pageSize : "");
    
    return (
      <div className="order-history-container">
        <div className="order-history-body wrraper_dashboard">
          {!histories.length ?
            (<EmptyRental/>) : (
              <div className="table-responsive">
                <Table className="theme-table table order-history-table">
                  <thead>
                  <tr className="listing-data-thead">
                    <th/>
                    <th>Project Name</th>
                    <th>Rental Period</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th/>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderItemsDesktop()}
                  </tbody>
                </Table>
                <div className="tablet-mobile-wrapper">
                  {this.renderItemsTablet()}
                  {this.renderItemsMobile()}
                </div>
              </div>
            )
          }
        </div>
        {histories.length > 0 &&
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
        }
        {this.state.modal_open_st === 1 ?
          <OwnerConfirmModal info={this.props.histories[this.state.cur_proj]} close={this.handleClose}/> : null
        }
      </div>
    );
  }
}

export default OwnerComponent;