import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { Link, withRouter } from 'react-router-dom';
import { Table } from 'reactstrap';
import { handleError, getOrderHistory } from '../../../actions/app.actions';
import { ToastsStore } from 'react-toasts';
import Rating from "react-rating"
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import OrderConfirm from "./order/OrderConfirm"
import OrderRating from "./order/OrderRating"

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

    renderOrderHistoryItems() {
        const { histories } = this.props;

        return (
            histories.map((listItem, index) => (
                <tr key={`cart-item-${index}`}>
                    <td width="10%">{listItem.SoldItems[0].numberOfUserImage && listItem.SoldItems[0].numberOfUserImage.length > 0 ? <img
                        src={listItem.SoldItems[0].numberOfUserImage[0]} alt='' className="gear-img"/> : null}</td>
                    <td className="gear" width="29%">
                        <p className="tb-project-name" onClick={() => this.handleControl(index)}>{listItem.ProjectName}</p>
                        <p className="theme-text-small text-muted tb-category-name">{listItem.SoldItems[0].brand + ' ' + listItem.SoldItems[0].model}</p>
                    </td>
                    <td width="20.5%">
                        <Rating
                            initialRating={3}
                            emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon" />}
                            fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon" />}
                            onClick={() => this.handleRating(index)}/>
                    </td>

                    <td width="17.5%">
                        <div className="status-bar-container">
                            <div className="status-bar status-bar1">Payment</div>
                            <div className="status-bar status-bar2">Pickup</div>
                            <div className="status-bar">Return</div>
                        </div>
                    </td>
                    <td className="tb_pay_per" width="17.5%">{`$${listItem.Amount}`}</td>
                    <td><div className="to-payment-detail"><Link to={`/dashboard/order/detail/${listItem.PaymentId}`}><i className="fa fa-angle-right"/></Link></div></td>
                </tr>
            ))
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
        console.log("----------", histories);

        return (
            <React.Fragment>
                <div className="row order-history-container">
                    <div className="col-sm-24">
                        <div className="cart-header ">
                            <h4>Order Histories</h4>
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
                                        <Table className="theme-table table">
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
    histories: state.app.order_histories,
    carts: state.app.carts
});

export default compose(
    connect(mapStateToProps),
    withRouter
)(OrderHistory);
