import React, { Component } from "react"
import SearchPerson from "./SearchPerson"
import { Route } from "react-router-dom"

class Search extends Component {
  render() {
    return (
      <Route>
        {({ history }) => <SearchPerson placeholder={"Петро І"} onChange={personId => history.push("/" + personId)} />}
      </Route>
    )
  }
}

export default Search
