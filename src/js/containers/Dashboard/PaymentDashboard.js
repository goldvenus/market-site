import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {Card} from 'reactstrap';
import TransactionHistory from "./Payment/TransactionHistory";
import CreditCardModel from "./Payment/CreditCardModel";
import SwiftModel from "./Payment/SwiftModel";
import {
  getPaymentMethods,
  deletePaymentMethod,
  withdrawalToVendor,
  getTransHistory
} from "../../core/actions/payment.action";
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
  
  handleWithdrawal = (balance) => {
    if (balance < 1)
      return;
    this.setState({modalOpenState: 2});
  };
  
  performWithdrawal = async () => {
    await withdrawalToVendor();
    await getTransHistory();
    this.setState({modalOpenState: 0});
  };
  
  render() {
    let {paymentMethods, isLoadingMethod, isChanging, user} = this.props;
    let {modalOpenState} = this.state;
  
    if (isLoadingMethod) {
      return <BarLoader color="#F82462" height="5"/>;
    }
    
    let payInMethods = paymentMethods.filter(item => item.type === 1);
    let payOutMethods = paymentMethods.filter(item => item.type === 2);
    let addPayoutMethodPossible = payOutMethods.length === 0;
    let balance = user.balance;

    return (
      <div className='payment-dashboard-wrapper'>
        {isChanging && <CustomSpinner/>}
        <div className="payment-dashboard">
          <div className='payment-dashboard-heading-wrapper'>
            <h4 className="tab-title">Payment</h4>
            <div className='balance-wrapper'>
              <div className='balance-left'>
                <p>Balance</p>
                <p>${balance}</p>
              </div>
              <div className='balance-right'>
                <button className='theme-btn theme-btn-filled-white' onClick={() => this.handleWithdrawal(balance)}>Get Paid</button>
              </div>
            </div>
          </div>
          
          <div className="payment-method-wrapper">
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
                    return <CreditCardModel
                      key={index}
                      info={item}
                      selected={item.methodId === user.selectedMethod}
                      onDelete={this.handleDeleteMethod}
                    />;
                  else
                    return <SwiftModel
                      key={index}
                      info={item}
                      selected={item.methodId === user.selectedMethod}
                      onDelete={this.handleDeleteMethod}
                    />;
                })}
                {addPayoutMethodPossible ?
                <Card body className={`add-new-card-container card-model-wrapper ${addPayoutMethodPossible ? '' : 'disabled'}`} onClick={() => this.props.history.push('/dashboard/methodAdd/2')}>
                  <div className="payment-card add-new-card">
                    <div className='plus-icon-container'>
                      <i className='fa fa-plus'/>
                    </div>
                    <p className='add-method-text'>Add Payment Method</p>
                  </div>
                </Card> : null}
              </div>
            </div>
          </div>
          
          <TransactionHistory/>
  
          {modalOpenState === 1 ?
            <ConfirmModal
              heading='Delete Payment Method?'
              onConfirm={this.performDeleteMethod}
              onClose={this.handleClose}
            /> :
          modalOpenState === 2 ?
            <ConfirmModal
              heading={`Get Paid $${balance}?`}
              onConfirm={this.performWithdrawal}
              onClose={this.handleClose}
            /> : null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoadingMethod: state.payment.isLoadingMethod,
  isChanging: state.payment.isChanging,
  paymentMethods: state.payment.paymentMethods,
  user: state.user.user
});

export default connect(mapStateToProps)(PaymentDetail);