import React, {Component} from 'react'

import "../styles/Person.less"
import {getUserById} from "./consts";
import users from "../../data/data.json"
import block from "../helpers/BEM";

const b = block("Person");

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
        return {
            "marginLeft": this.state.x + 400,
            "marginTop": this.state.y - 500
        }
    }

    render() {
        return (
            <div className={b()} style={this.getMargins()}>
                <img className={b("img")} src={this.state.user.photo} alt=""/>
                <h3 className={b("fullName")}>{this.state.user.name} {this.state.user.surname}</h3>
                <time className={b("birthday")}>{this.state.user.birthday}</time>
                <time className={b("death")}>{this.state.user.death}</time>
            </div>
        )
    }
}

export default Person;