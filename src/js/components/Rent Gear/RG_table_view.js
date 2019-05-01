import React from 'react';
import { connect } from 'react-redux'
import {
  Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { addFavourites, deleteFavourite } from '../../core/actions/favourite.actions';

const TableView = ({ gear_detail: { numberOfUserImage, brand, total_rating, city, rating, pricePerDay, gearid},
                       history, favored, carted, onOpenModal }) => {
  return (
    <Col sm="24">
      <Card className="gear_table_view">
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
          </div>
          <div className="card-right">
            <CardText>
              <span className="price">${pricePerDay}</span>
              <span className="theme-text-small text-gray"> / per day</span>
            </CardText>
            <div className="buttons">
              <div className='cart' onClick={() => onOpenModal(gearid)}><i className="fa fa-shopping-cart"></i></div>
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
  isAuthenticated: store.user.isAuthenticated
});

export default connect(mapStateToProps)(withRouter(TableView));
