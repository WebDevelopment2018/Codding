import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import block from "../helpers/BEM";
import "../styles/ToggleSidebar.less";
import AddUserForm from "./AddUserForm";
import { getEditingPersonId } from "../reducers/index";

const b = block("ToggleSidebar");

class ToggleSidebar extends Component {
  state = { showSidebar: false };
  static getDerivedStateFromProps = ({editing})=> ({showSidebar: Boolean(editing.id)});

  onClick(e) {
    e.preventDefault();
    this.setState({
      showSidebar: !this.state.showSidebar
    });
  }

  render() {
    return (
      <Fragment>
        <button className={b("action-button")} onClick={this.onClick.bind(this)}>
          {this.state.showSidebar ? "Close" : "Add"}
        </button>
        {this.state.showSidebar && <AddUserForm />}
      </Fragment>
    );
  }
}
export default connect(state => ({editing: getEditingPersonId(state)}))(ToggleSidebar);
