import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { Link, withRouter } from 'react-router-dom';
import { Table } from 'reactstrap';
import { getOrderHistory } from '../../core/actions/dashboard.action';
import { days, getDateStr } from "../../core/helper";
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import OrderConfirm from "./OrderHistory/OrderConfirm"
import OrderRating from "./OrderHistory/OrderRating"
import BarLoader from "react-bar-loader";
import $ from "jquery";
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import EmptyRental from "./OrderHistory/EmptyRental";

class OrderHistory extends Component {
    constructor(props) {
        super(props);

        this.pageSize = 5;
        this.pagesCount = 0;
        this.state = {
            currentPage: 0,
            modal_open_st: 0,
            cur_proj: 0
        };

        getOrderHistory();
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

    renderOrderHistoryItems_sm() {
        let { histories } = this.props;
        let { currentPage } = this.state;
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
                let product_name = listItem.SoldItems[0].brand + ' ' + listItem.SoldItems[0].model;
                product_name = product_name.substr(0, 13) + '...';
                return (
                    <div key={`cart-item-${index}`} className="d-sm-block d-lg-none d-md-none order_mobile_parent_div">
                        <div className="d-flex">
                            <div width="50%" className="order_history_sm_gearimage">{first_item.numberOfUserImage && first_item.numberOfUserImage.length > 0 ? <img
                                src={first_item.numberOfUserImage[0]} alt='' className="gear-img"/> : null}</div>
                            <div className="gear order_history_sm_gear_name" width="50%">
                                <p className="tb-project-name" onClick={() => this.handleControl(index)}>listItem.ProjectName</p>
                                <p className="theme-text-small text-muted tb-category-name"><span>{listItem.SoldItems.length} Items:</span> {product_name}</p>
                            </div>
                        </div>
                        <div className="status-bar-container">
                            <div className="status-bar status-bar1">Payment</div>
                            <div className="status-bar status-bar2">Pickup</div>
                            <div className="status-bar3">Return</div>
                        </div>
                        <div className="order_history_sm_gear_days">
                            <div className='history-rental-period' onClick={() => this.handleRating(index)}>{getDateStr(first_item.startDate)} - {getDateStr(first_item.endDate)}</div>
                            <div className='history-rental-duration'>{days(Date(first_item.startDate), Date(first_item.endDate))} days</div>
                        </div>
                        <div className="d-flex">
                            <div className="order_history_client_image">
                                <img src={first_item.numberOfUserImage[0]} alt='' />
                            </div>
                            <div className="d-block order_history_client_namegroup">
                                <p className="order_history_client_first_name" >Landrord</p>
                                <p className="order_history_client_second_name">Josh Stapleton</p>
                            </div>
                        </div>
                        <div className="d-flex order_history_payment">
                            <div className="order_history_pay_group d-block col-12">
                                <p className="order_history_pay_title">Price per day</p>
                                <p className="order_history_pay_perday_content">${listItem.SoldItems[0].pricePerDay}</p>
                            </div>
                            <div className="tb_pay_per d-block col-12">
                                <p className="order_history_pay_title">Amouth</p>
                                <p className="prder_history_amount_content">${parseFloat(listItem.Amount).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        );
    }

    renderOrderHistoryItems() {
        let { histories } = this.props;
        let { currentPage } = this.state;
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
                let product_name = listItem.SoldItems[0].brand + ' ' + listItem.SoldItems[0].model;
                product_name = product_name.substr(0, 13) + '...';
                return (
                    <tr key={`cart-item-${index}`} className="d-lg-table-row d-md-none d-sm-none d-none">
                        <td width="10%">
                            {first_item.numberOfUserImage && first_item.numberOfUserImage.length > 0 &&
                            <img src={first_item.numberOfUserImage[0]} alt='' className="gear-img"/>}
                        </td>
                        <td className="gear" width="29%">
                            <p className="tb-project-name" onClick={() => this.handleControl(index)}>listItem.ProjectName</p>
                            <p className="theme-text-small text-muted tb-category-name"><span>{listItem.SoldItems.length} Items:</span> {product_name}</p>
                        </td>
                        <td width="20.5%">
                            <div className='history-rental-period' onClick={() => this.handleRating(index)}>{getDateStr(first_item.startDate)} - {getDateStr(first_item.endDate)}</div>
                            <div className='history-rental-duration'>{days(Date(first_item.startDate), Date(first_item.endDate))} days</div>
                        </td>

                        <td width="17.5%">
                            <div className="status-bar-container">
                                <div className="status-bar status-bar1">Payment</div>
                                <div className="status-bar status-bar2">Pickup</div>
                                <div className="status-bar3">Return</div>
                            </div>
                        </td>
                        <td className="tb_pay_per" width="17.5%">${parseFloat(listItem.Amount).toFixed(2)}</td>
                        <td><div className="to-payment-detail"><Link to={`/dashboard/order/detail/${listItem.PaymentId}`}><i className="fa fa-angle-right"/></Link></div></td>
                    </tr>
                )
            })
        );
    }

    renderHistoriesItems_md() {
        let { histories } = this.props;
        let { currentPage } = this.state;
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
                let product_name = listItem.SoldItems[0].brand + ' ' + listItem.SoldItems[0].model;
                product_name = product_name.substr(0, 13) + '...';

                return (
                    <div key={`cart-item-${index}`} className="tablet-gear-item favo_table_root">
                        <div className="order-item-top">
                            <div className="order-item-img-wrapper">
                                {first_item.numberOfUserImage && first_item.numberOfUserImage.length > 0 &&
                                    <img src={first_item.numberOfUserImage[0]} alt='' className="order-item-img"/>}
                            </div>
                            <div className="order-item-name-category">
                                <p className="tb-project-name" onClick={() => this.handleControl(index)}>listItem.ProjectName</p>
                                <p className="theme-text-small text-muted tb-category-name"><span>{listItem.SoldItems.length} Items:</span> {product_name}</p>
                            </div>
                            <div className="order-item-state">
                                <div className="status-bar-container">
                                    <div className="status-bar status-bar1">Payment</div>
                                    <div className="status-bar status-bar2">Pickup</div>
                                    <div className="status-bar3">Return</div>
                                </div>
                            </div>
                        </div>
                        <div className="order-item-bottom">
                            <div className="duration">
                                <span className='history-rental-period' onClick={() => this.handleRating(index)}>{getDateStr(first_item.startDate)} - {getDateStr(first_item.endDate)}</span>
                                <span className='grey-small-text'>{days(Date(first_item.startDate), Date(first_item.endDate))} days</span>
                            </div>
                            <div className="owner">
                                <span className="grey-small-text">Landrord</span>
                                <span className="owner-name">Josh Stapleton</span>
                            </div>
                            <div className="order-price-per-day">
                                <span className="grey-small-text">Price per day</span>
                                <span className="gear-price-per-day-value">${listItem.SoldItems[0].pricePerDay}</span>
                            </div>
                            <div className="amouth">
                                <span className="grey-small-text">Amouth</span>
                                <span className="gear-amouth-value">${parseFloat(listItem.Amount).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                )
            })
        );
    }

    render() {
        const { currentPage } = this.state;
        const { histories } = this.props;

        if (!histories) {
            return <BarLoader color="#F82462" height="5"/>;
        }
        this.pagesCount = Math.ceil(histories ? histories.length / this.pageSize : "");

        return (
            <React.Fragment>
                <div className="order-history-container">
                    <div className="cart-header ">
                        <h4 className="tab-title">Order History</h4>
                    </div>
                    <div className="cart-table-div">
                        { !histories.length ?
                            ( <EmptyRental/> ) : (
                                <div className="table-responsive">
                                    <Table className="theme-table table order-history-table">
                                        <thead className= "d-none d-lg-table">
                                            <tr className="listing-data-thead">
                                                <th></th>
                                                <th>Project Name</th>
                                                <th>Rental Period</th>
                                                <th>Status</th>
                                                <th>Amouth</th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                        {
                                          this.renderOrderHistoryItems()
                                        }

                                        </tbody>

                                    </Table>
                                    <div className="order_history_sm_parent_div">
                                        {this.renderOrderHistoryItems_sm()}
                                    </div>
                                </div>
                            )}
                        { this.renderHistoriesItems_md() }
                    </div>
                    { histories.length > 0 &&
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

                    <div className="d-flex d-md-none d-lg-none md_show_buttons" >
                        <button className="theme-btn theme-btn-secondery col-md-14"><Link to="/cart">Continue Shopping</Link></button>
                        <button className="theme-btn theme-btn-primary theme-btn-link col-md-9"><Link to="/checkout">Cart</Link></button>
                    </div>
                    {
                        this.state.modal_open_st === 1 ?
                            <OrderConfirm info={this.props.histories[this.state.cur_proj]} close={this.handleClose}/> :
                        this.state.modal_open_st === 2 ?
                            <OrderRating info={this.props.histories[this.state.cur_proj]} close={this.handleClose}/> : null
                    }
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    histories: state.dashboard.orderHistories
});

export default compose(
    connect(mapStateToProps),
    withRouter
)(OrderHistory);
