import React, { Component } from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import press from '../../../assets/images/press.jpg';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

const team = [
  { name: 'Joe Stapleton', job_title: 'Co-founder', img: '/images/team/1.jpg' },
  { name: 'Jakob Storm', job_title: 'Co-founder', img: '/images/team/2.jpg' },
  { name: 'Josh Kocaurek', job_title: 'CEO', img: '/images/team/3.jpg' },
  { name: 'Tomass Sola', job_title: 'Lead Sales Manager', img: '/images/team/5.jpg' },
];

// Functional Component
const TeamMember = ({ member: { name, job_title, img }, src }, ...props) => {
  return (
    <Col sm="8">
      <Card inverse>
        <CardImg width="100%" src={img} alt="Card image cap"/>
        <CardImgOverlay>
          <CardTitle className="X-center">{name}</CardTitle>
          <CardText className="X-center">
            <small className="text-muted">{job_title}</small>
          </CardText>
        </CardImgOverlay>
      </Card>
    </Col>
  );
};

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
                <h1>About Us</h1>
                <h4 className="intro">
                  <span className="bold">Creative Market</span>&nbsp;
                  <span>Introduction</span>
                </h4>
                <p className="theme-text-small about-desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, consequuntur vitae ipsum doloribus
                  repellendus dolorum aliquid odio aspernatur at labore voluptatem laudantium ducimus libero inventore
                  eos odit magni! Nesciunt, quos.dolorum aliquid odio aspernatur at labore voluptatem laudantium ducimus
                  libero inventore eos odit magni! Nesciunt, quos.
                </p>
              </div>
            </div>
          </div>
          <div className="heading-body-mobile">
            <div>
              <p className="intro">
                Creative Market
              </p>
              <p>Introduction</p>
              <p className="theme-text-small about-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, consequuntur vitae ipsum doloribus
                repellendus dolorum aliquid odio aspernatur at labore voluptatem laudantium ducimus libero inventore
                eos odit magni! Nesciunt, quos.dolorum aliquid odio aspernatur at labore voluptatem laudantium ducimus
                libero inventore eos odit magni! Nesciunt, quos.
              </p>
            </div>
          </div>
          <div className="about-us-watermark"/>
        </div>
        <div className="about-us-body">
          <div className="team-members">
            <Container>
              <Row>
                <Col>
                  <h2 className="our-team">Our Team</h2>
                </Col>
              </Row>
              <Row>
                {
                  team.map((member, index) => {
                    return <TeamMember member={member} key={index}/>;
                  })
                }
              </Row>
            </Container>
          </div>
          <div className="press">
            <Container>
              <h2 className="press-title">Press</h2>
              <Col className="text-center press-container">
                <img src={press} alt=""/>
              </Col>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
