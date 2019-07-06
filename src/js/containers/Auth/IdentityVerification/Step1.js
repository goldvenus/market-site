import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import {DateRange} from "react-date-range";
import {getDateStr} from "../../../core/helper";

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthday: (new Date()).toLocaleString(),
      openDatePicker: false
    }
  }
  
  onSelectDate = (e) => {
    let unixTime = e.selection.startDate.getTime() / 1000;
    this.setState({birthday: e.selection.startDate, openDatePicker: false});
    this.props.onInputChange({target: {value: unixTime}}, 'birthday');
  };
  
  render() {
    const selectionRange = {
      startDate: this.props.birthday,
      endDate: this.props.birthday,
      key: 'selection',
    };
    return (
      <div className='verify-inner-wrapper'>
        <h2 className="header">1. Applicant Data</h2>
        <div className="verify-form-wrapper">
          <div className="verify-input-wrapper">
            <div className="theme-form-field auth-input-wrapper">
              <TextField
                id="standard-with-placeholder"
                className="custom-beautiful-textfield"
                label="First Name"
                type="text"
                maxLength='50'
                onChange={(e) => this.props.onInputChange(e, 'firstName')}
              />
            </div>
            <div className="theme-form-field auth-input-wrapper">
              <TextField
                id="standard-with-placeholder"
                className="custom-beautiful-textfield"
                label="Last Name"
                type="text"
                maxLength='50'
                onChange={(e) => this.props.onInputChange(e || '', 'lastName')}
              />
            </div>
            <div className="theme-form-field auth-input-wrapper">
              <TextField
                id="date-range-input1"
                className="date-range-input"
                type="text"
                label={'PICKUP DATE'}
                value={getDateStr(this.state.birthday)}
                onFocus={() => this.setState({openDatePicker: true})}
              />
              {this.state.openDatePicker &&
                <DateRange
                  className={'date-range-wrapper'}
                  ranges={[selectionRange]}
                  onChange={this.onSelectDate}
                  rangeColors={['#F74377']}
                  showDateDisplay={false}
                  dateDisplayFormat={'DD.MM.YYYY'}
                />}
            </div>
            <div className="theme-form-field auth-input-wrapper">
              <TextField
                id="standard-with-placeholder"
                className="custom-beautiful-textfield"
                label="Email"
                type="text"
                maxLength='50'
                onChange={(e) => this.props.onInputChange(e || '', 'email')}
              />
            </div>
            <div className="theme-form-field auth-input-wrapper">
              <TextField
                id="standard-with-placeholder"
                className="custom-beautiful-textfield"
                label="Phone"
                type="text"
                maxLength='50'
                onChange={(e) => this.props.onInputChange(e || '', 'phone')}
              />
            </div>
          </div>
          <div className="theme-form-field">
            <button className='theme-btn theme-btn-primary' onClick={() => this.props.onNextStep(1)}>Next Step</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Step1;