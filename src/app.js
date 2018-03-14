import React from "react"
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Layout from "./components/Layout";
import "../src/styles/common.less"
import initStore from "./initStore";
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <Provider store={initStore()}>
        <BrowserRouter>
            <Layout/>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);