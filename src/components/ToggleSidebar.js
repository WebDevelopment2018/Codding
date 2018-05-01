import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import block from "../helpers/BEM";
import "../styles/ToggleSidebar.less";
import AddUserForm from "./AddUserForm";
import {getEditingPersonId, getRelatives} from "../reducers/index";

const b = block("ToggleSidebar");

class ToggleSidebar extends Component {
  state = { showSidebar: false };
  static getDerivedStateFromProps = ({editing})=> {
    return {showSidebar: Boolean(editing)};
  };

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
export default connect(state => {
  return {editing: getEditingPersonId(state).id || getRelatives(state).relatives};
})(ToggleSidebar);
