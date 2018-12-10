import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import moment from 'moment';
import dataSet from './Dashboard/dataSet';

const days = (d1, d2) => { return moment(d2).diff(moment(d1) , 'days')};

class Cart extends Component {
  renderCartItems() {
    const items = dataSet.slice(0,5);
    return (
      items.map((listItem, index) => (
        <tr key={`cart-item-${index}`}>
          <td width="15%">{<img src={listItem.gear_img} className="gear-img"/>}</td>
          <td className="gear" width="20%">
            <p >{listItem.gear_name}</p>
            <p className ="theme-text-small text-muted">{listItem.gear_category}</p>
          </td>
          <td className="rental-period" width="20%">
            <p>
              {`${listItem.rental_period_start_date} to ${listItem.rental_period_end_date} `}
            </p>
            <p className="theme-text-small text-muted">
              {` ${days(listItem.rental_period_start_date, listItem.rental_period_end_date)} days`}
            </p>
          </td>
          <td width="15%">{listItem.price_per_day}</td>
          <td width="15%">{listItem.price_per_month}</td>
        </tr>
      ))
    )
  }

  render() {
    return (
      <div className="cart centered-content">
        <Breadcrumb>
          <BreadcrumbItem>Home </BreadcrumbItem>
          <BreadcrumbItem active>Cart</BreadcrumbItem>
        </Breadcrumb>
        <div className="cart-header">
          <div className="theme-page-title">Cart</div>
          <div className="flex-row">
            <button className="theme-btn theme-btn-secondery">Favourites</button>
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
  };
})(Cart);
