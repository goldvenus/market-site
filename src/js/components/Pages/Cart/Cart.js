import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import {getCarts, formatDate, days, deleteCartItem, handleError} from '../../../actions/app.actions';
import BarLoader from "react-bar-loader";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
        loadingdata:false
    }

     this.dogetCarts();
  }
  async dogetCarts() {
      try {
          await getCarts();
          this.setState({loadingdata : true});

      }
      catch {
          handleError('Gear is not added to cart');}
  }
  renderCartItems() {

    const { carts } = this.props;

    return (
      carts.map((listItem, index) => (
          <div className="d-none d-lg-table">
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
                   <div className="sm-category-list-top">
                       <div className='sclt_img'>{listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 ? <img
                        src={listItem.numberOfUserImage[0]} className="gear-img"/> : null}
                       </div>
                       <div className="col-md-17">
                           <p className="tb_brand_model_name">{listItem.brand + ' ' + listItem.model}</p>
                           <p className="theme-text-small text-muted tb_categories_name">{listItem.categoryName}</p>
                       </div >
                       <div className="seclt_icon_group">
                           <div className="seclt_edit_icon">
                               <div className="d-md-none d-lg-table-cell edit_gear_td">
                                    <Link to={`/editgear/${listItem.gearid}`}><span className="edit_gear"/></Link>
                               </div>
                           </div>
                           <div width="seclt_del_icon">
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
                    <div className="sm-category-list-bottom">
                        <div className="col-md-8 cart-bottom-first">
                            <p className= "tb_time_name cart-bottom-title">
                                {`${formatDate(listItem.startDate)} to ${formatDate(listItem.endDate)} `}
                            </p>
                            <p className="theme-text-small text-muted cart-bottom-content">
                                {` ${days(listItem.startDate, listItem.endDate)} days`}
                            </p>
                        </div>
                        <div className="sm-bottom-second-row col-md-16">
                            <div className="col-md-12 cart-bottom-second">
                                <p className="cart-bottom-title1">Price per day</p>
                                <p className="cart-bottom-content1">{`$${listItem.pricePerDay}`}</p>
                             </div>
                            <div className="col-md-12 cart-bottom-third">
                                <p className="cart-bottom-title1">Amouth</p>
                                <p className="cart-bottom-content2">{`$${listItem.pricePerDay * days(listItem.startDate, listItem.endDate)}`}</p>
                             </div>
                        </div>
                    </div>

                </div>
            ))
        );
    }
  render() {
    if (!this.state.loadingdata) {
      return <BarLoader color="#F82462" height="5" />;
    }
    return (
      <div className="cart_view centered-content">
        <Breadcrumb className= "card_content_path">
          <BreadcrumbItem>Home </BreadcrumbItem>
          <BreadcrumbItem active>Cart</BreadcrumbItem>
        </Breadcrumb>
        <div className="cart-header ">
          <h2 className="theme-page-title">Cart</h2>
          <div className="flex-row d-none d-lg-flex" >
            <button className="theme-btn theme-btn-secondery"><Link to="/favourites">Favourites</Link></button>
            <button className="theme-btn theme-btn-primary theme-btn-link"><Link to="/checkout">Continue Shopping</Link></button>
          </div>
        </div>
        <div className="cart-table-div">
          <Table className="theme-table">
            <thead>
                <tr className= "d-none d-lg-table">
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
          <div className="flex-row d-flex d-lg-none" >
              <button className="theme-btn theme-btn-secondery col-8"><Link to="/favourites">Favourites</Link></button>
              <button className="theme-btn theme-btn-primary theme-btn-link col-15"><Link to="/checkout">Continue Shopping</Link></button>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.app.carts
});

export default connect(mapStateToProps)(Cart);
