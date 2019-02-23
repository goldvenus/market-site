import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { getFavourites, days, deleteFavourite } from '../../../actions/app.actions';

class Favourites extends Component {
  constructor() {
    super();

    getFavourites();
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favourites: state.app.favourites
});

export default connect(mapStateToProps)(Favourites);
