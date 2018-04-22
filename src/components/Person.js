import React, {Component} from 'react'
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom'

import "../styles/Person.less"
import block from "../helpers/BEM";
import {getPersonById} from "../reducers";

const b = block("Person");

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = this.mapPropsToState(props);
    }

    componentWillReceiveProps(newProps) {
        this.setState(this.mapPropsToState(newProps));
    }

    mapPropsToState(props) {
        let className = "Person";
        if (props.user.id === parseInt(props.activeId)) {
            className += " Person_active";
        }
        if(props.families[props.activeId]){
            const love = props.families[props.activeId].relationship;
            if(love.includes(props.user.id)){
                className += " Person__love";
            }
            const siblings = props.families[props.activeId].siblings;
            if(siblings.includes(props.user.id)){
                className += " Person__sibling";
            }
        }

        return {
            "user": props.user,
            "x": props.person.x,
            "y": props.person.y,
            className
        };
    }

    getMargins() {
        return {
            "marginLeft": this.state.x + 400,
            "marginTop": this.state.y - 500
        }
    }

    render() {
        const id = "/" + this.state.user.id;
        return (
            <div className={b("wrapper")}>
                {/*<button className={b("addParents")} style={this.getMargins()}>+</button>*/}
                {/*<button className={b("addLove")} style={this.getMargins()}>+</button>*/}
            <NavLink to={id}>
                    <div className={this.state.className} style={this.getMargins()}>
                        <img className={b("img")} src={this.state.user.photo} alt=""/>
                        <div className={b("info")}>
                            <h3 className={b("name")} data-text={this.state.user.name}>{this.state.user.name}</h3>
                            <button className={b("edit-button")}><img className={b("edit-button__img")}
                                                                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Feedbin-Icon-home-edit.svg/2000px-Feedbin-Icon-home-edit.svg.png"
                                                                      alt=""/></button>
                            <h3 className={b("surname")}
                                data-text={this.state.user.surname}>{this.state.user.surname}</h3>
                            <time className={b("birthday")}>{this.state.user.birthday}</time>
                            <time className={b("death")}>{this.state.user.death}</time>
                        </div>
                    </div>
            </NavLink>
                {/*<button className={b("addSibling")} style={this.getMargins()}>+</button>*/}
                {/*<button className={b("addChildren")} style={this.getMargins()}>+</button>*/}
            </div>
        )
    }
}

export default connect((state, props) => {
        return {
            user: getPersonById(props.person.id, state),
            families:state.family.families,
        }
    },
    null
)(Person);

