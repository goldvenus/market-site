import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Dropdown, DropdownToggle, Input, Label } from 'reactstrap';
import CustomInput from './CustomInput';
import moment from 'moment';
import dataSet from './Dashboard/dataSet';

const days = (d1, d2) => { return moment(d2).diff(moment(d1) , 'days')};

class Checkout extends Component {
  renderCheckoutItems() {
    const items = dataSet.slice(0,5);
    return (
      <div className="checkout-items">
        {
          items.map((listItem, index) => {
            return <div key={`cart-item-${index}`} className="checkout-item theme-text-small">
              <div>{listItem.gear_name}</div>
              <div><b>{listItem.price_per_month}</b> for <b>{days(listItem.rental_period_start_date, listItem.rental_period_end_date)}</b> days</div>
            </div>
          })
        }
      </div>
    )
  }

  render() {
    return (
      <div className="checkout">
        <Breadcrumb>
          <BreadcrumbItem>Home </BreadcrumbItem>
          <BreadcrumbItem active>Cart</BreadcrumbItem>
        </Breadcrumb>

        <div className="theme-page-title">Checkout</div>

        <div className="flex-row flex-align-stretch">
          <div className="billing-address">
            <div className="checkout-header">
              <div className="text-gray">BILLING ADDRESS</div>
            </div>
            <div className="theme-form">
              <Dropdown className="theme-form-field">
                <DropdownToggle caret>
                  Saved Address
                </DropdownToggle>
              </Dropdown>
              <div className="theme-form-field">
                <CustomInput placeholder='Full Name' type="text"/>
              </div>
              <div className="flex-row">
                <div className="theme-form-field">
                  <CustomInput placeholder='Address' type="text"/>
                </div>
                <div className="theme-form-field">
                  <CustomInput placeholder='City' type="text"/>
                </div>
              </div>
              <div className="flex-row">
                <div className="theme-form-field">
                  <CustomInput placeholder='Region' type="text"/>
                </div>
                <div className="theme-form-field">
                  <CustomInput placeholder='Zip' type="text"/>
                </div>
              </div>
              <div className="theme-form-field">
                <Input type="checkbox" id="save-address"/>
                <Label for="save-address">Save this address</Label>
              </div>
            </div>
          </div>

          <div className="order-info theme-text-small">
            <div className="checkout-header">
              <div className="text-gray">ORDER INFORMATION</div>
              <button className="theme-btn theme-btn-filled-white theme-btn-link"><Link to="/cart">Edit Order</Link></button>
            </div>

            {
              this.renderCheckoutItems()
            }

            <div className="checkout-total">
              <div><span className="text-gray">Total </span> <b>$1180.00</b></div>
              <div><span className="text-gray">Tax (21%) </span> <b>$247.80</b></div>
              <div><span className="text-gray">Fee </span> <b>$0</b></div>
            </div>

            <div className="checkout-amount">
              <div><span className="text-gray">Amount </span> <b>$1427.80</b></div>
            </div>
          </div>
        </div>

        <div className="flex-row bottom-buttons">
          <button className="theme-btn theme-btn-secondery theme-btn-link"><Link to="/cart">Edit Order</Link></button>
          <button className="theme-btn theme-btn-primary">Payment</button>
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Checkout);
