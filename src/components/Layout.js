import React, {Component, Fragment} from 'react';

import "../styles/Layout.less";
import D3Tree from "./D3Tree";
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
                    <D3Tree id={7}/>
                </div>
            </Fragment>
        )
    }
}

export default Layout;