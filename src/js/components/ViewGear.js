import React, { Component } from 'react';
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Rating from 'react-rating';
import DatePicker from "react-datepicker";
import CustomCarousel from './CustomCarousel';

const items = [
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

class ViewGear extends Component {
  render() {
    return (
      <div className="view-gear">
        <div className="left-container">
          <CustomCarousel items={ items } />
        </div>
        <div className="right-container">
          <div>
            <Breadcrumb>
              <BreadcrumbItem>Home Page</BreadcrumbItem>
              <BreadcrumbItem>Rent Gears</BreadcrumbItem>
              <BreadcrumbItem>Cameras</BreadcrumbItem>
              <BreadcrumbItem active>Panasonic LUMIX GH4</BreadcrumbItem>
            </Breadcrumb>

            <div className="right-container">
              <div className="gear-info">
                <div className="theme-form-small text-gray">Cameras</div>
                <h4>Panasonic LUMIX GH4</h4>

                <div className="theme-form-small text-gray">Accessories</div>
                <div>Tripod, Anti-glare lenses</div>

                <div className="theme-form-small text-gray">Description</div>
                <div>The Panasonic Lumix DMC-GH4 4K mirrorless micro four thirds digital camera is a true hybrid camera designed for both professional photo and video use. It features a 16.05-megapixel digital live MOS sensor and a 4-CPU Venus engine, capable of capturing high-resolution JPEG and RAW stills, as well as UHD 4K 3840x2160 30p/24p and cinematic DCI 4K 4096x2160 video at 24p. Like its predecessor, the GH4 features a weather-sealed magnesium alloy body, while offering increased resolution on both the OLED monitor and electronic viewfinder. It also features built-in Wi-Fi with NFC technology and a high-speed 49-point autofocus in both photo and video mode.</div>
              </div>
              <div className="gear-purchase">
                <div>
                  <Rating
                    emptySymbol='fa fa-star-o primary-color'
                    fullSymbol='fa fa-star primary-color' />
                  <span className="theme-form-small"> 5.0 (25)</span>
                  <div>London</div>
                </div>
                <div>
                  <div className="theme-form-small text-gray">Replacement Value</div>
                  <div>$1559</div>
                </div>
                <div>
                  <div>$159 / per day</div>
                </div>
                <div>
                  <DatePicker placeholderText="Pickup Date" />
                </div>
                <div>
                  <DatePicker placeholderText="Return Date" />
                </div>

                <div className="flex-row bottom-buttons">
                  <button className="theme-btn theme-btn-primary">Add to Cart</button>
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
  };
})(ViewGear);
