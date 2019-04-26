import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { events, gear_names} from "./general.js";
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
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import { getGearHistory, getListGears ,formatDate, handleError} from '../../../../actions/app.actions'
import AboutPeriod from "./AboutPeriod";
import BarLoader from "react-bar-loader";


const localizer = BigCalendar.momentLocalizer(moment);
class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: events,
            alert: null,
            gear_title: '',
            cur_gear_num: 0,
            gear_rent_info_list: [],
            cur_rent_info_num: 0,
            dropdownOpen: false,
            open: false,
            open_person_dlg: false
        };
    }

    componentDidMount() {
        // getGearHistory();
        getListGears();
        // getGearDetail();
        // UpdateMydata_calendar();
    }

    shouldComponentUpdate(state, props) {
        if(this.state !== state || this.props !== props){
            UpdateMydata_calendar();
            return true;
        }
        else return false;
    }

    onOpenModel= () => {
        this.setState({open:true});
    };

    onOpenAboutPersonModel = () => {
        this.setState({open_person_dlg:true});
    };

    onCloseModel = () => {
        this.setState({open:false});
        this.setState({open_person_dlg:false});
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
        if(selected)
            alert(day);
    }

    // big Calendar func
    selectedEvent(event) {
        console.log("Click_event", event);
        if(event!=='Owner') {
            this.setState({imgurl : event.imgurl, person_name: event.title, startday: event.start, endday: event.end});
            this.onOpenAboutPersonModel();
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

    // DropdownMenu func
    changeGearName = gear_num => {
        this.setState({cur_gear_num: gear_num });
    };

    render() {
        const { listGears } = this.props;
        if (!listGears) {
            return <BarLoader color="#F82462" height="5"/>;
        }

        const cur_gear = listGears[this.state.cur_gear_num];
        const gear_name = cur_gear.brand + " " + cur_gear.categoryName;
        let cur_rent = {};
        if (this.state.gear_rent_info_list.length > 0)
            cur_rent = this.state.gear_rent_info_list[this.state.cur_rent_info_num];
        console.log(listGears);

        const times = this.state.events.map((item) => {
            console.log("DayPicker->",{after : item.end, before : item.start});
            return {after : item.end, before : item.start};
        });

        return (
            <div>
                <div className="calendar_dropdown_div">
                    <p className="dropdown_calendar_gearname">SELECT GEAR</p>
                    <div className="calendar_dropdown_div_bottom">
                        <Dropdown className=" calendar_dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                {gear_name}
                            </DropdownToggle>
                                <DropdownMenu left>
                                {
                                    listGears.map((ele, index) => {
                                        return <DropdownItem key={index} onClick={() => this.changeGearName(index)}>{ele.brand} {ele.categoryName}</DropdownItem>;
                                    })
                                }
                            </DropdownMenu>
                        </Dropdown>
                        <button className="calendar_dropdown_bottom_button" onClick={this.onOpenModel}>Add Unavailable Period</button>
                        {/*<PeriodModal gearname={gear_name} open={this.state.open} onClose={this.onCloseModel} addToPeriod={this.addToPeriod}/>*/}
                        {/*<AboutPeriod gearname={gear_name} open={this.state.open_person_dlg} onClose={this.onCloseModel} imgurl={cur_rent.img_url} person_name={cur_rent.renter_name} startday={cur_rent.startDate} endday={cur_rent.endDate}/>*/}
                    </div>
                </div>

                <div className="Calendar_parent_div">
                    <BigCalendar className="calendar_first_div d-sm-none d-none d-lg-block d-md-block"
                        selectable
                        localizer={localizer}
                        events={this.state.events.map((item) => {
                            if(item.rent_gear_name === this.state.g_name) {
                                return {...item, title: (item.title + item.start)}
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
                        modifiers={{startday: this.state.events.map((item, index) => {
                                return new Date(item.start);
                            }), endday: this.state.events.map((item, index) =>{
                                return new Date(item.end);
                            })}}
                        selectedDays = {this.state.events.map((item, index) => {
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
                    <IconButton><RightArrowIcon onClick={() => {onNavigate('NEXT'); UpdateMydata_calendar();}} /></IconButton>
                </div>
            </Toolbar>
        );
    }

}
const UpdateMydata_calendar = () => {
    $(document).ready(function () {
        $(".rbc-date-cell").each(function (index) {
            let day_number = $(this).find("a").html();
            if(day_number[0] === '0'){
                $(this).find("a").html(day_number[1]);
            }
        })
        let resize_index=true;
        function Append_Rent_Data(filter_e, time_s, time_e) {
            return (
            "<div class='rbc-event-custom-data'>" +
                "<div class='rbc-event-custom-data-top'>" +
                    "<img class='rent_user' src="+filter_e.imgurl+" >" +
                    "<p>"+filter_e.title+"</p>" +
                "</div>" +
                "<div class='rbc-event-custom-data-bottom'>" +
                    "<p class='rbc-event-custom-data-bottom-date'>"+time_s+" - "+time_e+"</p>" +
                    "<p class='rbc-event-custom-data-bottom-range'>"+filter_e.data_range+"</p>" +
                "</div>" +
            "</div>");
        }
        function Append_Rent_Name (name) {
            return (
                "<div class='rbc-event-content' title='"+name+"'>"+name+"</div>"
            );
        }
        const update_ui = function() {
            $(".rbc-event-content").each(function (even_content) {
                const title =  $(this).html();
                $(this).parent().html(Append_Rent_Name(title));
            });

            $(".rbc-event-content").each(function (even_content) {
                const title =  $(this).html();
                const filterevent = events.filter(item => (item.title + item.start) === title);
                if(filterevent.length === 0){
                    return;
                }
                const start_time = getDateStr(new Date(filterevent[0].start));
                const end_time = getDateStr(new Date(filterevent[0].end));
                $(this).parent().append(Append_Rent_Data(filterevent[0], start_time, end_time));
                resize_index = true;

            })
        }
        update_ui();

        $(window).on('resize', function(){
             if(resize_index) {
                 resize_index = false;
                 setTimeout(update_ui, 400);
             }

        });

    })
};

export default Calendar;