import React, {Component} from 'react'
import {Table} from "reactstrap";
import {getTransHistory} from "../../../core/actions/payment.action";
import connect from "react-redux/es/connect/connect";
import CustomSpinner from "../../../components/CustomSpinner";

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
  
    getTransHistory(this.getYearMonthStr(new Date()));
  }
  
  getYearMonthStr = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10)
      month = '0' + month;
    
    return {yearMonth: year + '-' + month};
  };
  
  handleMonthNavigation = (val) => {
    let tempDate = this.state.curDate;
    val === 1 ?
      tempDate.setMonth(tempDate.getMonth() - 1) :
      tempDate.setMonth(tempDate.getMonth() + 1);
    
    getTransHistory(this.getYearMonthStr(tempDate));
  };
  
  render() {
    let monthYearStr = this.monthNames[this.state.curDate.getMonth()] + ' ' + this.state.curDate.getFullYear();
    let {transactions, isLoadingHistory} = this.props;
    
    return (
      <div className='wrapper-transaction'>
        {isLoadingHistory && <CustomSpinner/>}
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
          <button className='theme-btn theme-btn-filled-white'>Download Invoices</button>
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
            {transactions.map((item, index) => {
              let transDate = new Date(item.RecordCreated);
              let type = item.TransType;
              let contract = item.Contract;
              let client = item.Client;
              let amount = item.Amount;
              let invoice = item.Invoice;
              let options = { month: 'long', day: 'numeric', year: 'numeric' };
              transDate = transDate.toLocaleDateString("en-US", options);
              
              if (type === 'Refung' || type === 'Withdrawal') {
                amount = '-$' + parseFloat(amount).toFixed(2);
              } else {
                amount = '$' + parseFloat(amount).toFixed(2);
              }

              return (
                <tr key={index}>
                  <td>{transDate}</td>
                  <td>{type}</td>
                  <td>{contract}</td>
                  <td>{client}</td>
                  <td className='amount'>{amount}</td>
                  <td className='invoice'>{invoice}</td>
                </tr>)
              })}
            </tbody>
          </Table>
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