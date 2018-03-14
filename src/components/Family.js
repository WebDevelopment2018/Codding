import React, {Component} from 'react';

import "../styles/Family.less";
import Person from "./Person";

class Family extends Component {

    render() {
        return (
            this.props.coordinates.map( (person,i) =>
                <Person person={person} key={i}/>
            )
        )
    }
}

export default Family;