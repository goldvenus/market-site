import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form} from 'reactstrap';
import CustomInput from './CustomInput';
import ThemeRow from './ThemeRow.js';
import ThemeCardOne from './Theme-Cards/ThemeCardOne';
import data from './dummydata';


class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home-head">
          <Container>
            <Row>
              <Col>
                <div className="logo" >
                  <img src={'/images/Logo.png'} alt="" />
                </div>

                <h2 className="title">Find Creative Tools Around You</h2>

                <p className="">
                  <span >Creative market is a community </span>&nbsp;
                  <span className="bold">for creators, by creators.</span>
                </p>

                <p className="theme-text-small">
                  Rent &nbsp;
                  <button className="theme-btn theme-btn-primary-light ml-1">
                    
                      <img src={'/images/Icons/Tags/Photo/Default.svg'} alt="drone"/>
                      <Link to="/">Cameras</Link>
                    
                  </button>
                  <button className="theme-btn theme-btn-primary-light ml-1">
                    
                      <img src={'/images/Icons/Tags/Drone/Default.svg '} alt="drone"/>
                      <Link to="/">Drones</Link>
                    
                  </button>
                  <button className="theme-btn theme-btn-primary-light ml-1">
                                         
                      <img src={'/images/Icons/Tags/Lights/Default.svg '} alt="drone"/>
                      <Link to="/"> Lights </Link>  
                    
                  </button> &nbsp;
                  and more from People around you
                  
                </p>
              </Col>
              </Row>
              <Row>                
              <Col sm="6">
                <Form className="theme-form">
                  <CustomInput placeholder="search" type="text" label="search" />
                  <CustomInput placeholder="location" type="text" label="location" />  
                  <button className="theme-btn theme-btn-filled-white">
                    <span className="fa fa-search"></span>
                  </button>              
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="home-body">
          <Container>
            {/* There will be an array of Catagories objects */}
            <Row className="theme-row">
              <Col sm="4" className="theme-col">
                <p id="camera"></p>
                <div>
                  <span>Camera</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to ="/cameras" >View</Link>
                  </button>
                </div>
              </Col>
              <Col sm="4" className="theme-col">
                <p id="computer_electronic"></p>
                <div>
                  <span>Computer & Electronics</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/computer&electronics" >View</Link>
                  </button>
                </div>
              </Col>
              <Col sm="4" className="theme-col">
                <p id="drones"></p>
                <div>
                  <span>Drones</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/drones" >View</Link>
                  </button>
                </div>
              </Col>
            </Row>
            <Row className="theme-row">
              <Col sm="4" className="theme-col">
                <p id="lenses"></p>
                <div>
                  <span>Lenses</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/Lenses" >View</Link>
                  </button>
                </div>
              </Col>
              <Col sm="4" className="theme-col">
                <p id="lighting"></p>
                <div>
                  <span>Lighting</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/Lighting" >View</Link>
                  </button>
                </div>
              </Col>
              <Col sm="4" className="theme-col">
                <p id="audio"></p>
                <div>
                  <span>Audio</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/Audio" >View</Link>
                  </button>
                </div>
              </Col>
            </Row>
            <Row className="theme-row">
              <Col sm="4" className="theme-col">
                <p id="tripods_stabilization_rigs"></p>
                <div>
                  <span>Tripods Stabilization & Rigs</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/TS&R" >View</Link>
                  </button>
                </div>
              </Col>
              <Col sm="4" className="theme-col">
                <p id="camera_accessories"></p>
                <div>
                  <span>Camera Accessories</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/camera_accessories">View</Link>
                  </button>
                </div>
              </Col>
              <Col sm="4" className="theme-col">
                <p id="studio_spaces"></p>
                <div>
                  <span>Studio Spaces</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/studio_spaces" >View</Link>
                  </button>
                </div>
              </Col>
            </Row>
            <Row className="theme-row">
              <Col sm="4" className="theme-col">
                <p id="office_spaces"></p>
                <div>
                  <span>Office Spaces</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/office_spaces" >View</Link>
                  </button>
                </div>
              </Col>
              <Col sm="4" className="theme-col">
                <p id="others"></p>
                <div>
                  <span>others</span>
                  <button className="theme-btn theme-btn-outline-white">
                    <Link to="/others" >View</Link>
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
          
          <div className="new_arrival">
            <Container>
              <Row>
                <Col sm="4" className="align-self-center">
                  <h3>New Arrivals</h3>
                  <img src={'/images/calander.jpg'} alt=""/>
                </Col>
                <Col sm="8">
                  <Row >
                    {
                    data.map((item , index)=>{
                        return <Col sm="6" key={index}>
                        <ThemeCardOne Gear = {item} />
                      </Col>
                    })
                    }
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Home);
