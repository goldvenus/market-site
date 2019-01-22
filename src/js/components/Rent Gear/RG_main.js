import React, { Component } from 'react';
import { connect } from "react-redux";
import CustomInput from '../CustomInput';
import {Row, Col, Form, ListGroup, ListGroupItem, TabContent, TabPane, Nav, NavItem, NavLink, } from 'reactstrap';
import classnames from 'classnames';
import CardView from './RG_card_view';
import ListView from './RG_list_view';
import TableView from './RG_table_view';
import { rentGearProductList } from '../../actions/app.actions';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      locationText: '',
      activeTab: '1'
    }
  }

  componentDidMount(){
    rentGearProductList({
      categoryName: "Cameras",
      product_region: this.state.locationText,
      brand: this.state.searchText
    });
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { productList, catagory} = this.props;

    return (
      <div className="main-wrapper">
        <Row className="main_head">
          <Col sm="9">
            <div className="search">
              <Form className="theme-form">
                <div className="search-input">
                  <CustomInput icon="fa-search" placeholder="Search" type="text" label="Search" onChange={
                    (value) => {
                      this.setState({ searchText: value } , ()=>{
                        rentGearProductList({
                          categoryName: catagory,
                          product_region: this.state.locationText,
                          brand: this.state.searchText
                        });
                      })}} 
                    value={this.state.searchText} />
                </div>
                <div className="location-input">
                  <CustomInput icon="fa-map-marker" placeholder="Location" type="text" label="Location" 
                  onChange={
                    (value) => {
                      this.setState({ locationText: value } , ()=>{
                        rentGearProductList({
                          categoryName: catagory,
                          product_region: this.state.locationText,
                          brand: this.state.searchText
                        });
                      })}} 
                  value={this.state.locationText} />
                </div>
              </Form>
            </div>
          </Col>
          <Col sm="3">
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
                productList.map((gear , index) =>{
                  return <CardView gear_detail={gear} key={index} />
                })
              }
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              {
                productList.map((gear, index) => {
                  return <ListView gear_detail={gear} key={index} />
                })
              }
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              {
                productList.map((gear, index) => {
                  return <TableView gear_detail={gear} key={index} />
                })
              }
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default connect(({ app : {productList} }) => {
  return {
    productList
  };
})(Main);
