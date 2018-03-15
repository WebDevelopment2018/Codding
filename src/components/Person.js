import React, {Component} from 'react'
import {connect} from "react-redux";
import { NavLink } from 'react-router-dom'

import "../styles/Person.less"
import {getUserById} from "./consts";
import users from "../../data/data.json"
import block from "../helpers/BEM";

const b = block("Person");

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = this.mapPropsToState(props);
    }
    componentWillReceiveProps(newProps){
        this.setState(this.mapPropsToState(newProps));
    }
    mapPropsToState(props){
        return {
            "user" : getUserById(props.person.id, users),
            "x": props.person.x,
            "y": props.person.y
        };
    }
    getMargins(){
        return {
            "marginLeft": this.state.x + 400,
            "marginTop": this.state.y - 500
        }
    }
    render() {
        const fullName = this.state.user.name + " " + this.state.user.surname;
        const id = "/" + this.state.user.id;
        return (
            <NavLink to={id}>
                <div className={b()} style={this.getMargins()}>
                    <img className={b("img")} src={this.state.user.photo} alt=""/>
                    <h3 className={b("fullName")} data-text={fullName}>{this.state.user.name} {this.state.user.surname}</h3>
                    <time className={b("birthday")}>{this.state.user.birthday}</time>
                    <time className={b("death")}>{this.state.user.death}</time>
                </div>
            </NavLink>
        )
    }
}

export default Person;

