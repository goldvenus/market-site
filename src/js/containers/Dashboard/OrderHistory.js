import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { Link, withRouter } from 'react-router-dom';
import { Table } from 'reactstrap';
import { getOrderHistory } from '../../core/actions/dashboard.action';
import { days, getDateStr } from "../../core/helper";
import Rating from "react-rating"
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import OrderConfirm from "./OrderHistory/OrderConfirm"
import OrderRating from "./OrderHistory/OrderRating"
import BarLoader from "react-bar-loader";

class OrderHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal_open_st: 0,
            cur_proj: 0
        };

        getOrderHistory();
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
    renderOrderHistoryItems_sm() {
        const { histories } = this.props;
        if (!histories) {
            return <BarLoader color="#F82462" height="5"/>;
        }

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
                            <div className="status-bar status-bar3">Return</div>
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
                                <p className="order_history_pay_perday_content">{`$${listItem.SoldItems[0].pricePerDay}`}</p>
                            </div>
                            <div className="tb_pay_per d-block col-12">
                                <p className="order_history_pay_title">Amount</p>
                                <p className="prder_history_amount_content">{`$${listItem.Amount}`}</p>
                            </div>
                        </div>
                        </div>

                )
            })
        );
    }
    renderOrderHistoryItems() {
        const { histories } = this.props;
        if (!histories) {
            return <BarLoader color="#F82462" height="5"/>;
        }

        return (
            histories.map((listItem, index) => {
                const first_item = listItem.SoldItems[0];
                let product_name = listItem.SoldItems[0].brand + ' ' + listItem.SoldItems[0].model;
                product_name = product_name.substr(0, 13) + '...';
                return (
                    <tr key={`cart-item-${index}`} className="d-lg-table-row d-md-none d-sm-none d-none">
                        <td width="10%">{first_item.numberOfUserImage && first_item.numberOfUserImage.length > 0 ? <img
                            src={first_item.numberOfUserImage[0]} alt='' className="gear-img"/> : null}</td>
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
                                <div className="status-bar status-bar3">Return</div>
                            </div>
                        </td>
                        <td className="tb_pay_per" width="17.5%">{`$${listItem.Amount}`}</td>
                        <td><div className="to-payment-detail"><Link to={`/dashboard/order/detail/${listItem.PaymentId}`}><i className="fa fa-angle-right"/></Link></div></td>
                    </tr>
                )
            })
        );
    }
    renderHistoriesItems_md() {
        const { histories } = this.props;
        return (
            histories.map((listItem, index) => (
                <div key={`cart-item-${index}`} className="d-lg-none d-sm-none d-md-block favo_table_root">
                    <div className="sm_favor_table">
                        <div className="sm_favor_img d-md-flex d-none">{listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 ? <img
                            src={listItem.numberOfUserImage[0]} alt='' className="favor_gear-img"/> : null}
                        </div>
                        <div className="sm_favor_table_top">
                            <div className="sm_favor_name_closeicon">
                                <div className="sm_favor_img d-sm-flex d-md-none">{listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 ? <img
                                    src={listItem.numberOfUserImage[0]} alt='' className="favor_gear-img"/> : null}
                                </div>
                                <div className="col-md-22 favourites_close_text">
                                    <p className="tb_brand_model_name">{listItem.brand + ' ' + listItem.model}</p>
                                    <p className="theme-text-small text-muted tb_categories_name">{listItem.categoryName}</p>
                                </div>
                                <div className="favourites_close_icon">
                                    <i className="close" aria-hidden="true"/>
                                </div>
                            </div>
                            <div className="sm_favor_bottom">
                                <div className="bottom_left col-md-8">
                                    <Rating
                                        initialRating={3}
                                        emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon" />}
                                        fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon" />}/>
                                    <div><div className="favouri_link_icon"/><span className="Raykjavik_span">Raykjavik</span></div>
                                </div>
                                <div className="sm_favor_bottom_right col-md-14">
                                    <p>Price per day</p>
                                    <div className="tb_pay_per">{`$${listItem.pricePerDay}`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="favoiurites_add_icon">
                        <button className="theme-btn theme-btn-primary theme-btn-link add-to-cart-btn" onClick={() => this.onOpenModal(listItem.gearid)}>Add to Cart</button>
                    </div>
                </div>
            ))
        );
    }

    render() {
        const { histories } = this.props;

        if (!histories || histories.length < 1) {
            return null;
        }

        return (
            <React.Fragment>
                <div className="row order-history-container">
                    <div className="col-sm-24">
                        <div className="cart-header ">
                            <h4>Order History</h4>
                        </div>
                        <div className="d-md-flex d-lg-none d-none md_show_buttons" >
                            <button className="theme-btn theme-btn-secondery col-md-9"><Link to="/cart">Continue Shopping2</Link></button>
                            <button className="theme-btn theme-btn-primary theme-btn-link col-md-14"><Link to="/checkout">Cart</Link></button>
                        </div>
                        <div className="cart-table-div">
                            {
                                !histories.length ?
                                    (null
                                    ) :(
                                        <div>
                                        <Table className="theme-table table order-history-table">
                                            <thead className= "d-none d-lg-table">
                                                <tr>
                                                    <th></th>
                                                    <th>Project Name</th>
                                                    <th>Rental Period</th>
                                                    <th>Status</th>
                                                    <th>Amount</th>
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
                            {
                                this.renderHistoriesItems_md()
                            }
                        </div>

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