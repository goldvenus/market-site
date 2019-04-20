import React, { Component } from 'react';
import { connect } from "react-redux";
import CustomInput from '../CustomInput';
import { Row, Col, Form, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import CardView from './RG_card_view';
import ListView from './RG_list_view';
import TableView from './RG_table_view';
import { addCart, formatDate, handleError, rentGearProductList } from '../../actions/app.actions';
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
            product_list: []
        }

        this.loadProductList();
    }

    loadProductList = async () => {
        const category = this.props.category !== undefined ? this.props.category : this.state.category;
        let ret = await rentGearProductList({
            categoryName: category,
            product_region: this.state.locationText,
            brand: this.state.searchText
        });
        if (ret) {
            const prev_state = this.state.product_list;
            this.setState(() => ({
                category: category,
                product_list: ret
            }), () => {
                if (prev_state !== ret) {
                    console.log('force');
                    this.forceUpdate();
                }
            });
        }
    }

    shouldComponentUpdate(props, state) {
        if (props.category !== this.props.category) {
            this.loadProductList();
            return true;
        }
        return false;
    }

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
    }

    onCloseModal = () => {
        this.setState({ modal_open_st: 0 });
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

                if (res) {
                    this.setState({
                        modal_open_st: 0
                    });
                }
            }
        } catch {
            handleError("adding failed");
        }
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    isCartedFavored = gearid => {
        const { carts, favourites } = this.props;
        const favored = gearid && favourites && favourites.Count > 0 ?
            favourites.Items.filter(item => item.gearid === gearid).length : 0;
        const carted = gearid && carts && carts.length > 0 ?
            carts.filter(item => item.gearid === gearid).length : 0;
        return { carted, favored };
    }

    render() {
        const { carts, favourites } = this.props;
        if ( !carts || !favourites )
            return <BarLoader color="#F82462" height="5" />;
        const { product_list } = this.state;

        return (
            <div className="main-wrapper">
                <Row className="main_head">
                    <Col md="18 d-none d-md-flex" >
                        <div className="search">
                            <Form className="theme-form">
                                <div className="search-input">
                                    <CustomInput icon="fa-search" placeholder="Search" type="text" label="Search" onChange={
                                        (value) => {
                                            this.setState({ searchText: value } , () => {
                                                this.loadProductList();
                                            })}}
                                                 value={this.state.searchText} />
                                </div>
                                <div className="location-input d-none d-md-flex">
                                    <CustomInput icon="fa-map-marker" placeholder="Location" type="text" label="Location"
                                                 onChange={
                                                     (value) => {
                                                         this.setState({ locationText: value } , ()=> {
                                                             this.loadProductList();
                                                         })}}
                                                 value={this.state.locationText} />
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
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            {
                                product_list.map((gear , index) => {
                                    const gear_state = this.isCartedFavored(gear.gearid);
                                    return <CardView gear_detail={gear} key={index} {...gear_state} onOpenModal={this.onOpenModal} />
                                })
                            }
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            {
                                product_list.map((gear, index) => {
                                    const gear_state = this.isCartedFavored(gear.gearid);
                                    return <ListView gear_detail={gear} key={index} {...gear_state} onOpenModal={this.onOpenModal} />
                                })
                            }
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            {
                                product_list.map((gear, index) => {
                                    const gear_state = this.isCartedFavored(gear.gearid);
                                    return <TableView gear_detail={gear} key={index} {...gear_state} onOpenModal={this.onOpenModal} />
                                })
                            }
                        </Row>
                    </TabPane>
                </TabContent>
                <CartModal1 dlg_model={1} gear={this.state.gear} open={this.state.modal_open_st === 2} onClose={this.onCloseModal} addToCart={this.addToCart}></CartModal1>
                <CartModal carted={this.state.carted} gear={this.state.gear} start_date={this.state.cart_info.start_date} end_date={this.state.cart_info.end_date} open={this.state.modal_open_st === 1} onClose={this.onCloseModal}></CartModal>
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
