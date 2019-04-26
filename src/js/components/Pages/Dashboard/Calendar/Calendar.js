import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import $ from "jquery";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getDateStr } from "../../../common/Functions"
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import RightArrowIcon from '@material-ui/icons/ChevronRight';
import LeftArrowIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography/Typography";
import {Dropdown,  DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PeriodModal from "./PeriodModal"
import DayPicker from "react-day-picker";
import './style.css';
import Helmet from 'react-helmet';
import { days } from "../../../../actions/app.actions";
import { getGearRentState, getListGears ,formatDate, handleError} from '../../../../actions/app.actions'
import AboutPeriod from "./AboutPeriod";
import BarLoader from "react-bar-loader";

let global_events = [];
const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alert: null,
            cur_gear_num: 0,
            gear_rent_info_list: [],
            cur_rent_info_num: 0,
            dropdownOpen: false,
            open: 0,
            cur_date: new Date(),
            loading: false
        };
    }

    componentDidMount() {
        getListGears();
    }

    shouldComponentUpdate(state, props) {
        if(this.state !== state || this.props !== props){
            UpdateMydata_calendar();
            return true;
        }
        else return false;
    }

    onOpenModel = () => {
        this.setState({open: 1});
    };

    onOpenAboutModal = () => {
        this.setState({open: 2});
    };

    onCloseModal = () => {
        this.setState({open: 0});
    };

    addToPeriod = async ({startDate, endDate}) => {
        alert(formatDate(startDate));
        try {
            alert(formatDate(startDate));
            //const { startDate, endDate } = this.state;
            if (startDate && endDate) {
               alert(formatDate(endDate));
            }
        } catch {
            handleError('Available Period Failed.');
        }
    };

    handleDayClick(day, { selected }) {
        if (selected) {
            alert(day);
        }
    }

    selectedEvent(event) {
        if(event !== 'Owner') {
            // extract only gear ids from array
            const arr = this.state.gear_rent_info_list.reduce((arr, item) => {
                return item.gearid === event.gearid ? [...arr, item.gearid] : arr;
            }, []);
            this.setState({cur_gear_num: arr.indexOf(event.gearid)});
            this.onOpenAboutModal();
        }
    }

    eventColors(event) {
        var backgroundColor = "event-";
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
        date_obj.setMonth(date_obj.getMonth() + month_offset);
        let end_date = moment(date_obj).format('YYYY-MM-DD');
        return {start_date, end_date};
    };

    handleSelectGear = async (gear_num) => {
        const gearid = this.props.listGears[gear_num].gearid;
        const range = this.getSearchRange(this.state.cur_date, 3);
        const ret = await getGearRentState({gearid, start_date: range.start_date, end_date: range.end_date});
        // update calendar
        global_events = ret;
        UpdateMydata_calendar();
        this.setState({cur_gear_num: gear_num, gear_rent_info_list: ret});
    };

    handleNavigate = async (val) => {
        let cur_date = this.state.cur_date;
        if (val > cur_date) {
            cur_date.setMonth(cur_date.getMonth() + 1);
        } else {
            cur_date.setMonth(cur_date.getMonth() - 1);
        }

        const range = this.getSearchRange(this.state.cur_date, 3);
        const gearid = this.props.listGears[this.state.cur_gear_num].gearid;
        const ret = await getGearRentState({gearid, start_date: range.start_date, end_date: range.end_date});
        // update calendar
        global_events = ret;
        UpdateMydata_calendar();
        this.setState({gear_rent_info_list: ret, cur_rent_info_num: 0});
    };

    render() {
        const { listGears } = this.props;
        if (!listGears) {
            return <BarLoader color="#F82462" height="5"/>;
        }

        const cur_gear = listGears[this.state.cur_gear_num];
        const gear_name = cur_gear.brand + " " + cur_gear.categoryName;
        let cur_rent = {};
        if (this.state.gear_rent_info_list.length > 0) {
            cur_rent = this.state.gear_rent_info_list[this.state.cur_rent_info_num];
        }

        return (
            <div>
                <div className="calendar_dropdown_div">
                    <p className="dropdown_calendar_gearname">SELECT GEAR</p>
                    <div className="calendar_dropdown_div_bottom">
                        <Dropdown className=" calendar_dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                {gear_name}
                            </DropdownToggle>
                            <DropdownMenu left="true">
                                <DropdownItem>select a gear</DropdownItem>
                                    {
                                        listGears.map((ele, index) => {
                                            return <DropdownItem key={index+1} onClick={() => this.handleSelectGear(index)}>{ele.brand} {ele.categoryName}</DropdownItem>;
                                        })
                                    }
                            </DropdownMenu>
                        </Dropdown>
                        <button className="calendar_dropdown_bottom_button" onClick={this.onOpenModel}>Add Unavailable Period</button>
                        {
                            this.state.open === 1 ? <PeriodModal gear_info={cur_rent} open={true} onClose={this.onCloseModal} addToPeriod={this.addToPeriod}/> :
                            this.state.open === 2 ? <AboutPeriod gear_info={cur_rent} open={true} onClose={this.onCloseModal}/> : null
                        }
                    </div>
                </div>

                <div className="Calendar_parent_div">
                    <BigCalendar className="calendar_first_div d-sm-none d-none d-lg-block d-md-block"
                        selectable
                        localizer={localizer}
                        events={this.state.gear_rent_info_list.map((item) => {
                            return {
                                ...item,
                                title: (item.renter_name + item.startDate),
                                start: item.startDate,
                                end: item.endDate,
                                color: "red"
                            }
                        })}
                        defaultView="month"
                        scrollToTime={new Date(1970, 1, 1, 6)}
                        defaultDate={new Date()}
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

                    <DayPicker className="d-lg-none d-md-none d-sm-block"
                        initialMonth={new Date(2019, 4)}
                        onDayClick={this.handleDayClick}
                        modifiers={{startday: this.state.gear_rent_info_list.map((item) => {
                                return new Date(item.start);
                            }), endday: this.state.gear_rent_info_list.map((item) =>{
                                return new Date(item.end);
                            })}}
                        selectedDays = {this.state.gear_rent_info_list.map((item) => {
                            let after_day = new Date(item.start);
                            after_day.setHours(after_day.getHours()-24);
                            let before_day = new Date(item.end);
                            before_day.setHours(before_day.getHours()+ 24);
                            return {after : after_day, before : before_day}
                        })}
                    />
                </div>
            </div>
        );
    }
}

class CalendarToolBar extends React.PureComponent {
    render() {
        const { onNavigate, label } = this.props;
        return (
            <Toolbar>
                <div className="rbc-toobar-menu" style={{ width: '100%', textAlign: 'right' }}>
                    <IconButton onClick={() => {onNavigate('PREV'); UpdateMydata_calendar();}}><LeftArrowIcon /></IconButton>
                    <Typography variant="headline" style={{ textTransform: 'capitalize', width: '100%' }}>{label}</Typography>
                    <IconButton onClick={() => {onNavigate('NEXT'); UpdateMydata_calendar();}}><RightArrowIcon/></IconButton>
                </div>
            </Toolbar>
        );
    }
}

const UpdateMydata_calendar = () => {
    $(document).ready(function () {
        $(".rbc-date-cell").each(function() {
            let day_number = $(this).find("a").html();
            if(day_number[0] === '0'){
                $(this).find("a").html(day_number[1]);
            }
        });

        let resize_index=true;
        function Append_Rent_Data(filter_e, time_s, time_e) {
            return (
            "<div class='rbc-event-custom-data'>" +
                "<div class='rbc-event-custom-data-top'>" +
                    "<img class='rent_user' src="+filter_e.img_url+" >" +
                    "<p>"+filter_e.title+"</p>" +
                "</div>" +
                "<div class='rbc-event-custom-data-bottom'>" +
                    "<p class='rbc-event-custom-data-bottom-date'>"+time_s+" - "+time_e+"</p>" +
                    "<p class='rbc-event-custom-data-bottom-range'>"+filter_e.data_range+"</p>" +
                "</div>" +
            "</div>");
        }
        function Append_Rent_Name(name) {
            return (
                "<div class='rbc-event-content' title='"+name+"'>"+name+"</div>"
            );
        }
        const update_ui = function() {
            $(".rbc-event-content").each(function() {
                const title =  $(this).html();
                $(this).parent().html(Append_Rent_Name(title));
            });

            $(".rbc-event-content").each(function() {
                const title =  $(this).html();
                let filterevent = global_events.filter(item => (item.renter_name + item.startDate) === title);
                if(filterevent.length === 0) {
                    return;
                }

                const start_time = getDateStr(new Date(filterevent[0].startDate));
                const end_time = getDateStr(new Date(filterevent[0].endDate));
                const duration = days(new Date(filterevent[0].startDate), new Date(filterevent[0].endDate));
                filterevent[0].data_range = duration + " days";
                filterevent[0].title = filterevent[0].renter_name;
                $(this).parent().append(Append_Rent_Data(filterevent[0], start_time, end_time));
                resize_index = true;
            });
        };

        update_ui();

        $(window).on('resize', function(){
            if(resize_index) {
                resize_index = false;
                setTimeout(update_ui, 200);
            }
        });
    });
};

export default Calendar;