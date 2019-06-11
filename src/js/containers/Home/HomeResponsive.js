import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { socialLogin } from '../../core/actions/user.action';
import MaterialInputWithDropdown from '../../components/common/MaterialInputWithDropdown';

import {
  IconBtnCamera,
  IconBtnDrone,
  IconBtnLight,
  IconSearch,
} from './images/index';
import $ from 'jquery';
import {getGearsBriefInfo} from "../../core/actions/gear.action";

class Home extends React.Component {
  constructor(props) {
    super(props);
    
    this._mounted = false;
    this.state = {
      searchValue: '',
      searchResult: [],
      searchLocationValue: '',
      searchLocationResult: [],
    };
  
    getGearsBriefInfo();
    this.gearList = [];
    this.productList = [];
    this.categoryList = [];
    this.locationList = [];
    this.timer = null;
  }
  
  async componentDidMount() {
    this._mounted = true;
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
  
  componentWillReceiveProps(props) {
    if (props.briefGearList !== this.gearList) {
      this.gearList = props.briefGearList;
    }
  }
  
  componentWillUnmount() {
    this._mounted = false;
  }
  
  performSearch = () => {
    this.productList = this.categoryList = this.locationList = [];
    let key1 = this.state.searchValue.toLowerCase();
    let key2 = this.state.searchLocationValue.toLowerCase();

    if (!key1 && !key2) return;

    let gearList1 = (this.gearList || []).filter(item =>
      (item.productName && item.productName.toLowerCase().indexOf(key1) === 0));

    // let gearList2 = (this.gearList || []).filter(item =>
    //   ((item.city.toLowerCase().indexOf(key2) === 0 || item.address.toLowerCase().indexOf(key2) === 0) || item.product_region.toLowerCase().indexOf(key2) === 0));
    let gearList2 = (this.gearList || []).filter(item =>
      ((item.city.toLowerCase().indexOf(key2) === 0 || item.address.toLowerCase().indexOf(key2) === 0)));
  
    gearList1.forEach((item) => {
      this.productList = [...this.productList, item.productName];
      // this.categoryList = [...this.categoryList, item.categoryName];
    });
    gearList2.forEach((item) => {
      this.locationList = [...this.locationList, item.city + ', ' + item.address];
    });
    
    this._mounted && this.forceUpdate();
  };
  
  handleChangeSearchValue = (e) => {
    this._mounted && this.setState({
      searchValue: (e && e.target && e.target.value) || ''
    });
    
    clearTimeout(this.timer);
    this.timer = this.performSearch();
  };

  handleChangeSearchLocation = (e) => {
    this._mounted && this.setState({
      searchLocationValue: (e && e.target && e.target.value) || ''
    });
  
    clearTimeout(this.timer);
    this.timer = this.performSearch();
  };
  
  handleSearch = () => {
    let {searchValue, searchLocationValue} = this.state;
    localStorage.searchValue = searchValue;
    localStorage.searchLocationValue = searchLocationValue;

    if (!(searchValue || searchLocationValue)) {
      return;
    }
    this.props.history.push('/rent-gear?type=all');
  };
  
  // renderSearchAddOn = () => {
  //   return (
  //     <div className="search-addon">
  //       <div className="search-brand-category-wrapper">
  //         {
  //           this.categoryList.length > 0 && this.categoryList.map((item, key) => (
  //             <div className="search-category-item" key={key}>
  //               <span>{this.state.searchValue} in {item} ></span>
  //             </div>))
  //         }
  //       </div>
  //     </div>
  //   )
  // };

  render() {
    const {
      searchValue,
      searchLocationValue,
    } = this.state;

    return (
      <div className="page home-page home">
        <div className="section section-hero">
          <div className="container">

            <div className="row">
              <div className="col d-flex flex-column">
                <img className="hero-logo" src="/images/logo-small.svg" alt="Creative Market"/>

                <h1 className="hero-title">
                  Rent Creative <br className="d-md-none d-block"/>Gear Close By
                </h1>

                <span className="hero-subtitle">
                  A secure rental community <br className="d-md-none d-block"/> <b>for creators, by creators.</b>
                </span>

                <div className="hero-categories d-none d-md-flex">
                  Rent&nbsp;
                  <Link to="/rent-gear?type=Cameras">
                    <button className="hero-categories__btn">
                      <IconBtnCamera className="btn__icon"/>
                      Cameras
                    </button>
                  </Link>
                  <Link to="/rent-gear?type=Drones">
                    <button className="hero-categories__btn">
                      <IconBtnDrone className="btn__icon"/>
                      Drones
                    </button>
                  </Link>
                  <Link to="/rent-gear?type=Lights">
                    <button className="hero-categories__btn">
                      <IconBtnLight className="btn__icon"/>
                      Lights
                    </button>
                  </Link>
                  <Link to="/rent-gear?type=all">
                    <button className="hero-categories__btn last">
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
                        dropdownItems={this.productList || []}
                        // dropdownAddons={this.renderSearchAddOn()}
                        onHandleChange={this.handleChangeSearchValue}
                      />
                    </div>

                    <div className="location-search-wrapper search-wrapper">
                      <MaterialInputWithDropdown
                        label="Location"
                        noHelp
                        value={searchLocationValue}
                        dropdownItems={this.locationList || []}
                        onHandleChange={this.handleChangeSearchLocation}
                        onSearch={this.handleSearch}
                      />
                    </div>
                  </div>

                  <button className="search-btn" onClick={this.handleSearch}>
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
              <Col lg='12' md='24' className='order-lg-1 order-md-2 first-left-div'>
                <h2>Rent the Gear<br/>Your Ideas Need</h2>
                <p className='first-text'>If you love creating, you are most likely familiar with the problem of feeling limited by your gear. With Creative Market, you can now rent any gear you might need from other creatives around you.</p>
                <Link to='/rent-gear?type=all'><button className='theme-btn theme-btn-primary'>RENT GEAR</button></Link>
              </Col>
              <Col lg='12' md='24' className='rent-gear-back-img back-img order-lg-2 order-md-1'/>
            </Row>
            <Row className='home-subsection'>
              <Col lg='12' md='24' className='add-gear-back-img back-img'/>
              <Col lg='12' md='24' className='second-right'>
                <h2>List Your Own<br/>Gear for Rent</h2>
                <p className='second-text'>When you’re not renting from others, allow others to rent from you. Making your fancy gear work for you, even when you’re not using it yourself. It’s a win-win situation!</p>
                <Link to='/add-gear'><button className='theme-btn theme-btn-primary'>ADD GEAR</button></Link>
              </Col>
            </Row>
            <Row className='home-subsection'>
              <Col lg='12' md='24' className='order-lg-1 order-md-2 third-left'>
                <h2>Secure Worldwide<br/>Rental Community</h2>
                <p className='signup-text'>Every member of Creative Market must be verified through our platform before engaging in rentals. Renters must complete payments before gear pickup takes place, and funds are securely held in escrow until owner and renter have both confirmed that the handoff has taken place.</p>
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
  isAuthenticated: state.user.isAuthenticated,
  briefGearList: state.gear.briefGearList
});

export default connect(mapStateToProps)(Home);
