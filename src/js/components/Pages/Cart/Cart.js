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
          <div className="d-md-none d-lg-table">
             <tr key={`cart-item-${index}`} >
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
          </div>
      ))
    );
  }

  renderCartItems_table() {

        const { carts } = this.props;

        return (
            carts.map((listItem, index) => (
                <div key={`cart-item-${index}`} className="d-lg-none d-md-block sm-table-cart">
                   <div>
                       <div width="100%">{listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 ? <img
                        src={listItem.numberOfUserImage[0]} className="gear-img"/> : null}
                           <div>
                               <div  className="d-md-none d-lg-table-cell edit_gear_td">
                                    <Link to={`/editgear/${listItem.gearid}`}><span className="edit_gear"/></Link>
                                </div>
                           </div>
                           <div >
                                <i
                                    className="close"
                                    aria-hidden="true"
                                    onClick={async () => {
                                        await deleteCartItem({ gearid: listItem.gearid, orderid: listItem.orderid });
                                        getCarts();
                                    }}
                                />
                            </div>
                       </div>
                   </div>
                    <div>
                        <div  width="32%" className="gear" >
                            <p className="tb_brand_model_name">{listItem.brand + ' ' + listItem.model}</p>
                            <p className="theme-text-small text-muted tb_categories_name">{listItem.categoryName}</p>
                        </div >
                        <div className="rental-period" width="25.6%">
                            <p className= "tb_time_name">
                                {`${formatDate(listItem.startDate)} to ${formatDate(listItem.endDate)} `}
                            </p>
                            <p className="theme-text-small text-muted tb_categories_name">
                                {` ${days(listItem.startDate, listItem.endDate)} days`}
                            </p>
                        </div>
                        <div width="17.5%">{`$${listItem.pricePerDay}`}</div>
                        <div className="tb_pay_per">{`$${listItem.pricePerDay * days(listItem.startDate, listItem.endDate)}`}</div>
                    </div>

                </div>
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
        <Breadcrumb className= "card_content_path">
          <BreadcrumbItem>Home </BreadcrumbItem>
          <BreadcrumbItem active>Cart</BreadcrumbItem>
        </Breadcrumb>
        <div className="cart-header ">
          <h2 className="theme-page-title">Cart</h2>
          <div className="flex-row d-md-none d-lg-flex" >
            <button className="theme-btn theme-btn-secondery"><Link to="/favourites">Favourites</Link></button>
            <button className="theme-btn theme-btn-primary theme-btn-link"><Link to="/checkout">Continue Shopping</Link></button>
          </div>
        </div>

        <div>
          <Table className="theme-table">
            <thead>
                <tr className= "d-md-none d-lg-table">
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
            {this.renderCartItems()}
            </tbody>
              {this.renderCartItems_table()}
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
