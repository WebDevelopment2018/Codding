import React from "react";
import "../styles/Days.less"

class Days extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: this.props.year,
            month: this.props.month
        }
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
                {this.get_start_dis_days().sort().map((s_dis_day) =>
                    <div className="Days__day Days__day_disabled">
                    <span>
                    {s_dis_day}
                    </span></div>
                )}
                {this.get_active_days().map((day) =>
                    <div className="Days__day">
                    <span>
                    {day}
                    </span></div>
                )}
                {this.get_end_dis_days().map((e_dis_day) =>
                    <div className="Days__day Days__day_disabled">
                    <span>
                    {e_dis_day + 1}
                    </span></div>
                )}
            </div>
        ];
    }
}
export default Days;