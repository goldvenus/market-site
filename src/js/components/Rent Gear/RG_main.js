import React, { Component } from 'react';
import { connect } from "react-redux";
import CustomInput from '../CustomInput';
import { Row, Col, Form, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { ToastsStore } from 'react-toasts';
import classnames from 'classnames';
import CardView from './RG_card_view';
import ListView from './RG_list_view';
import TableView from './RG_table_view';
import { addCart, formatDate, rentGearProductList } from '../../actions/app.actions';
import CartModal1 from "../common/CartModal1";
import CartModal from "../common/CartModal";
import BarLoader from "react-bar-loader";

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
      category: '',
      cart_adding: false
    };
  }

  componentDidMount() {
    this.loadProductList(this.props.category);
  }

  loadProductList = async (category) => {
    this.setState({loading: true});
    let ret = await rentGearProductList({
      categoryName: category,
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
    const { carts } = this.props;
    const { product_list } = this.state;
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

  addToCart = async ({ gearid, userid, startDate, endDate }) => {
    try {
      if (startDate && endDate) {
        let res = await addCart({
          gearid: gearid,
          userid: userid,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate)
        });

        if (res.status === 'success') {
          ToastsStore.info("Gear was added to cart!");
          this.setState({
            modal_open_st: 0
          });
        } else {
          ToastsStore.error(res.errorMessage);
        }
      }
    } catch {
      ToastsStore.error("Gear was not added to cart!");
    }
  };

  doSearch = () => {
    let product_list = this.state.product_list;
    const key1 = this.state.searchText;
    const key2 = this.state.locationText;

    product_list = product_list.filter(item =>
        (item.categoryName.indexOf(key1) !== -1 || item.brand.indexOf(key1) !== -1) &&
        ((item.city.indexOf(key2) !== -1 || item.address.indexOf(key2) !== -1) || item.product_region.indexOf(key2) !== -1));
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
    const { carts, favourites } = this.props;
    const favored = gearid && favourites && favourites.Count > 0 ?
      favourites.Items.filter(item => item.gearid === gearid).length : 0;
    const carted = gearid && carts && carts.length > 0 ?
      carts.filter(item => item.gearid === gearid).length : 0;
    return { carted, favored };
  };

  render() {
    const { category, carts, favourites } = this.props;
    if (!carts || !favourites || !category || this.state.loading)
      return <BarLoader color="#F82462" height="5" />;

    let { product_list } = this.state;
    if (product_list === undefined)
      return <BarLoader color="#F82462" height="5" />;

    if (this.state.category !== category) {
      this.state.searchText = '';
      this.state.locationText = '';
      this.loadProductList(category);
    }

    product_list = this.doSearch();
    const is_empty = product_list.length < 1;

    return (
      <div className="main-wrapper">
        <Row className="main_head">
          <Col md="18 d-none d-md-flex" >
            <div className="search">
              <Form className="theme-form">
                <div className="search-input">
                  <CustomInput icon="fa-search" placeholder="Search" type="text" label="Search" value={this.state.searchText}
                    onChange={(value) => {
                      this.setState({searchText: value});
                    }} />
                </div>
                <div className="location-input d-none d-md-flex">
                  <CustomInput icon="fa-map-marker" placeholder="Location" type="text" label="Location" value={this.state.locationText}
                    onChange={(value) => {
                      this.setState({locationText: value});
                    }} />
                </div>
              </Form>
            </div>
          </Col>
          <Col md="6" className="d-none d-lg-flex">
            <Nav tabs className="views">
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  <div className="card-view">
                    <i className="fa fa-th"></i>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  <div className="list-view">
                    <i className="fa fa-list"></i>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  <div className="table-view ">
                    <i className="fa fa-grip-lines"></i>
                    <i className="fa fa-grip-lines"></i>
                  </div>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
        {
          is_empty ?
            <div className='gear-list-empty'>
              <h4>There's no gear you're looking for.</h4>
            </div>
            :
            <React.Fragment>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                    <Row>
                        {
                            product_list.map((gear, index) => {
                                const gear_state = this.isCartedFavored(gear.gearid);
                                return <CardView gear_detail={gear} key={index} {...gear_state}
                                                 onOpenModal={this.onOpenModal}/>
                            })
                        }
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        {
                            product_list.map((gear, index) => {
                                const gear_state = this.isCartedFavored(gear.gearid);
                                return <ListView gear_detail={gear} key={index} {...gear_state}
                                                 onOpenModal={this.onOpenModal}/>
                            })
                        }
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                        {
                            product_list.map((gear, index) => {
                                const gear_state = this.isCartedFavored(gear.gearid);
                                return <TableView gear_detail={gear} key={index} {...gear_state}
                                                  onOpenModal={this.onOpenModal}/>
                            })
                        }
                    </Row>
                </TabPane>
              </TabContent>
                {
                    this.state.modal_open_st === 2 ?
                        <CartModal1 dlg_model={1} gear={this.state.gear} open={this.state.modal_open_st === 2} onClose={this.onCloseModal} addToCart={this.addToCart} /> :
                    this.state.modal_open_st === 1 ?
                        <CartModal carted={this.state.carted} gear={this.state.gear} start_date={this.state.cart_info.start_date} end_date={this.state.cart_info.end_date} open={this.state.modal_open_st === 1} onClose={this.onCloseModal} /> :
                        null
                }
            </React.Fragment>
        }
      </div>
    );
  }
}

export default connect(state => {
  return {
    carts: state.app.carts,
    favourites: state.app.favourites
  };
})(Main);
