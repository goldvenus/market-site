import React, { Component } from 'react';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import Modal from "react-responsive-modal";
import {days} from "../../../../actions/app.actions";

class OrderConfirm extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    // renderCheckoutItems() {
    //     const {items} = this.props;
    //     return (
    //         <div className="paid-items">
    //             {
    //                 items.map((listItem, index) => {
    //                     console.log(listItem.type);
    //                     const d = days(listItem.startDate, listItem.endDate);
    //                     return <div key={`cart-item-${index}`} className="paid-item">
    //                         <div className='item-info'>
    //                             <div className='category-name'>{listItem.categoryName}</div>
    //                             <div className='brand-model'>{listItem.brand + ' ' + listItem.model}</div>
    //                             <div className="type-tabs">
    //                                 <input name="type" id="new" type="radio" value="new"/>
    //                                 <label className={`type-tab ${listItem.type === 'new' ? 'active' : ''}`}
    //                                        htmlFor="new">New</label>
    //                                 <input name="type" id="like-new" type="radio" value="like_new"/>
    //                                 <label
    //                                     className={`type-tab type-tab2 ${listItem.type === 'like_new' ? 'active' : ''}`}
    //                                     htmlFor="like-new">Like New</label>
    //                                 <input name="type" id="slightly-worn" type="radio" value="slightly_worn"/>
    //                                 <label
    //                                     className={`type-tab type-tab3 ${listItem.type === 'slightly_worn' ? 'active' : ''}`}
    //                                     htmlFor="slightly-worn">SlightlyWorn</label>
    //                                 <input name="type" id="worn" type="radio" value="worn"/>
    //                                 <label className={`type-tab type-tab4 ${listItem.type === 'worn' ? 'active' : ''}`}
    //                                        htmlFor="worn">Worn</label>
    //                             </div>
    //                             <div className="carousel-bottom-container">
    //                                 {
    //                                     this.renderCarousel(listItem.numberOfUserImage)
    //                                 }
    //                             </div>
    //                         </div>
    //                         <div className='pay-info'>
    //                             <div className='item-info'>
    //                                 <div>
    //                                     <div className='category-name'>{listItem.categoryName}</div>
    //                                     <div className='brand-model'>{listItem.brand + ' ' + listItem.model}</div>
    //                                 </div>
    //                             </div>
    //                             <div className='buyer-info'>
    //                                 <div className='buyer-info-left'>
    //                                     <div className='category-name'>{localStorage.username}</div>
    //                                     <div className='buyer-profile'>
    //                                         <img src={this.state.buyer_info.cognitoPool.userAttributes.picture}></img>
    //                                         <div>
    //                                             <span>Jakob Storm</span>
    //                                             <span>+1 (123) 562-42-11</span>
    //                                         </div>
    //                                     </div>
    //                                     <div className='period-price'>
    //
    //                                     </div>
    //                                 </div>
    //                                 <div className='buyer-info-right'>
    //                                     <div className='category-name'>{localStorage.username}</div>
    //                                     <div className='period-price'>
    //
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div className='payment-info'>
    //                                 <div>
    //                                     <div className="category-name">Period</div>
    //                                     <div>
    //                                         <b>${listItem.pricePerDay * d}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days
    //                                     </div>
    //                                 </div>
    //                                 <div>
    //                                     <div className="category-name">Price</div>
    //                                     <div>
    //                                         <b>${listItem.pricePerDay * d}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>;
    //                 })
    //             }
    //         </div>
    //     );
    // }

    render() {
        console.log("order confirm: ", this.props.info);
        // const {card_number, expiration_year, expiration_month, card_holder, total, tax, fee, amount} = this.props.info;

        return (
            <Modal open={this.props.open} center>
                <div className="order-modal-header"><h3>{this.props.info.ProjectName}</h3></div>
                <div className="paid-items order-modal-body">
                {
                    this.props.info.SoldItems.map((listItem, index) => {
                        const d = days(listItem.startDate, listItem.endDate);
                        return <div key={`cart-item-${index}`} className="paid-item">
                            <div className='pay-info pay-info-history'>
                                <div className='item-info'>
                                    <div>
                                        <div className='category-name'>{listItem.categoryName}</div>
                                        <div className='brand-model'>{listItem.brand + ' ' + listItem.model}</div>
                                    </div>
                                </div>
                                <div className='buyer-info'>
                                    <div className='buyer-info-left'>
                                        <div className='category-name'>{localStorage.username}</div>
                                        <div className='buyer-profile'>
                                            <img src={listItem.numberOfUserImage[0]}></img>
                                            <div>
                                                <span>Jakob Storm</span>
                                                <span>+1 (123) 562-42-11</span>
                                            </div>
                                        </div>
                                        <div className='period-price'>

                                        </div>
                                    </div>
                                    <div className='buyer-info-right'>
                                        <div className='category-name'>{localStorage.username}</div>
                                        <div className='period-price'>

                                        </div>
                                    </div>
                                </div>
                                <div className='payment-info'>
                                    <div>
                                        <div className="category-name">Period</div>
                                        <div>
                                            {(Date(listItem.startDate)).toString("MM.DD.YYYY")} - {(Date(listItem.endDate)).toString("MM.DD.YYYY")}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="category-name">Price</div>
                                        <div>
                                            <b>${listItem.pricePerDay * d}</b> for <b>{days(listItem.startDate, listItem.endDate)}</b> days
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='item-info'>
                                <div className='category-name'>{listItem.categoryName}</div>
                                <div className='brand-model'>{listItem.brand + ' ' + listItem.model}</div>
                                <div className="type-tabs">
                                    <input name="type" id="new" type="radio" value="new"/>
                                    <label className={`type-tab ${listItem.type === 'new' ? 'active' : ''}`} htmlFor="new">New</label>
                                    <input name="type" id="like-new" type="radio" value="like_new"/>
                                    <label className={`type-tab type-tab2 ${listItem.type === 'like_new' ? 'active' : ''}`} htmlFor="like-new">Like New</label>
                                    <input name="type" id="slightly-worn" type="radio" value="slightly_worn"/>
                                    <label className={`type-tab type-tab3 ${listItem.type === 'slightly_worn' ? 'active' : ''}`} htmlFor="slightly-worn">SlightlyWorn</label>
                                    <input name="type" id="worn" type="radio" value="worn"/>
                                    <label className={`type-tab type-tab4 ${listItem.type === 'worn' ? 'active' : ''}`} htmlFor="worn">Worn</label>
                                </div>
                                <div className="carousel-bottom-container">

                                </div>
                            </div>
                        </div>;
                    })
                }
            </div>
        </Modal>)
    }
}

export default OrderConfirm