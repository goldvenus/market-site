import React from 'react';
import {
  Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { addFavourites } from '../../actions/app.actions';

const CardView = ({ gear_detail: { numberOfUserImage, brand, total_rating, city, rating, pricePerDay, gearid}}) => {

  return (
    <Col md="8" className="cardz">
      <Card className="gear_card_view">
        <CardImg top width="100%" src={numberOfUserImage ? numberOfUserImage[0] :[]} alt="Card image cap" />
        <CardBody>
          <CardTitle>{brand}</CardTitle>
          <CardSubtitle>
            <span className="stars">
              {
                [1,2,3,4,5].map((i)=>{
                  return <i className="fa fa-star" key={i}></i>
                })
              }

            </span> &nbsp;
            <span>
              {rating}
            </span>
            <span className="total">
              {`(${total_rating})`}
            </span>&nbsp;  &nbsp;
            <span className="address">
              <i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;
              {city}
            </span>
          </CardSubtitle>
          <CardText>
            <span className="price"> ${pricePerDay} </span>
            <span className="theme-text-small text-gray"> /per day</span>
          </CardText>
          <div className="buttons">
            <Button className="cart"><Link to={`/gear/${gearid}`}>Add to cart</Link></Button>
            <Button className="fav" onClick={() => addFavourites({ gearid })}><i className="fa fa-heart"></i></Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default CardView;
