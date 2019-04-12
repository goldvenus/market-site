import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { getFavourites, days, deleteFavourite } from '../../../actions/app.actions';
import CustomCarousel from '../../CustomCarousel';
import CartModal1 from "../../common/CartModal";

class Favourites extends Component {
  constructor(props) {
    super(props);
    getFavourites();

    this.state = {
        open: false,
        carted: false,
        gear: {}
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
            <button className="theme-btn theme-btn-primary theme-btn-link">
              <Link to={`/gear/${listItem.gearid}`}>Add to cart</Link>
            </button>
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
      return <div className="centered-content"> Loading... </div>;
    }

    // const {gearid} = gear;
    // const carted = gearid && carts && carts.length > 0 ?
    //   carts.filter(item => item.gearid === gearid).length : 0;
    // const favored = gearid && favourites && favourites.Count > 0 ?
    //   favourites.Items.filter(item => item.gearid === gearid).length : 0;

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
        <CartModal1 carted={this.state.carted} gear={this.state.gear} open={this.state.open} onClose={this.onCloseModal} addToCart={carted => this.addToCart(carted)}></CartModal1>
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
