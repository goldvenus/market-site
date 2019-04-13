import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Input, Label } from 'reactstrap';
import { getCarts, days, checkout, handleError } from '../../../actions/app.actions';
import BarLoader from "react-bar-loader";
import TextField from "@material-ui/core/TextField";
import Dropdown, {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
    DropdownButton
} from '@trendmicro/react-dropdown';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import '@trendmicro/react-dropdown/dist/react-dropdown.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';

class Checkout extends Component {
  constructor() {
    super();

    getCarts();

    this.state = {
      fullName: '',
      address: '',
      city: '',
      product_region: '',
      zip: '',
      saveAddress: false,
    };
  }

  renderCheckoutItems() {
    const { carts } = this.props;

    const mappedCarts = carts.map((listItem, index) => {
      const d = days(listItem.startDate, listItem.endDate);

      return <div key={`cart-item-${index}`} className="checkout-item theme-text-small">
        <div>{listItem.brand + ' ' + listItem.model}</div>
        <div><b>${listItem.pricePerDay * d}</b> for <b>{d}</b> days</div>
      </div>;
    });

    return (
      <div className="checkout-items">
        {
          mappedCarts
        }
      </div>
    );
  }

  async onCheckout(state) {
    const { fullName, address, city, zip, saveAddress, product_region } = state;

    if (!fullName && !address && !city && !zip && !product_region) {
      handleError('Please provide required information');
      return false;
    }
    let response = await checkout({
      fullName,
      address,
      city,
      zip,
      product_region,
      saveAddress
    });

    if (response) {
      this.props.history.push('/payment');
    }
  }

  render() {
    const { carts } = this.props;
    if (!carts) {
      return <BarLoader color="#F82462" height="5" />;
    }

    let total = 0;

    carts.forEach((listItem, index) => {
      const d = days(listItem.startDate, listItem.endDate);
      total += d * listItem.pricePerDay;
    });

    const tax = total * 0.21;

    const amount = total + tax;

    return (
      <div className="checkout">
        <div className="checkout-head">
          <div className='container'>
            <Breadcrumb>
              <BreadcrumbItem>Home </BreadcrumbItem>
              <BreadcrumbItem active>Cart</BreadcrumbItem>
              <BreadcrumbItem active>Checkout</BreadcrumbItem>
            </Breadcrumb>
              <div className="d-flex align-items-center checkout-title"><span>Checkout</span></div>
          </div>
        </div>
        <div className="payment-body">
          <div className="container flex-row flex-align-stretch ">
            <div className="billing-address">
              <div className="checkout-header">
                <div className="text-gray d-md-none d-lg-block">BILLING ADDRESS</div>
                <div className="text-gray d-md-block d-lg-none">INFO</div>
              </div>
              <div className="address-select">
                  <Dropdown>
                      <Dropdown.Toggle title="Saved address" />
                      <Dropdown.Menu>

                          <MenuItem divider />
                          <MenuItem>
                              Laufásvegur 58, 101 Reykjavík
                              <MenuItem>
                                  level item one
                              </MenuItem>
                              <MenuItem>
                                  level item two
                              </MenuItem>
                              <MenuItem>
                                  level item three
                              </MenuItem>
                          </MenuItem>

                          <MenuItem divider />
                          <MenuItem>
                              Laufásvegur 68, 106 Vik
                              <MenuItem>
                                  level item one
                              </MenuItem>
                              <MenuItem>
                                  level item two
                              </MenuItem>
                              <MenuItem>
                                  level item three
                              </MenuItem>
                          </MenuItem>


                          <MenuItem divider />
                          <MenuItem>
                              Laufásvegur 68, 106 Reykjavík
                              <MenuItem>
                                  level item one
                              </MenuItem>
                              <MenuItem>
                                  level item two
                              </MenuItem>
                              <MenuItem>
                                  level item three
                              </MenuItem>
                          </MenuItem>


                      </Dropdown.Menu>
                  </Dropdown>
              </div>
              <div className="theme-form">
                <div className="theme-form-field">
                  <TextField placeholder='Full Name' type="text"
                               onChange={(value) => this.setState({ fullName: value })}/>
                </div>
                <div className="flex-row">
                  <div className="theme-form-field flex-md-12">
                    <TextField placeholder='Address' type="text"
                                 onChange={(value) => this.setState({ address: value })}/>
                  </div>
                  <div className="theme-form-field flex-md-12">
                    <TextField placeholder='City' type="text" onChange={(value) => this.setState({ city: value })}/>
                  </div>
                </div>
                <div className="flex-row">
                  <div className="theme-form-field flex-md-12">
                    <TextField placeholder='Region' type="text"
                                 onChange={(value) => this.setState({ product_region: value })}/>
                  </div>
                  <div className="theme-form-field flex-md-12">
                    <TextField placeholder='Zip' type="text" onChange={(value) => this.setState({ zip: value })}/>
                  </div>
                </div>
                <div className="theme-form-field">
                    <div className="input_svg pretty p-svg p-plain">
                        <input  type="checkbox"/>
                        <div className="state">
                            <img className="svg check_svg" src="images/Icons/task.svg"/>
                        </div>
                    </div>
                    <Label for="save-address" className='checkbox-label'>Save this address</Label>

                  {/*<Input type="checkbox" id="save-address" checked={this.state.saveAddress}*/}
                         {/*onChange={(e) => this.setState({ saveAddress: e.target.checked })}/>*/}
                  {/*<Label for="save-address">Save this address</Label>*/}
                </div>
              </div>
            </div>

            <div className="order-info theme-text-small">
                <div className="order-info-header">
                    <div className="text-gray">ORDER INFORMATION</div>
                    <button className="theme-btn theme-btn-filled-white theme-btn-link btn-edit-order"><Link to="/cart">Edit Order</Link>
                    </button>
                  </div>
                <div className='order-info-body'>
                  {this.renderCheckoutItems()}

                  <div className="checkout-total">
                    <div><span className="text-gray">Total </span> <b>${parseFloat(total).toFixed(2)}</b></div>
                    <div><span className="text-gray">Tax (21%) </span> <b>${parseFloat(tax).toFixed(2)}</b></div>
                    <div><span className="text-gray">Fee </span> <b>$0</b></div>
                  </div>

                  <div className="checkout-amount">
                    <div><span className="text-gray">Amount </span> <b className='checkout-total-price'>${parseFloat(amount).toFixed(2)}</b></div>
                  </div>
                </div>
            </div>
          </div>
          <div className="container flex-row flex-align-stretch ">
            <div className="flex-row bottom-buttons">
              <button className="theme-btn theme-btn-secondery theme-btn-link btn-edit-order-bottom"><Link to="/cart">Edit Order</Link></button>
              <button className="theme-btn theme-btn-primary btn-payment" onClick={() => this.onCheckout(this.state)}>Payment</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.app.carts,
});

export default connect(mapStateToProps)(Checkout);
