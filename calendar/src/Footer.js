import React from "react";

class Footer extends React.Component {

    render() {
        let day = "Mon,Tue,Wed,Thu,Fr,Sat,Su".split(",");
        return (
            <div className="calendar__footer">
                {day.map((day, i) =>
                    <div className="calendar__footer_day" key={`day-${++i}`}>
                        {day}
                    </div>)}
            </div>
        );
    }
}
export default Footer;