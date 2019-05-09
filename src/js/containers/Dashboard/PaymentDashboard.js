import React, { Component } from 'react'
import { Card, CardTitle, Row, Col } from 'reactstrap';


class PaymentDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
        hello: 'hi'
    }
  }

  render() {
    return (
      <div className='payment-dashboard-wrapper'>
        <Row>
          <Card body>
              <CardTitle className="text-muted">PAYMENT METHOD</CardTitle>
              <div className="card-text">
                  <Row>
                      <Col sm="12">
                          <div className="payment-card">
                              <div className="flex-row">
                                  <div>
                                      <img src="/images/cards/master-card.svg" alt=""/>
                                      <img src="/images/Icons/cross.svg" alt=""/>
                                  </div>
                                  <div className="payment-card-number">**** **** **** 1938</div>
                              </div>
                              <div className="flex-row payment-card-other">
                                  <span>07 / 20</span>
                                  <span>Josh Williams</span>
                              </div>
                          </div>
                      </Col>
                      <Col sm="12">
                          <div className="add-payment-method center">
                              <div className="add center">
                                  <span className="fa fa-plus"></span>
                              </div>
                          </div>
                      </Col>
                  </Row>
              </div>
          </Card>
        </Row>
      </div>
    )
  }
}

export default (PaymentDetail)