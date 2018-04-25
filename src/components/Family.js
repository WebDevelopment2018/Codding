import React, {Component} from 'react';
import "../styles/common.less";
import Person from "./Person";
import "../styles/Family.less";

class Family extends Component {

    render() {
        return (
            <div className="Family">
                {this.props.coordinates.map( (person,i) =>
                <Person person={person} activeId={this.props.activeId} key={i}/>
                )}
            </div>
        )
    }
}

export default Family;