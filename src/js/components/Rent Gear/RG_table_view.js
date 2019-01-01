import React from 'react';
import {
  Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const TableView = ({ gear_detail: { gear_img, gear_name, total_rating, location, rating, price_per_day } }) => {

  return (
    <Col sm="12">
      <Card className="gear_table_view">
        <div className="card-img">
          <CardImg top width="100%" src={gear_img} alt="Card image cap" />
        </div>
        <CardBody>
          <div className="card-center">
            <CardTitle>{gear_name}</CardTitle>
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
                {location}
              </span>
            </CardSubtitle>
          </div>
          <div className="card-right">
            <CardText>
              <span className="price">{price_per_day}</span>
              <span className="theme-text-small text-gray">/per day</span>
            </CardText>
            <div className="buttons">
              <Button className="cart"><i className="fa fa-shopping-cart"></i></Button>
              <Button className="fav"><i className="fa fa-heart"></i></Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default TableView;
