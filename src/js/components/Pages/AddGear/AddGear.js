import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Breadcrumb, BreadcrumbItem, Dropdown, Form, DropdownToggle, DropdownMenu,
  DropdownItem, Input, Label, Carousel, CarouselItem, CarouselControl,
  CarouselIndicators, CarouselCaption, InputGroup, InputGroupAddon
} from 'reactstrap';
import Chips, { Chip } from 'react-chips';
import CustomInput from '../../CustomInput';
import { element } from 'prop-types';
import CustomCarousel from '../../CustomCarousel';
import { handleError, readFileData, addGear, fetchCategories } from '../../../actions/app.actions';
import "./AddGear.css"
import Textarea from "muicss/lib/react/textarea";
import Urllink_class from "../../Urllink_class";
class AddGear extends Component {
  constructor() {
    super();

    this.progressSteps = ['Info', 'Photo', 'Address', 'Price'];
    this.state = {
      progressStep: 0,
      dropdownOpen: false,
      selectedType: 'new',
      isGearAdded: false,
      gearId: '',

      categoryName: 'Category',
      brand: '',
      model: '',
      description: '',
      isKit: '',
      accessories: [],
      numberOfUserImage: [],
      city: '',
      region: '',
      address: '',
      postalCode: '',
      replacementValue: '',
      pricePerDay: ''
    };

    this.toggle = this.toggle.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
  }

  componentDidMount() {
    fetchCategories();
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  renderProgress() {
    const { progressStep } = this.state;
    let isDone = true;
    return this.progressSteps.map((i, index) => (
      <div key={i} className={isDone ? 'add-gear-progress-item active' : 'add-gear-progress-item'}>
        {
          function () {
            if (index === progressStep) {
              isDone = false;
              return <i className='fas fa-dot-circle' aria-hidden="true"/>;
            } else if (isDone) {
              return <i className='fas fa-check-circle' aria-hidden="true"/>;
            } else {
              return <i className='far fa-circle' aria-hidden="true"/>;
            }
          }()
        }

        <div className="theme-text-small">{i}</div>
      </div>
    ));
  }

  onTypeChange(e) {
    this.setState({
      selectedType: e.target.value
    });
  }

  changeCategory(e) {
    this.setState({ categoryName: e.target.textContent });
  }

  renderInfo() {
    const { selectedType, brand, model, description, isKit, categoryName, accessories } = this.state;
    const { categories } = this.props.app;

    return (
      <Form className="theme-form add-gear-info container add-gear-info-cusvenus" id="tablet-form">
        <div className="flex-row d-md-block d-lg-flex">
          <div className="theme-column category_first" width="35%">
            <Dropdown className="theme-form-field theme-form-dropdown category_first" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                {categoryName}
              </DropdownToggle>
              <DropdownMenu right>
                {
                  categories.map((ele, index) => {
                    return <DropdownItem key={index}
                                         onClick={this.changeCategory.bind(this)}>{ele.categoryName}</DropdownItem>;
                  })
                }
              </DropdownMenu>
            </Dropdown>
            <div className="theme-form-field category_first">
              <CustomInput required="required" value={brand} onChange={(value) => this.setState({ brand: value })}
                           placeholder='Brand' type="text"/>
            </div>
            <div className="theme-form-field category_first">
              <CustomInput placeholder='Model' value={model} onChange={(value) => this.setState({ model: value })}
                           type="text"/>
            </div>
            <div className="theme-form-field category_first">
                {/*<Textarea className="ELBLI_desc" label="DESCRIPTION" onChange = {(value) => this.setState({ description : value })} defaultValue={gear.description} floatingLabel={true}/>*/}


              <Textarea className="category_description_ta" label='Description' floatingLabel={true}
                           onChange={(e) => {
                             console.log(e.target.value);
                             this.setState({ description: e.target.value })
                           }} type="text"/>
            </div>
          </div>
          <div className="theme-column info-right-container " id="new-tabs" width="35%">
            <div className="info-right-newtabs-left">
              <div className="type-tabs">
                <input name="type" id="new" type="radio" value="new" onChange={this.onTypeChange}/>
                <label className={selectedType === 'new' ? 'active' : ''} htmlFor="new">New</label>
                <input name="type" id="like-new" type="radio" value="like_new" onChange={this.onTypeChange}/>
                <label className={selectedType === 'like_new' ? 'active' : ''} htmlFor="like-new">Like New</label>
                <input name="type" id="slightly-worn" type="radio" value="slightly_worn" onChange={this.onTypeChange}/>
                <label className={selectedType === 'slightly_worn' ? 'active' : ''} htmlFor="slightly-worn">Slightly
                  Worn</label>
                <input name="type" id="worn" type="radio" value="worn" onChange={this.onTypeChange}/>
                <label className={selectedType === 'worn' ? 'active' : ''} htmlFor="worn">Worn</label>
              </div>
              <div className="theme-form-field" id="kit-style">
                  <div className="input_svg pretty p-svg p-plain">
                      <input type="checkbox" onChange={(e) => this.setState({ isKit: e.target.checked })}/>
                      <div className="state">
                          <img className="svg check_svg" src="/images/Icons/task.svg"/>
                      </div>
                  </div>
                  <Label for="is-kit">Is this a Kit?</Label>
              </div>
            </div>
            <div>
              <div className="theme-text-small">Accessories</div>
              <div id="chip_style">
                <Chips
                  value={accessories}
                  onChange={(accessories) => this.setState({ accessories })}
                  className="theme-combo"
                  fromSuggestionsOnly={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Form>);
  }

  renderPhotos() {
    const mappedImages = this.state.numberOfUserImage.map((image, index) => (
      <div className="add-gear-image" key={'gear-image-' + index}>
        <img src={image}/>
      </div>
    ));
    return (<div className="add-gear-photos">
      <div className="add-gear-images">
        {mappedImages}
          {
              this.state.numberOfUserImage.length>0 ?
                  <div className="add-gear-addimage file-input-container">
                      <i className="fas fa-plus-circle"></i>
                      <input type="file" onChange={this.addImage.bind(this)}/>
                  </div>
                  :
                   <div className="add-gear-addimage file-input-container empty_page_addgear">
                       <img  src="/images/Icons/uploadimage.svg">
                       </img>
                        <p className="empty_page_addgear_img">Upload Photos</p>
                        <p>Upload only png, jpg or jpeg</p>
                       <i><button className="theme-btn theme-btn-primary empty_addgear_btn">Upload</button></i>
                        <input type='file' onChange={this.addImage.bind(this)}></input>
                   </div>

          }
      </div>
    </div>);
  }

  async addImage(event) {
    try {
      let image = await readFileData(event);
      let { numberOfUserImage } = this.state;

      numberOfUserImage.push(image);

      this.setState({
        numberOfUserImage
      });

    } catch {
      handleError('Please upload a valid image');
    }
  }

  renderAddress() {
    const { city, region, address, postalCode } = this.state;

    return (
      <Form className="theme-form add-gear-address">
        <div className="theme-form-field">
          <CustomInput placeholder='City' type="text" value={city}
                       onChange={(value) => this.setState({ city: value })}/>
        </div>
        <div className="theme-form-field">
          <CustomInput placeholder='Region' type="text" value={region}
                       onChange={(value) => this.setState({ region: value })}/>
        </div>
        <div className="theme-form-field">
          <CustomInput placeholder='Address' type="text" value={address}
                       onChange={(value) => this.setState({ address: value })}/>
        </div>
        <div className="theme-form-field">
          <CustomInput placeholder='Postal Code' type="text" value={postalCode}
                       onChange={(value) => this.setState({ postalCode: value })}/>
        </div>
      </Form>
    );
  }

  async addGearDetails() {
    try {
      const { categoryName, brand, model, description, selectedType, isKit, accessories, numberOfUserImage, city, region, address, postalCode, replacementValue, pricePerDay } = this.state;

      const data = {
        categoryName,
        brand,
        model,
        description,
        type: selectedType,
        isKit,
        accessories,
        numberOfUserImage,
        city,
        product_region: region,
        address,
        postalCode,
        replacementValue,
        pricePerDay
      };

      let gearId = await addGear(data);

      if (gearId) {
        this.setState({
          isGearAdded: true,
          gearId
        });
      }
    } catch (e) {

    }
  }

  renderPrice() {
    const { selectedType, accessories, numberOfUserImage, categoryName, brand, model, address, city, description, replacementValue, pricePerDay } = this.state;

    let mappedAccessories = accessories.map((accessory, index) => (
      <div key={'accessory-' + index} className="d-md-flex">{accessory}</div>
    ));
    return <div className="add-gear-price">
      <div id="fourth-content">
        <div className="theme-text-small text-gray">{categoryName}</div>
        <h4 id="label-content">{brand + ' ' + model}</h4>

          <div className="price-type-tabs">
              <input id="new" type="radio" value="new"/>
              <label className={selectedType === 'new' ? 'active' : ''} htmlFor="new">New</label>
              <input id="like-new" type="radio" value="like_new"/>
              <label className={selectedType === 'like_new' ? 'active' : ''} htmlFor="like-new">Like New</label>
              <input id="slightly-worn" type="radio" value="slightly_worn"/>
              <label className={selectedType === 'slightly_worn' ? 'active' : ''} htmlFor="slightly-worn">Slightly
                  Worn</label>
              <input id="worn" type="radio" value="worn"/>
              <label className={selectedType === 'worn' ? 'active' : ''} htmlFor="worn">Worn</label>
          </div>

        <div className="gear-carousel">
          <CustomCarousel items={numberOfUserImage}/>
        </div>
      </div>
      <div className="gear-middle-container" id="middle-container">
        <div className="flex-row gear-accessories-address">
          <div>
            <div className="theme-text-small text-gray d-md-flex">Accessories</div>
            {
              mappedAccessories
            }
          </div>
          <div id="address-content">
            <div className="theme-text-small text-gray">Address</div>
            <div className="">{address}</div>
            <div className="">{city}</div>
          </div>
        </div>
        <div id="description-container">
          <div className="theme-text-small text-gray">Description</div>
              <div className="div_description">{description}</div>
        </div>
      </div>
      <div className="gear-right-container" id="right-container">
        <div className="custom-theme-row">
          <div class="custom-theme-col">
            <div>Replacement Value</div>
            <InputGroup>
              <InputGroupAddon addonType="prepend">$</InputGroupAddon>
              <CustomInput  type="text" value={replacementValue}
                           onChange={(value) => this.setState({ replacementValue: value })}/>
            </InputGroup>
          </div>
          <div class="custom-theme-col">
            <div>Price per day</div>
            <InputGroup>
              <InputGroupAddon addonType="prepend">$</InputGroupAddon>
              <CustomInput  type="text" value={pricePerDay}
                           onChange={(value) => this.setState({ pricePerDay: value })}/>
            </InputGroup>
          </div>
        </div>
        <div className="buttons-container">
          <button className="theme-btn theme-btn-secondery" onClick={this.previousStep.bind(this)}><span
            className="fa fa-angle-left d-sm-none d-md-none d-lg-block"/><span class="d-sm-none d-lg-none d-md-block" >Back</span></button>
          <button className="theme-btn theme-btn-primary" onClick={this.addGearDetails.bind(this)}>Submit <span
            className="fa fa-angle-right"/></button>
        </div>
      </div>
    </div>;
  }

  renderContent() {
    const { progressStep } = this.state;
    console.log("step:", progressStep);
    switch (progressStep) {
      case 0:
        return this.renderInfo();
        break;
      case 1:
        return this.renderPhotos();
        break;
      case 2:
        return this.renderAddress();
        break;
      case 3:
        return this.renderPrice();
        break;
      default:

    }
  }

  previousStep() {
    this.setState({
      progressStep: --this.state.progressStep
    });
  }

  nextStep() {
    if (this.validate()) {
      this.setState({
        progressStep: ++this.state.progressStep
      });
    }
  }

  validate() {
    switch (this.state.progressStep) {
      case 0:
        const { categoryName, brand, model, description, selectedType } = this.state;
        if (categoryName && brand && model && description && selectedType) {
          return true;
        }
        break;

      case 1:
        const { numberOfUserImage } = this.state;

        if (numberOfUserImage && numberOfUserImage.length > 0) {
          return true;
        }
        break;
      case 2:
        const { city, region, address, postalCode } = this.state;
        if (city && region && address && postalCode) {
          return true;
        }
        break;
      case 3:
        const { replacementValue, pricePerDay } = this.state;
        if (replacementValue && pricePerDay) {
          return true;
        }
        break;
      default:
    }

    handleError('Please provide the required details');
    return false;
  }

  render() {
    const { isGearAdded, replacementValue, pricePerDay, brand, model, categoryName, gearId } = this.state;

    if (isGearAdded) {
      return <div className="add-gear">
        <h1><i className="fa fa-check-circle primary-color"></i></h1>
        <h3 className="success_gear_htag">Gear Added Successfully</h3>

        <div className="success-message">
          <div className="theme-text-small success_gear_categoryName">{categoryName}</div>
          <h6 className="success_gear_brand_modal">{brand + ' ' + model}</h6>

          <div className="flex-row success_gear_reaplacement">
            <div>
              <div className="theme-text-small">Replacement Value</div>
              <div>${replacementValue}</div>
            </div>
            <div>
              <div className="theme-text-small">Price per day</div>
              <div>${pricePerDay}</div>
            </div>
          </div>

          <div className="flex-row buttons-container">
            <button className="theme-btn theme-btn-secondery theme-btn-link success_first_button"><Link to="/listgear">List Gear</Link>
            </button>
            <button className="theme-btn theme-btn-primary theme-btn-link success_sencond_button"><Link to={`/editgear/${gearId}`}>View Gear</Link>
            </button>
          </div>
        </div>
      </div>;
    }

    return (
      <div className="add-gear">
        <Breadcrumb>
          <Urllink_class name="Home"></Urllink_class>
            <span className="space_slash_span">/</span>
          <BreadcrumbItem active>Add Gear</BreadcrumbItem>
        </Breadcrumb>
        <h3 class="header">Add Gear</h3>
        <div className="add-gear-progress">
          {
            this.renderProgress()
          }
        </div>
        {
          this.renderContent()
        }

        {
          this.state.progressStep < 3 ? (
            <div id="continue-button">
              <div className="flex-row buttons-container">
                {
                  this.state.progressStep !== 0 ?
                    <button className="theme-btn theme-btn-secondary theme-back-btn" onClick={this.previousStep.bind(this)}><span
                      className="fa fa-angle-left"/> Back  </button> :
                    null
                }

                <button className="theme-btn theme-btn-primary theme-continue-btn" onClick={this.nextStep.bind(this)}>Continue <span
                  className="fa fa-angle-right"/></button>
              </div>
            </div>) : null
        }
      </div>);
  }
}

const mapStateToProps = state => ({
  app: state.app,
});

export default connect(mapStateToProps)(AddGear);
