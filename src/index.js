import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import Layout from "./components/Layout"
import "./styles/common.scss"
import initStore from "./initStore"
import { BrowserRouter } from "react-router-dom"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(
  <Provider store={initStore()}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)

registerServiceWorker()
