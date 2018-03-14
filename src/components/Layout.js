import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';

import "../styles/Layout.less";
import Tree from "./Tree";
import block from "../helpers/BEM";
import Header from "./Header";
import {setData} from '../actions/index'

const b = block("Layout");

class Layout extends Component {
    constructor() {
        super();
    }
    // componentWillMount() {
    //     fetch('http://localhost:3000/Romanov')
    //         .then(results => {return results.json()})
    //         .then(data => {
    //             this.props.onSetData(data);
    //             }
    //         );
    // }
    render() {
        return (
            <Fragment>
                <div className={b()}>
                    <Switch>
                        <Route exact path='/' render={() => <Header/>}/>
                        <Route path='/:person' component={Tree}/>
                    </Switch>
                </div>
            </Fragment>
        )
    }
}

// x

// Layout = withRouter(connect(state =>
//         () => ({}),
//     mapDispatchToProps
// )(Layout));
//
export default Layout;