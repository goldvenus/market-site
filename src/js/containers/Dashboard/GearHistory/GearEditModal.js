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

class GearEditModal extends Component {
  constructor(props) {
    super(props);

    this.usedNames = [];
    this.suggestions = [];

    this.state = {
      dropdownOpen: false,
      selectedType: '',
      isGearAdded: false,
      gearid: '',
      categoryName: 'Category',
      brand: '',
      model: '',
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

      startDate: new Date(),
      endDate: new Date(),
      busy: false,
      curImage: null,
      isOpenConfirm: false
    };
    
    this.gearid = this.props.gearid;
  }

  async componentDidMount() {
    await getGear(this.gearid);
    // this.usedNames = await getUsedNames();
    // remove current product name from used list
    // if (this.props.gear.productName)
    //   this.usedNames = this.usedNames.filter(item => item !== this.props.gear.productName);
    //
    // this.autoGenerateSuggestions();
  }

  componentWillReceiveProps(props) {
    if (!!props.gear) {
      this.setState({
        gearid: this.gearid,
        categoryName: props.gear.categoryName,
        brand: props.gear.brand,
        model: props.gear.model,
        description: props.gear.description,
        selectedType: props.gear.type,
        isKit: props.gear.isKit,
        accessories: props.gear.accessories.map((item, key) => ({id: Date.now()+key, value: item, type: 1})),
        numberOfUserImage: props.gear.numberOfUserImage,
        city: props.gear.city,
        region: props.gear.product_region,
        address: props.gear.address,
        postalCode: props.gear.postalCode,
        replacementValue: props.gear.replacementValue,
        pricePerDay: props.gear.pricePerDay,
        productName: props.gear.productName ? props.gear.productName : ''
      }, this.addSuggestions);
    }
  }

  // autoGenerateSuggestions = () => {
  //   let suggestions = this.suggestions;
  //   let namesFromCategories = this.props.categories.map((item) => item.categoryName);
  //   suggestions = [...suggestions, ...namesFromCategories];
  //   if (this.props.gear.productName)
  //     suggestions = [this.props.gear.productName, ...suggestions];
  //   this.suggestions = [...new Set(suggestions)];
  //   this.forceUpdate();
  // };

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

  // handleChangeProductName = (newValue) => {
  //   let isDoubled = this.usedNames.indexOf(newValue) >= 0;
  //   this.setState({productName: newValue, isDoubled});
  // };

  dataSave = async () => {
    if (this.state.isDoubled) {
      handleError("Please input another product name");
      return;
    }
    const {
      categoryName,
      brand,
      model,
      productName,
      description,
      selectedType,
      isKit,
      accessories,
      numberOfUserImage,
      numberOfUserImageNew,
      numberOfUserImageRemoved,
      city,
      region,
      address,
      postalCode,
      replacementValue,
      pricePerDay
    } = this.state;
  
    let emptyCount = accessories.filter(item => item.value === '');
    if (emptyCount.length > 0 || categoryName === '' || brand === '' || model === '' || productName === '' || description === '' ||
      selectedType === '' || city === '' || region === '' || address === '' || postalCode === '' ||
      replacementValue === '' || pricePerDay === '') {
      handleError("Please input required information");
      return;
    }
    const data = {
      gearid: this.gearid,
      categoryName: categoryName.replace(' ', ''),
      brand,
      model,
      description,
      type: selectedType,
      isKit,
      accessories: accessories.map(item => item.value),
      numberOfUserImage,
      numberOfUserImageRemoved,
      numberOfUserImageNew,
      city,
      product_region: region,
      address,
      postalCode,
      replacementValue,
      pricePerDay,
      productName: productName
    };

    this.setState({busy: true});
    await editGear(data);
    this.setState({busy: false});
    this.props.onClose();
  };

  changeCategory = (e) => {
    this.setState({categoryName: e.target.textContent}, () => this.addSuggestions());
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
      let options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }
      try {
        const compressedFile = await imageCompression(imageFile, options);
        let image = await readFileData(compressedFile);
        let {numberOfUserImageNew} = this.state;
        numberOfUserImageNew.push(image);
        this.setState({
          numberOfUserImageNew
        });
      } catch (error) {
        console.log(error);
      }
    } catch {
      handleError('Please upload a valid1 image');
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
                    return <DropdownItem key={index}
                                         onClick={this.changeCategory.bind(this)}>{ele.categoryName}</DropdownItem>;
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
        <img src={image} alt="add gear" onClick={() => {
          this.setState({curImage: image, isOpenConfirm: true})
        }}/>
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
    const {gear} = this.props;

    if (city === '')
      this.setState({
        city: gear.city,
        region: gear.product_region,
        address: gear.address,
        postalCode: gear.postalCode
      });

    return (
      <Form className="theme-form add-gear-address">
        <p className="type_title_css">Address</p>
        <div className='address-wrapper'>
          <TextField
            id="standard-with-placeholder4"
            className="custom-beautiful-textfield"
            label='City'
            type="text"
            value={city}
            onChange={(e) => this.setState({city: (e && e.target && e.target.value) || ''})}
          />
          <TextField
            id="standard-with-placeholder5"
            className="custom-beautiful-textfield"
            label='Region'
            type="text"
            value={region}
            onChange={(e) => this.setState({region: (e && e.target && e.target.value) || ''})}
          />
        </div>
        <div className='address-wrapper'>
          <TextField
            id="standard-with-placeholder5"
            className="custom-beautiful-textfield"
            label='Address'
            type="text"
            value={address}
            onChange={(e) => this.setState({address: (e && e.target && e.target.value) || ''})}
          />
          <TextField
            id="standard-with-placeholder6"
            className="custom-beautiful-textfield"
            label='Postal Code'
            type="text"
            value={postalCode}
            onChange={(e) => this.setState({postalCode: (e && e.target && e.target.value) || ''})}
          />
        </div>
      </Form>
    );
  }

  render() {
    const {gear, onClose, onCalendar, isLoadingCategories, isLoadingGear, onDelete} = this.props;
    const {gearid} = this.state;
    if (!gear || !gearid || isLoadingCategories) {
      return <CustomSpinner/>;
    }
    const {selectedType, replacementValue, pricePerDay, accessories, isKit, description} = this.state;

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
  isLoadingGear: state.gear.isLoadingGear
});

export default connect(mapStateToProps)(GearEditModal);
