import React, {Component, Fragment} from 'react';

import "../styles/Layout.less";
import Parents from "./Parents";
import Children from "./Children";
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
                    <Parents id={7}/>
                    <Children id={1}/>
                </div>
            </Fragment>
        )
    }
}

export default Layout;