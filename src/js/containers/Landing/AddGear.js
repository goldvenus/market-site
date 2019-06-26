import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  Dropdown, DropdownToggle, DropdownMenu,
  DropdownItem, Label, InputGroup, InputGroupAddon
} from 'reactstrap';
import CustomInput from '../../components/CustomInput';
import CustomCarousel from '../../components/CustomCarousel';
import {handleError, readFileData} from '../../core/actions/common.action';
import {addGear, getGearsBriefInfo} from '../../core/actions/gear.action';
import Textarea from "muicss/lib/react/textarea";
import CustomSpinner from "../../components/common/CustomSpinner";
import TextField from "@material-ui/core/TextField/TextField";
import Modal from "react-responsive-modal";
import RentalTermsComponent from "../TermsAndPolicy/RentalTermsComponent";
import CustomLoaderLogo from "../../components/common/CustomLoaderLogo";
import CustomInputWithButton from "../../components/common/CustomInputWithButton";
import {fetchCategories} from "../../core/actions/category.action";
import {CloseIcon} from "../../components/common/IconComponent";
import imageCompression from "browser-image-compression";
import CustomAutoComplete from "../../components/common/CustomAutoComplete";
import GooglePlaceAutocompleteNormal from "../../components/common/GooglePlaceAutocompleteNormal";
import NumericInput from 'react-numeric-input';

class AddGear extends Component {
  constructor(props) {
    super(props);
    
    this._isMounted = false;
    this.progressSteps = ['Info', 'Photo', 'Address', 'Price'];
    this.suggestions = [];
    
    this.state = {
      progressStep: 0,
      dropdownOpen: false,
      selectedType: 'new',
      isGearAdded: false,
      gearId: '',
      categoryName: 'Select Category',
      brand: '',
      model: '',
      description: '',
      quantity: 1,
      isKit: false,
      isSelected: false,
      accessories: [],
      numberOfUserImage: [],
      city: '',
      region: '',
      address: '',
      postalCode: '',
      globalPos: false,
      replacementValue: '',
      pricePerDay: '',
      productName: '',
      isDoubled: false,
      gearsList: [],
      recommendedList: [],
      modalOpenState: 1,
      busy: false
    };
    
    this.toggle = this.toggle.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
  }
  
  async componentDidMount() {
    this._isMounted = true;
    await fetchCategories();
    getGearsBriefInfo();
    this.placesService = new window.google.maps.places.PlacesService(document.createElement('div'))
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps && this.props && this.props.briefGearList !== nextProps.briefGearList) {
      let gearsList = nextProps.briefGearList.map(item => ({label: item.productName || ''}));
      this.setState({gearsList});
    }
  }
  
  onTypeChange(e) {
    this.setState({
      selectedType: e.target.value
    });
  }
  
  changeCategory(e) {
    this.setState({categoryName: e.target.textContent});
    // this.setState({categoryName: e.target.textContent}, () => this.addSuggestions());
  }
  
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  
  handlePerformAddKit = (newKit) => {
    let {accessories} = this.state;
    accessories = accessories.map((item) => item.id === newKit.id ? newKit : item);
    this.setState({accessories});
  };
  
  handleRemoveKit = (kit) => {
    let {accessories} = this.state;
    accessories = accessories.filter((item) => item.id !== kit.id);
    this.setState({accessories});
  };
  
  handleAddKit = () => {
    let emptyKit = {
      id: Date.now(),
      type: 0,
      value: '',
      editable: true
    };
    this.setState({accessories: [...this.state.accessories, emptyKit]});
  };
  
  handleDeleteImage = (index) => {
    let {numberOfUserImage} = this.state;
    numberOfUserImage = numberOfUserImage.filter((item, key) => index !== key);
    this.setState({numberOfUserImage});
  };
  
  handleRestart = () => {
    this.setState({
      progressStep: 0,
      dropdownOpen: false,
      selectedType: 'new',
      isGearAdded: false,
      gearId: '',
      categoryName: 'Select Category',
      brand: '',
      model: '',
      quantity: 1,
      description: '',
      isKit: false,
      accessories: [],
      numberOfUserImage: [],
      city: '',
      region: '',
      address: '',
      postalCode: '',
      replacementValue: '',
      pricePerDay: '',
      productName: '',
      isDoubled: false,
      modalOpenState: 1,
      globalPos: false,
      busy: false
    });
  };
  
  handleGearChange = (val) => {
    let {recommendedList} = this.state;
    let {briefGearList} = this.props;
    let newGear = briefGearList.filter(item => item.productName === val);
    recommendedList = [...recommendedList, newGear[0]];
    this.setState({recommendedList});
  };
  
  handleGearDelete = (val) => {
    let {recommendedList} = this.state;
    recommendedList = recommendedList.filter(item => item.productName !== val);
    this.setState({recommendedList});
  };
  
  async handlePlaceChange(val, field) {
    let location = false;
    if (field === 'address') {
      location = await new Promise((resolve) => this.placesService.getDetails({placeId: val.place_id}, async (location, status) => {
        if (status === 'OK') {
          let lat = await location.geometry.location.lat();
          let lng = await location.geometry.location.lng();
          resolve({lat, lng});
        } else {
          resolve(false);
        }
      }));
      this._isMounted && this.setState({
        globalPos: location
      });
    }
    this._isMounted && this.setState({
      [field]: val.terms[0].value
    });
  };
  
  handlePlaceKeyDown = (e, field) => {
    if (e.keyCode !== 13 && this.state[field] !== e.target.value) {
      this._isMounted && this.setState({
        [field]: e.target.value || ''
      });
    }
  };
  
  renderProgress() {
    const {progressStep} = this.state;
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
  
  renderInfo() {
    let {selectedType, brand, model, isKit, quantity, categoryName, accessories, dropdownOpen, productName, description, gearsList} = this.state;
    let {categories} = this.props;
    
    return (
      <div className="theme-form add-gear-info container" id="tablet-form">
        <div className="flex-row d-md-block d-lg-flex">
          <div className="theme-column category_first">
            <Dropdown className="theme-form-field theme-form-dropdown category_first" isOpen={dropdownOpen}
                      toggle={this.toggle}>
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
              <TextField
                id="standard-with-placeholder1"
                className="custom-beautiful-textfield"
                label="Brand"
                type="text"
                value={brand}
                maxLength='50'
                // onBlur={this.addSuggestions}
                onChange={(e) => this.setState({brand: (e && e.target && e.target.value) || ''})}
              />
            </div>
            <div className="theme-form-field category_first">
              <TextField
                id="standard-with-placeholder2"
                className="custom-beautiful-textfield"
                label="Production Year"
                type="text"
                value={model}
                maxLength='50'
                // onBlur={this.addSuggestions}
                onChange={(e) => this.setState({model: (e && e.target && e.target.value) || ''})}
              />
            </div>
            <div className="theme-form-field category_first">
              <TextField
                id="standard-with-placeholder2"
                className="custom-beautiful-textfield"
                label="Product Name"
                type="text"
                value={productName}
                maxLength='50'
                onChange={(e) => this.setState({productName: (e && e.target && e.target.value) || ''})}
              />
            </div>
            <div className="theme-form-field category_first">
              <Textarea
                className="category_description_ta"
                label='Description'
                type="text"
                floatingLabel={true}
                value={description}
                onChange={(e) => {
                  this.setState({description: e.target.value})
                }}
              />
            </div>
          </div>
          <div className="theme-column info-right-container" id="new-tabs">
            <div className="info-right-newtabs-left">
              <div className="type-tabs">
                <input name="type" id="new" type="radio" value="new" onChange={this.onTypeChange}/>
                <label className={selectedType === 'new' ? 'active new' : 'new'} htmlFor="new">New</label>
                <input name="type" id="like-new" type="radio" value="like_new" onChange={this.onTypeChange}/>
                <label className={selectedType === 'like_new' ? 'active like-new' : 'like-new'} htmlFor="like-new">Like
                  New</label>
                <input name="type" id="slightly-worn" type="radio" value="slightly_worn" onChange={this.onTypeChange}/>
                <label className={selectedType === 'slightly_worn' ? 'active slightly_worn' : 'slightly_worn'}
                       htmlFor="slightly-worn">Slightly
                  Worn</label>
                <input name="type" id="worn" type="radio" value="worn" onChange={this.onTypeChange}/>
                <label className={selectedType === 'worn' ? 'active worn' : 'worn'} htmlFor="worn">Worn</label>
              </div>
              <div className="theme-form-field" id="kit-style">
                <div className="input_svg pretty p-svg p-plain">
                  <input type="checkbox" checked={isKit ? 'checked' : ''} onChange={() => this.setState({isKit: !isKit})}/>
                  <div className="state">
                    <img className="svg check_svg" src="/images/Icons/task.svg" alt="Check"/>
                  </div>
                </div>
                <Label for="is-kit">Is this a Kit?</Label>
              </div>
            </div>
            <div>
              <div className="theme-text-small accessories">Accessories</div>
              <div id="accessories-container">
                {accessories.map((item) => (
                  <CustomInputWithButton
                    item={item}
                    key={item.id}
                    onAdd={this.handlePerformAddKit}
                    onRemove={this.handleRemoveKit}
                  />)
                )}
              </div>
              <button
                className='add-kit-btn theme-btn theme-btn-filled-white'
                onClick={() => isKit && this.handleAddKit()}
                disabled={!isKit ? 'disabled' : ''}
              >+ Add</button>
            </div>
            <div className='recommended-container'>
              <div className="theme-text-small">Recommended Products</div>
              <div className='gear-list-container'>
                {gearsList.length > 0 ?
                <CustomAutoComplete
                  gears={gearsList}
                  floatingLabel='Type Gear Name'
                  handleGearChange={this.handleGearChange}
                  handleGearDelete={this.handleGearDelete}
                  initialSelectedItem={[]}
                /> : null}
              </div>
            </div>
            <div className='recommended-container'>
              <div className="theme-text-small">Quantity</div>
              <NumericInput min={1} max={100} value={quantity} className='quantity-input' onChange={(val) => this.setState({'quantity': val})}/>
            </div>
          </div>
        </div>
      </div>);
  }
  
  renderPhotos() {
    const mappedImages = this.state.numberOfUserImage.map((image, index) => (
      <div className="add-gear-image" key={'gear-image-' + index}>
        <img src={image} alt="Add Gear"/>
        <div onClick={() => this.handleDeleteImage(index)}><CloseIcon/></div>
      </div>
    ));
    return (<div className="add-gear-photos">
      <div className="add-gear-images">
        {mappedImages}
        {
          this.state.numberOfUserImage.length > 0 ?
            <div className="add-gear-addimage file-input-container">
              <i className="fas fa-plus-circle"/>
              <input type="file" onChange={this.addImage.bind(this)}/>
            </div>
            :
            <div className="add-gear-addimage file-input-container empty_page_addgear">
              <img src="/images/Icons/uploadimage.svg" alt=''/>
              <p className="empty_page_addgear_img">Upload Photos</p>
              <p>Upload only png, jpg or jpeg</p>
              <i>
                <button className="theme-btn theme-btn-primary empty_addgear_btn">Upload</button>
              </i>
              <input type='file' onChange={this.addImage.bind(this)}/>
            </div>
        }
      </div>
    </div>);
  }
  
  renderAddress() {
    const {city, region, address, postalCode} = this.state;
    
    return (
      <div className="theme-form add-gear-address">
        <div className="theme-form-field text-wrapper">
          <GooglePlaceAutocompleteNormal
            onPlaceChange={(val) => this.handlePlaceChange(val, 'city')}
            onPlaceKeyDown={(e) => this.handlePlaceKeyDown(e, 'city')}
            restriction={{country: ['IS']}}
            types={['(cities)']}
            initialValue={city}
            showIcon={false}
            placeholder='City'
            customClass='white-model'
          />
        </div>
        <div className="theme-form-field text-wrapper">
          <GooglePlaceAutocompleteNormal
            onPlaceChange={(val) => this.handlePlaceChange(val, 'region')}
            onPlaceKeyDown={(e) => this.handlePlaceKeyDown(e, 'region')}
            restriction={{country: ['IS']}}
            types={['(regions)']}
            initialValue={region}
            showIcon={false}
            placeholder='Region'
            customClass='white-model'
          />
        </div>
        <div className="theme-form-field text-wrapper">
          <GooglePlaceAutocompleteNormal
            onPlaceChange={(val) => this.handlePlaceChange(val, 'address')}
            onPlaceKeyDown={(e) => this.handlePlaceKeyDown(e, 'address')}
            restriction={{country: ['IS']}}
            types={['address']}
            initialValue={address}
            showIcon={false}
            placeholder='Address'
            customClass='white-model'
          />
        </div>
        <div className="theme-form-field text-wrapper">
          <GooglePlaceAutocompleteNormal
            onPlaceChange={(val) => this.handlePlaceChange(val, 'postalCode')}
            onPlaceKeyDown={(e) => this.handlePlaceKeyDown(e, 'postalCode')}
            restriction={{country: ['IS']}}
            types={['(regions)']}
            initialValue={postalCode}
            showIcon={false}
            placeholder='Postal Code'
            customClass='white-model'
          />
        </div>
      </div>
    );
  }
  
  renderPrice() {
    const {selectedType,
      accessories,
      numberOfUserImage,
      categoryName,
      brand,
      productName,
      address,
      city,
      description,
      replacementValue,
      pricePerDay,
      isSelected
    } = this.state;
    
    let mappedAccessories = accessories.map((accessory, index) => (
      <div key={'accessory-' + index} className="d-md-flex">{accessory.value}</div>
    ));
    return <div className="add-gear-price">
      <div id="fourth-content">
        <div className="theme-text-small text-gray">{categoryName}</div>
        <h4 id="label-content">{brand + ' ' + productName}</h4>
        
        <div className="price-type-tabs">
          <input id="new" type="radio" value="new"/>
          <label className={selectedType === 'new' ? 'active new type-tab' : 'new type-tab'} htmlFor="new">New</label>
          <input id="like-new" type="radio" value="like_new"/>
          <label
            className={selectedType === 'like_new' ? 'active like-new type-tab type-tab2' : 'like-new type-tab type-tab2'}
            htmlFor="like-new">Like New</label>
          <input id="slightly-worn" type="radio" value="slightly_worn"/>
          <label
            className={selectedType === 'slightly_worn' ? 'active slightly-worn type-tab type-tab3' : 'slightly-worn type-tab type-tab3'}
            htmlFor="slightly-worn">Slightly
            Worn</label>
          <input id="worn" type="radio" value="worn"/>
          <label className={selectedType === 'worn' ? 'active worn type-tab type-tab4' : 'worn type-tab type-tab4'}
                 htmlFor="worn">Worn</label>
        </div>
        
        <div className="gear-carousel">
          <CustomCarousel items={numberOfUserImage.map(item => ({src: item}))}/>
        </div>
      </div>
      <div className="gear-middle-container" id="middle-container">
        <div className="flex-row gear-accessories-address">
          <div>
            <div className="theme-text-small text-gray d-md-flex">Accessories</div>
            {mappedAccessories}
          </div>
          <div id="address-content">
            <div className="theme-text-small text-gray">Address</div>
            <div className="">{address}</div>
            <div className="">{city}</div>
          </div>
        </div>
        <div id="description-container">
          <div className="theme-text-small text-gray">Description</div>
          <div className="div_description"><span>{description}</span></div>
        </div>
      </div>
      <div className="gear-right-container" id="right-container">
        <div className="custom-theme-row">
          <div className="custom-theme-col">
            <div>Replacement Value</div>
            <InputGroup>
              <InputGroupAddon addonType="prepend">$</InputGroupAddon>
              <CustomInput type="text" value={replacementValue}
                           onChange={(value) => this.setState({replacementValue: value})}/>
            </InputGroup>
          </div>
          <div className="custom-theme-col">
            <div>Price per day</div>
            <InputGroup>
              <InputGroupAddon addonType="prepend">$</InputGroupAddon>
              <CustomInput type="text" value={pricePerDay}
                           onChange={(value) => this.setState({pricePerDay: value})}/>
            </InputGroup>
          </div>
        </div>
        <div>
          <div className="input_svg pretty p-svg p-plain">
            <input  type="checkbox" onChange={this.handleSetRead} checked={isSelected ? 'checked' : ''}/>
            <div className="state">
              <img className="svg check_svg" alt="" src="/images/Icons/task.svg"/>
            </div>
          </div>
          <Label for="save-address" className='checkbox-label'>
            Yes, I agree to the <br/>
            <span className='term-view-btn' onClick={() => this.handleOpenModal(2)}>Terms of Service</span>
          </Label>
        </div>
        <div className="buttons-container">
          <button className="theme-btn theme-btn-secondery" onClick={this.previousStep.bind(this)}><span
            className="fa fa-angle-left d-sm-none d-md-none d-lg-block"/><span
            className="d-sm-none d-lg-none d-md-block">Back</span></button>
          <button className="theme-btn theme-btn-primary" onClick={this.addGearDetails.bind(this)} disabled={!isSelected ? 'disabled' : ''}>Submit <span
            className="fa fa-angle-right"/></button>
        </div>
      </div>
    </div>;
  }
  
  renderContent() {
    const {progressStep} = this.state;
    let ui = '';
    switch (progressStep) {
      case 0:
        ui = this.renderInfo();
        break;
      case 1:
        ui = this.renderPhotos();
        break;
      case 2:
        ui = this.renderAddress();
        break;
      case 3:
        ui = this.renderPrice();
        break;
      default:
        break;
    }
    return ui;
  }
  
  previousStep() {
    let {progressStep} = this.state;
    this.setState({
      progressStep: --progressStep
    });
  }
  
  nextStep() {
    let {progressStep} = this.state;
    if (this.validate()) {
      this.setState({
        progressStep: ++progressStep
      });
    }
  }
  
  validate() {
    switch (this.state.progressStep) {
      case 0:
        const {categoryName, brand, model, quantity, description, selectedType, productName, accessories, isKit} = this.state;
        let emptyCount = accessories.filter(item => item.value === '');
        let isSetAccessorise = (!isKit || (isKit && emptyCount.length === 0));
        if (isKit && accessories.length === 0) {
          handleError('Please add at least one accessory');
          return false;
        } else if (emptyCount.length > 0) {
          handleError('Please add edited accessory');
          return false;
        }
        
        if (isSetAccessorise && categoryName && categoryName !== 'Select Category' && brand && model && quantity && description && selectedType && productName) {
          return true;
        }
        break;
      case 1:
        const {numberOfUserImage} = this.state;
        if (numberOfUserImage && numberOfUserImage.length > 0) {
          return true;
        }
        break;
      case 2:
        const {city, region, address, postalCode} = this.state;
        if (city && region && address && postalCode) {
          return true;
        }
        break;
      case 3:
        const {replacementValue, pricePerDay} = this.state;
        if (replacementValue && pricePerDay) {
          return true;
        }
        break;
      default:
    }
    handleError('Please provide required details!');
    return false;
  }
  
  async addImage(event) {
    try {
      const imageFile = event.target.files[0];
      if (imageFile.type.indexOf('image') === -1) {
        handleError('Only images are allowed');
        return;
      }
      let options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 400,
        useWebWorker: true
      };
      
      try {
        this.setState({busy: true});
        const compressedFile = await imageCompression(imageFile, options);
        let image = await readFileData(compressedFile);
        let {numberOfUserImage} = this.state;
        numberOfUserImage.push(image);
        this._isMounted && this.setState({
          numberOfUserImage,
          busy: false
        });
      } catch (error) {
        handleError('Please upload a valid image');
        this.setState({busy: false});
      }
    } catch {
      handleError('Please upload a valid image');
    }
  }
  
  async addGearDetails() {
    try {
      let {
        categoryName,
        brand,
        model,
        description,
        quantity,
        selectedType,
        isKit,
        isSelected,
        accessories,
        numberOfUserImage,
        city,
        region,
        address,
        globalPos,
        postalCode,
        replacementValue,
        productName,
        pricePerDay,
        recommendedList,
      } = this.state;
      
      isKit = !!isKit;
      
      const data = {
        categoryName: categoryName.replace(' ', ''),
        brand,
        model,
        quantity,
        description,
        type: selectedType,
        isKit,
        accessories: accessories.map(item => item.value),
        numberOfUserImage,
        replacementValue,
        pricePerDay,
        productName,
        location: {postalCode, address, region, city, globalPos},
        recommendedList: recommendedList.map(item => item.gearid)
      };
      
      if (!categoryName || !brand || !model || !description || !selectedType || !quantity ||
        (isKit && !accessories.length) || !productName || !numberOfUserImage || !city || !region ||
        !address || !postalCode || !replacementValue || !pricePerDay) {
        handleError("Please provide required details!");
        return;
      } else if (!isSelected) {
        handleError("Please read Terms of Service");
        return;
      }
      this.setState({busy: true});
      let gear = await addGear(data);
      if (gear && this._isMounted) {
        this.setState({
          busy: false,
          isGearAdded: true,
          gearId: gear.gearid
        });
      } else if (this._isMounted) {
        this.setState({
          busy: false
        });
      }
    } catch (e) {
    
    }
  }
  
  handleOpenModal = (val) => {
    this.setState({modalOpenState: val});
  };
  
  handleCloseModal = () => {
    this.setState({modalOpenState: 0});
  };
  
  handleSetRead = () => {
    this.setState({isSelected: !this.state.isSelected});
  };
  
  render() {
    const {
      isGearAdded,
      replacementValue,
      pricePerDay,
      brand,
      categoryName,
      productName,
      modalOpenState,
    } = this.state;
    
    const {isLoadingCategories} = this.props;
    if (isLoadingCategories) {
      return <CustomLoaderLogo/>;
    }
    
    if (isGearAdded) {
      return <div className="add-gear">
        <h1><i className="fa fa-check-circle primary-color"/></h1>
        <h3 className="success_gear_htag">Gear Added Successfully</h3>
        
        <div className="success-message">
          <div className="theme-text-small success_gear_categoryName">{categoryName}</div>
          <h6 className="success_gear_brand_modal">{brand + ' ' + productName}</h6>
          
          <div className="flex-row success_gear_reaplacement">
            <div>
              <div className="theme-text-small">Replacement Value</div>
              <div>${replacementValue}</div>
            </div>
            <div>
              <div className="theme-text-small">Price per day</div>
              <div className="price-per-day-value">${pricePerDay}</div>
            </div>
          </div>
          
          <div className="flex-row buttons-container">
            <button className="theme-btn theme-btn-secondery theme-btn-link success_first_button" onClick={this.handleRestart}>
              Add More
            </button>
            <button className="theme-btn theme-btn-primary theme-btn-link success_sencond_button"><Link
              to={`/dashboard/#myGear`}>View My Gear</Link>
            </button>
          </div>
        </div>
      </div>;
    }
    
    return (
      <div className="add-gear">
        {this.state.busy ? <CustomSpinner/> : null}
        <h3 className="header">Add Gear</h3>
        <div className="add-gear-progress">
          {this.renderProgress()}
        </div>
        
        {this.renderContent()}
        
        {this.state.progressStep < 3 ? (
          <div id="continue-button">
            <div className="flex-row buttons-container">
              {this.state.progressStep !== 0 ?
              <button className="theme-btn theme-btn-secondary theme-back-btn"
                      onClick={this.previousStep.bind(this)}>
                <span className="fa fa-angle-left"/> Back
              </button> : null}
              <button className="theme-btn theme-btn-primary theme-continue-btn"
                      onClick={this.nextStep.bind(this)}>Continue <span
                className="fa fa-angle-right"/></button>
            </div>
          </div>) : null
        }
  
        {modalOpenState === 2 ?
          <Modal open={true} onClose={this.handleCloseModal} center classNames={{modal: "confirm-modal privacy-modal"}}>
            <div className='confirm-modal-header'>
              <span>Rental Terms and Conditions</span>
            </div>
            <div className='confirm-modal-body'>
              <RentalTermsComponent/>
            </div>
          </Modal> : null
        }
      </div>);
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  isLoadingUser: state.user.isLoading,
  categories: state.category.categories,
  isLoadingCategories: state.category.isLoading,
  isLoadingBriefInfo: state.gear.isLoadingBriefInfo,
  briefGearList: state.gear.briefGearList
});

export default connect(mapStateToProps)(AddGear);
