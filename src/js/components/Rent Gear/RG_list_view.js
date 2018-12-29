import React from 'react';
import {
  Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const ListView = ({ gear_detail: { gear_img, gear_name, total_rating, location, rating, price_per_day } }) => {

  return (
    <Col sm="12">
      <Card className="gear_list_view">
        <div className="card-img">
          <CardImg top width="100%" src={gear_img} alt="Card image cap" />
        </div>
        <CardBody>
          <div className="card-center">
            <CardTitle>{gear_name}</CardTitle>
            <CardSubtitle>
              <span className="stars">
                {
                  [1, 2, 3, 4, 5].map(() => {
                    return <i className="fa fa-star"></i>
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
                <i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;
                {location}
              </span>
            </CardSubtitle>
            <CardText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, et. Eos, sequi laboriosam? Molestias, quasi perferendis minima nisi sed temporibus non provident.
            </CardText>
          </div>
          <div className="card-right">
            <CardText>
              <span className="price">{price_per_day}</span>
              <span className="theme-text-small text-gray">/per day</span>
            </CardText>
            <div className="buttons">
              <Button className="cart">Add to cart</Button>
              <Button className="fav"><i className="fa fa-heart"></i></Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default ListView;
