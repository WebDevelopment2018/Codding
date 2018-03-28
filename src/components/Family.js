import React, {Component} from 'react';
import "../styles/common.less";
import Person from "./Person";

class Family extends Component {

    render() {
        return (
            <div className="Family">
                {this.props.coordinates.map( (person,i) =>
                <Person person={person} key={i}/>
                )}
            </div>
        )
    }
}

export default Family;