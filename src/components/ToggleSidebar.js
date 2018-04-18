import React, {Component} from 'react';
import block from "../helpers/BEM";
import "../styles/ToggleSidebar.less";
import AddUserSidebar from "./AddUserSidebar";

const b = block("ToggleSidebar");

class ToggleSidebar extends Component {
    constructor() {
        super();
        this.state = {
            showSidebar: true,
            textValueAdd: true,
            textValueClose: false
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

export default ToggleSidebar;