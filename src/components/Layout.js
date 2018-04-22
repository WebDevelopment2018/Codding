import React, {Component, Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';

import "../styles/Layout.less";
import Tree from "./Tree";
import block from "../helpers/BEM";
import ToggleSidebar from "./ToggleSidebar";

const b = block("Layout");

class Layout extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Fragment>
                <div className={b()}>
                    <ToggleSidebar/>
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