import React from 'react';
import profile_pic from '../../../assets/images/profile-pic.jpg';
import {Row, Col} from 'reactstrap';

export default function(props){
  return(
    <Row className="user-detail">
      <Col sm="2">
        <img src={profile_pic} alt=""/>
      </Col>
      <Col sm="10" className="v-center">
        <h3 className="user-name">Markus Griffiths</h3>
        <Row>
          <Col sm="4">
            <p className="theme-text-small text-muted">Email</p>
            <p>markus.grif@gmail.com</p>
          </Col>
          <Col sm="4">
            <p className="theme-text-small text-muted">Phone</p>
            <p>+375 (29) 579-89-93 </p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}