import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {Link} from "react-router-dom";

const team = [
  { name: 'Joe Stapleton', job_title: 'Co-founder', img: '/images/aboutus/1.png' },
  { name: 'Jakob Storm', job_title: 'Co-founder', img: '/images/aboutus/2.png' },
  { name: 'Josh Kocaurek', job_title: 'CEO', img: '/images/aboutus/3.png' },
  { name: 'Tomass Sola', job_title: 'Lead Sales Manager', img: '/images/aboutus/4.png' },
  { name: 'Joe Stapleton', job_title: 'Co-founder', img: '/images/aboutus/5.png' },
  { name: 'Jakob Storm', job_title: 'Co-founder', img: '/images/aboutus/6.png' },
  { name: 'Josh Kocaurek', job_title: 'CEO', img: '/images/aboutus/7.png' },
  { name: 'Tomass Sola', job_title: 'Lead Sales Manager', img: '/images/aboutus/8.png' },
];

class About extends Component {
  
  render() {
    return (
      <div className="about-us">
        <div className="about-us-body">
          <Container className='aboutus-container'>
            <Row className='home-subsection'>
              <Col lg='12' md='24' className='order-lg-1 order-md-2'>
                <h2>About Us</h2>
                <p className='about-text first-text'>Founded in 2018, Creative Market is a peer-to-peer rental marketplace allowing you to find and rent gear from other creatives around you. Cameras, Musical Instruments, Lights and anything else that comes to mind, Creative Market is the place to find it.</p>
                <p className='about-text second-text'>Creative Market is a part of Ketchup Creative ehf., a privately held company registered in Iceland.</p>
                <Link to='/contact'><button className='theme-btn theme-btn-primary contact-btn'>CONTACT</button></Link>
                <Link to='/terms-use'><button className='theme-btn theme-btn-filled-white terms-btn'>TERMS OF USE</button></Link>
              </Col>
              <Col lg='12' md='24' className='order-lg-2 order-md-1 avatar-container'>
                <Row className='user-avatar-container'>
                  {
                    team.map((item, key) =>
                      <div className='user-avatar' key={key} style={{'backgroundImage': `url(${item.img})`}}/>)
                  }
                </Row>
              </Col>
            </Row>
            <Row className='home-subsection'>
              <Col lg='12' md='24' className='question-back-img back-img'/>
              <Col lg='12' md='24' className='question-container'>
                <h2>Got Questions?</h2>
                <p className='about-text third-text'>If you have any questions, head on over to our FAQ page and you should find the answers before you even ask! Security, payments, insurance and more imporant topics. If the answer isn’t there, submit a new question through the form and we’ll get back to you as soon as possible.</p>
                <Link to='/FAQ'><button className='theme-btn theme-btn-primary'>FAQs</button></Link>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default About;
