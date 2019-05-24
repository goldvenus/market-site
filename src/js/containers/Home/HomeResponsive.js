import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { socialLogin } from '../../core/actions/user.action';
import { newArrivals } from '../../core/actions/gear.action'
import MaterialInputWithDropdown from '../../components/common/MaterialInputWithDropdown';

import imgLogo from './images/logo.png';
import {
  IconBtnCamera,
  IconBtnDrone,
  IconBtnLight,
  IconSearch,
} from './images/index';
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
    let $animation_elements = $('.animation-element');
    let $window = $(window);

    function check_if_in_view() {
      let window_height = $window.height();
      let window_top_position = $window.scrollTop();
      let window_bottom_position = (window_top_position + window_height);

      $.each($animation_elements, function () {
        let $element = $(this);
        let element_height = $element.outerHeight();
        let element_top_position = $element.offset().top;
        let element_bottom_position = (element_top_position + element_height);

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

    newArrivals();

    //facebook login
    let href = window.location.href;
    if (href.indexOf('id_token') > 0) {
      let token1 = href.split('#')[1].split('&')[0];
      let token2 = href.split('#')[1].split('&')[1];
      let idToken, accesstoken;

      if (token1.indexOf('id_token') > 0) {
        idToken = token1.replace('id_token=', '');
        accesstoken = token2.replace('access_token=', '');
      } else {
        accesstoken = token1.replace('access_token=', '');
        idToken = token2.replace('id_token=', '');
      }

      socialLogin(idToken, accesstoken);
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

    return (
      <div className="page home-page home">
        <div className="section section-hero">
          <div className="container">

            <div className="row">
              <div className="col d-flex flex-column">
                <img className="hero-logo" src={imgLogo} alt="Creative Market"/>

                <h1 className="hero-title">
                  Rent Creative Gear<br className="d-md-none d-block"/> Close By
                </h1>

                <span className="hero-subtitle">
                  A secure rental community <br className="d-md-none d-block"/> <b>for creators, by creators.</b>
                </span>

                <div className="hero-categories d-none d-md-flex">
                  Rent&nbsp;
                  <Link to="/rentgear/Cameras">
                    <button className="hero-categories__btn">
                      <IconBtnCamera className="btn__icon"/>
                      Cameras
                    </button>
                  </Link>
                  <Link to="/rentgear/Drones">
                    <button className="hero-categories__btn">
                      <IconBtnDrone className="btn__icon"/>
                      Drones
                    </button>
                  </Link>
                  <Link to="/rentgear/Lightings">
                    <button className="hero-categories__btn">
                      <IconBtnLight className="btn__icon"/>
                      Lights
                    </button>
                  </Link>
                  <Link to="/rentgear/all">
                    <button className="hero-categories__btn">
                      See all..
                    </button>
                  </Link>
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
          <Container>
            <Row className='home-subsection'>
              <Col lg='12' md='24' className='order-lg-1 order-md-2'>
                <h2>Rent the Gear<br/>Your Ideas Need</h2>
                <p>If you love creating, you are most likely familiar with the problem of feeling limited by your gear. With Creative Market, you can now rent any gear you might need from other creatives around you.</p>
                <Link to='/rentgear'><button className='theme-btn theme-btn-primary'>RENT GEAR</button></Link>
              </Col>
              <Col lg='12' md='24' className='rent-gear-back-img back-img order-lg-2 order-md-1'/>
            </Row>
            <Row className='home-subsection'>
              <Col lg='12' md='24' className='add-gear-back-img back-img'/>
              <Col lg='12' md='24'>
                <h2>List Your Own<br/>Gear for Rent</h2>
                <p>When you’re not renting from others, allow others to rent from you. Making your fancy gear work for you, even when you’re not using it yourself. It’s a win-win situation!</p>
                <Link to='/addgear'><button className='theme-btn theme-btn-primary'>ADD GEAR</button></Link>
              </Col>
            </Row>
            <Row className='home-subsection'>
              <Col lg='12' md='24' className='order-lg-1 order-md-2'>
                <h2>Secure Worldwide<br/>Rental Community</h2>
                <p>Every member of Creative Market must be verified through our platform before engaging in rentals. Renters must complete payments before gear pickup takes place, and funds are securely held in escrow until owner and renter have both confirmed that the handoff has taken place.</p>
                <Link to='/register'><button className='theme-btn theme-btn-primary'>SIGN UP</button></Link>
              </Col>
              <Col lg='12' md='24' className='secure-back-img back-img order-lg-2 order-md-1'/>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.category.categories,
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(Home);
