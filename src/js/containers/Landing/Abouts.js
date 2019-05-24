import React, { Component } from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
// import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import {Link} from "react-router-dom";

class About extends Component {
  
  render() {
    return (
      <div className="about-us">
        <div className="about-us-head">
          <div className="heading-mobile">
              <Breadcrumb className="theme-text-small">
                  <BreadcrumbItem>Home </BreadcrumbItem>
                  <BreadcrumbItem active>About Us</BreadcrumbItem>
              </Breadcrumb>
              <h1>About Us</h1>
          </div>
          <div className="head-container">
            <div className="container">
              <div className="head-left">
                <Breadcrumb className="theme-text-small">
                  <BreadcrumbItem>Home </BreadcrumbItem>
                  <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-us-body">
          <Container>
            <Row className='home-subsection'>
              <Col lg='12' md='24' className='order-lg-1 order-md-2'>
                <h2>Rent the Gear<br/>Your Ideas Need</h2>
                <p>If you love creating, you are most likely familiar with the problem of feeling limited by your gear. With Creative Market, you can now rent any gear you might need from other creatives around you.</p>
                <Link to='/rentgear'><button className='theme-btn theme-btn-primary'>RENT GEAR</button></Link>
              </Col>
              <Col lg='12' md='24' className='rent-gear-back-img back-img order-lg-2 order-md-1'/>
            </Row>
            <Row className='home-subsection'>
              <Col lg='12' md='24' className='add-gear-back-img back-img'/>
              <Col lg='12' md='24'>
                <h2>List Your Own<br/>Gear for Rent</h2>
                <p>When you’re not renting from others, allow others to rent from you. Making your fancy gear work for you, even when you’re not using it yourself. It’s a win-win situation!</p>
                <Link to='/addgear'><button className='theme-btn theme-btn-primary'>ADD GEAR</button></Link>
              </Col>
            </Row>
            <Row className='home-subsection'>
              <Col lg='12' md='24' className='order-lg-1 order-md-2'>
                <h2>Secure Worldwide<br/>Rental Community</h2>
                <p>Every member of Creative Market must be verified through our platform before engaging in rentals. Renters must complete payments before gear pickup takes place, and funds are securely held in escrow until owner and renter have both confirmed that the handoff has taken place.</p>
                <Link to='/login'><button className='theme-btn theme-btn-primary'>SIGN UP</button></Link>
              </Col>
              <Col lg='12' md='24' className='secure-back-img back-img order-lg-2 order-md-1'/>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default About;
