import React from 'react';
import { connect } from 'react-redux'
import {
  Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import {addFavourites, deleteFavourite} from '../../actions/app.actions';

const ListView = ({ gear_detail: { numberOfUserImage, brand, total_rating, city, rating, pricePerDay, gearid, description },
                      history, favourites, carts}) => {

  const favored = gearid && favourites && favourites.Count > 0 ?
    favourites.Items.filter(item => item.gearid === gearid).length : 0;
  const carted = gearid && carts && carts.length > 0 ?
    carts.filter(item => item.gearid === gearid).length : 0;

  return (
    <Col sm="24">
      <Card className="gear_list_view">
        <div className="card-img">
          <CardImg top width="100%" src={numberOfUserImage ? numberOfUserImage[0] : []} alt="Card image cap" onClick={() => {
              history.push(`/gear/detail/${gearid}`);}} />
        </div>
        <CardBody>
          <div className="card-center">
            <CardTitle>
              {brand}&nbsp;
              {
                carted ? <i className="fas fa-check-circle"></i> : null
              }

            </CardTitle>
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
              <span className="price">${pricePerDay}</span>
              <span className="theme-text-small text-gray"> / per day</span>
            </CardText>
            <div className="buttons">
              <div className={`cart ${carted ? 'disabled' : ''}`}>
                  {
                      carted ? 'Added to cart' : <Link to={`/gear/detail/${gearid}`}>Add to cart</Link>
                  }
              </div>
              <div className="fav" onClick={() => {
                  favored>0 ? deleteFavourite({ gearid }) : addFavourites({ gearid })
                }}><i className={favored>0 ? "fas fa-heart" : "far fa-heart"}></i></div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

const mapStateToProps = store => ({
  carts: store.app.carts,
  favourites: store.app.favourites,
  isAuthenticated: store.app.isAuthenticated
});

export default connect(mapStateToProps)(withRouter(ListView));
