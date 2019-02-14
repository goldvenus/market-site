import React from 'react';
import {
  Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { addFavourites } from '../../actions/app.actions';

const ListView = ({ gear_detail: { numberOfUserImage, brand, total_rating, city, rating, pricePerDay, gearid, description } }) => {

  return (
    <Col sm="12">
      <Card className="gear_list_view">
        <div className="card-img">
          <CardImg top width="100%" src={numberOfUserImage ? numberOfUserImage[0] : []} alt="Card image cap" />
        </div>
        <CardBody>
          <div className="card-center">
            <CardTitle>{brand}</CardTitle>
            <CardSubtitle>
              <span className="stars">
                {
                  [1, 2, 3, 4, 5].map((i) => {
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
              {description}
            </CardText>
          </div>
          <div className="card-right">
            <CardText>
              <span className="price">{pricePerDay}</span>
              <span className="theme-text-small text-gray">/per day</span>
            </CardText>
            <div className="buttons">
              <Button className="cart"><Link to={`/gear/${gearid}`}>Add to cart</Link></Button>
              <Button className="fav"><i onClick={() => addFavourites({ gearid })} className="fa fa-heart"></i></Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default ListView;
