import React, { Component, Fragment } from "react"
import { Switch, Route } from "react-router-dom"

//Components
import ToggleSidebar from "./ToggleSidebar"
import InfoSidebar from "./InfoSidebar"
import Search from "./Search"
import Tree from "./Tree"

//Styles
import "../styles/Layout.less"
import block from "../helpers/BEM"

const b = block("Layout")

class Layout extends Component {
  constructor(props) {
    super(props)
    let zooming = false
    this.state = {
      zooming
    }
  }
  zoomIn() {
    this.setState({ zooming: false })
  }
  zoomOut() {
    this.setState({ zooming: true })
  }
  render() {
    return (
      <Fragment>
        <div className={b()}>
          {/*<div className={b("zoom")}>*/}
          {/*<button className={b("zoomOut")} onClick={this.zoomOut.bind(this)}>-</button>*/}
          {/*<button className={b("zoomIn")} onClick={this.zoomIn.bind(this)}>+</button>*/}
          {/*</div>*/}
          <aside className={b("infoSidebar")}>
            <InfoSidebar />
          </aside>
          <aside className={b("toggleSidebar")}>
            <ToggleSidebar />
          </aside>
          <Switch>
            <Route exact path="/" component={Search} />
            <Route path="/:person" component={Tree} />
          </Switch>
        </div>
      </Fragment>
    )
  }
}
export default Layout
