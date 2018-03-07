import React from "react"
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as d3 from "d3";

import Layout from "./components/Layout";
import "../src/styles/common.less"
import initStore from "./initStore";
import data from "../data/data.json";
import "./styles/D3Tree.less";

ReactDOM.render(
    <Provider store={initStore()}>
        <Layout/>
    </Provider>,
    document.getElementById("root")
);