import React from 'react';
import profile_pic from '../../../../assets/images/profile-pic.jpg';
import {Row, Col} from 'reactstrap';
// import { getMaxListeners } from 'cluster';

export default function(props){
  return(
    props.user ?
      <Row className="user-detail">
        <Col sm="2">
          <img src={props.user.picture} alt="" />
        </Col>
        <Col sm="10" className="v-center">
          <h3 className="user-name">{props.user.given_name}</h3>
          <Row>
            <Col sm="4">
              <p className="theme-text-small text-muted">Email</p>
              <p>{props.user.email}</p>
            </Col>
            <Col sm="4">
              <p className="theme-text-small text-muted">Phone</p>
              <p>{props.user.phone_number} </p>
            </Col>
          </Row>
        </Col>
      </Row> 
       :
      <Row className="user-detail">
        <Col sm="2">
          <img src={'/images/avatar.png'} alt="" />
        </Col>
        <Col sm="10" className="v-center">
          <h3 className="user-name">Name placeholder</h3>
          <Row>
            <Col sm="4">
              <p className="theme-text-small text-muted">Email</p>
              <p>placeholder@gmail.com</p>
            </Col>
            <Col sm="4">
              <p className="theme-text-small text-muted">Phone</p>
              <p>+375 (29) 579-89-93</p>
            </Col>
          </Row>
        </Col>
      </Row>      
  );
}
