import React, {Component} from 'react'
import {Card} from 'reactstrap';
import TransactionHistory from "./Payment/TransactionHistory";

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
        <div className="payment-dashboard">
          <div className='payment-dashboard-heading-wrapper'>
            <h4 className="tab-title">Payment</h4>
            <div className='balance-wrapper'>
              <div className='balance-left'>
                <p>Balance</p>
                <p>$2061.25</p>
              </div>
              <div className='balance-right'>
                <button className='theme-btn theme-btn-filled-white'>Get Paid</button>
              </div>
            </div>
          </div>
          
          <div className="wrapper-detail">
            <div className="detail-left-wrapper">
              <div className="payment-dashboard-heading">
                <span>PAYMENT METHODS</span>
              </div>
              <div className="payment-dashboard-body">
                <Card body>
                  <div className="card-text">
                    <div className="payment-card">
                      <div className='image-container'>
                        <img src="/images/cards/master-card.svg" alt=""/>
                        <img src="/images/Icons/cross/cross-light.svg" alt=""/>
                      </div>
                      <div className="payment-card-number"><span>**** **** **** 1938</span></div>
                      <div className="flex-row payment-card-other">
                        <span>07 / 20</span>
                        <span>Josh Williams</span>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card body>
                  <div className="card-text">
                    <div className="payment-card">
                      <div className='image-container'>
                        <img src="/images/cards/master-card.svg" alt=""/>
                        <img src="/images/Icons/cross/cross-light.svg" alt=""/>
                      </div>
                      <div className="payment-card-number"><span>**** **** **** 1938</span></div>
                      <div className="flex-row payment-card-other">
                        <span>07 / 20</span>
                        <span>Josh Williams</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="payment-dashboard-body">
                <Card body>
                  <div className="payment-card">
                    <div className='image-container'>
                      <span className='swift-text'>Swift</span>
                    </div>
                    <div className="payment-card-number">
                      <p>DE89 **** 30 00</p>
                      <p>ABNAUS3</p>
                    </div>
                    <div className="flex-row payment-card-other">
                      <span>07 / 20</span>
                      <span>Josh Williams</span>
                    </div>
                  </div>
                </Card>
                <Card body className='add-new-card-container' onClick={() => this.props.history.push('/dashboard/methodAdd/1')}>
                  <div className="payment-card add-new-card">
                    <div className='plus-icon-container'>
                      <i className='fa fa-plus'/>
                    </div>
                    <p className='add-method-text'>Add Payment Method</p>
                  </div>
                </Card>
              </div>
            </div>
            <div className="detail-right-wrapper">
              <div className="payment-dashboard-heading">PAYOUT METHODS</div>
              <div className="payment-dashboard-body">
                <Card body>
                  <div className="card-text">
                    <div className="payment-card">
                      <div className='image-container'>
                        <img src="/images/cards/master-card.svg" alt=""/>
                        <img src="/images/Icons/cross/cross-light.svg" alt=""/>
                      </div>
                      <div className="payment-card-number"><span>**** **** **** 1938</span></div>
                      <div className="flex-row payment-card-other">
                        <span>07 / 20</span>
                        <span>Josh Williams</span>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card body>
                  <div className="card-text">
                    <div className="payment-card">
                      <div className='image-container'>
                        <img src="/images/cards/master-card.svg" alt=""/>
                        <img src="/images/Icons/cross/cross-light.svg" alt=""/>
                      </div>
                      <div className="payment-card-number"><span>**** **** **** 1938</span></div>
                      <div className="flex-row payment-card-other">
                        <span>07 / 20</span>
                        <span>Josh Williams</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="payment-dashboard-body">
                <Card body>
                  <div className="payment-card">
                    <div className='image-container'>
                      <span className='swift-text'>Swift</span>
                      <img src="/images/Icons/cross/cross-light.svg" alt=""/>
                    </div>
                    <div className="payment-card-number">
                      <p>DE89 **** 30 00</p>
                      <p>ABNAUS3</p>
                    </div>
                    <div className="flex-row payment-card-other">
                      <span>07 / 20</span>
                      <span>Josh Williams</span>
                    </div>
                  </div>
                </Card>
                <Card body className='add-new-card-container' onClick={() => this.props.history.push('/dashboard/methodAdd/2')}>
                  <div className="payment-card add-new-card">
                    <div className='plus-icon-container'>
                      <i className='fa fa-plus'/>
                    </div>
                    <p className='add-method-text'>Add Payment Method</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
  
          <TransactionHistory />
        </div>
      </div>
    )
  }
}

export default (PaymentDetail)