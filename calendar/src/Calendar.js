import React from "react";


class Calendar extends React.Component {
    constructor() {
        super();
        this.state = {
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            monthArray: "January,February,March,April,May,June,July,August,September,October,November,December ".split(',')
        };
    }

    render() {
        return ([
            <header key="1" className="calendar__header">{this.renderHeader()}</header>,
            <div key="2" className="calendar__body">{this.renderDays()}</div>
        ])
    }

    renderHeader() {
        return [
            <button className="calendar__btn" onClick={() => this.goToPrevMonth()}><span>&lt;</span></button>,
            <div className="calendar__header_title">{this.state.monthArray[this.state.month]} {this.state.year}</div>,
            <button className="calendar__btn" onClick={() => this.goToNextMonth()}><span>&gt;</span></button>
        ]
    }

    renderDays() {
        let month = new Date(this.state.year, this.state.month, 1),
            monthFirstDay = (month.getDay() || 7),
            monthLength = (new Date(this.state.year, this.state.month + 1, 0)).getDate(),
            prevMonthLength = (new Date(this.state.year, this.state.month, 0)).getDate(),
            start_disabled_days = [],
            days = [],
            end_disabled_days = [],
            i;

        for (i = 0; i < monthFirstDay - 1; i++) {
            start_disabled_days.push(prevMonthLength - i);
        }
        for (i = 0; i < monthLength; i++) {
            days.push(i + 1);
        }
        for (i = 0; i < (42 - (monthFirstDay - 1) - monthLength); i++) {
            end_disabled_days.push(i);
        }

        return [
            <div className="calendar__body">                                            {/* How to delete a wrapper? */}
                {start_disabled_days.sort().map((s_dis_day, i) =>
                    <div className="calendar__day calendar__day_disabled" key={`s_dis_day-${++i}`}>
                    <span>
                    {s_dis_day}
                    </span></div>
                )}
                {days.map((day, j) =>
                    <div className="calendar__day " key={`day-${++j}`}>
                    <span>
                    {day}
                    </span></div>
                )}
                {end_disabled_days.map((e_dis_day, k) =>
                    <div className="calendar__day calendar__day_disabled" key={`e_dis_day-${++k}`}>
                    <span>
                    {e_dis_day + 1}
                    </span></div>
                )}
            </div>
        ];
    }

    goToPrevMonth() {
        this.setMonth(this.state.month - 1);
    };

    goToNextMonth() {
        this.setMonth(this.state.month + 1);
    };

    setMonth(monthNumber) {
        if (monthNumber < 0) {
            this.setState({
                month: 11,
                year: this.state.year - 1
            });
        }
        else if (monthNumber > 11) {
            this.setState({
                month: 0,
                year: this.state.year + 1
            });
        }
        else {
            this.setState({
                month: monthNumber
            });
        }
    }
}

export default Calendar;