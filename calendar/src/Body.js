import React from "react";

class Body extends React.Component {

    render() {
        let month = new Date(this.props.year, this.props.month, 1),
            monthFirstDay = (month.getDay() || 7),
            monthLength = (new Date(this.props.year, this.props.month + 1, 0)).getDate(),
            prevMonthLength = (new Date(this.props.year, this.props.month, 0)).getDate(),
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
}

export default Body;