import React, {Component, Fragment} from 'react';

import "../styles/Layout.less";
import Tree from "./Tree";
import block from "../helpers/BEM";
import {Switch, Route} from 'react-router-dom'

const b = block("Layout");

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Fragment>
                <div className={b()}>
                    <Switch>
                        <Route path='/:person' component={Tree}/>
                    </Switch>
                </div>
            </Fragment>
        )
    }
}

export default Layout;