import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { getCarts, formatDate, days, deleteCartItem } from '../../../actions/app.actions';

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
          <td width="10%">{listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 ? <img
            src={listItem.numberOfUserImage[0]} className="gear-img"/> : null}</td>
          <td  width="32%" className="gear" >
            <p className="tb_brand_model_name">{listItem.brand + ' ' + listItem.model}</p>
            <p className="theme-text-small text-muted tb_categories_name">{listItem.categoryName}</p>
          </td >
          <td className="rental-period" width="25.6%">
            <p className= "tb_time_name">
              {`${formatDate(listItem.startDate)} to ${formatDate(listItem.endDate)} `}
            </p>
            <p className="theme-text-small text-muted tb_categories_name">
              {` ${days(listItem.startDate, listItem.endDate)} days`}
            </p>
          </td>
          <td width="17.5%">{`$${listItem.pricePerDay}`}</td>
          <td className="tb_pay_per">{`$${listItem.pricePerDay * days(listItem.startDate, listItem.endDate)}`}</td>
            <td  className="d-md-none d-lg-table-cell edit_gear_td">
                <Link to={`/editgear/${listItem.gearid}`}><span className="edit_gear"/></Link>
            </td>
            <td >
            <i
              className="close"
              aria-hidden="true"
              onClick={async () => {
                await deleteCartItem({ gearid: listItem.gearid, orderid: listItem.orderid });
                getCarts();
              }}
            />
          </td>

        </tr>
      ))
    );
  }

  render() {
    const { carts } = this.props;

    if (!carts) {
      return <div className="centered-content"> Loading... </div>;
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
            <button className="theme-btn theme-btn-primary theme-btn-link"><Link to="/checkout">Continue Shopping</Link></button>
          </div>
        </div>

        <div>
          <Table className="theme-table">
            <thead>
                <tr>
                  <th/>
                  <th>Name & Category</th>
                  <th>Rental Period</th>
                  <th>Price Per Day</th>
                  <th>Amount</th>
                  <th></th>
                  <th/>
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

const mapStateToProps = state => ({
  carts: state.app.carts
});

export default connect(mapStateToProps)(Cart);
