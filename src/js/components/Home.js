import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form, ListGroup, ListGroupItem } from 'reactstrap';
import CustomInput from './CustomInput';
import ThemeCardOne from './Theme-Cards/ThemeCardOne';
import ThemeCardTwo from './Theme-Cards/ThemeCardTwo';
import data from './dummydata';
import { fetchCategories, search, newArrivals, socialLogin } from '../actions/app.actions';


class Home extends Component {
  constructor() {
    super();

    this.suggestions = []
    this.locationSuggestions = [];

    this.state = {
      searchText: '',
      locationText: '',
      searchTextSuggestions: [],
      locationTextSuggestions: [],
      categories : []
    }

    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount(){
    fetchCategories();
    newArrivals();

    //facebook login
    let href = window.location.href;
    if(href.indexOf("id_token") > 0) {
      let token1 = href.split("#")[1].split("&")[0];
      let token2 = href.split("#")[1].split("&")[1];
      let idToken, accessToken;
      if(token1.indexOf("id_token") > 0) {
        idToken = token1.replace("id_token=", "");
        accessToken = token2.replace("access_token=", "");
      } else {
        accessToken = token1.replace("access_token=", "");
        idToken = token2.replace("id_token=", "");
      }

      socialLogin(idToken, accessToken);
    }
  }

  onSearchTextChange(value) {
    if(value) {
      let pattern = new RegExp(value, 'ig')
      const suggestions = (this.props.app.categories || []).map(cat => cat.categoryName);
      let searchTextSuggestions = suggestions.filter((s) => s.search(pattern) > -1);

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
    if(value) {
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

  onSearch(event) {
    event.preventDefault();
    const {searchText, locationText} = this.state;

    if(searchText) {
      const res = search(searchText, locationText);

      if(res) {
        this.props.history.push("/search");
      }
    }

    return false;
  }

  render() {
    let cat = this.props.app;

    const { searchTextSuggestions, locationTextSuggestions, searchText, locationText } = this.state;

    const searchSuggestions = searchTextSuggestions.map((suggestion) => <ListGroupItem onClick={() => this.selectSearchSuggestion(suggestion)}>{suggestion}</ListGroupItem>);
    const locationSuggestions = locationTextSuggestions.map((suggestion) => <ListGroupItem onClick={() => this.selectLocationSuggestion(suggestion)}>{suggestion}</ListGroupItem>);
    return (
      <div className="home">
        <div className="home-head">
          <Container className="centered-content">
            <Row>
              <Col>
                <div className="logo" >
                  <img src={'/images/Logo.svg'} alt="" />
                </div>

                <div className="title">Find Creative Tools Around You</div>

                <p className="desc">
                  <span >Creative market is a community </span>&nbsp;
                  <span className="bold">for creators, by creators.</span>
                </p>

                <p className="theme-text-small rent-categories">
                  Rent &nbsp;
                  <button className="theme-btn theme-btn-primary-light">

                    <img src={'/images/Icons/Tags/Photo/Default.svg'} alt="drone" />
                    <Link to="/">Cameras</Link>

                  </button>
                  <button className="theme-btn theme-btn-primary-light">

                    <img src={'/images/Icons/Tags/Drone/Default.svg '} alt="drone" />
                    <Link to="/">Drones</Link>

                  </button>
                  <button className="theme-btn theme-btn-primary-light">

                    <img src={'/images/Icons/Tags/Lights/Default.svg '} alt="drone" />
                    <Link to="/"> Lights </Link>

                  </button> &nbsp;
                  and more from people around you

                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form className="theme-form">
                  <div className="search-input">
                    <CustomInput icon="fa-search" placeholder="Search" type="text" label="Search" onChange={this.onSearchTextChange} value={searchText}/>
                    <ListGroup className="search-suggestions">
                      {
                        searchSuggestions
                      }
                    </ListGroup>
                  </div>
                  <div className="location-input">
                    <CustomInput icon="fa-map-marker" placeholder="Location" type="text" label="Location" onChange={this.onLocationChange} value={locationText}/>
                    <ListGroup className="search-suggestions">
                      {
                        locationSuggestions
                      }
                    </ListGroup>
                  </div>
                  <button className="theme-btn theme-btn-filled-white" onClick={this.onSearch }>
                    <span className="fa fa-search"></span>
                  </button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="home-body">
          <Container>
            <div className="block-el">
              <div className="block-content">
                <p id="camera"></p>
                <div className="desc">
                  <span>Camera</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/cameras" >View</Link>
                  </button>
                </div>
              </div>
              <div className="block-bg"></div>
            </div>

            <div className="block-el">
              <div className="block-content">
                <p id="computer_electronic"></p>
                <div className="desc">
                  <span>Computer & Electronics</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/cameras" >View</Link>
                  </button>
                </div>
              </div>
              <div className="block-bg"></div>
            </div>

            <div className="block-el">
              <div className="block-content">
                <p id="drones"></p>
                <div className="desc">
                  <span>Drones</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/cameras" >View</Link>
                  </button>
                </div>
              </div>
              <div className="block-bg"></div>
            </div>

            <div className="block-el">
              <div className="block-content">
                <p id="lenses"></p>
                <div className="desc">
                  <span>lenses</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/lenses" >View</Link>
                  </button>
                </div>
              </div>
              <div className="block-bg"></div>
            </div>

            <div className="block-el">
              <div className="block-content">
                <p id="lighting"></p>
                <div className="desc">
                  <span>lighting</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/lighting" >View</Link>
                  </button>
                </div>
              </div>
              <div className="block-bg"></div>
            </div>

            <div className="block-el">
              <div className="block-content">
                <p id="audio"></p>
                <div className="desc">
                  <span>Audio</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/audio" >View</Link>
                  </button>
                </div>
              </div>
              <div className="block-bg"></div>
            </div>

            <div className="block-el">
              <div className="block-content">
                <p id="tripods_stabilization_rigs"></p>
                <div className="desc">
                  <span>Tripods Stabilization & Rigs</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/TS&R" >View</Link>
                  </button>
                </div>
              </div>
              <div className="block-bg"></div>
            </div>

            <div className="block-el">
              <div className="block-content">
                <p id="camera_accessories"></p>
                <div className="desc">
                  <span>Camera Accessories</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/camera_accessories" >View</Link>
                  </button>
                </div>
              </div>
              <div className="block-bg"></div>
            </div>

            <div className="block-el">
              <div className="block-content">
                <p id="studio_spaces"></p>
                <div className="desc">
                  <span>Studio Spaces</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/studio_spaces" >View</Link>
                  </button>
                </div>
              </div>
              <div className="block-bg"></div>
            </div>

            <div className="block-el">
              <div className="block-content">
                <p id="office_spaces"></p>
                <div className="desc">
                  <span>Office Spaces</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/office_spaces" >View</Link>
                  </button>
                </div>
              </div>
              <div className="block-bg"></div>
            </div>
          <div className="clearfix mb-4"></div>

          </Container>

          { cat.newArrivals && cat.newArrivals.Items ?
          <div className="new_arrival">
            <div className="section-overlay">
              <Container>
                <Row>
                  <Col sm="3" className="align-self-center">
                    <h3 className="mb-4">New Arrivals</h3>
                    <img src={'/images/calander.jpg'} alt="" className="w-100" />
                    <button className="theme-btn theme-btn-primary w-100">
                      <Link to="/listGear">
                        <span></span>
                        Find Gear
                      </Link>
                    </button>
                  </Col>
                  <Col sm={{ size: 8, offset: 1 }}>
                    <Row >
                      {
                        cat.newArrivals.Items.map((item, index) => {
                          return <Col sm="6" key={index}>
                            <ThemeCardOne Gear={item} />
                          </Col>
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
                      <ThemeCardTwo story={item} />
                    </Col>
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
          <div className="payments">
            <img src="/images/temp.jpg" alt="" />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ app }) => {
  return {
    app
  }
}
export default connect(mapStateToProps )(Home);
