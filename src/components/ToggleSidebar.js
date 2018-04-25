import React, {Component} from 'react';
import {connect} from "react-redux";

import block from "../helpers/BEM";
import "../styles/ToggleSidebar.less";
import AddUserSidebar from "./AddUserSidebar";
import {getEditingPersonId} from "../reducers/index";

const b = block("ToggleSidebar");

class ToggleSidebar extends Component {
    constructor() {
        super();
        this.state = {
            showSidebar: false,
            textValueAdd: true,
            textValueClose: false
        }
    }
    componentWillReceiveProps(props) {
        if(props.editing.id){
            this.setState({
                showSidebar: true,
                textValueAdd: false,
                textValueClose: true
            })
        }
    }
    onClick(e) {
        e.preventDefault();
        this.setState({
            showSidebar: !this.state.showSidebar,
            textValueAdd: !this.state.textValueAdd,
            textValueClose: !this.state.textValueClose
        })
    }

    render() {
        let value;
        (this.state.textValueAdd === true ? value= "Add" : value = "Close");
        return (
            <aside className={b()}>
                <button className={b("action-button")} onClick={this.onClick.bind(this)}>{value}</button>
                {this.state.showSidebar && <AddUserSidebar/>}
            </aside>
        )
    }
}
export default connect((state) => {
        return {
            editing: getEditingPersonId(state)
        }
    },
    null
)(ToggleSidebar);