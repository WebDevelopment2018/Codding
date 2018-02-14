import React from "react";
import ReactDOM from 'react-dom';

import Calendar from "./Calendar"
import Footer from "./Footer"

ReactDOM.render(
    <div className="calendar">
        <Calendar/>
        <Footer/>
    </div>,
    document.querySelector('.container')
);