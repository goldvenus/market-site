import React from 'react';
import { Card, CardTitle, CardText, CardImg} from 'reactstrap';

const ThemeCardOne = ({ Gear: { gearImgSrc, catagory, gearTitle, gearPrice}}) =>{
    return (
      <Card inverse className="theme-1">
        <CardImg width="100%" src={gearImgSrc} alt="Card image cap" />
        <div className="overlay">
          <CardTitle>
            <span className="theme-text-small text-muted d-block">{catagory}</span>
            <span className="gear-title">{gearTitle}</span>
          </CardTitle>
          <CardText>
            <span>
              <span className="price">{gearPrice}</span>{' '}
              <small className="">per day</small>
            </span>
            <span className="arrow"></span>
          </CardText>
        </div>
      </Card>
    );
}

export default ThemeCardOne;
