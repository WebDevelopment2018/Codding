import React, {Component} from "react";
import "../styles/CalendarDays.less"

const CALENDARCELLSNUMBER = 42;

const getAllMonthDays = (monthLength) => {
    return Array(monthLength).fill(null).map(
        (el,i) => i+1
    )
}

class CalendarDays extends Component {
    constructor(props) {
        super(props);
        this.state = this.getAllDays(this.props.year, this.props.month);
    }

    componentWillReceiveProps(newProps) {
        if (this.props !== newProps) {
            this.setState(this.getAllDays(newProps.year, newProps.month));
        }
    }

    getAllDays(year, month) {
        return {
            previousDays: this.getPreviousMonthDays(year, month),
            currentDays: this.getCurrentMonthDays(year, month),
            nextDays: this.getNextMonthDays(year, month)
        }
    }

    getPreviousMonthDays(year, month) {
        let date = new Date(year, month, 1),
            monthFirstDay = (date.getDay() || 7),
            prevMonthLength = (new Date(year, month, 0)).getDate();

        return Array(monthFirstDay - 1)
            .fill(null)
            .map((el, i) => prevMonthLength - i);
    };

    getNextMonthDays(year, month) {
        let date = new Date(year, month, 1),
            monthFirstDay = (date.getDay() || 7),
            monthLength = (new Date(year, month + 1, 0)).getDate(),
            partDaysLength = CALENDARCELLSNUMBER - (monthFirstDay - 1) - monthLength;

        return Array(partDaysLength)
            .fill(null)
            .map((el, i)=>i
            )

    };

    getCurrentMonthDays(year, month) {
        let monthLength = (new Date(year, month + 1, 0)).getDate();
        return getAllMonthDays(monthLength);
    }

    render() {
        return (
            <main className="Days">
                {this.state.previousDays.sort().map((s_dis_day, i) =>
                    <div key={i} className="CalendarDays__day CalendarDays__day_disabled">{s_dis_day}</div>
                )}
                {this.state.currentDays.map((day, i) =>
                    <div key={i} className="CalendarDays__day">{day}</div>
                )}
                {this.state.nextDays.map((e_dis_day, i) =>
                    <div key={i} className="CalendarDays__day CalendarDays__day_disabled">{e_dis_day + 1}</div>
                )}
            </main>
        )
    }
}

export default CalendarDays;