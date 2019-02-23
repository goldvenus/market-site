import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, ListGroup, ListGroupItem } from 'reactstrap';

import { fetchCategories, search, newArrivals, socialLogin } from '../../../actions/app.actions';

import CustomInput from '../../CustomInput';
import ThemeCardOne from '../../Theme-Cards/ThemeCardOne';
import ThemeCardTwo from '../../Theme-Cards/ThemeCardTwo';

import data from '../../dummydata';
import $ from 'jquery';

class Home extends Component {
  constructor(props) {
    super(props);

    this.locationSuggestions = [];

    this.state = {
      searchText: '',
      locationText: '',
      searchTextSuggestions: [],
      locationTextSuggestions: [],
      categories: []
    };
  }

  componentDidMount() {
    var $animation_elements = $('.animation-element');
    var $window = $(window);

    function check_if_in_view() {
      var window_height = $window.height();
      var window_top_position = $window.scrollTop();
      var window_bottom_position = (window_top_position + window_height);

      $.each($animation_elements, function () {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
          (element_top_position <= window_bottom_position)) {
          $element.addClass('in-view');
        } else {
          $element.removeClass('in-view');
        }
      });
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

    fetchCategories();
    newArrivals();

    //facebook login
    let href = window.location.href;
    if (href.indexOf('id_token') > 0) {
      let token1 = href.split('#')[1].split('&')[0];
      let token2 = href.split('#')[1].split('&')[1];
      let idToken, accessToken;

      if (token1.indexOf('id_token') > 0) {
        idToken = token1.replace('id_token=', '');
        accessToken = token2.replace('access_token=', '');
      } else {
        accessToken = token1.replace('access_token=', '');
        idToken = token2.replace('id_token=', '');
      }

      socialLogin(idToken, accessToken);
    }
  }

  handleSearchTextChange = value => {
    if (value) {
      const pattern = new RegExp(value, 'ig');
      const suggestions = (this.props.app.categories || []).map(cat => cat.categoryName);
      const searchTextSuggestions = suggestions.filter((s) => s.search(pattern) > -1);

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
  };

  handleLocationChange = value => {
    if (value) {
      let pattern = new RegExp(value, 'ig');
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
  };

  handleSelectSearchSuggestion = suggestion => {
    this.setState({
      searchText: suggestion,
      searchTextSuggestions: []
    });
  };

  handleSelectLocationSuggestion = suggestion => {
    this.setState({
      locationText: suggestion,
      locationTextSuggestions: []
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { searchText, locationText } = this.state;

    if (searchText) {
      const res = search(searchText, locationText);

      if (res) {
        this.props.history.push('/search');
      }
    }

    return false;
  };

  render() {
    let cat = this.props.app;

    const { searchTextSuggestions, locationTextSuggestions, searchText, locationText } = this.state;

    return (
      <div className="home">
        <div className="home-head">
          <Container className="centered-content">
            <Row>
              <Col>
                <img className="logo" src={'/images/Logo.png'} alt=""/>

                <h1 className="title">Find Creative Tools Around You</h1>

                <p className="desc">
                  <span>Creative market is a community </span>&nbsp;
                  <span className="bold">for creators, by creators.</span>
                </p>

                <p className="theme-text-small rent-categories">
                  Rent &nbsp;
                  <button className="theme-btn theme-btn-primary-light expand-link">

                    <img className="icon icon-expand" src={'/images/Icons/Tags/Photo/Default.svg'} alt="drone"/>
                    <img className="icon icon-contract" src={'/images/Icons/Tags/Photo/Hover.svg'} alt="drone"/>
                    <Link to="/">Cameras</Link>

                  </button>
                  <button className="theme-btn theme-btn-primary-light expand-link">

                    <img className="icon icon-expand" src={'/images/Icons/Tags/Drone/Default.svg '} alt="drone"/>
                    <img className="icon icon-contract" src={'/images/Icons/Tags/Drone/Hover.svg '} alt="drone"/>
                    <Link to="/">Drones</Link>

                  </button>
                  <button className="theme-btn theme-btn-primary-light expand-link">

                    <img className="icon icon-expand" src={'/images/Icons/Tags/Lights/Default.svg '} alt="drone"/>
                    <img className="icon icon-contract" src={'/images/Icons/Tags/Lights/Hover.svg '} alt="drone"/>
                    <Link to="/"> Lights </Link>

                  </button>
                  &nbsp;
                  and more from people around you

                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form className="theme-form">
                  <div className="search-input">
                    <CustomInput icon="fa-search" placeholder="Search" type="text" label="Search"
                                 onChange={this.handleSearchTextChange} value={searchText}/>
                    <ListGroup className="search-suggestions">
                      {searchTextSuggestions.map((key, value) => (
                        <ListGroupItem
                          key={key}
                          onClick={() => this.handleSelectSearchSuggestion(value)}
                        >
                          {value}
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </div>
                  <div className="location-input">
                    <CustomInput icon="fa-map-marker" placeholder="Location" type="text" label="Location"
                                 onChange={this.handleLocationChange} value={locationText}/>
                    <ListGroup className="search-suggestions">
                      {locationTextSuggestions.map((key, value) => (
                        <ListGroupItem
                          key={key}
                          onClick={() => this.handleSelectLocationSuggestion(value)}
                        >
                          {value}
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </div>
                  <button className="theme-btn search-button theme-btn-filled-white" onClick={this.handleSearch}>
                    <span className="fa fa-search"/>
                  </button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="home-body">
          <Container>
            <div className="row">
              <div className="block-el block-e1-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="camera"></p>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>Camera</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/cameras">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"></div>
              </div>

              <div className="block-el block-e1-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="computer_electronic"></p>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>Computer & Electronics</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/cameras">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"></div>
              </div>

              <div className="block-el block-e1-size col animation-element slide-left testimonial">
                <div className="block-content ">
                  <p id="drones"></p>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>Drones</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/cameras">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"></div>
              </div>
            </div>
            <div className="row">
              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="lenses"></p>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>lenses</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/lenses">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"></div>
              </div>

              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="lighting"></p>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>lighting</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/lighting">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"></div>
              </div>
              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="audio"></p>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>Audio</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/audio">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"></div>
              </div>

              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="tripods_stabilization_rigs"></p>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>Tripods Stabilization & Rigs</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/TS&R">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"></div>
              </div>
            </div>
            <div className="row">
              <div className="block-el block-e2-size block-e3-adjustment col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="camera_accessories"></p>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>Camera Accessories</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/camera_accessories">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"></div>
              </div>

              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="studio_spaces"></p>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>Studio Spaces</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/studio_spaces">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"></div>
              </div>

              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="office_spaces"></p>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>Office Spaces</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/office_spaces">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"></div>
              </div>
              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="others"></p>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>OTHER</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/office_spaces">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"></div>
              </div>
            </div>
            <div className="clearfix mb-4"></div>

          </Container>

          {cat.newArrivals && cat.newArrivals.Items ?
            <div className="new_arrival">
              <div className="section-overlay">
                <Container>
                  <Row>
                    <Col sm="3" className="align-self-center">
                      <h3 className="mb-4">New Arrivals</h3>
                      <div className="calendarSection">
                        <Col>
                          <div style={{ width: 120, height: 115, backgroundColor: 'rgba(255, 254, 254, 0.8)' }}>
                            <div style={{ paddingTop: 31 }}>
                              <text style={{ fontSize: 13 }}>Daily</text>
                            </div>
                            <div>
                              <text style={{ fontSize: 25, fontWeight: 'bold' }}>11</text>
                            </div>
                          </div>
                          <div style={{
                            width: 120,
                            height: 115,
                            marginTop: 5,
                            backgroundColor: 'rgba(255, 254, 254, 0.8)'
                          }}>
                            <div style={{ paddingTop: 31 }}>
                              <text style={{ fontSize: 13 }}>Weekly</text>
                            </div>
                            <div>
                              <text style={{ fontSize: 25, fontWeight: 'bold' }}>41</text>
                            </div>
                          </div>
                        </Col>
                        <Col>
                          <div style={{
                            width: 120,
                            height: 115,
                            marginLeft: 38,
                            backgroundColor: 'rgba(255, 254, 254, 0.8)'
                          }}>
                            <div style={{ paddingTop: 31 }}>
                              <text style={{ fontSize: 13 }}>Monthly</text>
                            </div>
                            <div>
                              <text style={{ fontSize: 25, fontWeight: 'bold' }}>220</text>
                            </div>
                          </div>
                          <div style={{
                            width: 120,
                            height: 115,
                            marginLeft: 38,
                            marginTop: 5,
                            backgroundColor: 'rgba(255, 254, 254, 0.8)'
                          }}>
                            <div style={{ paddingTop: 31 }}>
                              <text style={{ fontSize: 13 }}>Yearly</text>
                            </div>
                            <div>
                              <text style={{ fontSize: 25, fontWeight: 'bold' }}>1400</text>
                            </div>
                          </div>
                        </Col>
                      </div>
                      <button className="theme-btn theme-btn-primary button" style={{
                        width: 244,
                        marginLeft: 30
                      }}>
                        <Link to="/listGear">
                          <i className="fa fa-search" style={{ color: 'rgba(255, 255, 255, 0.6);', marginRight: 6 }}/>
                          Find Gear
                        </Link>
                      </button>
                    </Col>
                    <Col sm={{ size: 8, offset: 1 }}>
                      <Row>
                        {
                          cat.newArrivals.Items.map((item, index) => {
                            return <Col sm="6" key={index}>
                              <ThemeCardOne Gear={item}/>
                            </Col>;
                          })
                        }
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div> : null
          }
          <div className="stories">
            <Container>
              <Row>
                <Col>
                  <h2 className="text-center mb-5">Stories</h2>
                </Col>
              </Row>
              <Row>
                {
                  data.stories.map((item, index) => {
                    return <Col sm="4" key={index}>
                      <ThemeCardTwo story={item}/>
                    </Col>;
                  })
                }
              </Row>
              <Row>
                <Col className="text-center">
                  <button className="theme-btn theme-btn-primary mt-5">
                    View All
                  </button>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="paySection">
            <Col className="paySection1">
              <div className="paySection2" style={{ marginTop: 105, marginLeft: 180 }}>
                <div style={{ alignSelf: 'center', width: 524 }}>
                  <div>
                    <text style={{ fontWeight: 'bold', fontSize: 30, color: '#252525' }}>Fast, safe and secure</text>
                  </div>
                  <div style={{ marginTop: 15 }}>
                    <text style={{ fontWeight: 'bold', fontSize: 30, color: '#252525' }}>Two-way inscurance included
                    </text>
                  </div>
                </div>

              </div>
              <div className="paySection2" style={{ marginLeft: 180 }}>
                <div style={{ alignSelf: 'center', width: 370, marginTop: 80 }}>
                  <div>
                    <text style={{ fontSize: 16, }}>Creative Market’s photo verification system verifies the condition
                      of items when picked up and returned. Both by owner and renter.
                    </text>
                  </div>
                </div>
              </div>
              <Row>
                <Col style={{ marginLeft: 180, marginTop: 95 }}>
                  <button className="faq-button" style={{ width: 189, height: 50, border: 0 }}>
                    <text style={{ color: 'white' }}>FAQ</text>
                  </button>
                </Col>
              </Row>
            </Col>


            <Col>
              <div style={{ marginTop: 54 }}>
                <div className="paySection2">
                  <img style={{ width: 101, height: 118 }} src={'/images/Icons/Stages/Choose-Gear.svg'} alt="drone"/>
                  <div style={{ alignSelf: 'center' }}>
                    <div>
                      <text style={{ fontWeight: 'bold' }}>CHOOSE GEAR</text>
                    </div>
                    <div>
                      <text style={{ fontSize: 16 }}>Find the gear you need and add to cart.</text>
                    </div>
                  </div>
                </div>
                <div className="paySection2" style={{ marginTop: 40 }}>
                  <img style={{ width: 101, height: 118 }} src={'/images/Icons/Stages/Pay.svg'} alt="drone"/>
                  <div style={{ alignSelf: 'center' }}>
                    <div>
                      <text style={{ fontWeight: 'bold' }}>PAY</text>
                    </div>
                    <div>
                      <text style={{ fontSize: 16 }}>Complete secure payment via 2checkout</text>
                    </div>
                  </div>
                </div>
                <div className="paySection2" style={{ marginTop: 46 }}>
                  <img style={{ width: 101, height: 118 }} src={'/images/Icons/Stages/Enjoy.svg'} alt="drone"/>
                  <div style={{ alignSelf: 'center' }}>
                    <div>
                      <text style={{ fontWeight: 'bold' }}>ENJOY</text>
                    </div>
                    <div>
                      <text style={{ fontSize: 16 }}>Pick up the gear and start creating!</text>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
});

export default connect(mapStateToProps)(Home);
