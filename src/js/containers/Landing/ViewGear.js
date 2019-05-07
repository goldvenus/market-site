import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import DatePicker from 'react-datepicker';
import {
    Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import CustomCarousel from '../../components/CustomCarousel';
import { getGear } from "../../core/actions/gear.action";
import { addCart } from "../../core/actions/cart.action";
import { handleError } from "../../core/actions/common.action";
import { formatDate } from "../../core/helper";
import UrllinkClass from "../../components/UrllinkClass";

class ViewGear extends Component {
  constructor(props) {
    super(props);

    this.gearid = props.match.params.id;

    getGear(this.gearid);

    this.state = {
      startDate: new Date(),
      endDate: new Date()
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
          this.props.history.push('/cart');
        }
      }
    } catch {
      handleError('Gear is not added to cart');
    }
  }

  render() {
    const { gear, user } = this.props;

    if (!gear) {
      return <div className="centered-content">Loading...</div>;
    }

    const name = gear.brand + ' ' + gear.model;

    return (
      <div className="view-gear centered-content">
        <div className="left-container">
          <CustomCarousel items={gear.numberOfUserImage}/>
        </div>
        <div className="right-container">
          <div>
            <Breadcrumb>
              <UrllinkClass name="Home"></UrllinkClass>
                <span className="space_slash_span">/</span>
              <UrllinkClass name="Rent Gears"></UrllinkClass>
                <span className="space_slash_span">/</span>
              <UrllinkClass name={gear.categoryName}></UrllinkClass>
                <span className="space_slash_span">/</span>
              <BreadcrumbItem active>{name}</BreadcrumbItem>
            </Breadcrumb>

            <div className="right-container">
              <div className="gear-info">
                <div className="theme-form-small text-gray">{gear.categoryName}</div>
                <h4>{name}</h4>

                <div className="theme-form-small text-gray">Accessories</div>
                <div>{gear.accessories.join(', ')}</div>

                <div className="theme-form-small text-gray">Description</div>
                <div>{gear.description}</div>
              </div>
              <div className="gear-purchase">
                <div>
                  <Rating
                    emptySymbol='fa fa-star-o primary-color'
                    fullSymbol='fa fa-star primary-color'/>
                  <span className="theme-form-small"> 5.0 (25)</span>
                  <div>{gear.city}</div>
                </div>
                <div>
                  <div className="theme-form-small text-gray">Replacement Value</div>
                  <div>${gear.replacementValue}</div>
                </div>
                <div>
                  <div>${gear.pricePerDay} / day</div>
                </div>
                {
                  user && user.userid !== gear.userid ?
                    <div>
                      <div>
                        <DatePicker placeholderText="Pickup Date" selected={this.state.startDate}
                                    onChange={(date) => this.setState({ startDate: date })}/>
                      </div>
                      <div>
                        <DatePicker placeholderText="Return Date" selected={this.state.endDate}
                                    onChange={(date) => this.setState({ endDate: date })}/>
                      </div>

                      <div className="flex-row bottom-buttons">
                        <button className="theme-btn theme-btn-primary" onClick={this.addToCart}>Add to Cart</button>
                        <button className="theme-btn theme-btn-secondery"><i className="fa fa-heart primary-color"/>
                        </button>
                      </div>
                    </div>
                    : null
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gear: state.gear.gear,
  user: state.user.user,
});

export default connect(mapStateToProps)(ViewGear);
