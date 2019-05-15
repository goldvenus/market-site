import React from 'react';
import { connect } from 'react-redux'
import {
  Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { addFavourites, deleteFavourite } from '../../core/actions/favourite.action';

const CardView = ({ gear_detail: { numberOfUserImage, brand, productName, total_rating, city, rating, pricePerDay, gearid},
    history, favored, carted, onOpenModal }) => {
  return (
    <Col md="8" className="cardz">
      <Card className="gear_card_view">
        <CardImg top width="100%" src={numberOfUserImage ? numberOfUserImage[0] :[]} alt="Card image cap" onClick={() => {
          history.push(`/gear/detail/${gearid}`);
        }}
        />
        {carted > 0 && <div className="card-checked"><i className="fas fa-check-circle"/></div>}
        <CardBody>
          <CardTitle>{brand}<br/>{productName}</CardTitle>
          <CardSubtitle>
            <span className="stars">
              {
                [1,2,3,4,5].map((i)=>{
                  return <i className="fa fa-star" key={i}/>
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
              <i className="fa fa-map-marker" aria-hidden="true"/>&nbsp;
              {city}
            </span>
          </CardSubtitle>
          <CardText>
            <span className="price"> ${parseFloat(pricePerDay*(1+0.15+0.21)).toFixed(2)} </span>
            <span className="theme-text-small text-gray"> /per day</span>
          </CardText>
          <div className="buttons">
            <Button className='cart' onClick={() => onOpenModal(gearid)}>Add to Cart</Button>
            <Button className="fav" onClick={() => {
                favored>0 ? deleteFavourite({ gearid }) : addFavourites({ gearid })
              }}><i className={favored ? "fas fa-heart" : "far fa-heart"}/></Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

const mapStateToProps = store => ({
  isAuthenticated: store.user.isAuthenticated
});
export default connect(mapStateToProps)(withRouter(CardView));
