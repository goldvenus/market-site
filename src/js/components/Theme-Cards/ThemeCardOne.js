import React from 'react';
import { Card, CardTitle, CardText, CardImg} from 'reactstrap';
import { Link } from 'react-router-dom';

const ThemeCardOne = ({ Gear: { numberOfUserImage, model,  catagory, brand, total_rating, city, rating, pricePerDay, gearid}}) =>{
    return (
      <Link to={`/gear/${gearid}`}>
      <Card inverse className="theme-1">
        <CardImg width="100%" src={numberOfUserImage && numberOfUserImage.length > 0 ? numberOfUserImage[0] : ""} alt="Card image cap" />
        <div className="overlay">
          <CardTitle>
            <span className="theme-text-small text-muted d-block">{catagory}</span>
            <span className="gear-title">{brand + " " + model}</span>
          </CardTitle>
          <CardText>
            <span>
              <span className="price">{pricePerDay}</span>{' '}
              <small className="">per day</small>
            </span>
            <span className="arrow"></span>
          </CardText>
        </div>
      </Card>
      </Link>
    );
}

export default ThemeCardOne;
