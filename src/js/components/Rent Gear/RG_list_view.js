import React from 'react';
import { connect } from 'react-redux'
import {
  Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import { addFavourites, deleteFavourite } from '../../core/actions/favourite.action';
import {redirectToSignIn} from "../../core/actions/user.action";

const ListView = ({ gear_detail: { numberOfUserImage, brand, productName, location: {city}, rating, pricePerDay, gearid, description, categoryName },
    history, favored, carted, onOpenModal, user }) => {
  return (
    <Col sm="24">
      <Card className="gear_list_view" onClick={() => history.push(`/gear/detail/${gearid}`, {categoryName})}>
        <div className="card-img">
          <CardImg top width="100%" src={numberOfUserImage ? numberOfUserImage[0] : []} alt="Card image cap"/>
        </div>
        <CardBody>
          <div className="card-center">
            <CardTitle>
              {brand}<br/>{productName}&nbsp;
              {carted > 0 && <i className="fas fa-check-circle"/>}
            </CardTitle>
            <CardSubtitle>
              <span className="stars">
                {
                  [1, 2, 3, 4, 5].map((i) => {
                    return <i className="fa fa-star" key={i}/>
                  })
                }
              </span> &nbsp;
              <span>
                5,0&nbsp;
              </span>
              <span className="total">
                ({rating})&nbsp;
              </span>
              <span className="address">
                <i className="fa fa-map-marker" aria-hidden="true"/>&nbsp;
                {city}
              </span>
            </CardSubtitle>
            <CardText>
              {description.length > 160 ? description.substr(0, 160) + '...' : description}
            </CardText>
          </div>
          <div className="card-right">
            <CardText>
              <span className="price"> ${parseFloat(pricePerDay*(1+0.06+0.21)).toFixed(2)} </span>
              <span className="theme-text-small text-gray"> / per day</span>
            </CardText>
            <div className="buttons">
              <div className='cart theme-btn theme-btn-primary' onClick={(e) => {e.stopPropagation();onOpenModal(gearid)}}>Add to cart</div>
              <div className="fav" onClick={(e) => {
                e.stopPropagation();
                if (!user) {
                  redirectToSignIn(history);
                  return;
                }
                  favored>0 ? deleteFavourite({ gearid }) : addFavourites({ gearid })
                }}><i className={favored>0 ? "fas fa-heart" : "far fa-heart"}/></div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

const mapStateToProps = store => ({
  isAuthenticated: store.user.isAuthenticated
});

export default connect(mapStateToProps)(withRouter(ListView));
