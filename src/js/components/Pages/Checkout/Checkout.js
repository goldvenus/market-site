import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Label, ListGroup, ListGroupItem } from 'reactstrap';
import { getCarts, days, checkout, handleError } from '../../../actions/app.actions';
import BarLoader from "react-bar-loader";
import TextField from "@material-ui/core/TextField";
import Dropdown, {
    MenuItem
} from '@trendmicro/react-dropdown';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import '@trendmicro/react-dropdown/dist/react-dropdown.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import $ from "jquery";

class Checkout extends Component {
  constructor() {
    super();

    getCarts();
    this.state = {
      full_name: '',
      addr: 'Saved address',
      city: '',
      product_region: '',
      zip: '',
      save_addr: false,
      open: false,
    };
  }

  renderCheckoutItems() {
    const { carts } = this.props;
    const mappedCarts = carts.map((listItem, index) => {
      const d = days(listItem.startDate, listItem.endDate);

      return <div key={`cart-item-${index}`} className="checkout-item">
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
    const { full_name, addr, city, zip, save_addr, product_region } = state;

    if (!full_name && !addr && !city && !zip && !product_region) {
      handleError('Please provide required information');
      return false;
    }
    let response = await checkout({
      full_name,
      addr,
      city,
      zip,
      product_region,
      save_addr
    });

    if (response) {

      this.props.history.push('/payment');
    }
  }

  onCheckoutTemp = () => {
      const { full_name, addr, city, zip, save_addr, product_region } = this.state;

      if (!full_name && !addr && !city && !zip && !product_region) {
          handleError('Please provide required information');
          return false;
      }
      localStorage.checkout_info = {
          full_name, addr, city, zip, save_addr, product_region
      };
  }

  handleAddrChange = (e, val) => {
    e.preventDefault();
    this.setState({addr: val});
  }

  handleSetSaveState = () => {
    this.setState(prev => ({addr_save_st: !prev.addr_save_st}));
  }
  handleClickAddrList = () => {
    if($('.addr-dropdown').hasClass('active')){
        $('.addr-dropdown').removeClass('active') ;
        $('.addr-dropdown ul').css('display', 'none');
    } else {
        $('.addr-dropdown').addClass('active') ;
        $('.addr-dropdown ul').css('display', 'block');
    }
  }

  render() {
    const { carts } = this.props;
    if (!carts) {
      return <BarLoader color="#F82462" height="5" />;
    }

    let total = 0;
    carts.forEach(listItem => {
      const d = days(listItem.startDate, listItem.endDate);
      total += d * listItem.pricePerDay;
    });
    const tax = total * 0.21;
    const amount = total + tax;
    const addrs = ['beach', 'mountain', 'forest', 'river', 'dessert'];

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
                <div className="text-gray d-none d-md-none d-lg-block">BILLING ADDRESS</div>
                <div className="text-gray d-md-block d-lg-none">INFO</div>
              </div>
              <div className="address-select">
                <Dropdown className='d-none d-lg-block'>
                  <Dropdown.Toggle title="Saved address" />
                  <Dropdown.Menu>
                    {
                      addrs.map((element, index) => (
                        <React.Fragment>
                          <MenuItem key={index}>
                            {element}
                            <MenuItem onClick={(e) => this.handleAddrChange(e)}>
                                level item one
                            </MenuItem>
                          </MenuItem>
                          <MenuItem divider />
                        </React.Fragment>))
                    }
                  </Dropdown.Menu>
                </Dropdown>
                <aside className="sidebar">
                  <div className="addr-dropdown d-block d-lg-none">
                    <div className="catagory-header">
                      <button className="sidebar-title   category-action-btn" onClick={this.handleClickAddrList}>
                        { this.state.addr }
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </button>
                    </div>

                    <ListGroup>
                      {addrs.map((element, index) =>
                        <ListGroupItem onClick={(e) => this.handleAddrChange(e, element)} value={element} key={index}>
                          <div className='item-active'>
                            {element}
                          </div>
                        </ListGroupItem>
                      )}
                    </ListGroup>
                  </div>
                </aside>
              </div>
              <div className="theme-form">
                <div className="theme-form-field">
                  <TextField className='checkout-textfield' placeholder='Full Name' type="text"
                               onChange={(value) => this.setState({ full_name: value })}/>
                </div>
                <div className="flex-row">
                  <div className="theme-form-field flex-md-12">
                    <TextField className='checkout-textfield' placeholder='Address' type="text"
                               onChange={(value) => this.setState({ addr: value })}/>
                  </div>
                  <div className="theme-form-field flex-md-12">
                    <TextField className='checkout-textfield' placeholder='City' type="text"
                               onChange={(value) => this.setState({ city: value })}/>
                  </div>
                </div>
                <div className="flex-row">
                  <div className="theme-form-field flex-md-12">
                    <TextField className='checkout-textfield' placeholder='Region' type="text"
                               onChange={(value) => this.setState({ product_region: value })}/>
                  </div>
                  <div className="theme-form-field flex-md-12">
                    <TextField className='checkout-textfield' placeholder='Zip' type="text"
                               onChange={(value) => this.setState({ zip: value })}/>
                  </div>
                </div>
                <div className="theme-form-field save-addr-btn">
                  <div className="input_svg pretty p-svg p-plain">
                    <input  type="checkbox"/>
                    <div className="state">
                        <img className="svg check_svg" src="/images/Icons/task.svg" onClick={this.handleSetSaveState}/>
                    </div>
                  </div>
                  <Label for="save-address" className='checkbox-label'>Save this address</Label>
                </div>
              </div>
            </div>

            <div className="order-info">
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
              <button className="theme-btn theme-btn-primary btn-payment" onClick={this.onCheckoutTemp}>Payment</button>
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
