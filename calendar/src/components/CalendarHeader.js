import React from "react";
import Days from "./Days";
import {MONTHS} from "./consts";

class CalendarHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
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

    render() {
        return ([
            <header key="1" className="CalendarLayout__header">{this.renderHeader()}
            </header>,
            <main key="2" className="Days"><Days
                year={this.state.year}
                month={this.state.month}/>
            </main>
        ])
    }

    renderHeader() {
        return [
            <button className="CalendarLayout__btn" onClick={() => this.goToPrevMonth()}><span>&lt;</span></button>,
            <h1 className="CalendarLayout__header_title">{MONTHS[this.state.month]} {this.state.year}</h1>,
            <button className="CalendarLayout__btn" onClick={() => this.goToNextMonth()}><span>&gt;</span></button>
        ]
    }
}
export default CalendarHeader;