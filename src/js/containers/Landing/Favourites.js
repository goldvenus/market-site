import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import {
    deleteFavourite,
    getGear,
    handleError, addCart, formatDate
} from '../../actions/app.actions';
import CartModal from "../../components/common/CartModal";
import CartModal1 from "../../components/common/CartModal1";
import BarLoader from "react-bar-loader";
import { ToastsStore } from 'react-toasts';
import Rating from "react-rating"
import EmptyActivity from "../../components/EmptyActivity";
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import CustomSpinner from "../../components/CustomSpinner";
import Urllink_class from "../../components/Urllink_class";

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
      },
      ratingstate:{},
      deleting: false
    }
  }

  async onOpenModal(gearid) {
    try {
      const { carts } = this.props;
      const cart = gearid && carts && carts.length > 0 ?
        carts.filter(item => item.gearid === gearid) : 0;
      const carted = cart.length;

      let res = await getGear(gearid);
      if (res) {
        const open_state = carted ? 1 : 2;
        let start_date = new Date();
        let end_date = new Date();
        if (carted) {
          start_date = new Date(cart[0].startDate);
          end_date = new Date(cart[0].endDate);
        }
        this.setState({
          modal_open_st: open_state,
          gear: this.props.gear,
          carted: carted,
          cart_info: {
            start_date: start_date,
            end_date: end_date
          }
        });
      }
    } catch {
      ToastsStore.error('Cannot get gear.');
    }
  }

  onCloseModal = () => {
    this.setState({ modal_open_st: 0 });
  };

  addToCart = async ({ gearid, userid, startDate, endDate }) => {
    try {
      if (startDate && endDate) {
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
        }
      }
    } catch {
      ToastsStore.error('Gear adding failed!');
    }
  };

  renderFavouritesItems() {
    const { favourites } = this.props;
    const { ratingstate } = this.state;

    return (
      favourites.Items.map((listItem, index) => (
        <tr key={`cart-item-${index}`}>
          <td width="10%">{listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 ? <img
            src={listItem.numberOfUserImage[0]} alt='' className="gear-img"/> : null}</td>
          <td className="gear" width="29%">
            <p className="tb_brand_model_name">{listItem.brand + ' ' + listItem.model}</p>
            <p className="theme-text-small text-muted tb_categories_name">{listItem.categoryName}</p>
          </td>
          <td width="20.5%">
              <Rating
                  initialRating={3}
                 emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon" />}
                 fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon" />}
                    onChange={(rate) => {console.log(rate)}}/>
              <p>{this.state.ratingstate[index]}</p>
          </td>

            <td width="17.5%"><div><div className="favouri_link_icon"/><span className="Raykjavik_span">Raykjavik</span></div></td>
            <td className="tb_pay_per" width="17.5%">{`$${listItem.pricePerDay}`}</td>
          <td className="favoiurites_add_icon">
            <button className="theme-btn theme-btn-primary add-to-cart-btn" onClick={() => this.onOpenModal(listItem.gearid)}>Add to Cart</button>
          </td>

          <td className="favourites_close_icon">
            <i
              className="close"
              aria-hidden="true"
              onClick={async () => {
                this.setState({deleting : true});
                let ret = await deleteFavourite({ gearid: listItem.gearid });
                if (!ret) handleError("Removing failed!");
                else ToastsStore.info("Successfully removed!");
                this.setState({deleting : false});
              }}/>
          </td>
        </tr>
      ))
    );
  }
  renderFavouritesItems_md() {
    const { favourites } = this.props;
    return (
        favourites.Items.map((listItem, index) => (
            <div key={`cart-item-${index}`} className="d-lg-none d-sm-none d-md-block favo_table_root">
                <div className="sm_favor_table">
                    <div className="sm_favor_img d-md-flex d-none">{listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 ? <img
                        src={listItem.numberOfUserImage[0]} alt='' className="favor_gear-img"/> : null}
                    </div>
                    <div className="sm_favor_table_top">
                         <div className="sm_favor_name_closeicon">
                             <div className="sm_favor_img d-sm-flex d-md-none">{listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 ? <img
                                 src={listItem.numberOfUserImage[0]} alt='' className="favor_gear-img"/> : null}
                             </div>
                            <div className="col-md-22 favourites_close_text">
                                <p className="tb_brand_model_name">{listItem.brand + ' ' + listItem.model}</p>
                                <p className="theme-text-small text-muted tb_categories_name">{listItem.categoryName}</p>
                            </div>
                            <div className="favourites_close_icon">
                                <i
                                    className="close"
                                    aria-hidden="true"
                                    onClick={async () => {
                                        this.setState({loadingdata_del : this});
                                        let ret = await deleteFavourite({ gearid: listItem.gearid });
                                        if (!ret) handleError("Removing from favorites failed!");
                                        // else handleSuccess("Successfully removed!");
                                        this.setState({deleting : false});
                                    }}/>
                            </div>
                         </div>
                        <div className="sm_favor_bottom">
                            <div className="bottom_left col-md-8">
                                <Rating
                                    initialRating={3}
                                    emptySymbol={<img src="/images/Icons/star/star_icon_d.png" alt='' className="icon" />}
                                    fullSymbol={<img src="/images/Icons/star/star_icon_a.png" alt='' className="icon" />}/>
                                <div><div className="favouri_link_icon"/><span className="Raykjavik_span">Raykjavik</span></div>
                            </div>
                            <div className="sm_favor_bottom_right col-md-14">
                                <p>Price per day</p>
                                 <div className="tb_pay_per">{`$${listItem.pricePerDay}`}</div>
                            </div>
                        </div>
                     </div>
                 </div>
                <div className="favoiurites_add_icon">
                    <button className="theme-btn theme-btn-primary theme-btn-link add-to-cart-btn" onClick={() => this.onOpenModal(listItem.gearid)}>Add to Cart</button>
                </div>
            </div>
        ))
    );
  }

  render() {
    const { favourites } = this.props;
    if (!favourites) {
      return <BarLoader color="#F82462" height="5" />;
    }

    return (
      <React.Fragment>
        {
          this.state.loading ? <CustomSpinner/> : null
        }
        <div className="cart_view centered-content">
          <Breadcrumb className= "card_content_path">
              <Urllink_class name="Home"/>
              <span className="space_slash_span">/</span>
              <BreadcrumbItem active>Favourites</BreadcrumbItem>
          </Breadcrumb>
          <div className="cart-header ">
            <div className="theme-page-title">Favourites</div>
            <div className="flex-row d-none d-lg-flex">
              <button className="theme-btn theme-btn-secondery"><Link to="/">Continue Shopping</Link></button>
              <button className="theme-btn theme-btn-primary go-to-cart-btn"><Link to="/cart"> Cart </Link></button>
            </div>
          </div>
            <div className="d-md-flex d-lg-none d-none md_show_buttons" >
                <button className="theme-btn theme-btn-secondery col-md-9"><Link to="/cart">Continue Shopping2</Link></button>
                <button className="theme-btn theme-btn-primary theme-btn-link col-md-14"><Link to="/checkout">Cart</Link></button>
            </div>
          <div className="cart-table-div">
            {
              !favourites.Items.length ?
                (<EmptyActivity e_name="  Cart  " e_path="/cart" e_title="THE ITEMS YOU LIKE APPEAR HERE" e_img_name = "favouri"/>
              ) :(
                <Table className="theme-table table">
                  <thead className= "d-none d-lg-table">
                    <tr>
                      <th></th>
                      <th>Name & Category</th>
                      <th>Rating</th>
                      <th>Location</th>
                      <th>Price per day</th>
                      <th></th>
                      <th></th>
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
            <button className="theme-btn theme-btn-secondery col-md-14"><Link to="/cart">Continue Shopping</Link></button>
            <button className="theme-btn theme-btn-primary theme-btn-link col-md-9"><Link to="/checkout">Cart</Link></button>
          </div>

          <CartModal1 dlg_model={1} gear={this.state.gear} open={this.state.modal_open_st === 2} onClose={this.onCloseModal} addToCart={this.addToCart}></CartModal1>
          <CartModal carted={this.state.carted} gear={this.state.gear} start_date={this.state.cart_info.start_date} end_date={this.state.cart_info.end_date} open={this.state.modal_open_st === 1} onClose={this.onCloseModal}></CartModal>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  gear: state.app.gear,
  favourites: state.app.favourites,
  carts: state.app.carts
});

export default compose(
    connect(mapStateToProps),
    withRouter
)(Favourites);
