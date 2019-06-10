import React from 'react';

const SwiftModel = ({info, onDelete, selected}) => {
  let IBAN = info.IBAN;
  let bankAccountHolderName = info.bankAccountHolderName;
  let swiftCode = info.swiftCode;
  let firstFour = IBAN.substr(0, 4);
  let middleFour = ' * * * * ';
  let lastFour = IBAN.substr(-4, 4);
  let style = selected ? {'border': 'solid 2px #f82462'} : {};
  
  return (
    <div className='card card-body card-model-wrapper' style={style}>
      <div className="payment-card">
        <div className='image-container'>
          <span className='swift-text'>Swift</span>
          <img
            src="/images/Icons/cross/cross-light.svg"
            alt=""
            onClick={() => onDelete(info.methodId)}
          />
        </div>
        <div className="payment-card-number">
          <p><span>{firstFour}</span><span>{middleFour}</span><span>{lastFour}</span></p>
          <p>{swiftCode}</p>
        </div>
        <div className="flex-row payment-card-other">
          <span>{bankAccountHolderName}</span>
        </div>
      </div>
    </div>
  )
};

export default SwiftModel;