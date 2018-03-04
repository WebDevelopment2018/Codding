import React, {Component} from 'react';

import "../styles/Family.less";
import users from "../../data/data.json"
class Family extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div className="Family">Family</div>
        )
    }
}

export default Family;