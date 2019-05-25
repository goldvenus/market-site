import React from 'react';

const SwiftModel = ({info, onDelete}) => {
  let IBAN = info.IBAN;
  let bankAccountHolderName = info.bankAccountHolderName;
  let swiftCode = info.swiftCode;
  
  return (
    <div className='card card-body card-model-wrapper'>
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
          <p>{IBAN}</p>
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