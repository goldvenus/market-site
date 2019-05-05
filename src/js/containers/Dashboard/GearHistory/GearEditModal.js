import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Dropdown, Form, DropdownToggle, DropdownMenu,
    DropdownItem, Label
} from 'reactstrap';
import Textarea from 'muicss/lib/react/textarea';
import 'muicss/dist/css/mui.min.css';
import Chips from 'react-chips';
import CustomInput from '../../../components/CustomInput';
import { getGear, editGear } from '../../../core/actions/gear.action'
import { handleError, readFileData } from "../../../core/actions/common.action";
import { fetchCategories } from '../../../core/actions/category.action';
import CustomSpinner from "../../../components/CustomSpinner";
import Modal from "react-responsive-modal";

class GearEditModal extends Component {
    constructor(props) {
        super(props);
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
            city: '',
            region: '',
            address: '',
            postalCode: '',
            replacementValue: '',
            pricePerDay: '',
            startDate: new Date(),
            endDate: new Date(),
            loadingdata: false
        };
        this.gearid = props.gearid;
    }

    componentDidMount() {
        getGear(this.gearid);
        fetchCategories();
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
                accessories: props.gear.accessories,
                numberOfUserImage: props.gear.numberOfUserImage,
                city: props.gear.city,
                region: props.gear.product_region,
                address: props.gear.address,
                postalCode: props.gear.postalCode,
                replacementValue: props.gear.replacementValue,
                pricePerDay: props.gear.pricePerDay
            });
        }
    }

    dataSave = async () => {
        try {
            const { categoryName, brand, model, description, selectedType, isKit, accessories, numberOfUserImage, city, region, address, postalCode, replacementValue, pricePerDay } = this.state;
            const data = {
                gearid: this.gearid,
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
            await editGear(data);
            this.props.onClose();
        } catch (e) {
        }
    };

    changeCategory = (e) => {
        this.setState({ categoryName: e.target.textContent });
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

    renderInfo () {
        const { brand, model,categoryName } = this.state;
        const { categories ,gear } = this.props;
        if(categoryName === 'Category'){
            this.setState({
                categoryName: gear.categoryName
            });
        }
        if(model === ''){
            this.setState({
                model: gear.model,
                brand: gear.brand
            });
        }
        return (
            <Form className="theme-form add-gear-info d-sm-none d-lg-block">
                <div className="flex-row">
                    <div className="ELBL_info_column">
                        <div className="col-lg-8 ELBLIC_div">
                            <p className="info_header">CATEGORIES</p>
                            <Dropdown  className="theme-form-field theme-form-dropdown " isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret >
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
                        <div className="col-lg-8 ELBLIC_div">
                            <p className="info_header">Brand</p>
                            <CustomInput required="required" value={brand} onChange={(value) => this.setState({ brand: value })} type="text"/>
                        </div>
                        <div className="col-lg-8 ELBLIC_div3">
                            <p className="info_header">Model</p>
                           <CustomInput required="required" value={model} onChange={(value) => this.setState({ model: value })} type="text"/>
                        </div>
                    </div>
                </div>
            </Form>);
    }

    renderPhotos () {
        const {numberOfUserImage} = this.state;

        const mappedImages = numberOfUserImage.map((image, index) => (
            <div className="add-gear-image" key={'gear-image-' + index}>
                <img src={image} alt="add gear" />
            </div>
        ));
        return (<div className="add-gear-photos">
            <div className="add-gear-images">
                {mappedImages}
                <div className="add-gear-addimage file-input-container">
                    <i className="fas fa-plus-circle"></i>
                    <input type="file" onChange={this.addImage.bind(this)}/>
                </div>
            </div>
        </div>);
    }

    renderAddress() {
        const { city, region, address, postalCode } = this.state;
        const { gear } = this.props;

        if(city === '')
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
                    <CustomInput placeholder='City' type="text" value={city}
                                 onChange={(value) => this.setState({ city: value })}/>
                    <CustomInput placeholder='Region' type="text" value={region}
                                 onChange={(value) => this.setState({ region: value })}/>
                </div>
                <div className='address-wrapper'>
                    <CustomInput placeholder='Address' type="text" value={address}
                                 onChange={(value) => this.setState({ address: value })}/>

                    <CustomInput placeholder='Postal Code' type="text" value={postalCode}
                                 onChange={(value) => this.setState({ postalCode: value })}/>
                </div>
            </Form>
        );
    }

    render() {
        const { gear, categories, onClose, onCalendar } = this.props;
        if (!gear || !categories) {
            return <CustomSpinner/>;
        }
        const { selectedType, replacementValue, pricePerDay ,accessories, isKit} = this.state;

        return (
            <Modal open={true} onClose={onClose} center classNames={{modal: "gear-edit-modal"}}>
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
                            <Textarea className="ELBLI_desc" label="DESCRIPTION" onChange = {(e) => this.setState({ description : e.target.value })} defaultValue={gear.description} floatingLabel={true}/>
                        </div>
                        <div className="ELBL_type">
                            <div className="theme-column info-right-container">
                                <div className="type-tab-div">
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
                                    <div className="theme-form-field kit-check">
                                        {/*<Checkbox type="checkbox" id="is-kit" checked={isKit}*/}
                                               {/*onChange={(e) => this.setState({ isKit: e.target.checked })}*/}
                                        {/*/>*/}
                                        <div className="input_svg pretty p-svg p-plain">
                                            <input type="checkbox" checked={isKit} onChange={(e) => this.setState({ isKit: e.target.checked })}/>
                                            <div className="state">
                                                <img className="svg check_svg" src="/images/Icons/task.svg" alt="task icon" />
                                            </div>
                                        </div>
                                        <Label for="is-kit">Is this a Kit?</Label>
                                    </div>
                                </div>
                                <div className="form-accessories">
                                    <div className="theme-text-small type_title_css">Accessories</div>
                                    <div className="theme-form-field">
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
                        <div className="ELBL_photos">
                            <p className="type_title_css">Photos</p>
                            {this.renderPhotos()}
                        </div>
                        <div className="ELBL_address">
                            {this.renderAddress()}
                        </div>
                    </div>
                    <div className="edit_listgear_body_right col-lg-8">
                        <div className = "ELBR_payment">
                            <div className="ELBLP_content">
                                <div className="ELBLPC_top">
                                    <div className="ELBLPCT_pay">
                                        <p >Replacement Value</p>
                                        <div className="ELBLPCTP_div">
                                            <p className="money_label">$</p>
                                            <input defaultValue={replacementValue}
                                                   onChange={(e) => this.setState({ replacementValue: e.target.value })}/>
                                        </div>
                                    </div>
                                    <div className="ELBLPCT_pay">
                                        <p>Price Per Day</p>
                                        <div className="ELBLPCTP_div">
                                            <p className="money_label">$</p>
                                            <input defaultValue={pricePerDay}
                                                   onChange={(e) => this.setState({ pricePerDay: e.target.value })}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="ELBLPC_down">
                                    <button className="ed_save" onClick={() => this.dataSave()}>save</button>
                                    <button onClick={() => onCalendar(this.state.gearid)}>Calendar</button>
                                </div>
                                <div className="ELBLPC_bottom"></div>
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
    categories: state.category.categories,
    gear: state.gear.gear,
    user: state.user.user,
});

export default connect(mapStateToProps)(GearEditModal);
