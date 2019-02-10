import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form, ListGroup, ListGroupItem } from 'reactstrap';
import CustomInput from './CustomInput';
import ThemeCardOne from './Theme-Cards/ThemeCardOne';
import ThemeCardTwo from './Theme-Cards/ThemeCardTwo';
import data from './dummydata';
import { fetchCategories, search, newArrivals } from '../actions/app.actions';


class Home extends Component {
  constructor() {
    super();

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
      categories : []
    }

    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount(){
    fetchCategories();
    newArrivals();
  }

  onSearchTextChange(value) {
    if(value) {
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

    if(searchText && locationText) {
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
          </Container>
          <div className="clearfix mb-4"></div>
          {/* <Container>
            <Row className="theme-row">
              <div sm="4" className="theme-col theme-col-1">
                <div className="wrapper">
                  <p id="camera"></p>
                  <div className="desc">
                    <span>Camera</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/cameras" >View</Link>
                    </button>
                  </div>
                </div>
              </div>
              <div sm="4" className="theme-col theme-col-2">
                <div className="wrapper">

                  <p id="computer_electronic"></p>
                  <div className="desc">
                    <span>Computer & Electronics</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/computer&electronics" >View</Link>
                    </button>
                  </div>
                </div>
              </div>
              <div sm="4" className="theme-col theme-col-3">
                <div className="wrapper">
                  <p id="drones"></p>
                  <div className="desc">
                    <span>Drones</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/drones" >View</Link>
                    </button>
                  </div>
                </div>
              </div>
            </Row>
            <Row className="theme-row">
              <Col sm="4" className="theme-col">
                <p id="lenses"></p>
                <div>
                  <span>Lenses</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/Lenses" >View</Link>
                  </button>
                </div>
              </Col>
              <Col sm="4" className="theme-col">
                <p id="lighting"></p>
                <div>
                  <span>Lighting</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/Lighting" >View</Link>
                  </button>
                </div>
              </Col>
              <Col sm="4" className="theme-col">
                <p id="audio"></p>
                <div>
                  <span>Audio</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/Audio" >View</Link>
                  </button>
                </div>
              </Col>
            </Row>
            <Row className="theme-row">
              <Col sm="4" className="theme-col">
                <p id="tripods_stabilization_rigs"></p>
                <div>
                  <span>Tripods Stabilization & Rigs</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/TS&R" >View</Link>
                  </button>
                </div>
              </Col>
              <Col sm="4" className="theme-col">
                <p id="camera_accessories"></p>
                <div>
                  <span>Camera Accessories</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/camera_accessories">View</Link>
                  </button>
                </div>
              </Col>
              <Col sm="4" className="theme-col">
                <p id="studio_spaces"></p>
                <div>
                  <span>Studio Spaces</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/studio_spaces" >View</Link>
                  </button>
                </div>
              </Col>
            </Row>
            <Row className="theme-row">
              <Col sm="4" className="theme-col">
                <p id="office_spaces"></p>
                <div>
                  <span>Office Spaces</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/office_spaces" >View</Link>
                  </button>
                </div>
              </Col>
              <Col sm="4" className="theme-col">
                <p id="others"></p>
                <div>
                  <span>others</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/others" >View</Link>
                  </button>
                </div>
              </Col>
            </Row>
          </Container> */}

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
