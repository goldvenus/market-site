import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from "react-responsive-modal";
import TextField from "@material-ui/core/TextField/TextField";
import { DateRange } from "react-date-range";
import { Inline } from '@zendeskgarden/react-loaders'
import { getDateStr } from "../../../core/helper/index"

class PeriodSetModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            open_date_picker1: false,
            open_date_picker2: false,
            busy: false
        };
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

    componentDidMount() {
        if (this.props.mode === 2) {
            this.setState({
                startDate: new Date(this.props.date_obj.start_date),
                endDate: new Date(this.props.date_obj.end_date)
            });
        }
    }

    handleAddToPeriod = async () => {
        this.setState({busy: true});
        let res = await this.props.setBlockPeriod({
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            mode: this.props.mode
        });
        if (res === -1) {
            this.setState({busy: false});
        }
    };

    handleClose = (e) => {
        if (this.state.busy)
            e.preventDefault();
        else
            this.props.onClose();
    };

    render() {
        const { gear_info, mode } = this.props;
        const start_date_str = getDateStr(this.state.startDate);
        const end_date_str = getDateStr(this.state.endDate);
        const selectionRange = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            key: 'selection',
        };
        let dlg_heading = 'Unavailable Period';
        let btn_label1 = 'Cancel';
        let btn_label2 = 'Add Period';
        if (mode === 2) {
            dlg_heading = 'Edit Period';
            btn_label2 = 'Save';
        }

        return (
            <Modal open={true} onClose={this.handleClose} center classNames={{modal: "cart-modal"}}>
                <div className='period-cart-header'>
                    <span >{dlg_heading}</span>
                </div>
                <div className='period-cart-body-1'>
                    <div className='pickup-period row'>
                        <span className='period-carted-product-name'>{gear_info.brand} {gear_info.categoryName}</span>
                    </div>
                    <div className="pickup-date-container row">
                        <div className='col-md-11 date-range-container'>
                            <TextField id="date-range-input1" className="date-range-input" type="text" inputProps={300} label={'START DATE'} defaultValue={start_date_str}
                                    onFocus={() => this.setOpenState(true, false)} value={start_date_str}/>
                            {
                                this.state.open_date_picker1 ?
                                    <DateRange
                                        className={'date-range-wrapper date-range-wrapper-period'}
                                        ranges={[selectionRange]}
                                        onChange={this.handleSelect}
                                        rangeColors={['#F74377']}
                                        showDateDisplay={false}
                                    />
                                    : null
                            }
                            {
                                this.state.open_date_picker1 ?
                                    <img src="/images/Icons/calendar/calendar1.svg" alt=''/> :
                                    <img src="/images/Icons/calendar/calendar.svg" alt=''/>
                            }
                        </div>
                        <div className='col-md-2'></div>
                        <div className='col-md-11 date-range-container'>
                            <TextField id="date-range-input1" className="date-range-input" type="text" inputProps={300} label={'END DATE'} defaultValue={end_date_str}
                                    onFocus={() => this.setOpenState(false, true)} value={end_date_str}/>
                            {
                                this.state.open_date_picker2 ?
                                    <DateRange
                                        className={'date-range-wrapper date-range-wrapper-period'}
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

                    <div className='modal-cart-control row'>
                        <button className='cart-control-left-button theme-btn theme-btn-primary' onClick={(e) => this.handleClose(e)}>{btn_label1}</button>
                        <button className='cart-control-right-button theme-btn theme-btn-primary' onClick={this.handleAddToPeriod}
                            disabled={this.state.busy ? 'disabled' : ''}
                        >
                            {
                                this.state.busy ? <Inline size={64} color={"#fff"} /> : btn_label2
                            }
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withRouter(PeriodSetModal);