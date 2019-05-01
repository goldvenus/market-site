import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import CustomCarousel from "../CustomCarousel";
import ItemsCarousel from "react-items-carousel";


class History_dialog extends Component {
    constructor(props) {
        super(props);
       this.state = {
            activeItemIndex: 1,
        }
    }

    handleClose = () => {
        this.props.close();
    };

    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
    renderCarousel = (img_arr) => {
        // make img objects for bottom carousel
        const children = img_arr.map((item, i) => (
            <div key={i} className='carousel-image-container'>
                <img src={item} alt="" />
            </div>
        ));
        return (<ItemsCarousel
            // Placeholder configurations
            enablePlaceholder
            numberOfPlaceholderItems={img_arr.length}
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
        </ItemsCarousel>);
    };
    render() {
        const { info } = this.props;
        console.log("Venus_log=>info", info);
        const { numberOfUserImage, gearid, brand, rating, total_rating, city, replacementValue,
            pricePerDay, model, description, newArrival_Index, categoryName, accessories, userid } = info;
          return (
            <Modal open={this.props.open} onClose={this.props.close} center classNames={{modal: "order-modal"}}>
                <div className="gear_history_dialog_content">
                    <div className="gear_dialog_left_content col-13">
                        <p className="theme-form-small text-gray category d-lg-block">{model}</p>
                        <p className="theme-page-title">{brand + categoryName}</p>
                        <div className="type-tabs history_dialog_tabs">
                            <input name="type" id="new" type="radio" value="new"/>
                            <label className={`type-tab ${newArrival_Index === 1 ? 'active' : ''}`} htmlFor="new">New</label>
                            <input name="type" id="like-new" type="radio" value="like_new"/>
                            <label className={`type-tab type-tab2 ${newArrival_Index === 2 ? 'active' : ''}`} htmlFor="like-new">Like New</label>
                            <input name="type" id="slightly-worn" type="radio" value="slightly_worn"/>
                            <label className={`type-tab type-tab3 ${newArrival_Index === 3 ? 'active' : ''}`} htmlFor="slightly-worn">Slightly
                                Worn</label>
                            <input name="type" id="worn" type="radio" value="worn"/>
                            <label className={`type-tab type-tab4 ${newArrival_Index === 4 ? 'active' : ''}`} htmlFor="worn">Worn</label>
                        </div>
                        <div className="left-container">
                            <div className="carousel-bottom-container">
                                {
                                    this.renderCarousel(numberOfUserImage)
                                }
                            </div>
                            <div className="carousel-top-container history_dialog_big_img">
                                <CustomCarousel items={numberOfUserImage}/>
                            </div>

                        </div>
                    </div>
                    <div className="gear_dialog_right col-11">
                        <div className="gear_dialog_rating"></div>
                        <div className="gear_dialog_accessories">
                            <p className="theme-form-small text-gray categoryd-lg-block">Accessories</p>
                            {
                                accessories.map((acce_item, index)=>
                                    <p className="gear_dialog_text_content">{acce_item}</p>
                                )
                            }
                        </div>
                        <div className="gear_dialog_client_address">
                            <div className="gear_dialog_client">
                                <p className="theme-form-small text-gray category ">Client</p>
                                <div className="gear_dialog_client_content"/>
                                <div className="gear_dialog_client_image"/>
                                <div className="gear_dialog_client_address">
                                    <p>address</p>
                                    <p>Phone number</p>
                                </div>
                            </div>
                        </div>
                        <div className="gear_dialog_period_price"></div>
                        <div className="gear_dialog_description"></div>
                    </div>
                </div>
            </Modal>)
    }
}

export default History_dialog;