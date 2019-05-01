import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Flickity from 'react-flickity-component';
import { fetchCategories } from "../../core/actions/category.action";
import { socialLogin } from '../../core/actions/user.action';
import { newArrivals } from '../../core/actions/gear.action'
import MaterialInputWithDropdown from '../../MaterialInputWithDropdown';

import imgLogo from './images/logo.png';
import {
  IconBtnCamera,
  IconBtnDrone,
  IconBtnLight,
  IconSearch,
} from './images/index';

import data from '../../components/dummydata';
import ThemeCardTwo from '../../components/Theme-Cards/ThemeCardTwo';
import ArrivalItem from './ArrivalItem';
import $ from 'jquery';


class Home extends React.Component {
  state = {
    searchValue: '',
    searchResult: [],
    searchLocationValue: '',
    searchLocationResult: [],
  };


  handleChangeSearchValue = e => {
    this.setState({
      searchValue: (e && e.target && e.target.value) || '',
    });
  };

  handleChangeSearchLocation = e => {
    this.setState({
      searchLocationValue: (e && e.target && e.target.value) || '',
    });
  };

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


  render() {
    const {
      searchValue,
      searchLocationValue,
    } = this.state;

    const {
      categories
    } = this.props;

    let searchResult = [];
    if (categories && categories.length) {
      const pattern = new RegExp(searchValue, 'ig');
      const suggestions = (this.props.categories || []).map(cat => cat.categoryName);
      searchResult = suggestions.filter((s) => s.search(pattern) > -1);
    }
    const flickityOptions = {
      contain: true,
      // disable previous & next buttons and dots
      prevNextButtons: false,
      pageDots: false
  }
  const flickityOptions2 = {
    contain: true,
    // able previous & next buttons and dots
    prevNextButtons: true,
    pageDots: true,
    draggable: false


}

    return (

      <div className="page home-page home">
        <div className="section section-hero">
          <div className="container">

            <div className="row">
              <div className="col d-flex flex-column">
                <img className="hero-logo" src={imgLogo} alt="Creative Market"/>

                <h1 className="hero-title">
                  Find <br className="d-md-none d-block"/> Creative Tools Around You
                </h1>

                <span className="hero-subtitle">
                  Creative market <br className="d-md-none d-block"/> is a community <b>for creators, by creators</b>.
                </span>

                <div className="hero-categories d-none d-md-flex">
                  Rent&nbsp;
                  <button className="hero-categories__btn">
                    <IconBtnCamera className="btn__icon"/>
                    Cameras
                  </button>
                  <button className="hero-categories__btn">
                    <IconBtnDrone className="btn__icon"/>
                    Drones
                  </button>
                  <button className="hero-categories__btn">
                    <IconBtnLight className="btn__icon"/>
                    Drones
                  </button>
                  <span className="d-lg-none">and more</span>
                  <span className="d-none d-lg-inline-block">and more from people around you.</span>
                </div>

                <div className="hero-searches">
                  <div className="search-inputs-group">
                    <div className="search-wrapper">
                      <MaterialInputWithDropdown
                        label="Search"
                        noHelp
                        value={searchValue}
                        onChange={this.handleChangeSearchValue}
                        dropdownItems={searchResult}
                        dropdownAddons={<div className="search-addon">
                          <div className="search-addon-item">
                            <span>{searchValue} in Cameras ></span>
                          </div>
                          <div className="search-addon-item">
                            <span>{searchValue} in Lenses ></span>
                          </div>
                        </div>}
                      />
                    </div>

                    <div className="location-search-wrapper">
                      <MaterialInputWithDropdown
                        label="Location"
                        noHelp
                        value={searchLocationValue}
                        onChange={this.handleChangeSearchLocation}
                      />
                    </div>
                  </div>

                  <button className="search-btn">
                    <IconSearch className="d-none d-lg-block"/>
                    <span className="d-lg-none">
                      Search
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>


        <div className="home-body">
          {/* cards container for the large screen */}
          <Container className="d-none d-lg-block">
            <div className="row">
              <div className="block-el block-e1-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="camera"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>CAMERA</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/cameras">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"/>
              </div>

              <div className="block-el block-e1-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="computer_electronic"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>COMPUTER & ELECTRONICS</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/cameras">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"/>
              </div>

              <div className="block-el block-e1-size col animation-element slide-left testimonial">
                <div className="block-content ">
                  <p id="drones"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>DRONES</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/cameras">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"/>
              </div>
            </div>

            <div className="row">
              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="lenses"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>LENSES</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/lenses">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"/>
              </div>

              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="lighting"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>LIGHTING</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/lighting">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"/>
              </div>
              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="audio"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>AUDIO</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/audio">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"/>
              </div>

              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="tripods_stabilization_rigs"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>TRIPODS STABILIZATION & RIGS</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/TS&R">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"/>
              </div>
            </div>

            <div className="row">
              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="camera_accessories"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>CAMERA ACCESSORIES</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/camera_accessories">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"/>
              </div>

              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="studio_spaces"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>STUDIO SPACES</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/studio_spaces">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"/>
              </div>

              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="office_spaces"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>OFFICE SPACES</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/office_spaces">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"/>
              </div>
              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <div className="block-content">
                  <p id="others"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>OTHER</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/office_spaces">View</Link>
                    </button>
                  </div>
                </div>
                <div className="block-bg"/>
              </div>
            </div>

            <div className="clearfix mb-4"/>

          </Container>
          {/* slider container for the tablet and mobile screen */}
          <Container className="d-block d-lg-none slider-1">
            <Flickity
              className={'carousel'} // default ''
              elementType={'div'} // default 'div'
              options={flickityOptions} // takes flickity options {}
              disableImagesLoaded={false} // default false
              reloadOnUpdate // default false
            >
              <div className="am">
                <div className="block-content">
                <p id="camera"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>CAMERA</span>
                    <button className="theme-btn theme-btn-outline-white">
                      <Link to="/cameras"><i className="fa fa-chevron-right"></i></Link>
                      </button>
                    </div>
                  </div>
              </div>
              <div className="am">
               <div className="block-content">
                    <p id="computer_electronic"/>
                    <div className="desc">
                      <span style={{ fontWeight: 'bold' }}>COMPUTER & ELECTRONICS</span>
                      <button className="theme-btn theme-btn-outline-white">
                        <Link to="/cameras"><i className="fa fa-chevron-right"></i></Link>
                      </button>
                    </div>
                  </div>
                  </div>
                  <div className="am">
                    <div className="block-content">
                    <p id="drones"/>
                    <div className="desc">
                      <span style={{ fontWeight: 'bold' }}>DRONES</span>
                      <button className="theme-btn theme-btn-outline-white">
                        <Link to="/cameras"><i className="fa fa-chevron-right"></i></Link>
                      </button>
                    </div>
                  </div>
                  </div>
                  <div className="am">
                    <div className="block-content">
                    <p id="lenses"/>
                    <div className="desc">
                      <span style={{ fontWeight: 'bold' }}>LENSES</span>
                      <button className="theme-btn theme-btn-outline-white">
                        <Link to="/lenses"><i className="fa fa-chevron-right"></i></Link>
                      </button>
                    </div>
                  </div>
                  </div>
                  <div className="am">
                    <div className="block-content">
                    <p id="camera_accessories"/>
                    <div className="desc">
                      <span style={{ fontWeight: 'bold' }}>CAMERA ACCESSORIES</span>
                      <button className="theme-btn theme-btn-outline-white">
                        <Link to="/camera_accessories"><i className="fa fa-chevron-right"></i></Link>
                      </button>
                    </div>
                  </div>
                  </div>
                  <div className="am">
                    <div className="block-content">
                    <p id="office_spaces"/>
                    <div className="desc">
                      <span style={{ fontWeight: 'bold' }}>OFFICE SPACES</span>
                      <button className="theme-btn theme-btn-outline-white">
                        <Link to="/office_spaces"><i className="fa fa-chevron-right"></i></Link>
                      </button>
                    </div>
                  </div>
                  </div>
                  <div className="am">
                    <div className="block-content">
                    <p id="others"/>
                    <div className="desc">
                      <span style={{ fontWeight: 'bold' }}>OTHER</span>
                      <button className="theme-btn theme-btn-outline-white">
                        <Link to="/office_spaces"><i className="fa fa-chevron-right"></i></Link>
                      </button>
                    </div>
                  </div>
                  </div>

            </Flickity>
            <div className="clearfix mb-4"/>
          </Container>

          {/*
          {cat.newArrivals && cat.newArrivals.Items ?
            <div className="new_arrival">
              <div className="section-overlay">
                <Container>
                  <Row>
                    <Col sm="6" className="align-self-center">
                      <h3 className="mb-4">New Arrivals</h3>
                      <div className="calendarSection">
                        <Col>
                          <div style={{ width: 120, height: 115, backgroundColor: 'rgba(255, 254, 254, 0.8)' }}>
                            <div style={{ paddingTop: 31 }}>
                              <span style={{ fontSize: 13 }}>Daily</span>
                            </div>
                            <div>
                              <span style={{ fontSize: 25, fontWeight: 'bold' }}>11</span>
                            </div>
                          </div>
                          <div style={{
                            width: 120,
                            height: 115,
                            marginTop: 5,
                            backgroundColor: 'rgba(255, 254, 254, 0.8)'
                          }}>
                            <div style={{ paddingTop: 31 }}>
                              <span style={{ fontSize: 13 }}>Weekly</span>
                            </div>
                            <div>
                              <span style={{ fontSize: 25, fontWeight: 'bold' }}>41</span>
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
                              <span style={{ fontSize: 13 }}>Monthly</span>
                            </div>
                            <div>
                              <span style={{ fontSize: 25, fontWeight: 'bold' }}>220</span>
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
                              <span style={{ fontSize: 13 }}>Yearly</span>
                            </div>
                            <div>
                              <span style={{ fontSize: 25, fontWeight: 'bold' }}>1400</span>
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
                    <Col sm={{ size: 16, offset: 2 }}>
                      <Row>
                        {
                          cat.newArrivals.Items.map((item, index) => {
                            return <Col sm="12" key={index}>
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
          */}

          <div className="home-new-arrival d-none d-lg-flex">
            <div className="arrival-timer">
              <h2 className="arrival-timer-title">
                New arrivals
              </h2>

              <div className="arrival-timer-frame">
                <div className="arrival-timer-slot-row">
                  <div className="arrival-timer-slot">
                    <span className="slot-heading">Daily</span>
                    <span className="slot-value">11</span>
                  </div>
                  <div className="arrival-timer-slot">
                    <span className="slot-heading">Weekly</span>
                    <span className="slot-value">40</span>
                  </div>
                </div>
                <div className="arrival-timer-slot-row">
                  <div className="arrival-timer-slot">
                    <span className="slot-heading">Monthly</span>
                    <span className="slot-value">221</span>
                  </div>
                  <div className="arrival-timer-slot">
                    <span className="slot-heading">Yearly</span>
                    <span className="slot-value">1405</span>
                  </div>
                </div>
                <div className="arrival-timer-find-btn">Find Gear</div>
              </div>
            </div>

            <div className="arrival-items">
              <div className="arrival-items-inner-wrapper">
                {data.arrivals.map((val, key) => (
                  <ArrivalItem key={key} {...val}/>
                ))}
              </div>
              <div className="arrival-items-glow"/>
            </div>
          </div>

          <div className="home-new-arrival d-inline d-lg-none slider-2">
          <Flickity
              className={'carousel'} // default ''
              elementType={'div'} // default 'div'
              options={flickityOptions} // takes flickity options {}
              disableImagesLoaded={false} // default false
              reloadOnUpdate // default false
            >
                {data.arrivals.map((val, key) => (
                  <div key={key} className="arrival-items arrival-items-inner-wrapper"><ArrivalItem {...val}/></div>
                ))}

            </Flickity>
            <div className="arrival-timer-frame arrival-timer-find-btn custom-button-find"><i className="fa fa-search" ></i> Find Gear</div>
          </div>

          <div className="stories d-none d-lg-block">
            <Container>
              <Row>
                <Col>
                  <h2 className="text-center mb-5">Stories</h2>
                </Col>
              </Row>
              <Row>
                {
                  data.stories.map((item, index) => {
                    return <Col sm="8" key={index}>
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
          <div className="stories d-bloke d-lg-none slider-3">
            <Container>
              <Row>
                <Col>
                  <h2 className="text-center mb-5">Stories</h2>
                </Col>
              </Row>
              <Flickity
              className={'carousel'} // default ''
              elementType={'div'} // default 'div'
              options={flickityOptions2} // takes flickity options {}
              disableImagesLoaded={false} // default false
              reloadOnUpdate // default false
            >

              {
                data.stories.map((item, index) => {
                  return <div className="slide" key={index}>
                    <Row sm="8">
                      <ThemeCardTwo story={item}/>
                    </Row>
                  </div>
                })
              }

              </Flickity>
              <Row>
                <Col className="text-center">
                  <button className="mt-5 custom-button-find">
                    View All
                  </button>
                </Col>
              </Row>
            </Container>
          </div>

          <Row className="paySection">
            <Col xs={24} sm={24} md={12} className="paySection1">
              <h2 className="pay-section1__title">
                Fast, safe and secure<br/>Two-way inscurance included
              </h2>

              <span className="pay-section1__desc">
                Creative Market’s photo verification system verifies the condition of items when picked up and returned. Both by owner and renter.
              </span>

              <div className="pay-section1__cta">
                <button className="faq-button">
                  <span>FAQ</span>
                </button>
              </div>
            </Col>


            <Col xs={24} sm={24} md={12}>
              <div style={{ marginTop: 54, width: "90%", marginBottom:40 }}>
                <div className="paySection2">
                  <img style={{ width: 101, height: 118 }} src={'/images/Icons/Stages/Choose-Gear.svg'} alt="drone"/>
                  <div style={{ alignSelf: 'center' }}>
                    <div>
                      <span style={{ fontWeight: 'bold',fontSize:18 }}>CHOOSE GEAR</span>
                    </div>
                    <div>
                      <span style={{ fontSize: 16 }}>Find the gear you need and add to cart.</span>
                    </div>
                  </div>
                </div>
                <div className="paySection2" style={{ marginTop: 40 }}>
                  <img style={{ width: 101, height: 118 }} src={'/images/Icons/Stages/Pay.svg'} alt="drone"/>
                  <div style={{ alignSelf: 'center' }}>
                    <div>
                      <span style={{ fontWeight: 'bold',fontSize:18 }}>PAY</span>
                    </div>
                    <div>
                      <span style={{ fontSize: 16 }}>Complete secure payment via 2checkout</span>
                    </div>
                  </div>
                </div>
                <div className="paySection2" style={{ marginTop: 46 }}>
                  <img style={{ width: 101, height: 118 }} src={'/images/Icons/Stages/Enjoy.svg'} alt="drone"/>
                  <div style={{ alignSelf: 'center' }}>
                    <div>
                      <span style={{ fontWeight: 'bold',fontSize:18 }}>ENJOY</span>
                    </div>
                    <div>
                      <span style={{ fontSize: 16 }}>Pick up the gear and start creating!</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.app.categories,
});

export default connect(mapStateToProps)(Home);
