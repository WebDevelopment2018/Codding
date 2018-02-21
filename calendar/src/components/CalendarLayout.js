import React, {Component} from 'react'
import CalendarHeader from "../components/CalendarHeader";
import Days from "../components/Days"
import CalendarFooter from "../components/CalendarFooter";
import "../styles/CalendarLayout.less"

class CalendarLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="CalendarLayout">
                <CalendarHeader/>
                <CalendarFooter/>
            </div>
        )
    }
}

export default CalendarLayout;