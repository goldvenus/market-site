import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Flickity from 'react-flickity-component';
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

import data from '../../components/dummydata';
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
    const flickityOptions = {
      contain: true,
      // disable previous & next buttons and dots
      prevNextButtons: false,
      pageDots: false
    };
  // const flickityOptions2 = {
  //   contain: true,
  //   // able previous & next buttons and dots
  //   prevNextButtons: true,
  //   pageDots: true,
  //   draggable: false
  // }

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
                <Link to="/rentgear/Cameras">
                <div className="block-content">
                  <p id="camera"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>CAMERA</span>
                  </div>
                </div>
                <div className="block-bg"/>
                </Link>
              </div>

              <div className="block-el block-e1-size col animation-element slide-left testimonial">
                <Link to="/rentgear/Computers">
                <div className="block-content">
                  <p id="computer_electronic"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>COMPUTER & ELECTRONICS</span>
                  </div>
                </div>
                <div className="block-bg"/>
                </Link>
              </div>

              <div className="block-el block-e1-size col animation-element slide-left testimonial">
                <Link to="/rentgear/Drones">
                <div className="block-content ">
                  <p id="drones"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>DRONES</span>
                  </div>
                </div>
                <div className="block-bg"/>
                </Link>
              </div>
            </div>

            <div className="row">
              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <Link to="/rentgear/CameraLenses">
                  <div className="block-content">
                  <p id="lenses"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>LENSES</span>
                  </div>
                </div>
                <div className="block-bg"/>
                </Link>
              </div>

              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <Link to="/rentgear/Lightings">
                <div className="block-content">
                  <p id="lighting"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>LIGHTING</span>
                  </div>
                </div>
                <div className="block-bg"/>
                </Link>
              </div>
              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <Link to="/rentgear/Audios">
                <div className="block-content">
                  <p id="audio"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>AUDIO</span>
                  </div>
                </div>
                <div className="block-bg"/>
                </Link>
              </div>

              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <Link to="/rentgear/TS&R">
                <div className="block-content">
                  <p id="tripods_stabilization_rigs"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>TRIPODS STABILIZATION & RIGS</span>
                  </div>
                </div>
                <div className="block-bg"/>
                </Link>
              </div>
            </div>

            <div className="row">
              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <Link to="/rentgear/CameraAccessories">
                  <div className="block-content">
                    <p id="camera_accessories"/>
                    <div className="desc">
                      <span style={{ fontWeight: 'bold' }}>CAMERA ACCESSORIES</span>
                    </div>
                  </div>
                  <div className="block-bg"/>
                </Link>
              </div>

              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <Link to="/rentgear/StudioSpaces">
                  <div className="block-content">
                    <p id="studio_spaces"/>
                    <div className="desc">
                      <span style={{ fontWeight: 'bold' }}>STUDIO SPACES</span>
                    </div>
                  </div>
                  <div className="block-bg"/>
                </Link>
              </div>

              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <Link to="/rentgear/OfficeSpaces">
                  <div className="block-content">
                    <p id="office_spaces"/>
                    <div className="desc">
                      <span style={{ fontWeight: 'bold' }}>OFFICE SPACES</span>
                    </div>
                  </div>
                  <div className="block-bg"/>
                </Link>
              </div>
              <div className="block-el block-e2-size col animation-element slide-left testimonial">
                <Link to="/rentgear/Other">
                <div className="block-content">
                  <p id="others"/>
                  <div className="desc">
                    <span style={{ fontWeight: 'bold' }}>OTHER</span>
                  </div>
                </div>
                <div className="block-bg"/>
                </Link>
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
                      <Link to="/rentgear/Camera"><i className="fa fa-chevron-right"/></Link>
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
                        <Link to="/rentgear/Computer"><i className="fa fa-chevron-right"/></Link>
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
                        <Link to="/rentgear/Drones"><i className="fa fa-chevron-right"/></Link>
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
                        <Link to="/rentgear/CameraLenses"><i className="fa fa-chevron-right"/></Link>
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
                        <Link to="/rentgear/CameraAccessories"><i className="fa fa-chevron-right"/></Link>
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
                        <Link to="/rentgear/OfficeSpaces"><i className="fa fa-chevron-right"/></Link>
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
                        <Link to="/rentgear/OfficeSpaces"><i className="fa fa-chevron-right"/></Link>
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
            <div className="faq-background-img"/>
            <div className="container">
              <div className="faq-left">
                <div className="faq-form">
                  <h2 className="arrival-timer-title">
                      FAQs
                  </h2>
                  <div className="faq-wrapper">
                    <div>
                      <p>Got questions? Our FAQ pages will most likely have the answers.
                      If not make sure to submit your question through the form so we can
                      get back to you right away!</p>
                    </div>
                    <div>
                      <Link to="/FAQ">
                        <button className="theme-btn theme-btn-primary"><i className="fa fa-search"/>&nbsp;&nbsp;View FAQs</button>
                      </Link>
                    </div>
                  </div>
                </div>

                  {/*<div className="arrival-timer-frame">*/}
                    {/*<div className="arrival-timer-slot-row">*/}
                      {/*<div className="arrival-timer-slot">*/}
                        {/*<span className="slot-heading">Daily</span>*/}
                        {/*<span className="slot-value">11</span>*/}
                      {/*</div>*/}
                      {/*<div className="arrival-timer-slot">*/}
                        {/*<span className="slot-heading">Weekly</span>*/}
                        {/*<span className="slot-value">40</span>*/}
                      {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="arrival-timer-slot-row">*/}
                      {/*<div className="arrival-timer-slot">*/}
                        {/*<span className="slot-heading">Monthly</span>*/}
                        {/*<span className="slot-value">221</span>*/}
                      {/*</div>*/}
                      {/*<div className="arrival-timer-slot">*/}
                        {/*<span className="slot-heading">Yearly</span>*/}
                        {/*<span className="slot-value">1405</span>*/}
                      {/*</div>*/}
                    {/*</div>*/}
                      {/*<div className="arrival-timer-find-btn"><Link to='/rentgear/all'>Find Gear</Link></div>*/}
                  {/*</div>*/}
                </div>

                <div className="arrival-items">
                  <div className="arrival-items-inner-wrapper">
                    {/*<Flickity*/}
                      {/*className={'carousel'}        // default ''*/}
                      {/*elementType={'div'}           // default 'div'*/}
                      {/*options={flickityOptions}     // takes flickity options {}*/}
                      {/*disableImagesLoaded={false}   // default false*/}
                      {/*reloadOnUpdate                // default false*/}
                    {/*>*/}
                      {data.faqs.map((val, key) => (
                        <ArrivalItem itemIndex={key} key={key} {...val}/>
                      ))}
                    {/*</Flickity>*/}
                  </div>
                </div>
            </div>
            {/*<div className="arrival-items-glow"/>*/}
          </div>

          <div className="home-new-arrival d-inline d-lg-none slider-2">
            <Flickity
                className={'carousel'}        // default ''
                elementType={'div'}           // default 'div'
                options={flickityOptions}     // takes flickity options {}
                disableImagesLoaded={false}   // default false
                reloadOnUpdate                // default false
              >
              {data.faqs.map((val, key) => (
                <div key={key} className="arrival-items arrival-items-inner-wrapper"><ArrivalItem {...val} itemIndex='0'/></div>
              ))}
            </Flickity>
            <div className="arrival-timer-frame arrival-timer-find-btn custom-button-find"><i className="fa fa-search" /> FAQ</div>
          </div>

          {/*<div className="stories d-none d-lg-block">*/}
            {/*<Container>*/}
              {/*<Row>*/}
                {/*<Col>*/}
                  {/*<h2 className="text-center mb-5">Stories</h2>*/}
                {/*</Col>*/}
              {/*</Row>*/}
              {/*<Row>*/}
                {/*{*/}
                  {/*data.stories.map((item, index) => {*/}
                    {/*return <Col sm="8" key={index}>*/}
                      {/*<ThemeCardTwo story={item}/>*/}
                    {/*</Col>;*/}
                  {/*})*/}
                {/*}*/}
              {/*</Row>*/}
              {/*<Row>*/}
                {/*<Col className="text-center">*/}
                  {/*<button className="theme-btn theme-btn-primary mt-5">*/}
                    {/*View All*/}
                  {/*</button>*/}
                {/*</Col>*/}
              {/*</Row>*/}
            {/*</Container>*/}
          {/*</div>*/}
          {/*<div className="stories d-bloke d-lg-none slider-3">*/}
            {/*<Container>*/}
              {/*<Row>*/}
                {/*<Col>*/}
                  {/*<h2 className="text-center mb-5">Stories</h2>*/}
                {/*</Col>*/}
              {/*</Row>*/}
              {/*<Flickity*/}
              {/*className={'carousel'} // default ''*/}
              {/*elementType={'div'} // default 'div'*/}
              {/*options={flickityOptions2} // takes flickity options {}*/}
              {/*disableImagesLoaded={false} // default false*/}
              {/*reloadOnUpdate // default false*/}
            {/*>*/}

              {/*{*/}
                {/*data.stories.map((item, index) => {*/}
                  {/*return <div className="slide" key={index}>*/}
                    {/*<Row sm="8">*/}
                      {/*<ThemeCardTwo story={item}/>*/}
                    {/*</Row>*/}
                  {/*</div>*/}
                {/*})*/}
              {/*}*/}

              {/*</Flickity>*/}
              {/*<Row>*/}
                {/*<Col className="text-center">*/}
                  {/*<button className="mt-5 custom-button-find">*/}
                    {/*View All*/}
                  {/*</button>*/}
                {/*</Col>*/}
              {/*</Row>*/}
            {/*</Container>*/}
          {/*</div>*/}

          <Row className="paySection">
            <div className="container">
              <Col className="paySection2-container">
                  <div>
                      <div className="paySection2">
                          <img style={{ width: 101, height: 118 }} src={'/images/Icons/Stages/Choose-Gear.png'} alt="drone"/>
                          <div style={{ alignSelf: 'center' }}>
                              <div>
                                  <span style={{ fontWeight: 'bold',fontSize:18 }}>CHOOSE GEAR</span>
                              </div>
                              <div>
                                  <span style={{ fontSize: 16 }}>Find the gear you need and add to cart.</span>
                              </div>
                          </div>
                      </div>
                      <div className="paySection2">
                          <img style={{ width: 101, height: 118 }} src={'/images/Icons/Stages/Pay.png'} alt="drone"/>
                          <div style={{ alignSelf: 'center' }}>
                              <div>
                                  <span style={{ fontWeight: 'bold',fontSize:18 }}>PAY</span>
                              </div>
                              <div>
                                  <span style={{ fontSize: 16 }}>Securely checkout via PayPal or Card</span>
                              </div>
                          </div>
                      </div>
                      <div className="paySection2">
                          <img style={{ width: 101, height: 118 }} src={'/images/Icons/Stages/Enjoy.png'} alt="drone"/>
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
              <Col className="paySection1">
                <div className="pay-container">
                  <h2 className="pay-section-title">
                    Renting is fast, <br/>safe and secure
                  </h2>

                  <p className="pay-section1__desc">
                    Creative Market requires owners and renters to verify the condition of each item, both when picked up and returned.
                    Making disputes easier to solve!
                  </p>

                  <div className="pay-section1__cta">
                    <Link to="/rentgear">
                      <button className="faq-button theme-btn theme-btn-primary">
                        <span>Rent Gear</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </Col>
            </div>
            <div className="pay-section-back-img"/>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.category.categories,
});

export default connect(mapStateToProps)(Home);
