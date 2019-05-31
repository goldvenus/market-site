import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import $ from "jquery";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {getDateStr} from "../../../core/helper/index"
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import RightArrowIcon from '@material-ui/icons/ChevronRight';
import LeftArrowIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography/Typography";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import PeriodSetModal from "./PeriodSetModal"
import PeriodDeleteModal from "./PeriodDeleteModal"
import DayPicker from "react-day-picker";
import './style.css';
import 'react-day-picker/lib/style.css';
import Helmet from 'react-helmet';
import {days} from '../../../core/helper';
import {getListGears} from "../../../core/actions/gear.action";
import {formatDate} from "../../../core/helper";
import {handleError, handleInfo} from "../../../core/actions/common.action";
import {getGearRentState, setBlockPeriod} from '../../../core/actions/dashboard.action'
import AboutPeriod from "./AboutPeriod";
import CustomSpinner from "../../../components/CustomSpinner";
import Modal from "react-responsive-modal";

let global_events = [], global_cur_date = new Date();
let global_cal_item_delete = false;
let localizer = BigCalendar.momentLocalizer(moment);

class RentalCalendarModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      cur_gear_num: 0,
      gear_rent_info_list: [],
      block_period: [{start_date: '2019-04-01', end_date: '2019-04-05'}],
      cur_rent_info_num: 0,
      cur_block_date: {},
      cur_block_num: 0,
      dropdownOpen: false,
      open: 0,
      cur_date: new Date(),
      loading: false,
      rentLoadedHistory: {start_date: new Date(), end_date: new Date()}   // to avoid reload of renting history
    };
  }
  
  componentDidMount() {
    let cur_gear_num = this.props.listGears.reduce((a, item, key) => item.gearid === this.props.gearid ? key : a, 0);
    this.setState(() => ({cur_gear_num: cur_gear_num}), () => {
      this.handleSelectGear(cur_gear_num);
    });
  }
  
  shouldComponentUpdate(state, props) {
    if (this.state !== state || this.props !== props) {
      updateDesktopCalendar();
      return true;
    }
    else return false;
  }
  
  onOpenModal = () => {
    this.setState({open: 1});
  };
  
  onOpenAboutModal = () => {
    this.setState({open: 2});
  };
  
  onCloseModal = () => {
    this.setState({open: 0});
  };
  
  handleDayClick = (day, {selected}) => {
    console.log(day, selected);
    if (selected) {
      this.setState({open: 2});
    }
  };
  
  eventColors(event) {
    let backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  }
  
  toggle = () => {
    this.setState({dropdownOpen: !this.state.dropdownOpen});
  };
  
  getSearchRange = (start_point, month_offset) => {
    let date_obj = new Date(start_point);
    date_obj.setMonth(date_obj.getMonth() - month_offset);
    let start_date = moment(date_obj).format('YYYY-MM-DD');
    date_obj.setMonth(date_obj.getMonth() + 2 * month_offset);
    let end_date = moment(date_obj).format('YYYY-MM-DD');
    return {start_date, end_date};
  };
  
  handleSelectGear = async (gear_num) => {
    const gearid = this.props.listGears[gear_num].gearid;
    const range = this.getSearchRange(this.state.cur_date, 3);
    this.setState({loading: true});
    const ret = await getGearRentState({gearid, start_date: range.start_date, end_date: range.end_date});
    this.setState({cur_gear_num: gear_num, gear_rent_info_list: ret, loading: false});
  };
  
  handleNavigate = async (val) => {
    let cur_date = this.state.cur_date;
    if (val > cur_date) {
      cur_date.setMonth(cur_date.getMonth() + 1);
    } else {
      cur_date.setMonth(cur_date.getMonth() - 1);
    }
    
    const range = this.getSearchRange(this.state.cur_date, 2);  // cur-2 ~ cur+2
    const gearid = this.props.listGears[this.state.cur_gear_num].gearid;
    this.setState({loading: true});
    const ret = await getGearRentState({gearid, start_date: range.start_date, end_date: range.end_date});
    global_events = ret;
    updateDesktopCalendar();
    await getListGears();
    this.setState({gear_rent_info_list: ret, cur_rent_info_num: 0, loading: false});
  };
  
  handleSetBlockPeriod = async ({startDate, endDate, mode}) => {
    // add and edit
    let start_date = formatDate(startDate);
    let end_date = formatDate(endDate);
    let available = true;
    let block_period = this.props.listGears[this.state.cur_gear_num].blockPeriod;
    block_period = block_period === undefined ? [] : block_period;
    block_period = [...block_period, ...this.state.gear_rent_info_list.map((item) => ({
      start_date: item.startDate,
      end_date: item.endDate
    }))];
    block_period.forEach((item, key) => {
      if (!(mode === 2 && key === this.state.cur_block_num)) {
        if ((start_date >= item.start_date && start_date <= item.end_date) ||
          (end_date >= item.start_date && end_date <= item.end_date) ||
          (start_date <= item.start_date && end_date >= item.end_date)) {
          available = false;
        }
      }
    });
    if (!available) {
      handleError("Period you selected intersects with other periods");
      return -1;
    }
    
    try {
      let period_arr = this.props.listGears[this.state.cur_gear_num].blockPeriod;
      if (period_arr === undefined)
        period_arr = [];
      let gearid = this.props.listGears[this.state.cur_gear_num].gearid;
      if (mode === 2)
        period_arr = period_arr.filter((item, key) => this.state.cur_block_num !== key);
      period_arr.push({start_date, end_date});
      
      let res = await setBlockPeriod({period_arr, gearid});
      if (res) {
        handleInfo("Period was set successfully");
        await getListGears();
        this.setState({open: 0});
      } else {
        handleError("Period was not set");
      }
    } catch {
      handleError('Period was not set');
    }
  };
  
  handleDeleteBlockPeriod = async () => {
    try {
      let period_arr = this.props.listGears[this.state.cur_gear_num].blockPeriod;
      let gearid = this.props.listGears[this.state.cur_gear_num].gearid;
      period_arr = period_arr.filter((item, key) => this.state.cur_block_num !== key);
      
      let res = await setBlockPeriod({period_arr, gearid});
      if (res) {
        await getListGears();
        handleInfo("Period was removed successfully!");
        this.setState({open: 0, cur_block_num: 0});
      } else {
        handleError("Period was not removed!");
      }
    } catch {
      handleError('Period was not removed!');
    }
  };
  
  getGearRentPeriodItems = () => {
    return this.state.gear_rent_info_list.map((item) => {
      return {
        ...item,
        title: (item.renter_name + item.startDate),
        start: item.startDate,
        end: item.endDate,
        color: "red"
      };
    });
  };
  
  getBlockPeriodItems = (block_period) => (
    block_period === undefined ? [] :
      block_period.map((item, key) => {
        return {
          ...item,
          title: ('Owner' + item.start_date),
          start: item.start_date,
          end: item.end_date,
          color: "owner",
          renter_name: 'Owner',
          startDate: item.start_date,
          endDate: item.end_date,
          cur_block_num: key
        };
      })
  );
  
  selectedEvent(event) {
    if (event.renter_name.indexOf('Owner') === -1) {
      // extract only gear ids from array
      const arr = this.state.gear_rent_info_list.reduce((arr, item) => {
        return item.gearid === event.gearid ? [...arr, item.gearid] : arr;
      }, []);
      this.setState({cur_rent_info_num: arr.indexOf(event.gearid)});
      this.onOpenAboutModal();
    } else {
      let block_date = {start_date: event.start_date, end_date: event.end_date};
      let open_flag = 3;
      if (global_cal_item_delete) {
        open_flag = 4;
        global_cal_item_delete = false;
      }
      this.setState({
        cur_block_date: block_date,
        cur_block_num: event.cur_block_num,
        open: open_flag
      });
    }
  }
  
  render() {
    const {listGears, onClose} = this.props;
    if (!listGears) {
      return null;
    }
    
    const cur_gear = listGears[this.state.cur_gear_num];
    const gear_name = cur_gear.brand + " " + cur_gear.categoryName;
    let cur_rent = this.state.gear_rent_info_list && this.state.gear_rent_info_list.length > 0 ?
      this.state.gear_rent_info_list[this.state.cur_rent_info_num] : {};
    
    // prepare gear renting history, block period
    let period1 = this.getGearRentPeriodItems();
    let period2 = this.getBlockPeriodItems(cur_gear.blockPeriod);
    let period_arr = [...period1, ...period2];
    global_events = period_arr;
    let dateArr = this.state.gear_rent_info_list.map((item) => {
      let after_day = new Date(item.startDate);
      after_day.setHours(after_day.getHours() - 24);
      let before_day = new Date(item.endDate);
      before_day.setHours(before_day.getHours() + 24);
      return {after: after_day, before: before_day}
    });
    let blockArr = [];
    if (cur_gear && cur_gear.blockPeriod) {
      blockArr = cur_gear.blockPeriod.map((item) => {
        let after_day = new Date(item.start_date);
        after_day.setHours(after_day.getHours() - 24);
        let before_day = new Date(item.end_date);
        before_day.setHours(before_day.getHours() + 24);
        return {after: after_day, before: before_day}
      });
    }
    dateArr = [...dateArr, ...blockArr];
    
    updateDesktopCalendar();
    updateMobileCalendar();
    
    return (
      <Modal open={true} onClose={onClose} center classNames={{modal: "rental-calendar-modal"}}>
        {this.state.loading && <CustomSpinner/>}
        <div className="calendar_dropdown_div">
          <p className="dropdown_calendar_gearname">SELECT GEAR</p>
          <div className="calendar_dropdown_div_bottom">
            <Dropdown className="calendar_dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                {gear_name}
              </DropdownToggle>
              <DropdownMenu left="true">
                {
                  listGears.map((ele, index) => {
                    return <DropdownItem key={index + 1}
                                         onClick={() => index !== this.state.cur_gear_num && this.handleSelectGear(index)}>{ele.brand} {ele.categoryName}</DropdownItem>;
                  })
                }
              </DropdownMenu>
            </Dropdown>
            <button className="calendar_dropdown_bottom_button" onClick={this.onOpenModal}>Add Unavailable Period
            </button>
            {
              this.state.open === 1 ? <PeriodSetModal open={true} gear_info={cur_rent} onClose={this.onCloseModal} mode={1}
                setBlockPeriod={this.handleSetBlockPeriod}/> :
              this.state.open === 2 ? <AboutPeriod open={true} gear_info={cur_rent} onClose={this.onCloseModal}/> :
              this.state.open === 3 ? <PeriodSetModal open={true} gear_info={cur_rent} onClose={this.onCloseModal} mode={2}
                date_obj={this.state.cur_block_date} setBlockPeriod={this.handleSetBlockPeriod}/> :
              this.state.open === 4 ? <PeriodDeleteModal open={true} gear_info={cur_rent} onClose={this.onCloseModal}
                date_obj={this.state.cur_block_date} onDelete={this.handleDeleteBlockPeriod}/> : null
            }
          </div>
        </div>
        <div className="Calendar_parent_div">
          <BigCalendar className="calendar_first_div d-sm-none d-none d-lg-block d-md-block"
                       selectable
                       localizer={localizer}
                       events={period_arr}
                       defaultView="month"
                       scrollToTime={new Date(1970, 1, 1, 6)}
                       defaultDate={this.state.cur_date}
                       onSelectEvent={event => this.selectedEvent(event)}
                       eventPropGetter={this.eventColors}
                       components={{
                         toolbar: CalendarToolBar
                       }}
                       onNavigate={this.handleNavigate}
          />
          <Helmet>
            <style>{`
                            .DayPicker-Day--startday {
                              background-color: #f82462 !important;
                              color: white;
                              opacity: 1 !important;
                              border-radius:50% 0 0 50% !important;
                            }
                            .DayPicker-Day--endday {
                               background-color: #f82462 !important;
                              color: white;
                              opacity: 1 !important;
                              border-radius:0 50% 50% 0 !important;
                            }
                            `}</style>
          </Helmet>
          
          <DayPicker
            className="mobile-rental-calendar"
            month={this.state.cur_date}
            onDayClick={this.handleDayClick}
            selectedDays={dateArr}
          />
        </div>
      </Modal>
    );
  }
}

class CalendarToolBar extends React.PureComponent {
  render() {
    const {onNavigate, label} = this.props;
    return (
      <Toolbar>
        <div className="rbc-toobar-menu" style={{width: '100%', textAlign: 'right'}}>
          <IconButton onClick={() => {
            onNavigate('PREV');
            updateDesktopCalendar();
          }}><LeftArrowIcon/></IconButton>
          <Typography variant="headline" style={{textTransform: 'capitalize', width: '100%'}}>{label}</Typography>
          <IconButton onClick={() => {
            onNavigate('NEXT');
            updateDesktopCalendar();
          }}><RightArrowIcon/></IconButton>
        </div>
      </Toolbar>
    );
  }
}

const updateDesktopCalendar = () => {
  $(document).ready(function () {
    let reduceZero = function () {
      $(".rbc-date-cell").each(function () {
        let day_number = $(this).find("a").html();
        if (day_number[0] === '0') {
          $(this).find("a").html(day_number[1]);
        }
      });
    };
    
    let resize_index = true;
    
    function Append_Rent_Data(filter_e, time_s, time_e, real_time) {
      let close_btn = "<i class='rbc-event-custom-data-cross fa fa-times'/>";
      if (filter_e.title !== 'Owner' + real_time)
        close_btn = '';
      
      return (
        "<div class='rbc-event-custom'>" +
        "<div class='rbc-event-custom-data-top'>" +
        "<div class='rbc-event-item-wrapper'><img class='rent_user' src=" + filter_e.img_url + " >" +
        "<p>" + filter_e.renter_name + "</p></div>" + close_btn +
        "</div>" +
        "<div class='rbc-event-custom-data-bottom'>" +
        "<p class='rbc-event-custom-data-bottom-date'>" + time_s + " - " + time_e + "</p>" +
        "<p class='rbc-event-custom-data-bottom-range'>" + filter_e.data_range + "</p>" +
        "</div>" +
        "</div>");
    }
    
    const update_ui = function () {
      reduceZero();
      
      $(".rbc-event-content").each(function () {
        $(this).siblings().remove();
        const title = $(this).html();
        let filterevent = global_events.filter(item => (item.renter_name + item.startDate) === title);
        if (filterevent.length === 0) {
          return;
        }
        
        const start_time = getDateStr(new Date(filterevent[0].startDate));
        const end_time = getDateStr(new Date(filterevent[0].endDate));
        const duration = days(new Date(filterevent[0].startDate), new Date(filterevent[0].endDate));
        filterevent[0].data_range = duration + " days";
        filterevent[0].title = filterevent[0].renter_name + filterevent[0].startDate;
        $(this).parent().prepend(Append_Rent_Data(filterevent[0], start_time, end_time, filterevent[0].startDate));
        resize_index = true;
      });
      
      $(".rbc-event-custom-data-cross").click(function () {
        global_cal_item_delete = true;
      });
    };
    
    update_ui();
    
    $(window).on('resize', function () {
      if (resize_index) {
        resize_index = false;
        setTimeout(update_ui, 200);
      }
    });
  });
};

const updateMobileCalendar = () => {
  $(function () {
    $(".DayPicker-Day--selected").each(function () {
      let day = $(this).html();
      day = formatDate(global_cur_date.setDate(day));
      global_events.forEach((item) => {
        if (item.startDate === day) {
          $(this).addClass('period-start-day');
        } else if (item.endDate === day) {
          $(this).addClass('period-end-day');
        }
      })
    });
  })
};

export default RentalCalendarModal;