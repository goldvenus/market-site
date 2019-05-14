import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Breadcrumb, BreadcrumbItem, Dropdown, Form, DropdownToggle, DropdownMenu,
  DropdownItem, Label, InputGroup, InputGroupAddon
} from 'reactstrap';
import Chips from 'react-chips';
import CustomInput from '../../components/CustomInput';
import CustomCarousel from '../../components/CustomCarousel';
import { handleError, readFileData } from '../../core/actions/common.action';
import { addGear, getUsedNames } from '../../core/actions/gear.action';
import { fetchCategories } from "../../core/actions/category.action";
import Textarea from "muicss/lib/react/textarea";
import UrllinkClass from "../../components/UrllinkClass";
import CustomSpinner from "../../components/CustomSpinner";
import BarLoader from "react-bar-loader";
import TextField from "@material-ui/core/TextField/TextField";
import CustomAutosuggest from "../../components/common/CustomAutosuggest"

class AddGear extends Component {
  constructor(props) {
    super(props);

    this.progressSteps = ['Info', 'Photo', 'Address', 'Price'];
    this.usedNames = [];
    this.suggestions = [];

    this.state = {
      progressStep: 0,
      dropdownOpen: false,
      selectedType: 'new',
      isGearAdded: false,
      gearId: '',
      categoryName: '',
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
      pricePerDay: '',
      productName: '',
      isDoubled: false,
      busy: false
    };

    this.toggle = this.toggle.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
  }

  async componentDidMount() {
    await fetchCategories();
    this.usedNames = await getUsedNames();
    this.autoGenerateSuggestions();
  }

  autoGenerateSuggestions = () => {
    let suggestions = this.suggestions;
    let namesFromCategories = this.props.categories.map((item) => item.categoryName);
    suggestions = [...suggestions, ...namesFromCategories];
    this.suggestions = [...new Set(suggestions)];
    if (this.props.categories && this.props.categories.length > 0) {
        this.setState({categoryName: this.props.categories[0].categoryName});
    } else {
        this.forceUpdate();
    }
  };

  addSuggestions = () => {
    let {categoryName, brand, model} = this.state;
    let suggestions = this.suggestions;

    if (categoryName !== '' && brand !== '' && model !== '')
      suggestions = [categoryName + ' ' + brand + ' ' + model, ...suggestions];
    if (categoryName !== '' && brand !== '')
      suggestions = [categoryName + ' ' + brand, ...suggestions];
    if (categoryName !== '' && model !== '')
      suggestions = [categoryName + ' ' + model, ...suggestions];
    if (brand !== '' && model !== '')
      suggestions = [brand + ' ' + model, ...suggestions];
    if (brand !== '')
      suggestions = [brand, ...suggestions];
    if (model !== '')
      suggestions = [model, ...suggestions];

    this.suggestions = [...new Set(suggestions)];
    this.forceUpdate();
  };

  handleChangeProductName = (newValue) => {
    let isDoubled = this.usedNames.indexOf(newValue) >= 0;
    this.setState({productName: newValue, isDoubled});
  };

  onTypeChange(e) {
    this.setState({
        selectedType: e.target.value
    });
  }

  changeCategory(e) {
    this.setState({ categoryName: e.target.textContent }, () => this.addSuggestions());
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

  renderInfo() {
    const { selectedType, brand, model, isKit, categoryName, accessories, isDoubled, dropdownOpen, productName } = this.state;
    const { categories } = this.props;

    return (
      <Form className="theme-form add-gear-info container add-gear-info-cusvenus" id="tablet-form">
        <div className="flex-row d-md-block d-lg-flex">
          <div className="theme-column category_first">
            <Dropdown className="theme-form-field theme-form-dropdown category_first" isOpen={dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                {categoryName}
              </DropdownToggle>
              <DropdownMenu right>
                {
                  categories.map((ele, index) => {
                    return <DropdownItem  key={index} onClick={this.changeCategory.bind(this)}>{ele.categoryName}</DropdownItem>;
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
                onBlur={this.addSuggestions}
                onChange={(e) => this.setState({ brand: (e && e.target && e.target.value) || ''})}
              />
            </div>
            <div className="theme-form-field category_first">
              <TextField
                id="standard-with-placeholder2"
                className="custom-beautiful-textfield"
                label="Model"
                type="text"
                value={model}
                maxLength='50'
                onBlur={this.addSuggestions}
                onChange={(e) => this.setState({ model: (e && e.target && e.target.value) || ''})}
              />
            </div>
            <div className="theme-form-field category_first">
              <div className={`custom-auto-suggest-container ${isDoubled ? "doubled" : ""}`}>
                <CustomAutosuggest
                  value={productName}
                  suggestions={this.suggestions}
                  handleChange={this.handleChangeProductName}
                />
              </div>
            </div>
            <div className="theme-form-field category_first">
              <Textarea
                className="category_description_ta"
                label='Description'
                type="text"
                floatingLabel={true}
                onChange={(e) => {
                  this.setState({ description: e.target.value })
                }}
              />
            </div>
          </div>
          <div className="theme-column info-right-container" id="new-tabs">
            <span>Select the condition of the item</span>
            <div className="info-right-newtabs-left">
              <div className="type-tabs">
                <input name="type" id="new" type="radio" value="new" onChange={this.onTypeChange}/>
                <label className={selectedType === 'new' ? 'active new' : 'new'} htmlFor="new">New</label>
                <input name="type" id="like-new" type="radio" value="like_new" onChange={this.onTypeChange}/>
                <label className={selectedType === 'like_new' ? 'active like-new' : 'like-new'} htmlFor="like-new">Like New</label>
                <input name="type" id="slightly-worn" type="radio" value="slightly_worn" onChange={this.onTypeChange}/>
                <label className={selectedType === 'slightly_worn' ? 'active slightly_worn' : 'slightly_worn'} htmlFor="slightly-worn">Slightly
                  Worn</label>
                <input name="type" id="worn" type="radio" value="worn" onChange={this.onTypeChange}/>
                <label className={selectedType === 'worn' ? 'active worn' : 'worn'} htmlFor="worn">Worn</label>
              </div>
              <div className="theme-form-field" id="kit-style">
                  <div className="input_svg pretty p-svg p-plain">
                      <input type="checkbox" value={isKit} onChange={(e) => this.setState({ isKit: e.target.checked })}/>
                      <div className="state">
                          <img className="svg check_svg" src="/images/Icons/task.svg" alt="Check" />
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
        <img src={image} alt="Add Gear" />
      </div>
    ));
    return (<div className="add-gear-photos">
      <div className="add-gear-images">
        {mappedImages}
          {
            this.state.numberOfUserImage.length>0 ?
              <div className="add-gear-addimage file-input-container">
                <i className="fas fa-plus-circle"/>
                <input type="file" onChange={this.addImage.bind(this)}/>
              </div>
              :
              <div className="add-gear-addimage file-input-container empty_page_addgear">
                <img  src="/images/Icons/uploadimage.svg" alt=''/>
                <p className="empty_page_addgear_img">Upload Photos</p>
                <p>Upload only png, jpg or jpeg</p>
                <i><button className="theme-btn theme-btn-primary empty_addgear_btn">Upload</button></i>
                <input type='file' onChange={this.addImage.bind(this)}/>
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
      handleError('Please upload a valid image!');
    }
  }

  renderAddress() {
    const { city, region, address, postalCode } = this.state;

    return (
      <Form className="theme-form add-gear-address">
        <div className="theme-form-field text-wrapper">
            <TextField
                id="standard-with-placeholder1"
                className="custom-beautiful-textfield"
                label="City"
                type="text"
                value={city}
                maxLength='50'
                onChange={(e) => this.setState({ city: (e && e.target && e.target.value) || ''})}
            />
        </div>
        <div className="theme-form-field text-wrapper">
            <TextField
                id="standard-with-placeholder2"
                className="custom-beautiful-textfield"
                label="Region"
                type="text"
                value={region}
                maxLength='50'
                onChange={(e) => this.setState({ region: (e && e.target && e.target.value) || ''})}
            />
        </div>
        <div className="theme-form-field text-wrapper">
            <TextField
                id="standard-with-placeholder3"
                className="custom-beautiful-textfield"
                label="Address"
                type="text"
                value={address}
                maxLength='50'
                onChange={(e) => this.setState({ address: (e && e.target && e.target.value) || ''})}
            />
        </div>
        <div className="theme-form-field text-wrapper">
            <TextField
                id="standard-with-placeholder4"
                className="custom-beautiful-textfield"
                label="Postal Code"
                type="text"
                value={postalCode}
                maxLength='50'
                onChange={(e) => this.setState({ postalCode: (e && e.target && e.target.value) || ''})}
            />
        </div>
      </Form>
    );
  }

  async addGearDetails() {
    try {
      let {
          categoryName,
          brand,
          model,
          description,
          selectedType,
          isKit,
          accessories,
          numberOfUserImage,
          city,
          region,
          address,
          postalCode,
          replacementValue,
          productName,
          pricePerDay
      } = this.state;
      isKit = !!isKit;

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
        pricePerDay,
        productName
      };

      if (!categoryName || !brand || !model || !description || !selectedType || !accessories || !productName ||
          !numberOfUserImage || !city || !region || !address || !postalCode || !replacementValue || !pricePerDay) {
          handleError("Please provide required details!");
          return;
      }
      this.setState({busy: true});
      let gear = await addGear(data);
      if (gear) {
        this.setState({
          busy: false,
          isGearAdded: true,
          gearId: gear.gearid
        });
      } else {
        this.setState({
          busy: false
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
              <label className={selectedType === 'new' ? 'active new type-tab' : 'new type-tab'} htmlFor="new">New</label>
              <input id="like-new" type="radio" value="like_new"/>
              <label className={selectedType === 'like_new' ? 'active like-new type-tab type-tab2' : 'like-new type-tab type-tab2'} htmlFor="like-new">Like New</label>
              <input id="slightly-worn" type="radio" value="slightly_worn"/>
              <label className={selectedType === 'slightly_worn' ? 'active slightly-worn type-tab type-tab3' : 'slightly-worn type-tab type-tab3'} htmlFor="slightly-worn">Slightly
                  Worn</label>
              <input id="worn" type="radio" value="worn"/>
              <label className={selectedType === 'worn' ? 'active worn type-tab type-tab4' : 'worn type-tab type-tab4'} htmlFor="worn">Worn</label>
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
          <div className="custom-theme-col">
            <div>Replacement Value</div>
            <InputGroup>
              <InputGroupAddon addonType="prepend">$</InputGroupAddon>
              <CustomInput  type="text" value={replacementValue}
                           onChange={(value) => this.setState({ replacementValue: value })}/>
            </InputGroup>
          </div>
          <div className="custom-theme-col">
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
      let { progressStep } = this.state;
      this.setState({
          progressStep: --progressStep
      });
  }

  nextStep() {
      let { progressStep } = this.state;
    if (this.validate()) {
      this.setState({
        progressStep: ++progressStep
      });
    }
  }

  validate() {
    switch (this.state.progressStep) {
      case 0:
        const { categoryName, brand, model, description, selectedType, productName, isDoubled } = this.state;
        if (categoryName && brand && model && description && selectedType && productName && !isDoubled) {
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
    handleError('Please provide required details!');
    return false;
  }

  render() {
    const { isGearAdded, replacementValue, pricePerDay, brand, model, categoryName, gearId } = this.state;
    const { isLoadingCategories } = this.props;
    if (isLoadingCategories || this.suggestions.length < 1) {
      return <BarLoader color="#F82462" height="5" />;
    }

    if (isGearAdded) {
      return <div className="add-gear">
        <h1><i className="fa fa-check-circle primary-color"/></h1>
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
              <div className="price-per-day-value">${pricePerDay}</div>
            </div>
          </div>

          <div className="flex-row buttons-container">
            <button className="theme-btn theme-btn-secondery theme-btn-link success_first_button"><Link to="/dashboard">My Gear</Link>
            </button>
            <button className="theme-btn theme-btn-primary theme-btn-link success_sencond_button"><Link to={`/gear/detail/${this.state.categoryName.replace(' ', '')}/${gearId}`}>View Gear</Link>
            </button>
          </div>
        </div>
      </div>;
    }

    return (
      <div className="add-gear">
        {
          this.state.busy ? <CustomSpinner/> : null
        }
        <Breadcrumb>
          <UrllinkClass name="Home"/>
            <span className="space_slash_span">/</span>
          <BreadcrumbItem active>Add Gear</BreadcrumbItem>
        </Breadcrumb>
        <h3 className="header">Add Gear</h3>
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
                    <button className="theme-btn theme-btn-secondary theme-back-btn" onClick={this.previousStep.bind(this)}>
                        <span className="fa fa-angle-left"/> Back
                    </button> : null
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
  categories: state.category.categories,
  isLoadingCategories: state.category.isLoading
});

export default connect(mapStateToProps)(AddGear);
