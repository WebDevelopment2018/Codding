import React, { Component } from "react"
import SearchPerson from "./SearchPerson"
import { Route } from "react-router-dom"

import "../styles/Search.less"

import block from "../helpers/BEM"
const b = block("Search");

class Search extends Component {
  render() {
    return (
      <Route>
        {({ history }) => <SearchPerson className={b()} placeholder={"Петро І"} onChange={personId => history.push("/" + personId)} />}
      </Route>
    )
  }
}

export default Search
