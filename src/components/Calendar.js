import React, {Component} from 'react';

import "../styles/Calendar.less";
import CalendarDays from "./CalendarDays";
import {DAYNAMES, MONTHS} from "./consts"


class Calendar extends Component {
    constructor() {
        super();
        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
        this.state = {
            month,
            year
        };
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

    renderHeader() {
        return [
            <button key="1" className="Calendar__btn" onClick={() => this.goToPrevMonth()}>&lt;</button>,
            <h1 key="2" className="Calendar__header-title">{MONTHS[this.state.month]} {this.state.year}</h1>,
            <button key="3" className="Calendar__btn" onClick={() => this.goToNextMonth()}>&gt;</button>
        ]
    }

    renderFooter() {
        return DAYNAMES.map((day,i) => <div key={i} className="Calendar__footer-day">
                    {day}
                </div>)
    }

    render() {
        return (
            <div className="Calendar">
                <header className="Calendar__header">{this.renderHeader()}</header>
                <CalendarDays
                    year={this.state.year}
                    month={this.state.month}/>
                <footer className="Calendar__footer">{this.renderFooter()}</footer>
            </div>
        )
    }
}

export default Calendar;