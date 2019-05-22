import React from 'react';
import {Link} from "react-router-dom";

const ArrowIcon = () => (
  <svg width="7" height="11" viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5.5 5.5L1 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrivalItem = ({ text, imgPath, link, itemIndex }) => {
  let style = itemIndex < 4 ? {backgroundImage: `url(${imgPath})`} : {backgroundImage: `url(${imgPath})`, opacity: `0.4`};
  
  return(
    <Link to="/FAQ#">
      <div className="arrival-item" style={style}>
        <div className="arrival-item-info-bottom">
          <div className="info-price-wrapper">
            <span className="info-price">{text}</span>
          </div>
          <span className="info-bottom-go-btn">
            <ArrowIcon/>
          </span>
        </div>
        
        <div className="arrival-item-info-bg"/>
      </div>
    </Link>
  );
};

export default ArrivalItem;