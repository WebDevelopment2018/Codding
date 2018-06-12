import React, { Component, Fragment } from "react"
import block from "../helpers/BEM"
const b = block("Tree")

class TreePathes extends Component {
  constructor(props) {
    super(props)
    this.state = this.initState(props)
  }

  initState(props) {
    return {
      childrenCoordinates: props.childrenCoordinates,
      parentsCoordinates: props.parentsCoordinates
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this.initState(nextProps))
  }

  getClassName(node) { //TODO: fix it. Use just block and modifier. ( node_internal and node_leaf)
    return b("node") + (node.children ? b("node-internal") : b("node-leaf"))
  }

  getTransform(node) {
    return "translate(" + node.x + "," + node.y + ")"
  }

  renderPath(node) {
    if (node.parent !== null) {
      return <path className={b("link")} d={this.getPath(node)} />
    }
  }

  getPath(d) {
    //control ends and line of the path
    // prettier-ignore
    return "M" + (d.x + 50) + "," + d.y
            + "C" + (d.x + 50) + "," + (d.y + d.parent.y) /2
            + " " + d.parent.x + "," + (d.y + d.parent.y) /2
            + " " + d.parent.x  + "," + d.parent.y;
  }

  renderTrees() {
    return (
      <>
        {this.state.parentsCoordinates.map(node => this.renderNode(node))}
        {this.state.childrenCoordinates.map(node => this.renderNode(node))}
      </>
    )
  }

  renderNode(node) {
    return (
      <Fragment key={node.id}>
        <g className={this.getClassName(node)} transform={this.getTransform(node)} />
        {this.renderPath(node)}
      </Fragment>
    )
  }
  render() {
    return (
      <>
        <g transform="translate(400,210)" key="1">
          {" "}
          {this.state.parentsCoordinates.map(node => this.renderNode(node))}
        </g>
        <g transform="translate(400,210)" key="2">
          {" "}
          {this.state.childrenCoordinates.map(node => this.renderNode(node))}
        </g>
      </>
    )
  }
}
export default TreePathes
