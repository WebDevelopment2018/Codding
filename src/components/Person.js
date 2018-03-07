import React, {Component} from 'react'

import "../styles/Person.less"
import {getUserById} from "./consts";
import users from "../../data/data.json"

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "user" : getUserById(this.props.person.id, users),
            "x": this.props.person.x,
            "y": this.props.person.y
        }
    }

    getMargins(){
        console.log(this.props.person);
        return {
            "marginLeft": this.state.x + 200,
            "marginTop": this.state.y - 500
        }
    }

    render() {
        return (
            <div className="Person" style={this.getMargins()}>
                <img className="Person__img" src={this.state.user.photo} alt=""/>
                <h3 className="Person__fullName">{this.state.user.name} {this.state.user.surname}</h3>
                <time className="Person__birthday">{this.state.user.birthday}</time>
                <time className="Person__death">{this.state.user.death}</time>
            </div>
        )
    }
}

export default Person;