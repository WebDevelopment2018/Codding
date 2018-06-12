import React, { Component, Fragment } from "react"
import { Switch, Route, Link } from "react-router-dom"

//Components
import Search from "./Search"
import Tree from "./Tree"

//Styles
import "../styles/Layout.scss"
import block from "../helpers/BEM"
import AddUserForm from "./AddUserForm"

const b = block("Layout")

const Layout = () => (
  <div className={b()}>
    <aside className={b("toggleSidebar")}>
      <Link to="/create">Create person</Link>
      <Route exact path="/:person/edit" component={AddUserForm} />
      <Route exact path="/create" component={AddUserForm} />
    </aside>
    <Switch>
      <Route exact path="/" component={Search} />
      <Route path="/:person" component={Tree} />
    </Switch>
  </div>
)

export default Layout
