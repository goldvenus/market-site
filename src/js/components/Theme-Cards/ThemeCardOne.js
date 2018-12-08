import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay} from 'reactstrap';

const ThemeCardOne = ({ Gear: { gearImgSrc, catagory, gearTitle, gearPrice}}) =>{
    return (
      <Card inverse>
        <CardImg width="100%" src={gearImgSrc} alt="Card image cap" />
        <CardImgOverlay>
          <CardTitle>
            <span className="theme-text-small text-muted d-block">{catagory}</span>
            <span className="gear-title">{gearTitle}</span>
          </CardTitle>
          <CardText>
            <span>
              <span>{gearPrice}</span>{' '}
              <small className="">per day</small>
            </span>
            <span className="arrow"></span>
          </CardText>
        </CardImgOverlay>
      </Card>
    );
}

export default ThemeCardOne;
