import React from 'react';

const ArrowIcon = () => (
  <svg width="7" height="11" viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5.5 5.5L1 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrivalItem = ({ category, title, price, priceTime, photo, link }) => (
  <div className="arrival-item" style={{ backgroundImage: `url(${photo})` }}>

    <div className="arrival-item-info-middle">
                    <span className="info-category">
                      {category}
                    </span>
      <h2 className="info-title">{title}</h2>
    </div>

    <div className="arrival-item-info-separator"/>

    <div className="arrival-item-info-bottom">
      <div className="info-price-wrapper">
        <h2 className="info-price">${price}</h2>
        <span className="info-unit">{priceTime}</span>
      </div>
      <a className="info-bottom-go-btn" href={link} target="_blank" rel="noopener noreferrer">
        <ArrowIcon/>
      </a>
    </div>

    <div className="arrival-item-info-bg"/>
  </div>
);

export default ArrivalItem;
