import React, {Component} from 'react'
import {Table} from "reactstrap";
import {getTransHistory} from "../../../core/actions/payment.action";
import connect from "react-redux/es/connect/connect";
import {getYearMonthStr} from "../../../core/helper";
import BarLoader from "react-bar-loader";

class TransactionHistory extends Component {
  constructor(props) {
    super(props);
  
    this.monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    this.state = {
      curDate: new Date()
    };
  
    getTransHistory(getYearMonthStr(new Date()));
  }
  
  handleMonthNavigation = (val) => {
    let tempDate = this.state.curDate;
    val === 1 ?
      tempDate.setMonth(tempDate.getMonth() - 1) :
      tempDate.setMonth(tempDate.getMonth() + 1);
    
    getTransHistory(getYearMonthStr(tempDate));
  };
  
  render() {
    let monthYearStr = this.monthNames[this.state.curDate.getMonth()] + ' ' + this.state.curDate.getFullYear();
    let {transactions, isLoadingHistory} = this.props;
    let data = transactions.map((item) => {
      let transDate = new Date(item.RecordCreated);
      let type = item.TransType;
      let contract = item.TransactionId.substr(0, 8);
      let client = item.Client;
      let amount = item.Amount;
      let invoice = item.Invoice;
      let options = {month: 'long', day: 'numeric', year: 'numeric'};
      transDate = transDate.toLocaleDateString("en-US", options);
  
      if (type === 'Refung' || type === 'Withdrawal') {
        amount = '-$' + parseFloat(amount).toFixed(2);
      } else {
        amount = '$' + parseFloat(amount).toFixed(2);
      }
      return {transDate, type, contract, client, invoice, amount};
    });
    
    return (
      <div className='wrapper-transaction'>
        {isLoadingHistory && <BarLoader color="#F82462" height="5"/>}
        <div className='transaction-header'>
          <span>TRANSACTION HISTORY</span>
          <div className='month-navigation-bar'>
            <span className='left-button' onClick={() => this.handleMonthNavigation(1)}>
              <i className='fa fa-angle-left'/>
            </span>
            <span className='month-year'>{monthYearStr}</span>
            <span className='right-button' onClick={() => this.handleMonthNavigation(2)}>
              <i className='fa fa-angle-right'/>
            </span>
          </div>
          <button className='theme-btn theme-btn-filled-white disabled'>Download Invoices</button>
        </div>
        <div className='transaction-body'>
          <Table>
            <thead>
              <tr className="">
                <th>Date</th>
                <th>Type</th>
                <th>Contract</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
            {
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.transDate}</td>
                  <td>{item.type}</td>
                  <td>{item.contract}</td>
                  <td>{item.client}</td>
                  <td className='amount'>{item.amount}</td>
                  <td className='invoice'>{item.invoice}</td>
                </tr>)
              )
            }
            </tbody>
          </Table>
        </div>
        <div className='transaction-body-mobile'>
          {
            data.map((item, index) => (
              <div className='transaction-wrapper' key={index}>
                <div className='info-wrapper'>
                  <div>Date</div>
                  <div>{item.transDate}</div>
                </div>
                <div className='info-wrapper'>
                  <div>Type</div>
                  <div>{item.type}</div>
                </div>
                <div className='info-wrapper'>
                  <div>Contract</div>
                  <div>{item.contract}</div>
                </div>
                <div className='info-wrapper'>
                  <div>Client</div>
                  <div>{item.client}</div>
                </div>
                <div className='info-wrapper'>
                  <div>Amount</div>
                  <div className='amount'>{item.amount}</div>
                </div>
                <div className='info-wrapper'>
                  <div>Invoice</div>
                  <div>{item.invoice}</div>
                </div>
              </div>)
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoadingHistory : state.payment.isLoadingHistory,
  transactions: state.payment.transactions
});

export default connect(mapStateToProps)(TransactionHistory);