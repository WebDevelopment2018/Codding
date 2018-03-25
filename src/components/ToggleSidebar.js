import React, {Component} from 'react';
import block from "../helpers/BEM";
import "../styles/ToggleSidebar.less";
import AddUserSidebar from "./AddUserSidebar";

const b = block("ToggleSidebar");

class ToggleSidebar extends Component {
    constructor() {
        super();
        this.state = {
            showSidebar: false
        }
    }

    onClick(e) {
        e.preventDefault();
        this.setState({showSidebar: !this.state.showSidebar})
    }

    render() {
        return (
            <aside className={b()}>
                <button className={b("action-button")} onClick={this.onClick.bind(this)}>Add user</button>
                {this.state.showSidebar && <AddUserSidebar/>}
            </aside>
        )
    }
}

export default ToggleSidebar;