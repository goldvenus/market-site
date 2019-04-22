import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { formatDate, days, deleteCartItem, handleError } from '../../../actions/app.actions';
import BarLoader from "react-bar-loader";
import EmptyActivity from '../../EmptyActivity'
import CustomSpinner from "../../CustomSpinner";
import Urllink_class from "../../Urllink_class";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleting: 'init'
    }
  }

  shouldComponentUpdate(props, state) {
    if (this.props !== props && this.state.deleting !== 'init')
      this.setState({deleting: false});
    return true;
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
                this.setState({deleting: true});
                let ret = await deleteCartItem({ gearid: listItem.gearid, orderid: listItem.orderid });
                if (!ret) handleError("Removing from cart failed!");
              }}
            />
          </td>
        </tr>
      ))
    );
  }

  renderCartItems_table() {
    const { carts } = this.props;
    return (
        carts.map((listItem, index) => (
            <tr key={`cart-item-${index}`} className="d-lg-none d-md-block sm-table-cart">
               <td className="sm-category-list-top">
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
                                    this.setState({deleting: true});
                                    let ret = await deleteCartItem({ gearid: listItem.gearid, orderid: listItem.orderid });
                                    if (!ret) handleError("Removing from cart failed!");
                                }}
                            />
                        </div>
                   </div>

               </td>
                <td className="sm-category-list-bottom">
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
                </td>
            </tr>
        ))
    );
  }

  render() {
  const { carts } = this.props;
    if (!carts) {
      return <BarLoader color="#F82462" height="5" />;
    }

    return (
      <React.Fragment>
        {
          this.state.deleting === true ? <CustomSpinner /> : null
        }
        <div className="cart_view centered-content">
          <Breadcrumb className= "card_content_path">
            <Urllink_class name="Home"> </Urllink_class>
              <span className="space_slash_span">/</span>
            <BreadcrumbItem active>Cart</BreadcrumbItem>
          </Breadcrumb>
          <div className="cart-header">
            <h2 className="theme-page-title">Cart</h2>
            <div className="flex-row d-none d-lg-flex" >
              <button className="theme-btn theme-btn-secondery"><Link to="/favourites">Favourites</Link></button>
              <button className="theme-btn theme-btn-primary"><Link to="/checkout">Continue Shopping</Link></button>
            </div>
          </div>
          <div className="cart-table-div">
              { !carts.length ? (
                  <EmptyActivity e_name="Add from Favourites" e_path="/favourites" e_title="YOUR CART IS EMPTY" e_img_name = "cart"/>
              ) :(
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
              {this.renderCartItems_table()}
              </tbody>
            </Table>)}
          </div>
          <div className="flex-row d-flex d-lg-none" >
            <button className="theme-btn theme-btn-secondery col-9"><Link to="/favourites">Favorites</Link></button>
            <button className="theme-btn theme-btn-primary theme-btn-link col-14"><Link to="/checkout">Continue Shopping</Link></button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.app.carts
});

export default connect(mapStateToProps)(Cart);
