import React from "react";
import Body from "./Body"
import Footer from "./Footer";

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
            <header key="1" className="calendar__header">{this.renderHeader()}
            </header>,
            <main key="2" className="calendar__body"><Body
                year={this.state.year}
                month={this.state.month}>
            </Body>
            </main>,
            <footer key="3" className="calendar__footer"><Footer/>
            </footer>
        ])
    }

    renderHeader() {
        return [
            <button className="calendar__btn" onClick={() => this.goToPrevMonth()}><span>&lt;</span></button>,
            <h1 className="calendar__header_title">{this.state.monthArray[this.state.month]} {this.state.year}</h1>,
            <button className="calendar__btn" onClick={() => this.goToNextMonth()}><span>&gt;</span></button>
        ]
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