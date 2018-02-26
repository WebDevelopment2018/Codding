import React from "react";
import {DAYNAMES} from "./consts"

class CalendarFooter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="CalendarLayout__footer">
                {DAYNAMES.map((day,i) => <div key={i} className="CalendarLayout__footer_day">
                    {day}
                </div>)}
            </div>
        );
    }
}

export default CalendarFooter;