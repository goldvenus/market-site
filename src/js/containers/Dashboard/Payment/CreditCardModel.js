import React from 'react';

const CreditCardModel = ({info, onDelete, selected}) => {
  let cardNumber = info.cardNumber.substr(-4, 4);
  let expiryDate = info.expirationDate;
  expiryDate = expiryDate.substr(0, 2) + ' / ' + expiryDate.substr(2, 2);
  let cardHolder = info.cardHolder;
  // let cardType = info.cardType;
  let style = selected ? {'border': 'solid 2px #f82462'} : {};
  
  return (
    <div className='card card-body card-model-wrapper' style={style}>
      <div className="card-text">
        <div className="payment-card">
          <div className='image-container'>
            <img src="/images/cards/master-card.svg" alt=""/>
            <img
              src="/images/Icons/cross/cross-light.svg"
              alt=""
              onClick={() => onDelete(info.methodId)}
            />
          </div>
          <div className="payment-card-number">
            <span><span>**** </span><span> **** </span><span> **** </span><span>{cardNumber}</span></span>
          </div>
          <div className="flex-row payment-card-other">
            <span>{expiryDate}</span>
            <span>{cardHolder}</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CreditCardModel;