import React, {Component} from 'react';
import {connect} from 'react-redux';
import Flickity from 'react-flickity-component';
import {
  Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import {Link} from "react-router-dom";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {DateRange} from 'react-date-range';
import TextField from '@material-ui/core/TextField';
import CustomCarousel from '../../components/CustomCarousel';
import {getGear} from "../../core/actions/gear.action";
import {addFavourites, deleteFavourite} from "../../core/actions/favourite.action";
import {addCart} from "../../core/actions/cart.action";
import {handleError} from '../../core/actions/common.action';
import {formatDate} from "../../core/helper";
import CartModal1 from '../../components/common/CartModal1'
import CartModal2 from '../../components/common/CartModal2';
import {calcDaysDiff, getDateStr} from "../../core/helper";
import {Inline} from '@zendeskgarden/react-loaders'
import CustomSpinner from "../../components/common/CustomSpinner";
import CustomLoaderLogo from "../../components/common/CustomLoaderLogo";
import {redirectToSignIn} from "../../core/actions/user.action";
// import { Twitter, Facebook, Google, Linkedin  } from 'react-social-sharing'
import {Helmet} from "react-helmet";
import {CheckIcon} from "../../components/common/IconComponent";
import VerificationConfirmModal from "../Auth/IdentityVerification/VerificationConfirmModal";

const flickityOptions = {
  contain: true,
  prevNextButtons: false,
  pageDots: false
};

class RentGearDetail extends Component {
  constructor(props) {
    super(props);
    this._mounted = false;
    this.gearid = props.match.params.id;
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      descp: '',
      cart_info: {},
      show_view_more: true,
      activeItemIndex: 1,
      open_date_picker1: false,
      open_date_picker2: false,
      modal_open_st: 0,
      carted: false,
      gear: {},
      busy: false
    };
    getGear(this.gearid);
  }
  
  componentDidMount() {
    this._mounted = true;
  }
  
  async componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location && this._mounted) {
      await getGear(this.props.match.params.id);
      this.setState({startDate: new Date(), endDate: new Date()});
    }
  }
  
  componentWillUnmount() {
    this._mounted = false;
  }
  
  addToCart = async ({startDate, endDate}) => {
    try {
      const {gear} = this.props;
      if (gear.userid === localStorage.userId) {
        handleError('You cannot rent your gear');
        return;
      }
      if (startDate && endDate && this._mounted) {
        await addCart({
          gearid: gear.gearid,
          userid: gear.userid,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate)
        });
        this._mounted && this.setState({modal_open_st: 0});
      }
    } catch {
      handleError('Gear was not added to cart');
    }
  };
  
  onOpenModal = async (gearid) => {
    try {
      const {carts, user, gear, history} = this.props;
      if (!user) {
        redirectToSignIn(history);
        return;
      }
      const cart = gearid && carts && carts.length > 0 ?
        carts.filter(item => item.gearid === gearid) : 0;
      const carted = cart.length;
      const open_state = carted ? 1 : 2;
      let startDate = new Date();
      let endDate = new Date();
      if (carted) {
        startDate = new Date(cart[0].startDate);
        endDate = new Date(cart[0].endDate);
      } else {
        startDate = this.state.startDate;
        endDate = this.state.endDate;
      }
      
      this._mounted && this.setState({
        modal_open_st: open_state,
        gear: gear,
        carted: carted,
        startDate,
        endDate,
        busy: false
      });
    } catch (err) {
      handleError(err);
    }
  };
  
  onCloseModal = () => {
    this._mounted && this.setState({
      modal_open_st: 0
    });
  };
  
  onOpenVerificationModal = () => {
    this._mounted && this.setState({
      modal_open_st: 3
    });
  };
  
  setOpenState = (ost1, ost2) => {
    this._mounted && this.setState({
      open_date_picker1: ost1,
      open_date_picker2: ost2
    });
  };
  
  handleSelect = ranges => {
    let t_start_date = ranges.selection.startDate;
    let t_end_date = ranges.selection.endDate;
    
    if (t_start_date > t_end_date) {
      let temp = t_start_date;
      t_start_date = t_end_date;
      t_end_date = temp;
    }
    if (t_start_date !== t_end_date) {
      // select range
      this._mounted && this.setState({
        startDate: t_start_date,
        endDate: t_end_date,
        open_date_picker1: false,
        open_date_picker2: false
      });
    }
    else {
      // select a single day
      if (this.state.open_date_picker1 && t_start_date > this.state.endDate)
        t_end_date = t_start_date;
      else if (this.state.open_date_picker1)
        t_end_date = this.state.endDate;
      else if (this.state.open_date_picker2 && t_end_date < this.state.startDate)
        t_start_date = t_end_date;
      else if (this.state.open_date_picker2)
        t_start_date = this.state.startDate;
      this._mounted && this.setState({
        startDate: t_start_date,
        endDate: t_end_date,
        open_date_picker1: false,
        open_date_picker2: false
      });
    }
  };
  
  renderRecommendedProducts({listGears}) {
    const {carts, gear} = this.props;
    listGears = listGears.filter(item => item.gearid !== gear.gearid);
    
    return listGears.map((item, i) => {
      let {numberOfUserImage, gearid, brand, rating, location: {city}, pricePerDay, productName, categoryName} = item;
      const carted_item = gearid && carts && carts.length > 0 ?
        carts.filter(item => item.gearid === gearid) : 0;
      const carted = carted_item ? carted_item.length : false;
      pricePerDay *= 1 + 0.06;
      
      return (
        <Col md="6" className="cardz" key={i}>
          <Link to={{pathname: `/gear/detail/${gearid}`, state: {categoryName}}}>
            <Card className="gear_card_view">
              <CardImg top width="100%" src={numberOfUserImage ? numberOfUserImage[0] :[]} alt="Card image cap"/>
              {carted > 0 && <div className="card-checked"><i className="fas fa-check-circle"/></div>}
              <CardBody>
                <div className='card-title-wrapper'>
                  <CardTitle>{brand}<br/>{productName}</CardTitle>
                </div>
                <div>
                  <CardSubtitle>
                    <span className="stars">
                      {
                        [1,2,3,4,5].map((i)=>{
                          return <i className="fa fa-star" key={i}/>
                        })
                      }
                    </span> &nbsp;
                    <span>
                      5,0&nbsp;
                    </span>
                    <span className="total">
                      ({rating ? rating : 0})
                    </span>&nbsp;  &nbsp;
                    <span className="address">
                      <i className="fa fa-map-marker" aria-hidden="true"/>&nbsp;
                      {city}
                    </span>
                  </CardSubtitle>
                  <CardText>
                    <span className="price"> ${parseFloat(pricePerDay).toFixed(2)} </span>
                    <span className="theme-text-small text-gray"> /per day</span>
                  </CardText>
                  {/*<div className="buttons">*/}
                  {/*<Button className='cart' onClick={() => this.onOpenModal(gearid)}>Add to Cart</Button>*/}
                  {/*<Button className="fav" onClick={() => {*/}
                  {/*if (!user) {*/}
                  {/*handleError('Please sign in');*/}
                  {/*return;*/}
                  {/*}*/}
                  {/*favored>0 ? deleteFavourite({ gearid }) : addFavourites({ gearid })*/}
                  {/*}}><i className={favored ? "fas fa-heart" : "far fa-heart"}/></Button>*/}
                  {/*</div>*/}
                </div>
              </CardBody>
            </Card>
          </Link>
        </Col>)
    });
  }
  
  renderContent = () => {
    const {gear, user, carts, favourites, isChangingFavor, isLoadingGear, gearRecommendedList} = this.props;
    if (!gear || isLoadingGear)
      return <CustomLoaderLogo/>;
      
    const {
      numberOfUserImage, gearid, brand, rating, location: {city}, replacementValue,
      pricePerDay, productName, description, newArrival_Index, categoryName, accessories, userid
    } = gear;
    const name = brand + ' ' + productName;
    const selectedType = newArrival_Index;
    const carted_item = gearid && carts && carts.length > 0 ?
      carts.filter(item => item.gearid === gearid) : 0;
    const carted = carted_item ? carted_item.length : false;
    const favored = gearid && favourites && favourites.length > 0 ?
      favourites.filter(item => item.gearid === gearid).length : 0;
    // description
    const is_first_enter = this.state.descp.length === 0;
    const is_view_more = description.length > 250;
    let descp = is_first_enter ? (is_view_more ? `${description.substr(0, 325)} ...` : description) :
      this.state.show_view_more ? `${description.substr(0, 325)} ...` : description;
    const listGears = gearRecommendedList;
    const selectionRange = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      key: 'selection',
    };
    const start_date_str = getDateStr(this.state.startDate);
    const end_date_str = getDateStr(this.state.endDate);
    const duration = calcDaysDiff(this.state.startDate, this.state.endDate) + 1;
    const busy = this.state.busy;
    let total = pricePerDay * duration;
    let tax = total * 0;
    let fee = total * 0.06;
    let amount = parseFloat(total + tax + fee).toFixed(2);
    let actualPrice = parseFloat(amount / duration).toFixed(2);
    let carouselItems = numberOfUserImage.map((item, index) => ({src: item, altText: `Slide ${index}`, caption: `Slide ${index}`}));
    let path = window.location.pathname;
    
    return (
      <React.Fragment>
        {isChangingFavor && <CustomSpinner/>}
        <div className="detail-container container">
          <Helmet>
            <title>Gear Detail</title>
            <meta name="keywords" content={`rent,creative,gear,renting,market,gadget,${brand},${categoryName}`} />
            <meta property="og:title" content={name} />
            <meta property="og:description" content={descp} />
            <meta property="og:image" content={numberOfUserImage[0]} />
            <meta property="og:url" content={`https://creative.market${path}`} />
          </Helmet>
          
          <h3 className='add-method-heading go-back-btn' onClick={() => this.props.history.push(`/rent-gear?type=${categoryName}`)}>
            <i className='fa fa-arrow-left'/>
            &nbsp;Rent Gear
          </h3>
          <div className='d-lg-none d-xl-none d-info-container'>
            {/*<div className='location-bar-container'>*/}
              {/*<div>*/}
                {/*<BreadCrumbActive name="Home"/>&nbsp;/&nbsp;*/}
                {/*<BreadCrumbActive name="Rent Gears"/>&nbsp;/&nbsp;*/}
                {/*<BreadCrumbActive name={categoryName}/>&nbsp;/&nbsp;*/}
                {/*<BreadcrumbItem active>{name}</BreadcrumbItem>*/}
              {/*</div>*/}
            {/*</div>*/}
            
            <div className="theme-form-small text-gray category">{categoryName} </div>
            
            <p className='category-name'>
              {name}
              {carted > 0 ? <i className="fas fa-check-circle icon-carted"/> : null}
            </p>
            
            <div className="type-tabs">
              <input name="type" id="new" type="radio" value="new"/>
              <label className={`type-tab ${selectedType === 1 ? 'active' : ''}`} htmlFor="new">New</label>
              <input name="type" id="like-new" type="radio" value="like_new"/>
              <label className={`type-tab type-tab2 ${selectedType === 2 ? 'active' : ''}`} htmlFor="like-new">Like
                New</label>
              <input name="type" id="slightly-worn" type="radio" value="slightly_worn"/>
              <label className={`type-tab type-tab3 ${selectedType === 3 ? 'active' : ''}`} htmlFor="slightly-worn">Slightly
                Worn</label>
              <input name="type" id="worn" type="radio" value="worn"/>
              <label className={`type-tab type-tab4 ${selectedType === 4 ? 'active' : ''}`} htmlFor="worn">Worn</label>
            </div>
            
            <div className='row rating-container'>
              <div className='col-sm-5'/>
              <div className="gear-address-container col-sm-7 col-12 row">
                <div className='marker-icon'/>
                <span className='gear-address'>{city}</span>
              </div>
              <div className='col-sm-7 col-12'>
                <span className='star-container'>
                  {
                    [1, 2, 3, 4, 5].map(i =>
                      <i className="fa fa-star star-selected" key={i}/>)
                  }
                </span>
                <span>&nbsp;&nbsp;5,0&nbsp;({rating || 0})</span>
              </div>
              <div className='col-sm-5'/>
            </div>
            
            <div className="carousel-top-container">
              <CustomCarousel items={carouselItems} />
            </div>
            
            <div className="gear-info">
              <div className="theme-form-small text-gray accessories">Accessories</div>
              <div className="accessories-content">{accessories.join(', ')}</div>
              <div className="theme-form-small text-gray description">Description</div>
              <div className="description-content">{descp}</div>
              {
                is_view_more && this.state.show_view_more ? <div className="view-more" onClick={() => {
                  this.setState({descp: description, show_view_more: false});
                }}>View More...</div> : null
              }
              {
                is_view_more && !this.state.show_view_more ? <div className="view-more" onClick={() => {
                  this.setState({descp: description, show_view_more: true});
                }}>Fold...</div> : null
              }
            </div>
            
            <div className="d-none d-sm-block gear-purchase">
              <div className='row price-container'>
                <div className='col-md-12'>
                  <div className="theme-form-small text-gray replacement">Replacement Value</div>
                  <div className="replacement-content">${replacementValue}</div>
                </div>
                <div className='col-md-12 tablet-price-container'>
                  <div className="price-per-day">${actualPrice}<span className='price-slash'> / </span><span
                    className="price-per-day-text">per day</span></div>
                </div>
              </div>
              {
                user && this.state.userid !== userid ?
                  <div className="pickup-date-container row">
                    <div className='col-md-11 date-range-container'>
                      <TextField
                        id="date-range-input1"
                        className="date-range-input"
                        type="text"
                        label={'PICKUP DATE'}
                        onFocus={() => this.setOpenState(true, false)}
                        value={start_date_str}
                      />
                      {
                        this.state.open_date_picker1 ?
                          <DateRange
                            className={'date-range-wrapper'}
                            ranges={[selectionRange]}
                            onChange={this.handleSelect}
                            rangeColors={['#F74377']}
                            showDateDisplay={false}
                            dateDisplayFormat={'DD.MM.YYYY'}
                          />
                          : null
                      }
                      {
                        this.state.open_date_picker1 ?
                          <img src="/images/Icons/calendar/calendar1.svg" alt=''/> :
                          <img src="/images/Icons/calendar/calendar.svg" alt=''/>
                      }
                    </div>
                    <div className='col-md-2'/>
                    <div className='col-md-11 date-range-container'>
                      <TextField
                        id="date-range-input1"
                        className="date-range-input"
                        type="text"
                        label={'RETURN DATE'}
                        onFocus={() => this.setOpenState(false, true)}
                        value={end_date_str}
                      />
                      {
                        this.state.open_date_picker2 ?
                          <DateRange
                            className={'date-range-wrapper'}
                            ranges={[selectionRange]}
                            onChange={this.handleSelect}
                            rangeColors={['#F74377']}
                            showDateDisplay={false}
                            dateDisplayFormat={'DD.MM.YYYY'}
                          /> : null
                      }
                      {
                        this.state.open_date_picker2 ?
                          <img src="/images/Icons/calendar/calendar1.svg" alt=''/> :
                          <img src="/images/Icons/calendar/calendar.svg" alt=''/>
                      }
                    </div>
                  </div>
                  : null
              }
              <div className="bottom-buttons">
                <button className="theme-btn theme-btn-primary btn-cart" onClick={() => this.onOpenModal(gearid)}>
                  {busy ? <Inline size={64} color={"#fff"}/> : 'Add to Cart'}
                </button>
                <button className="theme-btn theme-btn-secondery btn-favor" onClick={() => {
                  if (!user) {
                    redirectToSignIn(this.props.history);
                    return;
                  }
                  favored > 0 ? deleteFavourite({gearid}) : addFavourites({gearid})
                }}>
                  <i className={`${favored ? 'fas' : 'far'} fa-heart`}/>
                </button>
              </div>
            </div>
            {listGears.length > 0 ?
            <div className='recommend-container'>
              <div className='recommend-heading'>
                <span>RECOMMENDED <br className="d-sm-block d-md-none"/>FOR THIS PRODUCT</span>
              </div>
              <div className='recommend-body d-xl-none d-lg-none slider-2'>
                <Flickity
                  className={'carousel'}
                  elementType={'div'}
                  options={flickityOptions}
                  disableImagesLoaded={false}
                  reloadOnUpdate
                >
                {this.renderRecommendedProducts({listGears})}
                </Flickity>
              </div>
            </div> : null}
          </div>
          
          <div className="d-none d-lg-flex d-xl-flex view-gear-detail row">
            <div className="col-lg-9 left-container">
              <div className="carousel-top-container">
                <CustomCarousel items={carouselItems}/>
              </div>
            </div>
            <div className="right-container col-lg-15">
              <div className="right-container1 row">
                <div className="gear-container row">
                  <div className="gear-info col-lg-15">
                    <div className="theme-form-small text-gray category d-none d-lg-block">{categoryName} </div>
                    <span className='category-name d-none d-lg-block'>
                      {name}
                      {carted > 0 ? <i className="fas fa-check-circle"/> : null}
                    </span>
                    <div className="type-tabs d-none d-lg-block">
                      <input name="type" id="new" type="radio" value="new" onChange={this.onTypeChange}/>
                      <label className={`type-tab ${selectedType === 1 ? 'active' : ''}`} htmlFor="new">New</label>
                      <input name="type" id="like-new" type="radio" value="like_new" onChange={this.onTypeChange}/>
                      <label className={`type-tab type-tab2 ${selectedType === 2 ? 'active' : ''}`} htmlFor="like-new">Like
                        New</label>
                      <input name="type" id="slightly-worn" type="radio" value="slightly_worn"
                             onChange={this.onTypeChange}/>
                      <label className={`type-tab type-tab3 ${selectedType === 3 ? 'active' : ''}`}
                             htmlFor="slightly-worn">Slightly
                        Worn</label>
                      <input name="type" id="worn" type="radio" value="worn" onChange={this.onTypeChange}/>
                      <label className={`type-tab type-tab4 ${selectedType === 4 ? 'active' : ''}`}
                             htmlFor="worn">Worn</label>
                    </div>
                    <div className="theme-form-small text-gray accessories">Accessories</div>
                    <div className="accessories-content">{accessories.join(', ')}</div>
                    
                    <div className="theme-form-small text-gray description">Description</div>
                    <div className="description-content">{descp}</div>
                    {
                      is_view_more && this.state.show_view_more ? <div className="view-more" onClick={() => {
                        this.setState({descp: description, show_view_more: false});
                      }}>View More...</div> : null
                    }
                    {
                      is_view_more && !this.state.show_view_more ? <div className="view-more" onClick={() => {
                        this.setState({descp: description, show_view_more: true});
                      }}>Fold...</div> : null
                    }
                  </div>
                  <div className="gear-purchase col-lg-9">
                    <div>
                      <div>
                        {user && user.kycValidated ?
                        <button className='theme-btn theme-btn-primary btn-verify-profile'>
                          <CheckIcon/> Verified Profile
                        </button> : <span className='warning-span'>Not Verified</span>}
                      </div>
                      <span className='star-wrapper'>
                        {[1, 2, 3, 4, 5].map(i =>
                          <i className="fa fa-star star-selected" key={i}/>)}
                      </span>
                      <span className="theme-form-small">&nbsp;5,0&nbsp;({rating || 0})</span>
                      <div className="gear-address-container row">
                        <div className='marker-icon'/>
                        <span className='gear-address'>{city}</span>
                      </div>
                    </div>
                    <div>
                      <div className="theme-form-small text-gray replacement">Replacement Value</div>
                      <div className="replacement-content">${replacementValue}</div>
                    </div>
                    <div>
                      <div className="price-per-day">${actualPrice}<span className='price-slash'> / </span><span
                        className="price-per-day-text">per day</span></div>
                    </div>
                    {
                      // user && this.state.userid !== userid ?
                        <div className="pickup-date-container">
                          <div className='row date-range-container'>
                            <TextField
                              id="date-range-input1"
                              className="date-range-input"
                              type="text"
                              label={'PICKUP DATE'}
                              onFocus={() => this.setOpenState(true, false)} value={start_date_str}
                            />
                            {
                              this.state.open_date_picker1 ?
                                <DateRange
                                  className={'date-range-wrapper'}
                                  ranges={[selectionRange]}
                                  onChange={this.handleSelect}
                                  rangeColors={['#F74377']}
                                  showDateDisplay={false}
                                  dateDisplayFormat={'DD.MM.YYYY'}
                                />
                                : null
                            }
                            {
                              this.state.open_date_picker1 ?
                                <img src="/images/Icons/calendar/calendar1.svg" alt=''/> :
                                <img src="/images/Icons/calendar/calendar.svg" alt=''/>
                            }
                          </div>
                          <div className='row date-range-container'>
                            <TextField
                              id="date-range-input1"
                              className="date-range-input"
                              type="text"
                              label={'RETURN DATE'}
                              onFocus={() => this.setOpenState(false, true)} value={end_date_str}
                            />
                            {
                              this.state.open_date_picker2 ?
                                <DateRange
                                  className={'date-range-wrapper'}
                                  ranges={[selectionRange]}
                                  onChange={this.handleSelect}
                                  rangeColors={['#F74377']}
                                  showDateDisplay={false}
                                  dateDisplayFormat={'DD.MM.YYYY'}
                                /> : null
                            }
                            {
                              this.state.open_date_picker2 ?
                                <img src="/images/Icons/calendar/calendar1.svg" alt="calendar1"/> :
                                <img src="/images/Icons/calendar/calendar.svg" alt="calendar"/>
                            }
                          </div>
                        </div>
                        // : null
                    }
                    <div className="cost-container">
                      ${amount}
                      <span className="cost-for"> for </span>
                      {duration} days
                    </div>
                    <div className="bottom-buttons">
                      <button className="theme-btn theme-btn-primary btn-cart" onClick={() => this.onOpenModal(gearid)}
                        disabled={`${busy ? 'disabled' : ''}`}>
                        {busy ? <Inline size={64} color={"#fff"}/> : 'Add to Cart'}
                      </button>
                      <button className="theme-btn theme-btn-secondery btn-favor" onClick={() => {
                        if (!user) {
                          redirectToSignIn(this.props.history);
                          return;
                        }
                        favored > 0 ? deleteFavourite({gearid}) : addFavourites({gearid})
                      }}>
                        <i className={`${favored ? 'fas' : 'far'} fa-heart`}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/*<div className='row'>*/}
            {/*<div className='col-sm-20 col-xs-0'/>*/}
            {/*<div className='col-sm-4 col-xs-24 social-sharing-container'>*/}
              {/*<Twitter*/}
                {/*text='Rent Creative Gear'*/}
                {/*label='Rent Creative Gear'*/}
                {/*hashtags={['RentGear', 'renting']}*/}
                {/*link={`https://creative.market${this.props.location.pathname}`}*/}
              {/*/>*/}
              {/*<Facebook*/}
                {/*link={`https://creative.market${this.props.location.pathname}`}*/}
              {/*/>*/}
              {/*<Google*/}
                {/*link={`https://creative.market${this.props.location.pathname}`}*/}
              {/*/>*/}
              {/*<Linkedin*/}
                {/*title='Rent Creative Gear'*/}
                {/*link={`https://creative.market${this.props.location.pathname}`}*/}
              {/*/>*/}
            {/*</div>*/}
          {/*</div>*/}
          
          {listGears.length > 0 ?
          <div className='d-none d-lg-block d-xl-block recommend-container'>
            <div className='recommend-heading'>
              <span>RECOMMENDED FOR THIS PRODUCT</span>
            </div>
            <div className='recommend-body row slider-2'>
              {this.renderRecommendedProducts({listGears})}
            </div>
          </div> : null}
          
          <footer className='mobile-footer d-block d-sm-none row'>
            <div className='price-container'>
              <span>$159<span className='price-slash'> / </span><span
                className='price-per-day-text'>per day</span></span>
            </div>
            <div className='icon-container'>
              <i className="fa fa-shopping-cart icon-cart" onClick={() => this.onOpenModal(gearid)}/>
              <i className={`icon-heart ${favored ? 'fas' : 'far'} fa-heart`} onClick={() => {
                if (!user) {
                  redirectToSignIn(this.props.history);
                  return;
                }
                favored > 0 ? deleteFavourite({gearid}) : addFavourites({gearid})
              }}/>
            </div>
          </footer>
          {
            this.state.modal_open_st === 2 ?
              <CartModal2
                dlg_model={1}
                gear={this.state.gear}
                start_date={this.state.startDate}
                end_date={this.state.endDate}
                open={true}
                onClose={this.onCloseModal}
                addToCart={this.addToCart}
              /> :
            this.state.modal_open_st === 1 ?
              <CartModal1
                carted={carted}
                gear={{...gear, start_date_str, end_date_str}}
                start_date={this.state.startDate}
                end_date={this.state.endDate}
                open={true}
                onClose={this.onCloseModal}
                addToCart={this.addToCart}
              /> :
            this.state.modal_open_st === 3 ?
              <VerificationConfirmModal
                open={true}
                onClose={this.onCloseModal}
              /> : null
          }
        </div>
      </React.Fragment>
    );
  };
  
  render() {
    return this.renderContent();
  }
}

const mapStateToProps = state => ({
  gear: state.gear.gear,
  gearRecommendedList: state.gear.gearRecommendedList,
  isLoadingGear: state.gear.isLoadingGear,
  // searchResults: state.gear.searchResults,
  user: state.user.user,
  carts: state.cart.carts,
  favourites: state.favourite.favourites,
  isChangingFavor: state.favourite.isChanging
});

export default connect(mapStateToProps)(RentGearDetail);
