import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import DatePicker from 'react-datepicker';
import Modal from 'react-responsive-modal';
import ItemsCarousel from 'react-items-carousel';
import CustomCarousel from '../../CustomCarousel';
import {
    getGear,
    addCart,
    handleError,
    formatDate,
    deleteFavourite,
    addFavourites,
    getAllGears
} from '../../../actions/app.actions';
import {
    Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import {Link} from "react-router-dom";

class ViewGear extends Component {
    constructor(props) {
        super(props);

        this.gearid = props.match.params.id;

        getGear(this.gearid);
        // getAllGears();

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            descp: '',
            show_view_more: true,
            activeItemIndex: 1,
            open: false
        };

        this.addToCart = this.addToCart.bind(this);
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
                    this.onOpenModal();
                    // this.props.history.push('/cart');
                }
            }
        } catch {
            handleError('Gear is not added to cart');
        }
    }

    renderRecommendedProducts({ listGears }) {
        return listGears.map((item, i) => {
            const {numberOfUserImage, gearid, brand, rating, total_rating, city, pricePerDay} = item;
            const carted = false;
            const favored = false;
            return (
                <Col md="6" className="cardz">
                    <Card className="gear_card_view" key={i}>
                        <CardImg top width="100%" src={numberOfUserImage ? numberOfUserImage[0] : []} alt="Card image cap"
                                 onClick={() => {
                                     this.props.history.push(`/gear/detail/${gearid}`);
                                 }}
                        />
                        {
                            carted > 0 ?
                                <div className="card-checked"><i className="fas fa-check-circle"></i></div> : null
                        }
                        <CardBody>
                            <CardTitle>{brand}</CardTitle>
                            <CardSubtitle>
                                            <span className="stars">
                                              {
                                                  [1, 2, 3, 4, 5].map((i) => {
                                                      return <i className="fa fa-star" key={i}></i>
                                                  })
                                              }
                                            </span> &nbsp;
                                <span>
                                              {rating}
                                            </span>
                                <span className="total">
                                              {`(${total_rating})`}
                                            </span>&nbsp;  &nbsp;
                                <span className="address">
                                              <i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;
                                    {city}
                                            </span>
                            </CardSubtitle>
                            <CardText>
                                <span className="price"> ${pricePerDay} </span>
                                <span className="theme-text-small text-gray"> /per day</span>
                            </CardText>
                            <div className="buttons">
                                <button className={`cart ${carted ? 'disabled' : ''}`}>
                                    {
                                        carted ? 'Added to cart' : <Link to={`/gear/${gearid}`}>Add to cart</Link>
                                    }
                                </button>
                                <button className="fav" onClick={() => {
                                    favored > 0 ? deleteFavourite({gearid}) : addFavourites({gearid})
                                }}><i className={favored ? "fas fa-heart" : "far fa-heart"}></i></button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>)
        });
    }

    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { gear, user, carts, favourites, history } = this.props;

        if (!gear || !user || !carts || !favourites) {
            return <div className="centered-content">Loading...</div>;
        }

        const { numberOfUserImage, gearid, brand, rating, total_rating, city, replacementValue,
            pricePerDay, model, description, newArrival_Index, categoryName, accessories, userid } = gear;
        const name = brand + ' ' + model;
        const selectedType = newArrival_Index;
        const carted = gearid && carts && carts.length > 0 ?
            carts.filter(item => item.gearid === gearid).length : 0;
        const favored = gearid && favourites && favourites.Count > 0 ?
            favourites.Items.filter(item => item.gearid === gearid).length : 0;

        // description
        const is_first_enter = this.state.descp.length === 0;
        const is_view_more = description.length > 200;
        let descp = is_first_enter ? description : this.state.descp;
        descp = is_view_more && is_first_enter ? `${description.substr(0, 200)} ...` : descp;

        // make img objects for bottom carousel
        const children = numberOfUserImage.map((item, i) => (
            <div key={i} className='carousel-image-container'>
                <img src={item} alt="Image" />
            </div>
        ));

        // get recommended products
        const listGears = favourites.Items;

        return (
            <div className="detail-container centered-content">
                <div className="view-gear-detail row">
                    <div className="left-container col-lg-9 col-md-9 col-sm-12 col-xs-24">
                        <div className="carousel-top-container">
                            <CustomCarousel items={numberOfUserImage}/>
                        </div>
                        <div className="carousel-bottom-container row">
                            <ItemsCarousel
                                // Placeholder configurations
                                enablePlaceholder
                                numberOfPlaceholderItems={numberOfUserImage.length}
                                minimumPlaceholderTime={1000}
                                placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}

                                // Carousel configurations
                                numberOfCards={5}
                                gutter={12}
                                showSlither={true}
                                firstAndLastGutter={true}
                                freeScrolling={false}

                                // Active item configurations
                                requestToChangeActive={this.changeActiveItem}
                                activeItemIndex={this.state.activeItemIndex}
                                activePosition={'center'}

                                chevronWidth={24}
                                rightChevron={'>'}
                                leftChevron={'<'}
                                outsideChevron={false}
                            >
                                {children}
                            </ItemsCarousel>
                        </div>
                    </div>
                    <div className="right-container col-lg-15 col-md-15 col-sm-12 col-xs-24">
                        <div className="right-container1 row">
                            <Breadcrumb>
                                <BreadcrumbItem>Home</BreadcrumbItem>
                                <BreadcrumbItem>Rent Gears</BreadcrumbItem>
                                <BreadcrumbItem>{categoryName}</BreadcrumbItem>
                                <BreadcrumbItem active>{name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="gear-container row">
                                <div className="gear-info col-xs-24 col-sm-24 col-md-15 col-lg-15">
                                    <div className="theme-form-small text-gray category-name">{categoryName} </div>
                                    <h3>
                                        {name}
                                        {
                                            carted > 0 ?
                                                <i className="fas fa-check-circle"></i> : null
                                        }
                                    </h3>
                                    <div className="type-tabs">
                                        <input name="type" id="new" type="radio" value="new" onChange={this.onTypeChange}/>
                                        <label className={`type-tab ${selectedType === 1 ? 'active' : ''}`} htmlFor="new">New</label>
                                        <input name="type" id="like-new" type="radio" value="like_new" onChange={this.onTypeChange}/>
                                        <label className={`type-tab type-tab2 ${selectedType === 2 ? 'active' : ''}`} htmlFor="like-new">Like New</label>
                                        <input name="type" id="slightly-worn" type="radio" value="slightly_worn" onChange={this.onTypeChange}/>
                                        <label className={`type-tab type-tab3 ${selectedType === 3 ? 'active' : ''}`} htmlFor="slightly-worn">Slightly
                                            Worn</label>
                                        <input name="type" id="worn" type="radio" value="worn" onChange={this.onTypeChange}/>
                                        <label className={`type-tab type-tab4 ${selectedType === 4 ? 'active' : ''}`} htmlFor="worn">Worn</label>
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
                                        !this.state.show_view_more ? <div className="view-more" onClick={() => {
                                            this.setState({descp: description, show_view_more: true});
                                        }}>Fold...</div> : null
                                    }
                                </div>
                                <div className="gear-purchase col-xs-24 col-sm-24 col-md-9 col-lg-9">
                                    <div>
                                        <span>
                                        {
                                            [1, 2, 3, 4, 5].map(i =>
                                                <i className="fa fa-star star-selected" key={i}></i>
                                            )
                                        }
                                        </span>
                                        <span className="theme-form-small"> 5.0 (25)</span>
                                        <div className="gear-address"><i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;{city}</div>
                                    </div>
                                    <div>
                                        <div className="theme-form-small text-gray replacement">Replacement Value</div>
                                        <div className="replacement-content">${replacementValue}</div>
                                    </div>
                                    <div>
                                        <div className="price-per-day">${pricePerDay}<span className="price-per-day-text"> / per day</span></div>
                                    </div>
                                    {
                                        user && this.state.userid !== userid ?
                                            <div className="pickup-date">
                                                <div>
                                                    <DatePicker placeholderText="Pickup Date" selected={this.state.startDate}
                                                                onChange={(date) => this.setState({ startDate: date })}/>
                                                </div>
                                                <div>
                                                    <DatePicker placeholderText="Return Date" selected={this.state.endDate}
                                                                onChange={(date) => this.setState({ endDate: date })}/>
                                                </div>
                                            </div>
                                            : null
                                    }
                                    <div className="total-cost">
                                        <div>

                                        </div>
                                        <div className="cost-value">
                                            ${(5 - 1) * pricePerDay}
                                            <span className="cost-day"> for </span>
                                            5 days
                                        </div>
                                    </div>
                                    <div className="bottom-buttons">
                                        <button className={`theme-btn theme-btn-primary btn-cart ${carted ? 'disabled' : ''}`} onClick={this.addToCart}>
                                            {carted ? 'Added to Cart' : 'Add to Cart'}</button>
                                        <button className="theme-btn theme-btn-secondery btn-favor" onClick={() => {
                                            favored>0 ? deleteFavourite({ gearid }) : addFavourites({ gearid })}}>
                                            <i className={`${favored ? 'fas' : 'far'} fa-heart`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='recommend-container'>
                    <div className='recommend-heading'>
                        <span>RECOMMEDED FOR THIS PRODUCT</span>
                    </div>
                    <div className='recommend-body row'>
                        {
                            this.renderRecommendedProducts({listGears})
                        }
                    </div>
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div className='modal-header'></div>
                    <div className='modal-body'>
                        <div className=''></div>
                        <div className=''></div>
                        <div className=''></div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    gear: state.app.gear,
    listGears: state.app.allGears,
    user: state.app.user,
    carts: state.app.carts,
    favourites: state.app.favourites,
});

export default connect(mapStateToProps)(ViewGear);
