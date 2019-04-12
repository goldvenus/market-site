import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Breadcrumb, BreadcrumbItem, Dropdown, Form, DropdownToggle, DropdownMenu,
    DropdownItem, Label
} from 'reactstrap';
import Textarea from 'muicss/lib/react/textarea';
import 'muicss/dist/css/mui.min.css';
import Chips from 'react-chips';
import CustomInput from '../../CustomInput';
import { handleError, getGear, addCart, formatDate,readFileData , fetchCategories } from '../../../actions/app.actions';

import Checkbox from "@material-ui/core/Checkbox";
import BarLoader from "react-bar-loader";

class EditGear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            selectedType: '',
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
            pricePerDay: '',
            startDate: new Date(),
            endDate: new Date()
        };
        this.gearid = props.match.params.id;
        getGear(this.gearid);
        this.addToCart = this.addToCart.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
    }
    async dataSave(){
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
            let gearId;
            console.log("Venus+++",data);
            //let gearId = await addGear(data);

            if (gearId) {
                this.setState({
                    isGearAdded: true,
                    gearId
                });
            }
        } catch (e) {

        }
    }
    componentDidMount() {
        fetchCategories();

    }
    changeCategory(e) {
        this.setState({ categoryName: e.target.textContent });
    }
    onTypeChange(e) {
        this.setState({
            selectedType: e.target.value
        });
    }
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    async addToCart() {
        try {
            const { startDate, endDate } = this.state;
            const { gear } = this.props;

            if (startDate && endDate) {
                let res = await addCart({
                    gearid: gear.gearid,
                    userid: gear.userid,
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate)
                });

                if (res) {
                    this.props.history.push('/cart');
                }
            }
        } catch {
            handleError('Gear is not added to cart');
        }
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
    renderInfo () {
        const { brand, model,categoryName, accessories } = this.state;
        const { categories ,gear, user} = this.props;
        if(categoryName == 'Category'){
            this.state.categoryName = gear.categoryName;
        }
        if(model==''){
            this.state.model=gear.model;
            this.state.brand=gear.brand;
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
                            <p className="info_header">Modal</p>
                           <CustomInput required="required" value={model} onChange={(value) => this.setState({ model: value })} type="text"/>
                        </div>
                    </div>
                </div>
            </Form>);
    }
    renderPhotos () {
        const {gear} = this.props;
        const {numberOfUserImage} = this.state;
        this.state.numberOfUserImage=gear.numberOfUserImage;
        const mappedImages = numberOfUserImage.map((image, index) => (
            <div className="add-gear-image" key={'gear-image-' + index}>
                <img src={image}/>
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
        if(city=='')
        {
            this.state.city = gear.city;
            this.state.region = gear.product_region;
            this.state.address = gear.address;
            this.state.postalCode = gear.postalCode;
        }
        return (
            <Form className="theme-form add-gear-address">
                <p className="type_title_css">Address</p>
                <table>
                    <tr>
                        <td className="theme-form-field">
                            <CustomInput placeholder='City' type="text" value={city}
                                         onChange={(value) => this.setState({ city: value })}/>
                        </td>
                        <td className="theme-form-field">
                            <CustomInput placeholder='Region' type="text" value={region}
                                         onChange={(value) => this.setState({ region: value })}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="theme-form-field">
                            <CustomInput placeholder='Address' type="text" value={address}
                                         onChange={(value) => this.setState({ address: value })}/>
                        </td>
                        <td className="theme-form-field">
                            <CustomInput placeholder='Postal Code' type="text" value={postalCode}
                                         onChange={(value) => this.setState({ postalCode: value })}/>
                        </td>
                    </tr>
                </table>
            </Form>
        );
    }
    render() {
        const { selectedType, replacementValue, pricePerDay ,accessories, isKit} = this.state;
        const { gear , categories } = this.props;
        if (!gear || !categories ) {
            return <BarLoader color="#F82462" height="5" />;
        }

        const name = gear.brand + ' ' + gear.model;
        if(selectedType == '') {
            this.state.selectedType = gear.type;
            this.state.replacementValue = gear.replacementValue;
            this.state.pricePerDay = gear.pricePerDay;
            this.state.accessories = gear.accessories;
            this.state.isKit = gear.isKit;
        }
        return (
            <div className="edit_listgear container centered-content">
                <div className="edit_listgear_header container">
                    <Breadcrumb>
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Rent Gears</BreadcrumbItem>
                        <BreadcrumbItem>{gear.categoryName}</BreadcrumbItem>
                        <BreadcrumbItem>{name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2 className="theme-page-title">Edit Gear</h2>
                </div>
                <div className="edit_listgear_body_all">
                    <div className="edit_listgear_body_left col-lg-16">
                        <div className="ELBL_info">
                            <div className="ELBL_info_title">
                                <p>info</p>
                            </div>
                            {this.renderInfo()}
                            <Textarea className="ELBLI_desc" label="DESCRIPTION" onChange = {(value) => this.setState({ description : value })} defaultValue={gear.description} floatingLabel={true}/>
                        </div>
                        <div className="ELBL_type">
                            <div className="theme-column info-right-container">
                                <div className="type-tab-div">
                                    <div className="type-tabs">
                                        <input name="type" id="new" type="radio" value="new" onChange={this.onTypeChange}/>
                                        <label className={selectedType == 'new' ? 'active' : ''} htmlFor="new">New</label>
                                        <input name="type" id="like-new" type="radio" value="like_new" onChange={this.onTypeChange}/>
                                        <label className={selectedType == 'like_new' ? 'active' : ''} htmlFor="like-new">Like New</label>
                                        <input name="type" id="slightly-worn" type="radio" value="slightly_worn" onChange={this.onTypeChange}/>
                                        <label className={selectedType == 'slightly_worn' ? 'active' : ''} htmlFor="slightly-worn">Slightly
                                            Worn</label>
                                        <input name="type" id="worn" type="radio" value="worn" onChange={this.onTypeChange}/>
                                        <label className={selectedType === 'worn' ? 'active' : ''} htmlFor="worn">Worn</label>
                                    </div>
                                    <div className="theme-form-field kit-check">

                                        <Checkbox type="checkbox" id="is-kit" checked={isKit}
                                               onChange={(e) => this.setState({ isKit: e.target.checked })}
                                        />
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
                                                   onChange={(value) => this.setState({ replacementValue: value })}/>
                                        </div>
                                    </div>
                                    <div className="ELBLPCT_pay">
                                        <p>Price Per Day</p>
                                        <div className="ELBLPCTP_div">
                                            <p className="money_label">$</p>
                                            <input defaultValue={pricePerDay}
                                                   onChange={(value) => this.setState({ pricePerDay: value })}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="ELBLPC_down">
                                    <button className="ed_save" onClick={() => this.dataSave()}>save</button>
                                    <button>Calendar</button>
                                </div>
                                <div className="ELBLPC_bottom"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.app.categories,
    gear: state.app.gear,
    user: state.app.user,
});

export default connect(mapStateToProps)(EditGear);
