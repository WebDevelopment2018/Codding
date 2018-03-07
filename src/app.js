import React from "react"
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Layout from "./components/Layout";
import "../src/styles/common.less"
import initStore from "./initStore";
import "./styles/D3Tree.less";

ReactDOM.render(
    <Provider store={initStore()}>
        <Layout/>
    </Provider>,
    document.getElementById("root")
);