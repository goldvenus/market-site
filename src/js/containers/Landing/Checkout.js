import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Label, ListGroup, ListGroupItem } from 'reactstrap';
import { days, getCheckout, checkout, handleError } from '../../actions/app.actions';
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
import Urllink_class from "../../components/Urllink_class";
import { getUniqueObjectArray } from "../../components/common/Functions";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      full_name: '',
      city: '',
      addr: '',
      addr_list: [],
      save_addr: false,
      product_region: '',
      zip: '',
      open: false,
      loading: true,
      project_name: ''
    };

    this.getUserCheckoutInfo();
  }

  getUserCheckoutInfo = async () => {
    const ret = await getCheckout(localStorage.userId);
    const checkout = ret.checkout_info;
    const addr_list = ret.addr_list !== undefined ? ret.addr_list : [];
    if (checkout) {
      this.setState({
        full_name: checkout.FullName,
        addr: checkout.Addr,
        city: checkout.City,
        product_region: checkout.ProductRegion,
        zip: checkout.Zip,
        addr_list: addr_list,
        save_addr: checkout.SavedAddr,
        loading: false,
        project_name: checkout.ProjectName
      });
    } else {
        console.log(addr_list);
      this.setState({
        addr_list: addr_list,
        loading: false
      });
    }
  };

  onCheckout = async () => {
    const { full_name, addr, city, zip, save_addr, product_region, project_name } = this.state;
    const user_id = localStorage.userId;
    if (!full_name || !addr || !city || !zip || !product_region || !project_name) {
      handleError('Please provide required information');
      return false;
    }

    const data = { full_name, addr, city, zip, save_addr, product_region, project_name, user_id };
    this.setState({loading: true});
    const response = await checkout(data);
    if (response.status === 'duplicated') {
        handleError('You should provide another project name!');
        this.setState({loading: false});
        return;
    }

    if (response) {
      this.props.history.push(`/payment/${response.data}`);
    }
  };

  handleAddrChange = (e, element) => {
    e.preventDefault();
    $(".select-addr-btn").trigger('click');
    this.setState({
        addr: element.addr,
        product_region: element.product_region,
        zip: element.zip,
        city: element.city,
        full_name: element.full_name
    });
  };

  handleSetSaveState = () => {
    this.setState({save_addr: !this.state.save_addr});
  };

  handleInputChange = (e, val) => {
    this.setState({[val]: e.target.value});
  };

  handleClickAddrList = () => {
    if($('.addr-dropdown').hasClass('active')){
      $('.addr-dropdown').removeClass('active') ;
      $('.addr-dropdown ul').css('display', 'none');
    } else {
      $('.addr-dropdown').addClass('active') ;
      $('.addr-dropdown ul').css('display', 'block');
    }
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
      const d = days(listItem.startDate, listItem.endDate);
      total += d * listItem.pricePerDay;
    });
    const tax = total * 0.21;
    const fee = total * 0.15;
    const amount = total + tax + fee;
    const { full_name, addr, city, zip, save_addr, product_region, addr_list, project_name } = this.state;
    const addr_list_temp = getUniqueObjectArray(addr_list);

    return (
      <React.Fragment>
      {
        this.state.loading ? <CustomSpinner/> : null
      }
      <div className="checkout">
        <div className="checkout-head">
          <div className='container'>
            <Breadcrumb className= "card_content_path">
              <Urllink_class name="Home"/>
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
                <TextField className='checkout-textfield' placeholder='Project name' type="text"
                      value={project_name}
                      onChange={e => this.handleInputChange(e, 'project_name')}/>
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
                <Dropdown className='d-none d-lg-block'>
                  <Dropdown.Toggle title="Saved address" className="select-addr-btn"/>
                  <Dropdown.Menu>
                    {
                      addr_list_temp.length > 0?
                        addr_list_temp.map((element, index) => (
                          <React.Fragment key={index}>
                            <MenuItem onClick={e => this.handleAddrChange(e, element)}>
                              {element.addr}, {element.zip} {element.product_region}
                            </MenuItem>
                            {
                              index === addr_list_temp.length - 1 ? null : <MenuItem divider />
                            }
                          </React.Fragment>))
                        : null
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
                      {
                        addr_list_temp.length > 0?
                          addr_list_temp.map((element, index) =>
                            <ListGroupItem onClick={(e) => this.handleAddrChange(e, element)} value={element.addr} key={index}>
                              <div className='item-active'>
                                {element.addr}
                              </div>
                            </ListGroupItem>)
                          : null
                      }
                    </ListGroup>
                  </div>
                </aside>
              </div>
              <div className="theme-form">
                <div className="theme-form-field">
                  <TextField className='checkout-textfield' placeholder='Full Name' type="text"
                               value={full_name}
                               onChange={e => this.handleInputChange(e, 'full_name')}/>
                </div>
                <div className="flex-row">
                  <div className="theme-form-field flex-md-12">
                    <TextField className='checkout-textfield' placeholder='Address' type="text"
                               value={addr}
                               onChange={e => this.handleInputChange(e, 'addr')}/>
                  </div>
                  <div className="theme-form-field flex-md-12">
                    <TextField className='checkout-textfield' placeholder='City' type="text"
                               value={city}
                               onChange={(e) => this.handleInputChange(e, 'city')}/>
                  </div>
                </div>
                <div className="flex-row">
                  <div className="theme-form-field flex-md-12">
                    <TextField className='checkout-textfield' placeholder='Region' type="text"
                               value={product_region}
                               onChange={(e) => this.handleInputChange(e, 'product_region')}/>
                  </div>
                  <div className="theme-form-field flex-md-12">
                    <TextField className='checkout-textfield' placeholder='Zip' type="text"
                               value={zip}
                               onChange={(e) => this.handleInputChange(e, 'zip')}/>
                  </div>
                </div>
                <div className="theme-form-field save-addr-btn">
                  <div className="input_svg pretty p-svg p-plain">
                    <input  type="checkbox" onChange={this.handleSetSaveState} value={save_addr} checked={save_addr ? 'checked' : ''}/>
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
              <button className="theme-btn theme-btn-secondery theme-btn-link btn-edit-order-bottom"><Link to="/cart">Edit Order</Link></button>
              <button className="theme-btn theme-btn-primary btn-payment" onClick={this.onCheckout}>Payment</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.app.carts,
  user: state.app.user
});

export default connect(mapStateToProps)(Checkout);
