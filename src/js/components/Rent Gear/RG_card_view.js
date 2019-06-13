import React from 'react';
import { connect } from 'react-redux'
import {Link} from "react-router-dom";
import {
  Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { withRouter } from 'react-router-dom';

const CardView = ({ gear_detail: { numberOfUserImage, categoryName, brand, productName, location: {city}, rating, pricePerDay, gearid},
    history, favored, carted }) => {
  return (
    <Col md="8" className="cardz">
      <Link to={{pathname: `/gear/detail/${gearid}`, state: {categoryName}}}>
        <Card className="gear_card_view">
          <CardImg top width="100%" src={numberOfUserImage ? numberOfUserImage[0] :[]} alt="Card image cap"/>
          {carted > 0 && <div className="card-checked"><i className="fas fa-check-circle"/></div>}
          <CardBody>
            <div className='card-title-wrapper'>
              <CardTitle>{brand}<br/>{productName}</CardTitle>
            </div>
            <div>
              <CardSubtitle>
                <span className="stars">
                {[1,2,3,4,5].map((i)=>{
                    return <i className="fa fa-star" key={i}/>
                  })
                }
                </span> &nbsp;
                <span>
                  5,0&nbsp;
                </span>
                <span className="total">
                  ({rating ? rating : 0})
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
              {/*<div className="buttons">*/}
                {/*<Button className='cart' onClick={() => onOpenModal(gearid)}>Add to Cart</Button>*/}
                {/*<Button className="fav" onClick={() => {*/}
                    {/*favored>0 ? deleteFavourite({ gearid }) : addFavourites({ gearid })*/}
                  {/*}}><i className={favored ? "fas fa-heart" : "far fa-heart"}/></Button>*/}
              {/*</div>*/}
            </div>
          </CardBody>
        </Card>
      </Link>
    </Col>
  );
};

const mapStateToProps = store => ({
  isAuthenticated: store.user.isAuthenticated
});
export default connect(mapStateToProps)(withRouter(CardView));
