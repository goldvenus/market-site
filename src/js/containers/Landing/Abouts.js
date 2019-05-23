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
  constructor(props) {
    super(props);
    this.state = {height: {height: '500px'}};
  }
  
  componentDidMount() {
    if (this.state.height.height !== window.innerHeight-120 + 'px')
      this.setState({height: {height: window.innerHeight-120 + 'px'}});
  }
  
  render() {
    console.log(this.state.height);
    return (
      <div className="about-us">
        <div className="about-us-head" style={this.state.height}>
          <div className="heading-mobile">
              <Breadcrumb className="theme-text-small">
                  <BreadcrumbItem>Home </BreadcrumbItem>
                  <BreadcrumbItem active>About Us</BreadcrumbItem>
              </Breadcrumb>
              <h1>About Us</h1>
          </div>
          <div className="head-container" style={{height: '88%'}}>
            <div className="container">
              <div className="head-left">
                <Breadcrumb className="theme-text-small">
                  <BreadcrumbItem>Home </BreadcrumbItem>
                  <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <h1>About Us</h1>
                <h3 className="intro">
                  <span className="bold">Creative Market</span>&nbsp;
                  <span className="thin">Introduction</span>
                </h3>
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
              <p className='introduction'>Introduction</p>
              <p className="theme-text-small about-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, consequuntur vitae ipsum doloribus
                repellendus dolorum aliquid odio aspernatur at labore voluptatem laudantium ducimus libero inventore
                eos odit magni! Nesciunt, quos.dolorum aliquid odio aspernatur at labore voluptatem laudantium ducimus
                libero inventore eos odit magni! Nesciunt, quos.
              </p>
            </div>
          </div>
          <div className="about-us-watermark" style={{height: '12%'}}/>
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
