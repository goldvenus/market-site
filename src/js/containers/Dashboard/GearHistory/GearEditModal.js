import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Dropdown, Form, DropdownToggle, DropdownMenu,
  DropdownItem, Label
} from 'reactstrap';
import Textarea from 'muicss/lib/react/textarea';
import 'muicss/dist/css/mui.min.css';
import {getGear, editGear} from '../../../core/actions/gear.action'
import {handleError, readFileData} from "../../../core/actions/common.action";
import CustomSpinner from "../../../components/common/CustomSpinner";
import Modal from "react-responsive-modal";
import ConfirmModal from "../../../components/common/ConfirmModal";
import TextField from "@material-ui/core/TextField/TextField";
import CustomInputWithButton from "../../../components/common/CustomInputWithButton";
import imageCompression from "browser-image-compression";
import CustomAutoComplete from "../../../components/common/CustomAutoComplete";
import {CloseIcon} from "../../../components/common/IconComponent";
import GooglePlaceAutocompleteNormal from "../../../components/common/GooglePlaceAutocompleteNormal";
import NumericInput from "react-numeric-input";

class GearEditModal extends Component {
  constructor(props) {
    super(props);

    // this.usedNames = [];
    this.suggestions = [];
    this._isMounted = false;
    this.state = {
      dropdownOpen: false,
      selectedType: '',
      isGearAdded: false,
      gearid: '',
      categoryName: 'Category',
      brand: '',
      model: '',
      quantity: 1,
      quantityTemp: 1,
      description: '',
      isKit: false,
      accessories: [],
      numberOfUserImage: [],
      numberOfUserImageNew: [],
      numberOfUserImageRemoved: [],
      city: '',
      region: '',
      address: '',
      postalCode: '',
      replacementValue: '',
      pricePerDay: '',
      productName: '',
      isDoubled: false,
      recommendedList: [],
      gearsList: [],
      startDate: new Date(),
      endDate: new Date(),
      busy: false,
      curImage: null,
      isOpenConfirm: false,
    };
    this.gearid = this.props.gearid;
  }

  async componentDidMount() {
    this._isMounted = true;
    await getGear(this.gearid);
    this.placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
  }

  componentWillReceiveProps(props) {
    if (!!props.gear) {
      let recommendedList = props.briefGearList.filter(item => props.gear.recommendedList && props.gear.recommendedList.indexOf(item.gearid) >= 0);
      // recommendedList = recommendedList.map(item => ({label: item.productName}));
      let gearsList = props.briefGearList.map(item => ({label: item.productName || ''}));
      
      this.setState({
        gearid: this.gearid,
        categoryName: props.gear.categoryName,
        brand: props.gear.brand,
        model: props.gear.model,
        quantity: props.gear.quantity,
        quantityTemp: props.gear.quantityTemp,
        description: props.gear.description,
        selectedType: props.gear.type,
        isKit: props.gear.isKit,
        accessories: props.gear.accessories.map((item, key) => ({id: Date.now()+key, value: item, type: 1})),
        numberOfUserImage: props.gear.numberOfUserImage,
        city: props.gear.location.city,
        region: props.gear.location.region,
        address: props.gear.location.address,
        postalCode: props.gear.location.postalCode,
        globalPos: props.gear.location.globalPos,
        replacementValue: props.gear.replacementValue,
        pricePerDay: props.gear.pricePerDay,
        productName: props.gear.productName ? props.gear.productName : '',
        recommendedList,
        gearsList
      });
      
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  dataSave = async () => {
    if (this.state.isDoubled) {
      handleError("Please input another product name");
      return;
    }
    const {
      categoryName,
      brand,
      model,
      isKit,
      quantity,
      quantityTemp,
      productName,
      description,
      selectedType,
      accessories,
      numberOfUserImage,
      numberOfUserImageNew,
      numberOfUserImageRemoved,
      city,
      region,
      address,
      globalPos,
      postalCode,
      replacementValue,
      pricePerDay,
      recommendedList
    } = this.state;
  
    let emptyCount = accessories.filter(item => item.value === '');
    if (emptyCount.length > 0 || !categoryName || !brand || !model ||
      !productName || !description || !quantity || !quantityTemp ||
      !selectedType || !city || !region || !address || !postalCode || !replacementValue || !pricePerDay) {
      handleError("Please input required information");
      return;
    }
    const data = {
      gearid: this.gearid,
      categoryName: categoryName.replace(' ', ''),
      brand,
      model,
      isKit,
      quantity,
      quantityTemp,
      description,
      type: selectedType,
      accessories: accessories.map(item => item.value),
      numberOfUserImage,
      numberOfUserImageRemoved,
      numberOfUserImageNew,
      replacementValue,
      pricePerDay,
      productName,
      location: {postalCode, address, region, city, globalPos},
      recommendedList: recommendedList.map(item => item.gearid)
    };

    this.setState({busy: true});
    await editGear(data);
    this.setState({busy: false});
    this.props.onClose();
  };

  changeCategory = (e) => {
    this.setState({categoryName: e.target.textContent});
  };

  onTypeChange = (e) => {
    this.setState({
      selectedType: e.target.value
    });
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

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
        let {numberOfUserImageNew} = this.state;
        numberOfUserImageNew.push(image);
        this._isMounted && this.setState({
          numberOfUserImageNew,
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

  handleDeleteImage = () => {
    const image = this.state.curImage;
    let newArr1 = this.state.numberOfUserImage.reduce((arr, item) => (item !== image ? [...arr, item] : arr), []);
    let newArr2 = this.state.numberOfUserImageNew.reduce((arr, item) => (item !== image ? [...arr, item] : arr), []);
    let newArr3 = newArr1.length < this.state.numberOfUserImage.length
      ? [...this.state.numberOfUserImageRemoved, image]
      : this.state.numberOfUserImageRemoved;

    this.setState({
      isOpenConfirm: false,
      numberOfUserImage: newArr1,
      numberOfUserImageNew: newArr2,
      numberOfUserImageRemoved: newArr3
    });
  };
  
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

  handleCloseConfirm = () => {
    this.setState({isOpenConfirm: false});
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
      this.setState({
        globalPos: location
      });
    }
    if (this._isMounted) {
      this.setState({
        [field]: val.terms[0].value,
      });
    }
  };
  
  handlePlaceKeyDown = (e, field) => {
    if (e.keyCode !== 13 && this.state[field] !== e.target.value) {
      this._isMounted && this.setState({
        [field]: e.target.value || ''
      });
    }
  };

  renderInfo() {
    let {brand, model, categoryName, productName} = this.state;
    let {categories} = this.props;

    return (
      <Form className="theme-form add-gear-info d-sm-none d-lg-block">
        <div className="flex-row">
          <div className="col-lg-12 ELBLIC_div">
            <p className="info_header">CATEGORIES</p>
            <Dropdown className="theme-form-field theme-form-dropdown " isOpen={this.state.dropdownOpen}
                      toggle={this.toggle}>
              <DropdownToggle caret>
                {categoryName}
              </DropdownToggle>
              <DropdownMenu right>
                {
                  categories.map((ele, index) => {
                    return <DropdownItem
                      key={index}
                      onClick={this.changeCategory.bind(this)}>{ele.categoryName}
                    </DropdownItem>;
                  })
                }
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="col-lg-12 ELBLIC_div">
            <TextField
              id="standard-with-placeholder1"
              className="custom-beautiful-textfield"
              label='BRAND'
              type="text"
              value={brand}
              // onBlur={this.addSuggestions}
              onChange={(e) => this.setState({brand: (e && e.target && e.target.value) || ''})}
            />
          </div>
        </div>
        <div className="flex-row">
          <div className="col-lg-12 ELBLIC_div">
            <TextField
              id="standard-with-placeholder2"
              className="custom-beautiful-textfield"
              label='MODEL'
              type="text"
              value={model}
              // onBlur={this.addSuggestions}
              onChange={(e) => this.setState({model: (e && e.target && e.target.value) || ''})}
            />
          </div>
          <div className="col-lg-12 ELBLIC_div">
            {/*<p className="info_header">Product Name</p>*/}
            {/*<div className={`custom-auto-suggest-container ${isDoubled ? "doubled" : ""}`}>*/}
              {/*<CustomAutosuggest*/}
                {/*value={productName}*/}
                {/*suggestions={this.suggestions}*/}
                {/*handleChange={this.handleChangeProductName}*/}
              {/*/>*/}
            {/*</div>*/}
            <TextField
              id="standard-with-placeholder3"
              className="custom-beautiful-textfield"
              label='PRODUCT NAME'
              type="text"
              value={productName}
              // onBlur={this.addSuggestions}
              onChange={(e) => this.setState({productName: (e && e.target && e.target.value) || ''})}
            />
          </div>
        </div>
      </Form>);
  }

  renderPhotos() {
    const {numberOfUserImage, numberOfUserImageNew} = this.state;

    const mappedImages = [...numberOfUserImage, ...numberOfUserImageNew].map((image, index) => (
      <div className="add-gear-image" key={'gear-image-' + index}>
        <img src={image} alt="add gear"/>
        <div onClick={() => {
          this.setState({curImage: image, isOpenConfirm: true})
        }}><CloseIcon/></div>
      </div>
    ));
    return (<div className="add-gear-photos">
      <div className="add-gear-images">
        {mappedImages}
        <div className="add-gear-addimage file-input-container">
          <i className="fas fa-plus-circle"/>
          <input type="file" onChange={this.addImage.bind(this)}/>
        </div>
      </div>
    </div>);
  }

  renderAddress() {
    const {city, region, address, postalCode} = this.state;

    return (
      <Form className="theme-form add-gear-address">
        <p className="type_title_css">Address</p>
        <div className='address-wrapper'>
          {/*<TextField*/}
            {/*id="standard-with-placeholder4"*/}
            {/*className="custom-beautiful-textfield"*/}
            {/*label='City'*/}
            {/*type="text"*/}
            {/*value={city}*/}
            {/*onChange={(e) => this.setState({city: (e && e.target && e.target.value) || ''})}*/}
          {/*/>*/}
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
        <div className='address-wrapper'>
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
      </Form>
    );
  }

  render() {
    let {gear, onClose, onCalendar, isLoadingCategories, isLoadingGear, onDelete} = this.props;
    let {gearid, recommendedList, gearsList} = this.state;
    
    if (!gear || !gearid || isLoadingCategories || isLoadingGear) {
      return <CustomSpinner/>;
    }
    
    const {selectedType, replacementValue, pricePerDay, accessories, isKit, description, quantity, quantityTemp} = this.state;
    const selectedItems = recommendedList.map(item => item.productName);
    
    return (
      <Modal open={true} onClose={onClose} center classNames={{modal: "gear-edit-modal gear-delete-modal"}}>
        {(this.state.busy || isLoadingGear) && <CustomSpinner/>}
        {this.state.isOpenConfirm &&
        <ConfirmModal
          onClose={this.handleCloseConfirm}
          onConfirm={this.handleDeleteImage}
          heading={"Delete Image"}
        />
        }
        <div className="gear-edit-modal-header">
          <h2>Edit Gear</h2>
        </div>
        <div className="edit_listgear container centered-content">
          <div className="edit_listgear_body_all">
            <div className="edit_listgear_body_left col-lg-16">
              <div className="ELBL_info">
                <div className="ELBL_info_title">
                  <p>info</p>
                </div>
                {this.renderInfo()}
                <Textarea className="ELBLI_desc" label="DESCRIPTION"
                  onChange={(e) => this.setState({description: e.target.value})}
                  value={description}
                  floatingLabel={true}
                />
              </div>
              <div className="ELBL_type">
                <div className="theme-column info-right-container">
                  <div className="type-tab-div">
                    <div className="type-tabs">
                      <input name="type" id="new" type="radio" value="new"
                             onChange={this.onTypeChange}/>
                      <label className={`new ${selectedType === 'new' ? 'active' : ''}`}
                             htmlFor="new">New</label>
                      <input name="type" id="like-new" type="radio" value="like_new"
                             onChange={this.onTypeChange}/>
                      <label className={`like-new ${selectedType === 'like_new' ? 'active' : ''}`}
                             htmlFor="like-new">Like New</label>
                      <input name="type" id="slightly-worn" type="radio" value="slightly_worn"
                             onChange={this.onTypeChange}/>
                      <label className={`slightly-worn ${selectedType === 'slightly_worn' ? 'active' : ''}`}
                             htmlFor="slightly-worn">Slightly
                        Worn</label>
                      <input name="type" id="worn" type="radio" value="worn"
                             onChange={this.onTypeChange}/>
                      <label className={`worn ${selectedType === 'worn' ? 'active' : ''}`}
                             htmlFor="worn">Worn</label>
                    </div>
                    <div className="theme-form-field kit-check">
                      <div className="input_svg pretty p-svg p-plain">
                        <input type="checkbox" checked={isKit}
                               onChange={(e) => this.setState({isKit: e.target.checked})}/>
                        <div className="state">
                          <img className="svg check_svg" src="/images/Icons/task.svg"
                               alt="task icon"/>
                        </div>
                      </div>
                      <Label for="is-kit">Is this a Kit?</Label>
                    </div>
                  </div>
                  <div className="form-accessories">
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
                          initialSelectedItem={selectedItems}
                        /> : null}
                    </div>
                  </div>
                  <div className='recommended-container'>
                    <div className="theme-text-small">Total Quantity</div>
                    <NumericInput min={1} max={100} value={quantity} className='quantity-input' onChange={(val) => this.setState({'quantity': val})}/>
                  </div>
                  <div className='recommended-container'>
                    <div className="theme-text-small">Available</div>
                    <NumericInput min={1} max={quantity} value={quantityTemp} className='quantity-input' onChange={(val) => this.setState({'quantityTemp': val})}/>
                  </div>
                </div>
              </div>
              <div className="ELBL_photos">
                <p className="type_title_css">Photos</p>
                {this.renderPhotos()}
              </div>
              <div className="ELBL_address">
                {this.renderAddress()}
              </div>
            </div>
            <div className="edit_listgear_body_right col-lg-8">
              <div className="ELBR_payment">
                <div className="ELBLP_content">
                  <div className="ELBLPC_top">
                    <div className="ELBLPCT_pay">
                      <p>Replacement Value</p>
                      <div className="ELBLPCTP_div">
                        <p className="money_label">$</p>
                        <input defaultValue={replacementValue}
                               onChange={(e) => this.setState({replacementValue: e.target.value})}/>
                      </div>
                    </div>
                    <div className="ELBLPCT_pay">
                      <p>Price Per Day</p>
                      <div className="ELBLPCTP_div">
                        <p className="money_label">$</p>
                        <input defaultValue={pricePerDay}
                               onChange={(e) => this.setState({pricePerDay: e.target.value})}/>
                      </div>
                    </div>
                  </div>
                  <div className="ELBLPC_down">
                    <button className="ed_save" onClick={this.dataSave}>Save</button>
                    <button className="ed_save" onClick={() => onDelete(this.state.gearid)}>Remove</button>
                    <button onClick={() => onCalendar(this.state.gearid)}>Calendar</button>
                  </div>
                  <div className="ELBLPC_bottom"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  gear: state.gear.gear,
  categories: state.category.categories,
  isLoadingGear: state.gear.isLoadingGear,
  briefGearList: state.gear.briefGearList
});

export default connect(mapStateToProps)(GearEditModal);
