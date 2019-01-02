import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Rating from 'react-rating';
import DatePicker from "react-datepicker";
import CustomCarousel from './CustomCarousel';
import { getGear } from '../actions/app.actions';

class ViewGear extends Component {
  constructor(props) {
    super(props);

    this.gearid = props.match.params.id;

    getGear(this.gearid);
  }

  render() {
    const { gear } = this.props;

    if(!gear) {
      return <div className="centered-content">Loading...</div>
    }

    const name = gear.brand + ' ' + gear.model;

    return (
      <div className="view-gear centered-content">
        <div className="left-container">
          <CustomCarousel items={ gear.numberOfUserImage } />
        </div>
        <div className="right-container">
          <div>
            <Breadcrumb>
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Rent Gears</BreadcrumbItem>
              <BreadcrumbItem>{ gear.categoryName}</BreadcrumbItem>
              <BreadcrumbItem active>{ name }</BreadcrumbItem>
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
                    fullSymbol='fa fa-star primary-color' />
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
                <div>
                  <DatePicker placeholderText="Pickup Date" />
                </div>
                <div>
                  <DatePicker placeholderText="Return Date" />
                </div>

                <div className="flex-row bottom-buttons">
                  <button className="theme-btn theme-btn-primary theme-btn-link"><Link to="/cart">Add to Cart</Link></button>
                  <button className="theme-btn theme-btn-secondery"><i className="fa fa-heart primary-color" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    gear: store.app.gear
  };
})(ViewGear);
