import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import moment from 'moment';
import { handleError, getCarts, formatDate, days, deleteCartItem } from '../actions/app.actions';

class Cart extends Component {
  constructor() {
    super();

    getCarts();
  }

  renderCartItems() {

    const { carts } = this.props;

    return (
      carts.map((listItem, index) => (
        <tr key={`cart-item-${index}`}>
          <td width="15%">{ listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 ? <img src={listItem.numberOfUserImage[0]} className="gear-img"/> : null }</td>
          <td className="gear" width="20%">
            <p >{listItem.brand + ' ' + listItem.model }</p>
            <p className ="theme-text-small text-muted">{listItem.categoryName}</p>
          </td>
          <td className="rental-period" width="20%">
            <p>
              {`${formatDate(listItem.startDate)} to ${formatDate(listItem.endDate)} `}
            </p>
            <p className="theme-text-small text-muted">
              {` ${days(listItem.startDate, listItem.endDate)} days`}
            </p>
          </td>
          <td width="15%">{listItem.pricePerDay}</td>
          <td width="15%">{listItem.pricePerDay * days(listItem.startDate, listItem.endDate)}</td>
          <td><i className="fa fa-times" aria-hidden="true" onClick={async () => { await deleteCartItem({gearid: listItem.gearid, orderid: listItem.orderid}); getCarts();}}></i></td>

        </tr>
      ))
    )
  }

  render() {
    const { carts } = this.props;

    if(!carts) {
      return <div className="centered-content"> Loading... </div>
    }
    return (
      <div className="cart centered-content">
        <Breadcrumb>
          <BreadcrumbItem>Home </BreadcrumbItem>
          <BreadcrumbItem active>Cart</BreadcrumbItem>
        </Breadcrumb>
        <div className="cart-header">
          <div className="theme-page-title">Cart</div>
          <div className="flex-row">
            <button className="theme-btn theme-btn-secondery"><Link to="/favourites">Favourites</Link></button>
            <button className="theme-btn theme-btn-primary theme-btn-link"><Link to="/checkout">Continue</Link></button>
          </div>
        </div>

        <div>
          <Table className="theme-table">
            <thead>
              <tr>
                <th></th>
                <th>Name & Category</th>
                <th>Rental Period</th>
                <th>Price Per Day</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.renderCartItems()
              }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    carts: store.app.carts
  };
})(Cart);
