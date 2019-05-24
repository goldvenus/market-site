import React, {Component} from 'react'
import {Table} from "reactstrap";

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
    }
  }
  
  handleMonthNavigation = (val) => {
    let tempDate = this.state.curDate;
    val === 1 ?
      tempDate.setMonth(tempDate.getMonth() - 1) :
      tempDate.setMonth(tempDate.getMonth() + 1);
    this.forceUpdate();
  };
  
  render() {
    let monthYearStr = this.monthNames[this.state.curDate.getMonth()] + ' ' + this.state.curDate.getFullYear();
    
    return (
      <div className='wrapper-transaction'>
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
              <tr>
                <td>Apr 24, 2019</td>
                <td>Income</td>
                <td>123466</td>
                <td>Marcus Streem</td>
                <td>$3764.45</td>
                <td>#351235</td>
              </tr>
              <tr>
                <td>Apr 24, 2019</td>
                <td>Income</td>
                <td>123466</td>
                <td>Marcus Streem</td>
                <td>$3764.45</td>
                <td>#351235</td>
              </tr>
              <tr>
                <td>Apr 24, 2019</td>
                <td>Income</td>
                <td>123466</td>
                <td>Marcus Streem</td>
                <td>$3764.45</td>
                <td>#351235</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

export default TransactionHistory;