import React, {Component, Fragment} from 'react';

import "../styles/Layout.less";
import Tree from "./Tree";
import block from "../helpers/BEM";

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
                    <Tree id={4}/>
                </div>
            </Fragment>
        )
    }
}

export default Layout;