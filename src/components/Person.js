import React, {Component} from 'react'
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom'

import "../styles/Person.scss"
import block from "../helpers/BEM";
import {getPersonById} from "../reducers";
import {addRelativesStart, editingPersonStart} from "../actions/person";

const b = block("Person");

class Person extends Component {
    state = {
        user: null,
        x: 0,
        y : 0,
        className: ''
    };
    static getDerivedStateFromProps = (props) => {
        let className = "Person";
        if (props.user._id === props.activeId) {
            className += " Person_active";
        }
        if (props.families[props.activeId]) {
            const love = props.families[props.activeId].relationship;
            if (love.includes(props.user._id)) {
                className += " Person__love";
            }
            const siblings = props.families[props.activeId].siblings;
            if (siblings.includes(props.user._id)) {
                className += " Person__sibling";
            }
        }
        return {
            "user": props.user,
            "x": props.person.x,
            "y": props.person.y,
            className,
        };
    };
    getMargins(button=0) {
        return {
            "marginLeft": this.state.x + 400 - button,
            "marginTop": this.state.y - 500
        }
    }
    editPerson=()=>{this.props.editingPersonStart(this.state.user._id);};

    render() {
        const id = "/" + this.state.user._id;
        return (
            <div className={b("wrapper")}>
              <button className={b("edit-button")} onClick={this.editPerson} style={this.getMargins(30)}/>
                    <img className={b("edit-button",["img"])}
                         onClick={this.editPerson}
                         style={this.getMargins(25)}
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Feedbin-Icon-home-edit.svg/2000px-Feedbin-Icon-home-edit.svg.png"
                         alt=""/>
                <NavLink to={id}>
                    <div className={this.state.className} style={this.getMargins()}>
                        <img className={b("img")} src={this.state.user.photo} alt=""/>
                        <div className={b("info")}>
                            <h3 className={b("name")} data-text={this.state.user.name}>{this.state.user.name}</h3>
                            <h3 className={b("surname")}
                                data-text={this.state.user.surname}>{this.state.user.surname}</h3>
                            <time className={b("birthday")}>{this.state.user.birthday}</time>
                            <time className={b("death")}>{this.state.user.death}</time>
                        </div>
                    </div>
                </NavLink>
            </div>
        )
    }
}
export default connect((state, props) => {
        return {
            user: getPersonById(props.person.id, state),
            families: state.family.families,
        }
    },
    {editingPersonStart,
    addRelativesStart}
)(Person);

