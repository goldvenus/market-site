import React from 'react';
import VMC from '../../../assets/images/VMC.jpg';
import {Card, Button, CardTitle, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormFeedback,} from 'reactstrap';

export default function(){
  return (
    <Row className="account-detail">
      <Col sm="12">
        <h4 className="tab-title">Account Details</h4>
        <div className="wrraper">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle className="text-muted" >INFO</CardTitle>
                <div className="card-text">                              
                  <Form>
                    <FormGroup>
                      <Label for="name" className="text-muted 
                      theme-text-small">name</Label>
                      <Input />
                      <FormFeedback></FormFeedback>
                    </FormGroup>
                    {/* <FormGroup>
                      <Label for="Email" className="text-muted theme-text-small">Email</Label>
                      <Input/>
                      <FormFeedback></FormFeedback>
                    </FormGroup> */}
                    <FormGroup>
                      <Label for="phone" className="text-muted theme-text-small">Phone</Label>
                      <Input />
                      <FormFeedback></FormFeedback>
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
                      <FormFeedback></FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="new-password" className="text-muted theme-text-small">New Password</Label>
                      {/*  pass valid/invalid prop  */}
                      <Input/>
                      <FormFeedback></FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="Confirm_new_password" className="text-muted theme-text-small">Confirm New Password</Label>
                      <Input />
                      <FormFeedback></FormFeedback>
                    </FormGroup>
                  </Form>
                </div>
                <Button>Change Password</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle className="text-muted">PAYMENT METHOD</CardTitle>
                <div className="card-text">
                  <Row>
                    <Col sm="6">
                      <img src={VMC} alt="" />
                    </Col>
                    <Col sm="6">
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
  )
}