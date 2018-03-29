import React, {Component} from 'react';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
//import { navigateAction } from "fluxible-router";

import block from "../helpers/BEM";
import "../styles/AddUserSidebar.less";
import {addUser} from "../actions/index";

const b = block("AddUserSidebar");

class AddUserSidebar extends Component {
    constructor(){
        super();
        this.state = {
            "href":"/"
        }
    }
    addPersonToData(e) {
        e.preventDefault();
        const name = this.refs.name.value;
        const surname = this.refs.surname.value;
        const birthday = this.refs.birthday.value;
        const death = this.refs.death.value === "" ? null : this.refs.death.value;
        const father = this.refs.father.value === "" ? null : parseInt(this.refs.father.value);
        const mother = this.refs.mother.value === "" ? null : parseInt(this.refs.mother.value);
        const children = [];
        const relationship = [];
        const photo = "http://res.cloudinary.com/csucu/image/upload/q_100,h_70,w_100,c_thumb,g_face/v1520238627/Praskovia_romanova_ivm43u.jpg";

        const person = {
            name,
            surname,
            birthday,
            death,
            father,
            mother,
            children,
            relationship,
            photo
        };
        const {addUser} = this.props;
        const id = addUser(person);
        this.setState({"href": "/"+id});
        //this.context.executeAction(navigateAction, { method: 'get', url: "/"+id } );
    };

    render() {
        return (
                <form className={b()} onSubmit={this.addPersonToData.bind(this)} href={this.props.href}>{this.props.children}
                    <input ref='name' type="text" className={b("input-name")} placeholder="Ім'я" required/>
                    <input ref='surname' type="text" className={b("input-surname")} placeholder="Прізвище" required/>
                    <div className={b("bday")}>
                        <h4 className={b("text")}>День народження:</h4>
                        <input ref='birthday' type="date" className={b("input-birthday")} name="bday" required/>
                    </div>
                    <div className={b("dday")}>
                        <h4 className={b("text")}>День смерті:</h4>
                        <input ref='death' type="date" className={b("input-death")} name="bday"/>
                    </div>
                    <input ref='father' type="text" className={b("input-surname")} placeholder="Тато"/>
                    <input ref='mother' type="text" className={b("input-surname")} placeholder="Мама"/>
                    <input ref='children' type="text" className={b("input-surname")} placeholder="Діти"/>
                    <button type='submit' className="ToggleSidebar__action-button">Submit</button>
                </form>

        )
    }
}

export default connect(
    null,
    {addUser}
)(AddUserSidebar);