import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Container, Row, Col, Breadcrumb, Table, Form, ListGroup, ListGroupItem,
  BreadcrumbItem, Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import CustomInput from './CustomInput';

class RentGear extends Component {
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

    this.categories = [
      "Cameras",
      "Lenses",
      "Audio Equipments",
      "Computer & Electronic",
      "Tipods, Stabilization & Rigs",
      "Drones",
      "Camera Accessories",
      "Studio Spaces",
      "Office Spaces",
      "Others"
    ];

    this.state = {
      searchText: '',
      locationText: '',
      searchTextSuggestions: [],
      locationTextSuggestions: [],
      activeIndex: 0
    }

    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
  }

  onSearchTextChange(value) {
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

  onLocationChange(value) {
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

  handleClick(index) {
    let activeIndex = this.state.activeIndex === index ? null : index;
    this.setState({ activeIndex });
  }
  render() {

    const { searchTextSuggestions, locationTextSuggestions, searchText, locationText } = this.state;
    const searchSuggestions = searchTextSuggestions.map((suggestion) => <ListGroupItem onClick={() => this.selectSearchSuggestion(suggestion)}>{suggestion}</ListGroupItem>);
    const locationSuggestions = locationTextSuggestions.map((suggestion) => <ListGroupItem onClick={() => this.selectLocationSuggestion(suggestion)}>{suggestion}</ListGroupItem>);

    return (
      <div className="rent-gear">
        <div className="rent-gear-head">
          <Container>
            <Row>
              <Col>
                <Breadcrumb>
                  <BreadcrumbItem>Home Page</BreadcrumbItem>
                  <BreadcrumbItem active>Rent Gear</BreadcrumbItem>
                </Breadcrumb>

                <div className="d-flex align-items-center">
                  <h2 className="theme-page-title">Rent Gear</h2>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="rent-gear-body">
          <Container>
            <Row>
              <Col sm="3">
                <aside className="sidebar">
                  <div className="sidebar-title">
                    All Categories
                  </div>
                  <div className="sidebar-wrapper">
                    <ListGroup>
                      {this.categories.map((element, index) =>
                        <ListGroupItem onClick={this.handleClick.bind(this, index)} value={element}
                          key={index}>
                          <div className={`${this.state.activeIndex === index && 'item-active'}`}>
                            {element}
                          </div>
                        </ListGroupItem>
                      )}
                    </ListGroup>
                  </div>
                </aside>
              </Col>
              <Col sm="9">
                <div className="main-wrapper">
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
                  <div className="views">
                    <div className="card-view">
                      <i class="fa fa-th"></i>
                    </div>
                    <div className="list-view">
                      <i class="fa fa-list"></i>
                    </div>
                    <div className="table-view ">
                      <i class="fa fa-grip-lines"></i>
                      <i class="fa fa-grip-lines"></i>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(RentGear);
