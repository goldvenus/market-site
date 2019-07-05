import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Table} from 'reactstrap';
import {formatDate, calcDaysDiff} from '../../core/helper';
import { deleteCartItem, editCart } from '../../core/actions/cart.action'
import BarLoader from "react-bar-loader";
import EmptyActivity from '../../components/EmptyActivity'
import CustomSpinner from "../../components/common/CustomSpinner";
import CartModal2 from "../../components/common/CartModal2";
import {handleError} from "../../core/actions/common.action";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      gear: null
    };
  }

  handleEdit = (listItem) => {
    this.setState({
      isModalOpen: true,
      gear: listItem
    });
  };

  handleClose = () => {
    this.setState({isModalOpen: false});
  };

  savePeriod = async (startDate, endDate) => {
    let newGear = {...this.state.gear, startDate: formatDate(startDate), endDate: formatDate(endDate)};
    let ret = await editCart({
      gearid: newGear.gearid,
      orderid: newGear.orderid,
      ownerid: newGear.ownerUserid,
      startDate: newGear.startDate,
      endDate: newGear.endDate
    });
    ret ? this.setState({
        isModalOpen: false,
        gear: newGear
      }) : this.setState({
        isModalOpen: false
      })
  };

  proceedToCheckout = () => {
    const { carts, user } = this.props;
    if (!carts || carts.length === 0) {
      handleError('Your cart is empty');
    } else if (!user.mangoAccountId) {
      handleError('You have to create MangoPay account before checkout');
    } else {
      this.props.history.push('/checkout');
    }
  };

  renderCartItems() {
    const { carts } = this.props;
    return (
      carts.map((listItem, index) => {
        let duration = calcDaysDiff(new Date(listItem.startDate), new Date(listItem.endDate)) + 1;
        let total = listItem.pricePerDay * duration;
        let tax = total * 0;
        let fee = total * 0.06;
        let amount = parseFloat(total + tax + fee).toFixed(2);
        let actualPrice = parseFloat(amount / duration).toFixed(2);

        return (
          <tr key={`cart-item-${index}`} className="cart-item-row-lg">
            <td width="10%">
              {listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 ?
                <img src={listItem.numberOfUserImage[0]} className="gear-img" alt=''/> : null}
            </td>
            <td width="32%" className="gear">
              <p className="tb_brand_model_name">{listItem.brand + ' ' + listItem.productName}</p>
              <p className="theme-text-small text-muted tb_categories_name">{listItem.categoryName}</p>
            </td>
            <td className="rental-period" width="25.6%">
              <p className="tb_time_name">
                {`${formatDate(listItem.startDate)} to ${formatDate(listItem.endDate)} `}
              </p>
              <p className="theme-text-small text-muted tb_categories_name">
                {` ${duration} days`}
              </p>
            </td>
            <td width="17.5%">${actualPrice}</td>
            <td className="tb_pay_per">${amount}</td>
            <td className="d-md-none d-lg-table-cell edit_gear_td">
              <span className="edit_gear" onClick={() => this.handleEdit(listItem)}/>
            </td>
            <td>
              <i
                className="close"
                aria-hidden="true"
                onClick={async () => {
                  await deleteCartItem(listItem);
                }}
              />
            </td>
          </tr>
        )
      })
    );
  }

  renderCartItemsTable() {
    const { carts } = this.props;
    return (
      carts.map((listItem, index) => {
        let duration = calcDaysDiff(new Date(listItem.startDate), new Date(listItem.endDate)) + 1;
        let total = listItem.pricePerDay * duration;
        let tax = total * 0;
        let fee = total * 0.06;
        let amount = parseFloat(total + tax + fee).toFixed(2);
        let actualPrice = parseFloat(amount/duration).toFixed(2);

        return (
          <tr key={`cart-item-${index}`} className="sm-table-cart">
            <td className="sm-category-list-top">
              <div className='sclt_img'>
                {listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 ?
                  <img src={listItem.numberOfUserImage[0]} className="gear-img" alt=''/> : null}
              </div>
              <div className="col-md-17">
                  <p className="tb_brand_model_name">{listItem.brand + ' ' + listItem.productName}</p>
                  <p className="theme-text-small text-muted tb_categories_name">{listItem.categoryName}</p>
              </div >
              <div className="seclt_icon_group">
                <div className="seclt_edit_icon">
                  <div className="edit_gear_td">
                    <span className="edit_gear" onClick={() => this.handleEdit(listItem)}/>
                  </div>
                </div>
                <div>
                  <i
                    className="close"
                    aria-hidden="true"
                    onClick={async () => {
                      await deleteCartItem(listItem);
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
                  {` ${duration} days`}
                </p>
              </div>
              <div className="sm-bottom-second-row col-md-16">
                <div className="col-md-12 cart-bottom-second">
                  <p className="cart-bottom-title1">Price per day</p>
                  <p className="cart-bottom-content1">${actualPrice}</p>
                </div>
                <div className="col-md-12 cart-bottom-third">
                  <p className="cart-bottom-title1">Amount</p>
                  <p className="cart-bottom-content2">${amount}</p>
                </div>
              </div>
            </td>
          </tr>
        )
      })
    );
  }

  render() {
    const { carts, isLoading, isDeleting } = this.props;
    if (!carts) {
      return <BarLoader color="#F82462" height="5" />;
    }

    return (
      <React.Fragment>
        { (isDeleting || isLoading) && <CustomSpinner/> }
        <div className="cart_view centered-content">
          {/*<Breadcrumb className= "card_content_path">*/}
            {/*<BreadCrumbActive name="Home"> </BreadCrumbActive>*/}
              {/*<span className="space_slash_span">/</span>*/}
            {/*<BreadcrumbItem active>Cart</BreadcrumbItem>*/}
          {/*</Breadcrumb>*/}
          <div className="cart-header">
            <h2 className="theme-page-title">Cart</h2>
            <div className="flex-row d-none d-lg-flex" >
              <button className="theme-btn theme-btn-secondery"><Link to="/favourites">Favourites</Link></button>
              <button className="theme-btn theme-btn-primary" onClick={this.proceedToCheckout}>Proceed to Checkout</button>
            </div>
          </div>
          <div className="cart-table-div">
            { !carts.length ? (
              <EmptyActivity e_name="Add from Favourites" e_path="/favourites" e_title="YOUR CART IS EMPTY" e_img_name = "cart"/>
            ) : (
            <Table className="theme-table">
              <thead className="cart-table-header">
                <tr>
                  <th/>
                  <th>Name & Category</th>
                  <th>Rental Period</th>
                  <th>Price Per Day</th>
                  <th>Amount</th>
                  <th/>
                  <th/>
                </tr>
              </thead>
              <tbody>
              {this.renderCartItems()}
              {this.renderCartItemsTable()}
              </tbody>
            </Table>)}
          </div>
          <div className="flex-row d-flex d-lg-none" >
            <button className="theme-btn theme-btn-secondery col-9"><Link to="/favourites">Favorites</Link></button>
            <button className="theme-btn theme-btn-primary continue-shpping-mobile-btn col-14" onClick={this.proceedToCheckout}>Proceed to Checkout</button>
          </div>
        </div>
        {
          this.state.isModalOpen &&
          <CartModal2
            open={true}
            dlg_model={2}
            onClose={this.handleClose}
            setPeriod={this.savePeriod}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            gear={this.state.gear}
          />
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  carts: state.cart.carts,
  isLoading: state.cart.isLoading,
  isDeleting: state.cart.isDeleting
});

export default connect(mapStateToProps)(Cart);
