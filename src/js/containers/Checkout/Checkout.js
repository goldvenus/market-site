import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Label } from 'reactstrap';
import {getCheckout, checkout, saveCheckoutInfo} from '../../core/actions/checkout.action';
import { days } from '../../core/helper/index';
import BarLoader from "react-bar-loader";
import TextField from "@material-ui/core/TextField";
import Dropdown, {
    MenuItem
} from '@trendmicro/react-dropdown';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import '@trendmicro/react-dropdown/dist/react-dropdown.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import $ from "jquery";
import CustomSpinner from "../../components/CustomSpinner";
import BreadCrumbActive from "../../components/BreadCrumbActive";
import { getUniqueObjectArray } from "../../core/helper/index";
import { handleError } from "../../core/actions/common.action";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zip: '',
      city: '',
      addr: '',
      firstName: '',
      lastName: '',
      company: '',
      addrList: [],
      saveAddr: false,
      productRegion: '',
      projectName: '',
      loading: true
    };

    this.getUserCheckoutInfo();
  }
  
  getUserCheckoutInfo = async () => {
    let res = await getCheckout(localStorage.userId);
    let checkout = res.checkout_info;
    let addrList = res.addr_list !== undefined ? res.addr_list : [];
    
    if (checkout) {
      this.setState({
        loading: false,
        zip: checkout.Zip,
        addr: checkout.Addr,
        city: checkout.City,
        addrList: addrList,
        firstName: checkout.FullName.split(' ')[0],
        lastName: checkout.FullName.split(' ')[1],
        saveAddr: checkout.SavedAddr,
        company: checkout.Company,
        projectName: checkout.ProjectName,
        productRegion: checkout.ProductRegion
      });
    } else {
      this.setState({
        loading: false,
        addrList: addrList
      });
    }
  };

  handleAddressChange = (e, element) => {
    e.preventDefault();
    $(".select-addr-btn").trigger('click');
    this.setState({
        addr: element.addr,
        productRegion: element.productRegion,
        zip: element.zip,
        city: element.city,
        firstName: element.fullName.split(' ')[0],
        lastName: element.fullName.split(' ')[1]
    });
  };

  handleSetSaveState = () => {
    this.setState({saveAddr: !this.state.saveAddr});
  };

  handleInputChange = (e, val) => {
    this.setState({[val]: e.target.value});
  };
  
  onCheckout = async () => {
    // 1. input validation
    let { firstName, lastName, addr, city, zip, saveAddr, productRegion, projectName, company } = this.state;
    let userId = localStorage.userId;
    if (!firstName || !lastName || !addr || !city || !zip || !productRegion || !projectName || !company) {
      handleError('Please provide required information');
      return false;
    }
    
    let data = { firstName, lastName, addr, city, zip, saveAddr, productRegion, projectName, userId, company };
    this.setState({loading: true});
    let res = await checkout(data);
    
    if (!res) {
      this.setState({loading: false});
      return;
    }
    
    await saveCheckoutInfo(data);
    this.props.history.push('/payment/' + res);
  };

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

  render() {
    const { carts, user } = this.props;
    if (!carts || !user) {
      return <BarLoader color="#F82462" height="5"/>;
    }

    let total = 0;
    carts.forEach(listItem => {
      let d = days(listItem.startDate, listItem.endDate);
      total += d * listItem.pricePerDay;
    });
    let tax = total * 0.21;
    let fee = total * 0.15;
    let amount = total + tax + fee;
    let { firstName, lastName, addr, city, zip, saveAddr, productRegion, addrList, projectName, company } = this.state;
    let addrList_temp = getUniqueObjectArray(addrList);
    console.log(addrList_temp);

    return (
      <React.Fragment>
      {this.state.loading && <CustomSpinner/>}
      <div className="checkout">
        <div className="checkout-head">
          <div className='container'>
            <Breadcrumb className= "card_content_path">
              <BreadCrumbActive name="Home"/>
              <span className="space_slash_span">/</span>
              <BreadcrumbItem active>Checkout</BreadcrumbItem>
            </Breadcrumb>
            <div className="d-flex align-items-center checkout-title"><span>Checkout</span></div>
          </div>
        </div>
        <div className="container flex-row flex-align-stretch ">
          <div className="project-name-container">
            <div className="text-gray">PROJECT NAME</div>
            <div className="text-gray">
              <div className="theme-form-field">
                <TextField
                  className='checkout-textfield custom-beautiful-textfield'
                  label='Project name'
                  type="text"
                  value={projectName}
                  onChange={e => this.handleInputChange(e, 'projectName')}
                />
              </div>
            </div>
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
                <Dropdown className='d-lg-block'>
                  <Dropdown.Toggle title="Saved address" className="select-addr-btn"/>
                  <Dropdown.Menu className='select-addr-dropdown'>
                    {
                      addrList_temp.length > 0 ?
                        addrList_temp.map((element, index) => (
                          <React.Fragment key={index}>
                            <MenuItem onClick={e => this.handleAddressChange(e, element)}>
                              {element.addr}, {element.zip} {element.productRegion}
                            </MenuItem>
                            {index === addrList_temp.length - 1 ? null : <MenuItem divider />}
                          </React.Fragment>))
                        : null
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="theme-form address-info-wrapper">
                <div className="flex-row">
                  <div className="theme-form-field flex-md-12">
                    <TextField
                      className='custom-beautiful-textfield'
                      label='First Name'
                      type="text"
                      value={firstName}
                      onChange={e => this.handleInputChange(e, 'firstName')}
                    />
                  </div>
                  <div className="theme-form-field flex-md-12">
                    <TextField
                      className='custom-beautiful-textfield'
                      label='Last Name'
                      type="text"
                      value={lastName}
                      onChange={e => this.handleInputChange(e, 'lastName')}
                    />
                  </div>
                </div>
                <div className="flex-row">
                  <TextField
                    className='custom-beautiful-textfield'
                    label='Company'
                    type="text"
                    value={company}
                    onChange={(e) => this.handleInputChange(e, 'company')}
                  />
                </div>
                <div className="flex-row">
                  <div className="theme-form-field flex-md-12">
                    <TextField
                      className='custom-beautiful-textfield'
                      label='Address'
                      type="text"
                      value={addr}
                      onChange={e => this.handleInputChange(e, 'addr')}
                    />
                  </div>
                  <div className="theme-form-field flex-md-12">
                    <TextField
                      className='custom-beautiful-textfield'
                      label='City'
                      type="text"
                      value={city}
                      onChange={(e) => this.handleInputChange(e, 'city')}
                    />
                  </div>
                </div>
                <div className="flex-row">
                  <div className="theme-form-field flex-md-12">
                    <TextField
                      className='custom-beautiful-textfield'
                      label='Region'
                      type="text"
                      value={productRegion}
                      onChange={(e) => this.handleInputChange(e, 'productRegion')}
                    />
                  </div>
                  <div className="theme-form-field flex-md-12">
                    <TextField
                      className='custom-beautiful-textfield'
                      label='Zip'
                      type="text"
                      value={zip}
                      onChange={(e) => this.handleInputChange(e, 'zip')}
                    />
                  </div>
                </div>
                <div className="theme-form-field save-addr-btn">
                  <div className="input_svg pretty p-svg p-plain">
                    <input  type="checkbox" onChange={this.handleSetSaveState} value={saveAddr} checked={saveAddr ? 'checked' : ''}/>
                    <div className="state">
                      <img className="svg check_svg" alt="" src="/images/Icons/task.svg"/>
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
                    <div><span className="text-gray">Fee (15%) </span> <b>${parseFloat(fee).toFixed(2)}</b></div>
                  </div>
                  <div className="checkout-amount">
                    <div><span className="text-gray">Amount </span> <b className='checkout-total-price'>${parseFloat(amount).toFixed(2)}</b></div>
                  </div>
                </div>
            </div>
          </div>
          <div className="container flex-row flex-align-stretch ">
            <div className="flex-row bottom-buttons">
              <button className="theme-btn theme-btn-secondery btn-edit-order-bottom"><Link to="/cart">Back to Cart</Link></button>
              <button className="theme-btn theme-btn-primary" onClick={this.onCheckout}>Proceed to Payment</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.cart.carts,
  user: state.user.user
});

export default connect(mapStateToProps)(Checkout);
