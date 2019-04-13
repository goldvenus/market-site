import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import {
    getFavourites,
    days,
    deleteFavourite,
    getGear,
    handleError, addCart, formatDate
} from '../../../actions/app.actions';
import CartModal from "../../common/CartModal";
import CartModal1 from "../../common/CartModal1";
import BarLoader from "react-bar-loader";

class Favourites extends Component {
  constructor(props) {
    super(props);
    // getFavourites();

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
      handleError('Cannot get gear.');
    }
  }

  onCloseModal = () => {
    console.log('close modal');
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
          alert('added');
          this.setState({
            modal_open_st: 0
          });
        }
      }
    } catch {

    }
  }

  renderFavouritesItems() {
    const { favourites } = this.props;
    return (
      favourites.Items.map((listItem, index) => (
        <tr key={`cart-item-${index}`}>
          <td width="15%">{listItem.numberOfUserImage && listItem.numberOfUserImage.length > 0 ? <img
            src={listItem.numberOfUserImage[0]} className="gear-img"/> : null}</td>
          <td className="gear" width="20%">
            <p>{listItem.brand + ' ' + listItem.model}</p>
            <p className="theme-text-small text-muted">{listItem.categoryName}</p>
          </td>
          <td width="15%">{listItem.pricePerDay}</td>
          <td width="15%">{listItem.pricePerDay * days(listItem.startDate, listItem.endDate)}</td>
          <td>
            <button className="theme-btn theme-btn-primary theme-btn-link add-to-cart-btn" onClick={() => this.onOpenModal(listItem.gearid)}>Add to Cart</button>
          </td>
          <td>
            <i
              className="fa fa-times"
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
      <div className="cart centered-content">
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
              <th>Price Per Day</th>
              <th>Amount</th>
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
        <CartModal carted={this.state.carted} gear={this.state.gear} start_date={this.state.cart_info.start_date} end_date={this.state.cart_info.end_date} open={this.state.modal_open_st === 1} onClose={this.onCloseModal}></CartModal>
      </div>
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
