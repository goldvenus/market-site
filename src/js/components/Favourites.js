import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import moment from 'moment';
import { handleError, getFavourites, formatDate, days } from '../actions/app.actions';

class Favourites extends Component {
  constructor() {
    super();

    getFavourites();
  }

  renderFavouritesItems() {

    const { favourites } = this.props;

    return (
      favourites.map((listItem, index) => (
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
        </tr>
      ))
    )
  }

  render() {
    const { favourites } = this.props;

    if(!favourites) {
      return <div className="centered-content"> Loading... </div>
    }
    return (
      <div className="cart centered-content">
        <Breadcrumb>
          <BreadcrumbItem>Home </BreadcrumbItem>
          <BreadcrumbItem active>Favourites</BreadcrumbItem>
        </Breadcrumb>
        <div className="cart-header">
          <div className="theme-page-title">Favourites</div>
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
                this.renderFavouritesItems()
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
    favourites: store.app.favourites
  };
})(Favourites);
