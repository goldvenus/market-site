import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { Link, withRouter } from 'react-router-dom';
import { Table } from 'reactstrap';
import { deleteFavourite } from "../../core/actions/favourite.action";
import { handleError } from "../../core/actions/common.action";
import { addCart } from "../../core/actions/cart.action";
import { formatDate } from "../../core/helper";
import CartModal1 from "../../components/common/CartModal1";
import CartModal2 from "../../components/common/CartModal2";
import BarLoader from "react-bar-loader";
import EmptyActivity from "../../components/EmptyActivity";
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import CustomSpinner from "../../components/common/CustomSpinner";

class Favourites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal_open_st: 0,
      carted: false,
      gear: {},
      cart_info: {
        start_date: new Date(),
        end_date: new Date()
      }
    }
  }

  isCarted = (gearid) => {
      let { carts } = this.props;
      let cart = gearid && carts && carts.length > 0 ?
          carts.filter(item => item.gearid === gearid) : false;
      return cart;
  };

  onOpenModal(gear, carted) {
    const open_state = carted ? 1 : 2;
    let start_date = new Date(gear.startDate);
    let end_date = new Date(gear.endDate);

    this.setState({
      modal_open_st: open_state,
      gear: gear,
      carted: carted,
      cart_info: {
        start_date: start_date,
        end_date: end_date
      }
    });
  }

  onCloseModal = () => {
    this.setState({ modal_open_st: 0 });
  };

  addToCart = async ({ gearid, userid, startDate, endDate }) => {
    try {
      console.log(this.state.gear, userid, localStorage.userId);
      if (this.state.gear.ownerUserid === localStorage.userId) {
        handleError('You cannot rent your gear');
        return;
      }
      if (startDate && endDate && gearid && userid) {
        let res = await addCart({
          gearid: gearid,
          userid: userid,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate)
        });

        if (res) {
          this.setState({
            modal_open_st: 0
          });
          return true;
        }
        return false;
      }
    } catch {
      handleError('Adding to cart was failed!');
    }
  };

  renderFavouritesItems() {
    const { favourites } = this.props;

    return (
      favourites.map((listItem, index) => {
        let pricePerDay = listItem.pricePerDay;
        pricePerDay *= (1 + 0 + 0.06);
        let carted = this.isCarted(listItem.gearid);
        let cart_info = carted && carted.length > 0 ? carted[0] : {};
        cart_info = {...cart_info, ...listItem};
        carted = carted && carted.length > 0;
        let rating = listItem.rating;

        return (
          <tr key={`cart-item-${index}`}>
            <td width="10%">
              {listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 &&
                <img src={listItem.numberOfUserImage[0]} alt='' className="gear-img"/>}
            </td>
            <td className="gear" width="29%">
              <p className="tb_brand_model_name">
                {listItem.brand + ' ' + listItem.productName + ' '}
                {carted && <i className="fas fa-check-circle"/>}
              </p>
              <p className="theme-text-small text-muted tb_categories_name">{listItem.categoryName}</p>
            </td>
            <td width="20.5%">
              <span className="star-wrapper">
              {[1, 2, 3, 4, 5].map(i =>
                <i className="fa fa-star star-selected" key={i}/>)
              }
              </span>
              &nbsp;<span>5,0 ({rating})</span>
            </td>

            <td width="17.5%"><div><div className="favouri_link_icon"/><span className="Raykjavik_span">Raykjavik</span></div></td>
            <td className="tb_pay_per" width="17.5%">${parseFloat(pricePerDay).toFixed(2)}</td>
            <td className="favoiurites_add_icon">
              <button className="theme-btn theme-btn-primary add-to-cart-btn" onClick={() => this.onOpenModal(cart_info, carted)}>Add to Cart</button>
            </td>

            <td className="favourites_close_icon">
              <i
                className="close"
                aria-hidden="true"
                onClick={async () => {
                  await deleteFavourite({ gearid: listItem.gearid });
                }}
              />
            </td>
        </tr>
        )
      })
    );
  }

  renderFavouritesItems_md() {
    const { favourites } = this.props;
    return (
      favourites.map((listItem, index) => {
        let pricePerDay = listItem.pricePerDay;
        pricePerDay *= (1 + 0.06);
        let carted = this.isCarted(listItem.gearid);
        let cart_info = carted && carted.length > 0 ? carted[0] : {};
        cart_info = {...listItem, ...cart_info};
        carted = carted && carted.length > 0;
        let rating = listItem.rating;

        return (
          <div key={`cart-item-${index}`} className="favo_table_root">
            <div className="sm_favor_table sm-favor-table-only">
              <div className="sm_favor_img d-md-flex d-none">
                {listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 &&
                  <img src={listItem.numberOfUserImage[0]} alt='' className="favor_gear-img"/>}
              </div>
              <div className="sm_favor_table_top">
                <div className="sm_favor_name_closeicon">
                  <div className="sm_favor_img d-sm-flex d-md-none">
                    {listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 &&
                      <img src={listItem.numberOfUserImage[0]} alt='' className="favor_gear-img"/>}
                  </div>
                  <div className="col-md-22 favourites_close_text">
                    <p className="tb_brand_model_name">
                      {listItem.brand + ' ' + listItem.productName}
                      {carted && <div className="card-checked"><i className="fas fa-check-circle"/></div>}
                    </p>
                    <p className="text-muted tb_categories_name">{listItem.categoryName}</p>
                  </div>
                  <div className="favourites_close_icon">
                    <i
                      className="close"
                      aria-hidden="true"
                      onClick={async () => {
                        deleteFavourite({gearid: listItem.gearid});
                      }}
                    />
                  </div>
                </div>
                <div className="sm_favor_bottom">
                  <div className="bottom_left col-md-8">
                    <div>
                      {[1, 2, 3, 4, 5].map(i =>
                        <i className="fa fa-star star-selected" key={i}/>)
                      }
                      &nbsp;<span>5,0 ({rating})</span>
                    </div>
                    <div>
                      <div className="favouri_link_icon"/>
                      <span className="Raykjavik_span">Raykjavik</span>
                    </div>
                  </div>
                  <div className="sm_favor_bottom_right col-md-14">
                      <p>Price per day</p>
                      <div className="tb_pay_per">${parseFloat(pricePerDay).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="favoiurites_add_icon">
              <button className="theme-btn theme-btn-primary theme-btn-link add-to-cart-btn"
                onClick={() => this.onOpenModal(cart_info, carted)}>Add to Cart
              </button>
            </div>
          </div>
        )
      })
    );
  }

  render() {
    const { favourites, isChanging } = this.props;
    const { gear } = this.state;
    if (!favourites) {
      return <BarLoader color="#F82462" height="5" />;
    }

    return (
      <React.Fragment>
        {isChanging && <CustomSpinner/>}
        <div className="cart_view centered-content">
          {/*<Breadcrumb className= "card_content_path">*/}
              {/*<BreadCrumbActive name="Home"/>*/}
              {/*<span className="space_slash_span">/</span>*/}
              {/*<BreadcrumbItem active>Favourites</BreadcrumbItem>*/}
          {/*</Breadcrumb>*/}
          <div className="cart-header ">
            <div className="theme-page-title">Favourites</div>
            <div className="flex-row d-none d-lg-flex">
              <button className="theme-btn theme-btn-secondery"><Link to="/rent-gear?type=all">Find Gear</Link></button>
              <button className="theme-btn theme-btn-primary go-to-cart-btn"><Link to="/cart"> Cart </Link></button>
            </div>
          </div>
            <div className="d-md-flex d-lg-none d-none md_show_buttons" >
                <button className="theme-btn theme-btn-secondery col-md-9"><Link to="/rent-gear?type=all">Find Gear</Link></button>
                <button className="theme-btn theme-btn-primary theme-btn-link col-md-14"><Link to="/cart">Cart</Link></button>
            </div>
          <div className="cart-table-div">
            {
              !favourites.length ?
                (<EmptyActivity e_name="  Cart  " e_path="/cart" e_title="THE ITEMS YOU LIKE APPEAR HERE" e_img_name = "favouri"/>
              ) :(
                <Table className="theme-table table favor-theme-table">
                  <thead className= "d-none d-lg-table">
                    <tr>
                      <th/>
                      <th>Name & Category</th>
                      <th>Rating</th>
                      <th>Location</th>
                      <th>Price per day</th>
                      <th/>
                      <th/>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    this.renderFavouritesItems()
                  }
                  </tbody>
                </Table>
            )}
            {
              this.renderFavouritesItems_md()
            }
          </div>

          <div className="d-flex d-md-none d-lg-none md_show_buttons" >
            <button className="theme-btn theme-btn-secondery col-md-14"><Link to="/rentGear/all">Find Gear</Link></button>
            <button className="theme-btn theme-btn-primary theme-btn-link col-md-9"><Link to="/cart">Cart</Link></button>
          </div>
          {
            this.state.modal_open_st === 2 ?
              <CartModal2
                  dlg_model={1}
                  gear={gear}
                  open={true}
                  onClose={this.onCloseModal}
                  addToCart={this.addToCart}
              /> :
            this.state.modal_open_st === 1 ?
              <CartModal1
                  carted={this.state.carted}
                  gear={gear}
                  start_date={this.state.cart_info.start_date}
                  end_date={this.state.cart_info.end_date}
                  open={true}
                  onClose={this.onCloseModal}
              /> : null
          }
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  favourites: state.favourite.favourites,
  isChanging: state.favourite.isChanging,
  carts: state.cart.carts
});

export default compose(
    connect(mapStateToProps),
    withRouter
)(Favourites);
