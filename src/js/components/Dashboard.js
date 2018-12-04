import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import chart from '../../assets/images/chart-1.jpg';
import profile_pic from '../../assets/images/profile-pic.jpg';
import VMC from '../../assets/images/VMC.jpg';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    const {validation_msg} = this.props
    
    return (
      <div className="dashboard">
        <div className="dashboard-head">
          <Container>
            <Row className="user-detail">
              <Col sm="2">
                <img src={profile_pic} />
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
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}>
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}>
                  Account Detail
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}>
                  My Listing
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4' })}
                  onClick={() => { this.toggle('4'); }}>
                  My Rentals
                  </NavLink>
              </NavItem>
            </Nav>
          </Container>
        </div>
        <div className="dashboard-body">
          <Container>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <h3 className="tab-title">Dashboard</h3>
                    <div className="wrraper">
                      <Row>
                        <Col>
                          {/* This image is temporary.... we are going to have actual chart
                              Component here */}
                          <img src={chart} />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="totel-listing">
                            <h3>10</h3>
                            <p className="theme-text-small-bold">Total Listing</p>
                          </div>
                        </Col>
                        <Col>
                          <div className="totel-rental">
                            <h3>4</h3>
                            <p className="theme-text-small-bold">Out On Rent</p>
                          </div>
                        </Col>
                        <Col>
                          <div className="avaiable">
                            <h3>6</h3>
                            <p className="theme-text-small-bold">Avaiable</p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <h3 className="tab-title">Dashboard</h3>
                    <div className="wrraper">
                      <Row>
                        <Col>
                          <Card body>
                            <CardTitle className="text-muted" >INFO</CardTitle>
                            <div className="card-text">                              
                              <Form>
                                <FormGroup>
                                  <Label for="name" className="text-muted 
                                  theme-text-small">name</Label>
                                  <Input />
                                  <FormFeedback>{this.props.form_feedback}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="Email" className="text-muted theme-text-small">Email</Label>
                                  {/*  pass valid/invalid prop  */}
                                  <Input/>
                                  <FormFeedback>{this.props.form_feedback}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="phone" className="text-muted theme-text-small">Phone</Label>
                                  <Input />
                                  <FormFeedback>{this.props.form_feedback}</FormFeedback>
                                </FormGroup>
                              </Form>
                            </div>
                            <Button>save</Button>
                          </Card>
                          <Card body>
                            <CardTitle className="text-muted">CHANGE PASSWORD</CardTitle>
                            <div className="card-text">                              
                              <Form>
                                <FormGroup>
                                  <Label for="current-password" className="text-muted 
                                  theme-text-small">Current Password</Label>
                                  <Input />
                                  <FormFeedback>{this.props.form_feedback}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="new-password" className="text-muted theme-text-small">New Password</Label>
                                  {/*  pass valid/invalid prop  */}
                                  <Input/>
                                  <FormFeedback>{this.props.form_feedback}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="Confirm_new_password" className="text-muted theme-text-small">Confirm New Password</Label>
                                  <Input />
                                  <FormFeedback>{this.props.form_feedback}</FormFeedback>
                                </FormGroup>
                              </Form>
                            </div>
                            <Button>Change Password</Button>
                          </Card>
                        </Col>
                        <Col>
                          <Card body>
                            <CardTitle className="text-muted">PAYMENT METHOD</CardTitle>
                            <div className="card-text">
                              <Row>
                                <Col>
                                  <img src={VMC} />
                                </Col>
                                <Col>
                                  <div className="add-payment-method center">
                                    <div className="add center">
                                      <span className="fa fa-plus"></span>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="6">

                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col sm="6">

                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Container>
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Dashboard);
