import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {Card} from 'reactstrap';
import TransactionHistory from "./Payment/TransactionHistory";
import CreditCardModel from "./Payment/CreditCardModel";
import SwiftModel from "./Payment/SwiftModel";
import {getPaymentMethods, deletePaymentMethod} from "../../core/actions/payment.action";
import CustomSpinner from "../../components/CustomSpinner";
import BarLoader from "react-bar-loader";
import ConfirmModal from "../../components/common/ConfirmModal";

class PaymentDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      modalOpenState: 0,
      curMethod: null
    };
    
    getPaymentMethods();
  }
  
  handleDeleteMethod = (methodId) => {
    this.setState({modalOpenState: 1, curMethod: methodId});
  };
  
  performDeleteMethod = () => {
    this.setState({modalOpenState: 0});
    deletePaymentMethod({methodId: this.state.curMethod});
  };
  
  handleClose = () => {
    this.setState({modalOpenState: 0});
  };
  
  render() {
    let {paymentMethods, isLoadingMethod, isChanging} = this.props;
  
    if (isLoadingMethod) {
      return <BarLoader color="#F82462" height="5"/>;
    }
    
    let payInMethods = paymentMethods.filter(item => item.type === 1);
    let payOutMethods = paymentMethods.filter(item => item.type === 2);

    return (
      <div className='payment-dashboard-wrapper'>
        {isChanging && <CustomSpinner/>}
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
              <div className="payment-dashboard-body row">
                {payInMethods.map((item, index) => (
                  <CreditCardModel key={index} info={item} onDelete={this.handleDeleteMethod}/>
                ))}
  
                <Card body className='add-new-card-container card-model-wrapper' onClick={() => this.props.history.push('/dashboard/methodAdd/1')}>
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
              <div className="payment-dashboard-body row">
                {payOutMethods.map((item, index) => {
                  if (item.cardNumber !== undefined)
                    return <CreditCardModel key={index} info={item} onDelete={this.handleDeleteMethod}/>;
                  else
                    return <SwiftModel key={index} info={item} onDelete={this.handleDeleteMethod}/>;
                })}
  
                <Card body className='add-new-card-container card-model-wrapper' onClick={() => this.props.history.push('/dashboard/methodAdd/2')}>
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
          
          <TransactionHistory/>
  
          {this.state.modalOpenState ?
            <ConfirmModal
              heading='Delete Payment Method?'
              onConfirm={this.performDeleteMethod}
              onClose={this.handleClose}
            /> : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoadingMethod: state.payment.isLoadingMethod,
  isChanging: state.payment.isChanging,
  paymentMethods: state.payment.paymentMethods
});

export default connect(mapStateToProps)(PaymentDetail);