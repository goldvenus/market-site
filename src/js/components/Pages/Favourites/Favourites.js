import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import {
    getFavourites,
    days,
    deleteFavourite,
    getGear,
    addGear,
    handleError, addCart, formatDate
} from '../../../actions/app.actions';
import CartModal from "../../common/CartModal";
import CartModal1 from "../../common/CartModal1";
import BarLoader from "react-bar-loader";
import Rating from "react-rating"
class Favourites extends Component {
  constructor(props) {
    super(props);
    getFavourites();

    this.state = {
      modal_open_st: 0,
      carted: false,
      gear: {}
    }
  }

  onOpenModal = gearid => {
    const { carts, favourites } = this.props;
    const carted = gearid && carts && carts.length > 0 ?
      carts.filter(item => item.gearid === gearid).length : 0;
    const gear = gearid && favourites && favourites.Count > 0 ?
      favourites.Items.filter(item => item.gearid === gearid) : null;
    const open_state = carted ? 1 : 2;
    this.setState({modal_open_st: open_state, gear: gear[0], carted: carted});
  }
  onCloseModal = () => {
    this.setState({ modal_open_st: 0 });
  };

  async addToCart({ gearid, userid, startDate, endDate }) {
    try {
      if (startDate && endDate) {
        let res = await addCart({
          gearid: gearid,
          userid: userid,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate)
        });

        if (res) {
          this.props.history.push('/cart');
        }
      }
    } catch {
      handleError('Gear was not added to cart.');
    }
  }

  renderFavouritesItems() {

    const { favourites } = this.props;

    return (
      favourites.Items.map((listItem, index) => (
        <tr key={`cart-item-${index}`}>
          <td width="10%">{listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 ? <img
            src={listItem.numberOfUserImage[0]} className="gear-img"/> : null}</td>
          <td className="gear" width="32%">
            <p className="tb_brand_model_name">{listItem.brand + ' ' + listItem.model}</p>
            <p className="theme-text-small text-muted tb_categories_name">{listItem.categoryName}</p>
          </td>
          <td width="20.5%">
              <Rating
                  initialRating={3}
                 emptySymbol={<img src="/images/Icons/star/star_icon_d.png" className="icon" />}
                 fullSymbol={<img src="/images/Icons/star/star_icon_a.png" className="icon" />}/>
          </td>

          <td width="17.5%">{listItem.pricePerDay * days(listItem.startDate, listItem.endDate)}</td>
            <td className="tb_pay_per" width="17.5%">{`$${listItem.pricePerDay}`}</td>
          <td>
            <button className="theme-btn theme-btn-primary theme-btn-link add-to-cart-btn" onClick={() => this.onOpenModal(listItem.gearid)}>Add to Cart</button>
          </td>

          <td class="favourites_close_icon">
            <i
              className="close"
              aria-hidden="true"
              onClick={async () => {
                await deleteFavourite({ gearid: listItem.gearid });
                getFavourites();
              }}/>
          </td>
        </tr>
      ))
    );
  }

  render() {
    const { favourites } = this.props;

    if (!favourites) {
        return <BarLoader color="#F82462" height="5" />;
    }

    return (
      <div className="cart_view centered-content">
        <Breadcrumb>
          <BreadcrumbItem>Home </BreadcrumbItem>
          <BreadcrumbItem active>Favourites</BreadcrumbItem>
        </Breadcrumb>
        <div className="cart-header">
          <div className="theme-page-title">Favourites</div>
          <div className="flex-row">
            <button className="theme-btn theme-btn-secondery"><Link to="/">Continue Shopping</Link></button>
            <button className="theme-btn theme-btn-primary theme-btn-link"><Link to="/cart">Cart</Link></button>
          </div>
        </div>

        <div>
          <Table className="theme-table">
            <thead>
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
        </div>
        <CartModal1 dlg_model={1} gear={this.state.gear} open={this.state.modal_open_st === 2} onClose={this.onCloseModal} addToCart={this.addToCart}></CartModal1>
        <CartModal carted={this.state.carted} gear={this.state.gear} open={this.state.modal_open_st === 1} onClose={this.onCloseModal}></CartModal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gear: state.app.gear,
  favourites: state.app.favourites,
  carts: state.app.carts
});

export default connect(mapStateToProps)(Favourites);
