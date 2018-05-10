import React, {Component, Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';

import "../styles/Layout.less";
import Tree from "./Tree";
import block from "../helpers/BEM";
import ToggleSidebar from "./ToggleSidebar";
import InfoSidebar from "./InfoSidebar";
const b = block("Layout");

class Layout extends Component {
    constructor(props) {
        super(props);
        let zooming = false;
        this.state = {
          zooming
      };
    }
    zoomIn() {
      this.setState({zooming: false});
    }
    zoomOut() {
      this.setState({zooming: true});
    }
    render() {
        return (
            <Fragment>
                <div className={b()}>
                  {/*<div className={b("zoom")}>*/}
                    {/*<button className={b("zoomOut")} onClick={this.zoomOut.bind(this)}>-</button>*/}
                    {/*<button className={b("zoomIn")} onClick={this.zoomIn.bind(this)}>+</button>*/}
                  {/*</div>*/}
                  <aside className={b("infoSidebar")}><InfoSidebar/></aside>
                  <aside className={b("toggleSidebar")}><ToggleSidebar/></aside>
                    <Switch>
                        <Route exact path='/' component={Tree}/>
                        <Route path='/:person' component={Tree}/>
                    </Switch>
                </div>
            </Fragment>
        )
    }
}
export default Layout;