import React from 'react';

const ArrowIcon = () => (
  <svg width="7" height="11" viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5.5 5.5L1 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrivalItem = ({ text, imgPath, link }) => (
  <div className="arrival-item" style={{ backgroundImage: `url(${imgPath})` }}>
    <div className="arrival-item-info-bottom">
      <div className="info-price-wrapper">
        <span className="info-price">{text}</span>
      </div>
      <a className="info-bottom-go-btn" href={link} target="_blank" rel="noopener noreferrer">
        <ArrowIcon/>
      </a>
    </div>

    <div className="arrival-item-info-bg"/>
  </div>
);

export default ArrivalItem;
