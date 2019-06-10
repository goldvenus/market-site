import React from 'react';
import { Row, Col } from 'reactstrap';

export default function(props){
  return(
    props.user ?
      <div className="user-detail">
        <div className="user-avatar" >
          <img src={props.user.picture} alt="" />
        </div>
        <div  className="user-info">
          <h3 className="user-name">{props.user.given_name}</h3>
          <Row>
            <Col sm="12" className="head-email-region">
              <p className="theme-text-small text-muted">Email</p>
              <p className="text-muted-email">{props.user.email}</p>
            </Col>
            <Col sm="12" className="head-phone-region">
              <p className="theme-text-small text-muted">Phone</p>
              <p className="text-muted-phone">{props.user.phone_number} </p>
            </Col>
          </Row>
        </div>
      </div>
       :
      <Row className="user-detail">
        <Col >
          <img src={'/images/avatar.png'} alt="" />
        </Col>
        <Col className="user-avatar">
          <h3 className="user-name">Name placeholder</h3>
          <Row>
            <Col sm="8">
              <p className="theme-text-small text-muted">Email</p>
              <p>placeholder@gmail.com</p>
            </Col>
            <Col sm="8">
              <p className="theme-text-small text-muted">Phone</p>
              <p>+375 (29) 579-89-93</p>
            </Col>
          </Row>
        </Col>
      </Row>
  );
}
