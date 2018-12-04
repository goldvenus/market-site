import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import aboutCM from '../../assets/images/01.png';
import press from '../../assets/images/press.jpg';
import pic from '../../assets/images/team/1.jpg';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

const team = [
  { name: "Joe Stapleton", job_title: "Co-founder", img: '../../assets/images/team/1.jpg' },
  { name: "Jakob Storm", job_title: "Co-founder", img: '../../assets/images/team/2.jpg' },
  { name: "Josh Kocaurek", job_title: "CEO", img: '../../assets/images/team/3.jpg' },
  { name: "Tomass Sola", job_title: "Lead Sales Manager", img: '../../assets/images/team/5.jpg' },
]
// Functional Component
const TeamMember = ({ member: { name , job_title} ,src }, ...props) => {
  return (
    <Col>
      <Card inverse>
        {/* { member.img } */}
        <CardImg width="100%" src={src} alt="Card image cap" />
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
          <Container>
            <Row>
              <Col sm="6">
                <p className="theme-text-small bread-crums">Home Page / About Us</p>
                <h1>About Us</h1>
                <h4 className="intro">
                  <span className="bold">Creative Market</span>&nbsp;
                  <span>Introduction</span>
                </h4>
                <p className="theme-text-small about-desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, consequuntur vitae ipsum doloribus repellendus dolorum aliquid odio aspernatur at labore voluptatem laudantium ducimus libero inventore eos odit magni! Nesciunt, quos.dolorum aliquid odio aspernatur at labore voluptatem laudantium ducimus libero inventore eos odit magni! Nesciunt, quos.
                </p>
              </Col>
              <Col sm="6">
                <img src={aboutCM} alt="About Us" className="about-cm" />
              </Col>
            </Row>
          </Container>
          <div>
            <p className="theme-big-text">Creative Market</p>
          </div>
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
                    return <TeamMember member={member} key={index} src={pic} />
                  })
                }
              </Row>
            </Container>
          </div>
          <div className="press">
            <Container>
              <Row>
                <Col>
                  <h2 className="press-title">Press</h2>
                </Col>
                <Col className="text-center">
                  <img src={press}/>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
