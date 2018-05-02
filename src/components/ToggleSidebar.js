import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {Redirect} from 'react-router'

import block from "../helpers/BEM";
import "../styles/ToggleSidebar.less";
import AddUserForm from "./AddUserForm";
import {getEditingPersonId, getRelatives} from "../reducers/index";

const b = block("ToggleSidebar");

class ToggleSidebar extends Component {
  state = { showSidebar: false , editing: null};
  static getDerivedStateFromProps = ({editing})=> {
    return {showSidebar: Boolean(editing.id), editing: editing.id};
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
        {this.state.editing && (<Redirect to={`/${this.state.editing}`}/>)}
      </Fragment>
    );
  }
}
export default connect(state => {
  return {editing: getEditingPersonId(state)};
})(ToggleSidebar);
