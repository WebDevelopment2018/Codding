import React from "react";
import "../styles/Days.less"

class Days extends React.Component {
    constructor(props) {
        super(props);
    }

    get_start_dis_days() {
        let month = new Date(this.props.year, this.props.month, 1),
            monthFirstDay = (month.getDay() || 7),
            prevMonthLength = (new Date(this.props.year, this.props.month, 0)).getDate(),
            start_disabled_days = [], i;
        for (i = 0; i < monthFirstDay - 1; i++) {
            start_disabled_days.push(prevMonthLength - i);
        }
        return start_disabled_days
    };

    get_end_dis_days() {
        let month = new Date(this.props.year, this.props.month, 1),
            monthFirstDay = (month.getDay() || 7),
            monthLength = (new Date(this.props.year, this.props.month + 1, 0)).getDate(),
            end_disabled_days = [], i;
        for (i = 0; i < (42 - (monthFirstDay - 1) - monthLength); i++) {
            end_disabled_days.push(i);
        }
        return end_disabled_days
    };

    get_active_days() {
        let monthLength = (new Date(this.props.year, this.props.month + 1, 0)).getDate(),
            days = [], i;
        for (i = 0; i < monthLength; i++) {
            days.push(i + 1);
        }
        return days
    }

    render() {
        return [
            <div className="Days">
                {this.get_start_dis_days().sort().map((s_dis_day,i) =>
                    <div key={i} className="Days__day Days__day_disabled">{s_dis_day}</div>
                )}
                {this.get_active_days().map((day,i) =>
                    <div key={i} className="Days__day">{day}</div>
                )}
                {this.get_end_dis_days().map((e_dis_day,i) =>
                    <div key={i} className="Days__day Days__day_disabled">{e_dis_day + 1}</div>
                )}
            </div>
        ];
    }
}
export default Days;