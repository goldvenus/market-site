import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Modal from "react-responsive-modal";
import TextField from "@material-ui/core/TextField/TextField";
import {DateRange} from "react-date-range";
import {calcDaysDiff, getDateStr} from "../../core/helper";
import {Inline} from '@zendeskgarden/react-loaders'

/*
    Modal Interface for CART_CONFIRM(Favorites Page) and CART_EDIT(Cart Page - CART_EDIT)
 */
class CartModal2 extends Component {
  // model1: Add to Cart, model2: Edit
  constructor(props) {
    super(props);
    let start_date = this.props.start_date;
    let end_date = this.props.end_date;
    this.state = {
      startDate: start_date ? start_date : new Date(),
      endDate: end_date ? end_date : new Date(),
      open_date_picker1: false,
      open_date_picker2: false,
      busy: false
    };
  }
  
  componentDidMount() {
    const {dlg_model, gear} = this.props;
    dlg_model === 2 &&
    this.setState({
      startDate: new Date(gear.startDate),
      endDate: new Date(gear.endDate)
    });
  }
  
  setOpenState = (ost1, ost2) => {
    this.setState({
      open_date_picker1: ost1,
      open_date_picker2: ost2
    });
  };
  
  handleSelect = ranges => {
    let t_start_date = ranges.selection.startDate;
    let t_end_date = ranges.selection.endDate;
    
    if (t_start_date > t_end_date) {
      let temp = t_start_date;
      t_start_date = t_end_date;
      t_end_date = temp;
    }
    
    if (t_start_date !== t_end_date) {
      // select range
      this.setState({
        startDate: t_start_date,
        endDate: t_end_date,
        open_date_picker1: false,
        open_date_picker2: false
      });
    }
    else {
      // select a single day
      if (this.state.open_date_picker1 && t_start_date > this.state.endDate)
        t_end_date = t_start_date;
      else if (this.state.open_date_picker1)
        t_end_date = this.state.endDate;
      else if (this.state.open_date_picker2 && t_end_date < this.state.startDate)
        t_start_date = t_end_date;
      else if (this.state.open_date_picker2)
        t_start_date = this.state.startDate;
      this.setState({
        startDate: t_start_date,
        endDate: t_end_date,
        open_date_picker1: false,
        open_date_picker2: false
      });
    }
  };
  
  handleAddToCart = async () => {
    this.setState({busy: true});
    let ret = await this.props.addToCart({
      gearid: this.props.gear.gearid,
      userid: this.props.gear.userid,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    });
    if (!ret) {
      this.setState({busy: false});
    }
  };
  
  handleEdit = () => {
    this.setState({busy: true});
    this.props.setPeriod(this.state.startDate, this.state.endDate);
  };
  
  handleClose = (e) => {
    if (this.state.busy)
      e.preventDefault();
    else
      this.props.onClose();
  };
  
  render() {
    const {open, dlg_model, gear} = this.props;
    const {brand, productName, pricePerDay} = gear;
    const duration = calcDaysDiff(this.state.startDate, this.state.endDate) + 1;
    const start_date_str = getDateStr(this.state.startDate);
    const end_date_str = getDateStr(this.state.endDate);
    const total = pricePerDay * duration;
    const tax = total * 0.21;
    const fee = total * 0.06;
    const amount = parseFloat(total + tax + fee).toFixed(2);
    const actualPrice = parseFloat(amount / duration).toFixed(2);
    
    const selectionRange = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      key: 'selection',
    };
    let dlg_heading = 'Add to Cart';
    let btn_label1 = '';
    let btn_label2 = '';
    if (dlg_model === 1) {
      btn_label1 = 'Cancel';
      btn_label2 = 'Add to Cart';
    } else {
      btn_label1 = 'Cancel';
      btn_label2 = 'Submit';
      dlg_heading = 'Edit';
    }
    
    return (
      <Modal open={open} onClose={this.handleClose} center classNames={{modal: "cart-modal"}}>
        <div className='modal-cart-header'>
          <span>{dlg_heading}</span>
        </div>
        <div className='modal-cart-body-1'>
          <div className='modal-cart-info row'>
            <span className='modal-carted-product-name'>{brand}<br/>{productName}</span>
          </div>
          <div className="pickup-date-container row">
            <div className='col-md-11 date-range-container'>
              <TextField
                id="date-range-input1"
                className="date-range-input"
                type="text"
                label={'PICKUP DATE'}
                onFocus={() => this.setOpenState(true, false)}
                value={start_date_str}
              />
              {
                this.state.open_date_picker1 ?
                  <DateRange
                    className={'date-range-wrapper'}
                    ranges={[selectionRange]}
                    onChange={this.handleSelect}
                    rangeColors={['#F74377']}
                    showDateDisplay={false}
                  /> : null
              }
              {
                this.state.open_date_picker1 ?
                  <img src="/images/Icons/calendar/calendar1.svg" alt=''/> :
                  <img src="/images/Icons/calendar/calendar.svg" alt=''/>
              }
            </div>
            <div className='col-md-2'/>
            <div className='col-md-11 date-range-container'>
              <TextField
                id="date-range-input1"
                className="date-range-input"
                type="text"
                label={'RETURN DATE'}
                onFocus={() => this.setOpenState(false, true)}
                value={end_date_str}
              />
              {
                this.state.open_date_picker2 ?
                  <DateRange
                    className={'date-range-wrapper'}
                    ranges={[selectionRange]}
                    onChange={this.handleSelect}
                    rangeColors={['#F74377']}
                    showDateDisplay={false}
                  /> : null
              }
              {
                this.state.open_date_picker2 ?
                  <img src="/images/Icons/calendar/calendar1.svg" alt=''/> :
                  <img src="/images/Icons/calendar/calendar.svg" alt=''/>
              }
            </div>
          </div>
          <div className='modal-cart-price-container row'>
            <div className='modal-cart-price-left'>
              <span className="price-value">${actualPrice}</span>
              <span className='price-text'> per day</span>
            </div>
            <div className='modal-cart-price-right'>
              <span className="price-value">${amount}</span>
              <span className='price-text'> for </span>
              <span className="price-value">{duration} days</span>
            </div>
          </div>
          <div className='modal-cart-control row'>
            <button
              className='cart-control-left-button theme-btn theme-btn-secondary'
              onClick={(e) => this.handleClose(e)}>
              {btn_label1}
            </button>
            <button
              className='cart-control-right-button theme-btn theme-btn-primary'
              onClick={() => {
                dlg_model === 1 ?
                  this.handleAddToCart() :
                  this.handleEdit()
              }
              }
              disabled={this.state.busy ? 'disabled' : ''}>
              {this.state.busy ? <Inline size={64} color={"#fff"}/> : btn_label2}
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default withRouter(CartModal2);