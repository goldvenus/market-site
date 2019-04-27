import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default function AndCalendar() {

    return (
        <DayPicker
            initialMonth={new Date(2019, 4)}
            selectedDays={this.props.myselectedDays}
        />
    );
}