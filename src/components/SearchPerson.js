import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { getAllPersons } from "../reducers";
import { searchPersonByName } from "../actions/person";

import block from "../helpers/BEM";
import "../styles/SearchPerson.less";
import { getEditingPersonId } from "../reducers/index";

const b = block("SearchPerson");

const options = [{ label: "Peter 1", value: 2 }, { label: "Natalia Romanove", value: 6 }];

class SearchPerson extends Component {
  state = {
    options: []
  };

  static getDerivedStateFromProps = ({ persons }) => {
    console.log("====", persons);
    return {
      options: persons.map(({ name: label, id: value }) => ({ label, value }))
    };
  };

  handleChange = value => {
    this.props.searchPersonByName(value);
  };

  render() {
    const { options } = this.state;
    return (
      <Select
        simpleValue={true}
        {...this.props}
        onInputChange={this.handleChange}
        options={options}
      />
    );
  }
}
export default connect(
  (state, { gender }) => ({
    persons: getAllPersons(state).filter(person => (gender ? person.gender === gender : true))
  }),
  {
    searchPersonByName
  }
)(SearchPerson);
