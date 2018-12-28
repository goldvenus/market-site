import React, { Component } from 'react';
import { connect } from "react-redux";
import CustomInput from '../CustomInput';
import { Container, Row, Col, Form, ListGroup, ListGroupItem, TabContent, TabPane, Nav, NavItem, NavLink, } from 'reactstrap';
import classnames from 'classnames';
import CardView from './RG_card_view';
import ListView from './RG_list_view';
import TableView from './RG_table_view';
import { gearListdata } from '../dummydata.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.suggestions = [
      "Canon EOS 6D",
      "Canon EOS 2000D Kit 18-55mm IS II",
      "Canon EOS 5D Mark III",
      "Canon EOS 80D",
      "Canon EOS 3000D Kit 18-55mm IS II"
    ]

    this.locationSuggestions = [
      'United State',
      'United Kingdom',
      'Pakistan',
      'India'
    ];

    this.state = {
      searchText: '',
      locationText: '',
      searchTextSuggestions: [],
      locationTextSuggestions: [],
      activeTab: '1'
    }
  }
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  onSearchTextChange = (value) => {
    if (value) {
      let pattern = new RegExp(value, 'ig')
      let searchTextSuggestions = this.suggestions.filter((s) => s.search(pattern) > -1);

      this.setState({
        searchText: value,
        searchTextSuggestions
      });
    } else {
      this.setState({
        searchText: '',
        searchTextSuggestions: []
      });
    }
  }

  onLocationChange = (value) => {
    if (value) {
      let pattern = new RegExp(value, 'ig')
      let locationTextSuggestions = this.locationSuggestions.filter((s) => s.search(pattern) > -1);

      this.setState({
        locationText: value,
        locationTextSuggestions
      });
    } else {
      this.setState({
        locationText: '',
        locationTextSuggestions: []
      });
    }
  }

  selectSearchSuggestion(suggestion) {
    this.setState({
      searchText: suggestion,
      searchTextSuggestions: []
    })
  }

  selectLocationSuggestion(suggestion) {
    this.setState({
      locationText: suggestion,
      locationTextSuggestions: []
    })
  }
  render() {
    const { searchTextSuggestions, locationTextSuggestions, searchText, locationText } = this.state;
    const searchSuggestions = searchTextSuggestions.map((suggestion) => <ListGroupItem onClick={() => this.selectSearchSuggestion(suggestion)}>{suggestion}</ListGroupItem>);
    const locationSuggestions = locationTextSuggestions.map((suggestion) => <ListGroupItem onClick={() => this.selectLocationSuggestion(suggestion)}>{suggestion}</ListGroupItem>);

    return (
      <div className="main-wrapper">
        <Row className="main_head">
          <Col sm="9">
            <div className="search">
              <Form className="theme-form">
                <div className="search-input">
                  <CustomInput icon="fa-search" placeholder="Search" type="text" label="Search" onChange={this.onSearchTextChange} value={searchText} />
                  <ListGroup className="search-suggestions">
                    {
                      searchSuggestions
                    }
                  </ListGroup>
                </div>
                <div className="location-input">
                  <CustomInput icon="fa-map-marker" placeholder="Location" type="text" label="Location" onChange={this.onLocationChange} value={locationText} />
                  <ListGroup className="search-suggestions">
                    {
                      locationSuggestions
                    }
                  </ListGroup>
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
                    <i class="fa fa-th"></i>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  <div className="list-view">
                    <i class="fa fa-list"></i>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  <div className="table-view ">
                    <i class="fa fa-grip-lines"></i>
                    <i class="fa fa-grip-lines"></i>
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
                gearListdata.map((gear , index) =>{
                  return <CardView gear_detail={gear}/>
                })
              }
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <ListView />
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <TableView />
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Main);
