import React, {Component} from 'react';
import {connect} from "react-redux";
import {Row, Col, Form, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import CardView from './RG_card_view';
import ListView from './RG_list_view';
import TableView from './RG_table_view';
import {addCart} from '../../core/actions/cart.action';
import {rentGearProductList} from '../../core/actions/gear.action'
import {formatDate} from '../../core/helper'
import CartModal2 from "../common/CartModal2";
import CartModal1 from "../common/CartModal1";
import Loader from 'react-loader-spinner'
import {handleError} from "../../core/actions/common.action";
import CustomSpinner from "../common/CustomSpinner";
import TextField from "@material-ui/core/TextField/TextField";

class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchText: '',
      locationText: '',
      activeTab: '1',
      modal_open_st: 0,
      carted: false,
      gear: {},
      cart_info: {
        start_date: new Date(),
        end_date: new Date()
      },
      product_list: [],
      loading: true,
      category: this.props.category || '',
      cart_adding: false
    };
  }
  
  async componentDidMount() {
    await this.loadProductList(this.props.category);
    
    if (localStorage.searchValue || localStorage.searchLocationValue) {
      let searchText = localStorage.searchValue;
      let locationText = localStorage.searchLocationValue;
      delete localStorage.searchValue;
      delete localStorage.searchLocationValue;
      this.setState({searchText: searchText, locationText: locationText});
    }
  }
  
  componentWillReceiveProps(props) {
    let {category} = this.state;
    if (category !== props.category) {
      this.initProductList(props.category);
    }
  }
  
  initProductList = (category) => {
    if (this.state.category !== category) {
      this.setState({
        searchText: '',
        locationText: '',
        category
      }, () => {
        this.loadProductList(category);
      });
    }
  };
  
  loadProductList = async (category) => {
    this.setState({loading: true});
    let ret = await rentGearProductList({
      categoryName: category === 'all' ? '' : category,
      product_region: this.state.locationText,
      brand: this.state.searchText
    });
    if (ret) {
      this.setState({
        product_list: ret,
        loading: false,
        category: category
      });
    }
  };
  
  onOpenModal = gearid => {
    const {carts} = this.props;
    const {product_list} = this.state;
    const cart = gearid && carts && carts.length > 0 ?
      carts.filter(item => item.gearid === gearid) : 0;
    const carted = cart.length;
    const gear = gearid && product_list && product_list.length > 0 ?
      product_list.filter(item => item.gearid === gearid)[0] : null;
    
    if (!gear) return;
    
    const open_state = carted ? 1 : 2;
    let start_date = new Date();
    let end_date = new Date();
    if (carted) {
      start_date = new Date(cart[0].startDate);
      end_date = new Date(cart[0].endDate);
    }
    
    this.setState({
      modal_open_st: open_state,
      gear: gear,
      carted: carted,
      cart_info: {
        start_date: start_date,
        end_date: end_date
      }
    });
    this.forceUpdate();
  };
  
  onCloseModal = () => {
    this.setState({modal_open_st: 0});
  };
  
  addToCart = async ({gearid, userid, startDate, endDate}) => {
    try {
      if (startDate && endDate) {
        await addCart({
          gearid: gearid,
          userid: userid,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate)
        });
        
        this.setState({
          modal_open_st: 0
        });
      }
    } catch {
      handleError("Gear was not added to cart!");
    }
  };
  
  doSearch = () => {
    let product_list = this.state.product_list;
    let key1 = this.state.searchText.toLowerCase();
    let key2 = this.state.locationText.toLowerCase();
    
    product_list = product_list.filter(item =>
      ((item.productName && item.productName.toLowerCase().indexOf(key1) !== -1) || item.categoryName.toLowerCase().indexOf(key1) !== -1 || item.brand.toLowerCase().indexOf(key1) !== -1) &&
      ((item.city.toLowerCase().indexOf(key2) !== -1 || item.address.toLowerCase().indexOf(key2) !== -1) || item.product_region.toLowerCase().indexOf(key2) !== -1));
    
    return product_list;
  };
  
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
      this.forceUpdate();
    }
  };
  
  isCartedFavored = gearid => {
    const {carts, favourites} = this.props;
    const favored = gearid && favourites && favourites.length > 0 ?
      favourites.filter(item => item.gearid === gearid).length : 0;
    const carted = gearid && carts && carts.length > 0 ?
      carts.filter(item => item.gearid === gearid).length : 0;
    return {carted, favored};
  };
  
  render() {
    const {category, carts, favourites, isChanging} = this.props;
    
    if (!carts || !favourites || !category || this.state.loading)
      return <div className="circle-loader">
        <Loader
          type="Oval"
          color="#F82462"
          height="60"
          width="60"
        />
      </div>;
    
    let {product_list} = this.state;
    if (product_list === undefined) {
      return <div className="circle-loader">
        <Loader
          type="Oval"
          color="#F82462"
          height="60"
          width="60"
        />
      </div>
    }
    // this.initProductList(category);
    
    product_list = this.doSearch();
    const is_empty = product_list.length < 1;
    
    return (
      <React.Fragment>
        {isChanging && <CustomSpinner/>}
        <div className="main-wrapper">
          <Row className="main_head">
            <Col md="18 d-none d-md-flex">
              <div className="search">
                <Form className="theme-form">
                  <div className="search-input">
                    <TextField
                      className='custom-beautiful-textfield'
                      icon="fa-search"
                      label="Search"
                      type="text"
                      value={this.state.searchText}
                      onChange={(e) => {
                        this.setState({searchText: e.target.value});
                      }}
                    />
                  </div>
                  <div className="location-input d-none d-md-flex">
                    <TextField
                      className='custom-beautiful-textfield'
                      icon="fa-map-marker"
                      label="Location"
                      type="text"
                      value={this.state.locationText}
                      onChange={(e) => {
                        this.setState({locationText: e.target.value});
                      }}
                    />
                  </div>
                </Form>
              </div>
            </Col>
            <Col md="6" className="d-none d-lg-flex">
              <Nav tabs className="views">
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === '1'})}
                    onClick={() => {
                      this.toggle('1');
                    }}
                  >
                    <div className="card-view">
                      <i className="fa fa-th"/>
                    </div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === '2'})}
                    onClick={() => {
                      this.toggle('2');
                    }}
                  >
                    <div className="list-view">
                      <i className="fa fa-list"/>
                    </div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === '3'})}
                    onClick={() => {
                      this.toggle('3');
                    }}
                  >
                    <div className="table-view ">
                      <i className="fa fa-grip-lines"/>
                      <i className="fa fa-grip-lines"/>
                    </div>
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
          {
            is_empty ?
              <div className='gear-list-empty'>
                <h4>No gear available in this category, yet.</h4>
              </div>
              :
              <React.Fragment>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      {
                        product_list.map((gear, index) => {
                          const gear_state = this.isCartedFavored(gear.gearid);
                          return <CardView
                            gear_detail={gear}
                            key={index}
                            {...gear_state}
                            onOpenModal={this.onOpenModal}
                          />
                        })
                      }
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      {
                        product_list.map((gear, index) => {
                          const gear_state = this.isCartedFavored(gear.gearid);
                          return <ListView
                            gear_detail={gear}
                            key={index}
                            {...gear_state}
                            onOpenModal={this.onOpenModal}
                          />
                        })
                      }
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      {
                        product_list.map((gear, index) => {
                          const gear_state = this.isCartedFavored(gear.gearid);
                          return <TableView
                            gear_detail={gear}
                            key={index}
                            {...gear_state}
                            onOpenModal={this.onOpenModal}
                          />
                        })
                      }
                    </Row>
                  </TabPane>
                </TabContent>
                {
                  this.state.modal_open_st === 2 ?
                    <CartModal2
                      dlg_model={1}
                      gear={this.state.gear}
                      open={true}
                      onClose={this.onCloseModal}
                      addToCart={this.addToCart}
                    /> :
                    this.state.modal_open_st === 1 ?
                      <CartModal1
                        carted={this.state.carted}
                        gear={this.state.gear}
                        start_date={this.state.cart_info.start_date}
                        end_date={this.state.cart_info.end_date}
                        open={true}
                        onClose={this.onCloseModal}
                      /> : null
                }
              </React.Fragment>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default connect(state => {
  return {
    carts: state.cart.carts,
    favourites: state.favourite.favourites,
    isChanging: state.favourite.isChanging
  };
})(Main);
