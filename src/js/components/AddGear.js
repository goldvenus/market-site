import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Dropdown, Form, DropdownToggle, DropdownMenu,
  DropdownItem, Input, Label, Carousel, CarouselItem, CarouselControl,
  CarouselIndicators, CarouselCaption, InputGroup, InputGroupAddon } from 'reactstrap';
import Chips, { Chip } from 'react-chips';
import CustomInput from './CustomInput';
import { element } from 'prop-types';
import CustomCarousel from './CustomCarousel';
import { handleError, readFileData, addGear, fetchCategories } from '../actions/app.actions';

class AddGear extends Component {
  constructor() {
    super();

    this.progressSteps = ["Info", "Photo", "Address", "Price"];
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
    }

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
      <div key={i} className={ isDone ? 'add-gear-progress-item active': 'add-gear-progress-item' }>
        {
          function() {
            if(index === progressStep) {
              isDone = false;
              return <i className='far fa-dot-circle' aria-hidden="true"></i>
            } else if(isDone) {
              return <i className='fa fa-check-circle' aria-hidden="true"></i>
            } else {
              return <i className='far fa-circle' aria-hidden="true"></i>
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
    })
  }

  changeCategory(e) {
    this.setState({categoryName: e.target.textContent})
  }

  renderInfo() {
    const {selectedType, brand, model, description, isKit, categoryName, accessories} = this.state;
    const { categories } = this.props.app;

    return (
      <Form className="theme-form add-gear-info">
        <div className="flex-row">
          <div>
            <Dropdown className="theme-form-field" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                { categoryName }
              </DropdownToggle>
              <DropdownMenu right>
                {
                  categories.map((ele, index)=>{
                    return <DropdownItem key={index} onClick={this.changeCategory.bind(this)}>{ele.categoryName}</DropdownItem>
                  })
                }
              </DropdownMenu>
            </Dropdown>
            <div className="theme-form-field">
              <CustomInput required="required" value={brand} onChange={(value) => this.setState({brand: value})} placeholder='Brand' type="text"/>
            </div>
            <div className="theme-form-field">
              <CustomInput placeholder='Model' value={model} onChange={(value) => this.setState({model: value})} type="text"/>
            </div>
            <div className="theme-form-field">
              <CustomInput placeholder='Description' value={description} onChange={(value) => this.setState({description: value})} type="text"/>
            </div>
          </div>
          <div className="info-right-container">
            <div className="type-tabs">
              <input name="type" id="new" type="radio" value="new" onChange={this.onTypeChange}/>
              <label className={selectedType === "new" ? 'active' : ''} htmlFor="new">New</label>
              <input name="type" id="like-new" type="radio" value="like_new" onChange={this.onTypeChange}/>
              <label className={selectedType === "like_new" ? 'active' : ''} htmlFor="like-new">Like New</label>
              <input name="type" id="slightly-worn" type="radio" value="slightly_worn" onChange={this.onTypeChange}/>
              <label className={selectedType === "slightly_worn" ? 'active' : ''} htmlFor="slightly-worn">Slightly Worn</label>
              <input name="type" id="worn" type="radio" value="worn" onChange={this.onTypeChange}/>
              <label className={selectedType === "worn" ? 'active' : ''} htmlFor="worn">Worn</label>
            </div>
            <div className="theme-form-field">
              <Input type="checkbox" id="is-kit" checked={isKit} onChange={(e) => this.setState({isKit: e.target.checked})}/>
              <Label for="is-kit">Is this a Kit?</Label>
            </div>
            <div>
              <div className="theme-text-small">Accessories</div>
              <div className="theme-form-field">
                <Chips
                  value={accessories}
                  onChange={(accessories) => this.setState({accessories})}
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
        <img src={image} />
      </div>
    ))
    return (<div className="add-gear-photos">
      <div className="add-gear-images">
        { mappedImages }
        <div className="add-gear-addimage file-input-container">
          <i className="fas fa-plus-circle"></i>
          <input type="file" onChange={this.addImage.bind(this)}/>
        </div>
      </div>
    </div>)
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
          <CustomInput placeholder='City' type="text" value={city} onChange={(value) => this.setState({city: value})}/>
        </div>
        <div className="theme-form-field">
          <CustomInput placeholder='Region' type="text" value={region} onChange={(value) => this.setState({region: value})}/>
        </div>
        <div className="theme-form-field">
          <CustomInput placeholder='Address' type="text" value={address} onChange={(value) => this.setState({address: value})}/>
        </div>
        <div className="theme-form-field">
          <CustomInput placeholder='Postal Code' type="text" value={postalCode} onChange={(value) => this.setState({postalCode: value})}/>
        </div>
      </Form>
    )
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
        region,
        address,
        postalCode,
        replacementValue,
        pricePerDay
      }

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
      <div key={'accessory-' + index} className="">{ accessory }</div>
    ));
    return <div className="add-gear-price">
      <div>
        <div className="theme-text-small text-gray">{categoryName}</div>
        <h4>{ brand + ' ' + model }</h4>

        <div className="price-type-tabs">
          <input id="new" type="radio" value="new"/>
          <label className={selectedType === "new" ? 'active' : ''} htmlFor="new">New</label>
          <input id="like-new" type="radio" value="like_new"/>
          <label className={selectedType === "like_new" ? 'active' : ''} htmlFor="like-new">Like New</label>
          <input id="slightly-worn" type="radio" value="slightly_worn"/>
          <label className={selectedType === "slightly_worn" ? 'active' : ''} htmlFor="slightly-worn">Slightly Worn</label>
          <input id="worn" type="radio" value="worn"/>
          <label className={selectedType === "worn" ? 'active' : ''} htmlFor="worn">Worn</label>
        </div>

        <div className="gear-carousel">
          <CustomCarousel items={ numberOfUserImage } />
        </div>
      </div>
      <div className="gear-middle-container">
        <div className="flex-row gear-accessories-address">
          <div>
            <div className="theme-text-small text-gray">Accessories</div>
            {
              mappedAccessories
            }
          </div>
          <div>
            <div className="theme-text-small text-gray">Address</div>
            <div className="">{address}</div>
            <div className="">{city}</div>
          </div>
        </div>
        <div>
          <div className="theme-text-small text-gray">Description</div>
          <p>
            { description }
          </p>
        </div>
      </div>
      <div className="gear-right-container">
        <div>Replacement Value</div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">$</InputGroupAddon>
          <CustomInput placeholder='Amount' type="text" value={replacementValue} onChange={(value) => this.setState({replacementValue: value})}/>
        </InputGroup>
        <div>Price per day</div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">$</InputGroupAddon>
          <CustomInput placeholder='Amount' type="text" value={pricePerDay} onChange={(value) => this.setState({pricePerDay: value})}/>
        </InputGroup>

        <div className="buttons-container">
          <button className="theme-btn theme-btn-secondery" onClick={this.previousStep.bind(this)}><span className="fa fa-angle-left" /></button>
          <button className="theme-btn theme-btn-primary" onClick={this.addGearDetails.bind(this)} >Submit <span className="fa fa-angle-right" /></button>
        </div>
      </div>
    </div>
  }

  renderContent() {
    const {progressStep} = this.state;
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
    if(this.validate()) {
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

        if(numberOfUserImage && numberOfUserImage.length > 0) {
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

    handleError("Please provide the required details")
    return false;
  }

  render() {
    const { isGearAdded, replacementValue, pricePerDay, brand, model, categoryName, gearId } = this.state;

    if(isGearAdded) {
      return <div className="add-gear">
        <h1><i className="fa fa-check-circle primary-color"></i></h1>
        <h3>Gear Added Successfully</h3>

        <div className="success-message">
          <div className="theme-text-small">{ categoryName }</div>
          <h6>{ brand + ' ' + model}</h6>

          <div className="flex-row">
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
            <button className="theme-btn theme-btn-secondery theme-btn-link"><Link to="/listgear">List Gear</Link></button>
            <button className="theme-btn theme-btn-primary theme-btn-link"><Link to={`/gear/${gearId}`}>View Gear</Link></button>
          </div>
        </div>
      </div>
    }

    return (
      <div className="add-gear">
        <Breadcrumb>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem active>Add Gear</BreadcrumbItem>
        </Breadcrumb>
        <h3>Add Gear</h3>
        <div  className="add-gear-progress">
          {
            this.renderProgress()
          }
        </div>
        {
          this.renderContent()
        }

        {
          this.state.progressStep < 3 ? (
          <div>
            <div className="flex-row buttons-container">
              {
                this.state.progressStep !== 0 ?
                <button className="theme-btn theme-btn-secondery" onClick={this.previousStep.bind(this)}><span className="fa fa-angle-left" /> Back</button> :
                null
              }

              <button className="theme-btn theme-btn-primary" onClick={this.nextStep.bind(this)}>Continue <span className="fa fa-angle-right" /></button>
            </div>
          </div>) : null
        }
      </div>);
  }
}

export default connect(({app}) => {
  return {
    app
  };
})(AddGear);
