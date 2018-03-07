import React, {Component, Fragment} from 'react';
import * as d3 from "d3";

import "../styles/D3Tree.less";
import data from "../../data/data.json"
import block from "../helpers/BEM";

const getUserById = (id) => data.find(user => user.id === id);

const b = block("D3Tree");

const buildTree = (id) => {
    if (id !== null) {
        let user = getUserById(id);
        let parents = [buildTree(user.father, name), buildTree(user.mother, name)];
        return {
            "name": user.id,
            "children": parents.filter(n => n)
        };
    }
    return null;
};

class D3Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "treeData": buildTree(this.props.id)
        }
    }

    getClassName(node) {
        return b("node") +
            (node.children ? b("node-internal") : b("node-leaf"));
    }

    getTransform(node) {
        return "translate(" + node.x + "," + node.y + ")";
    }

    renderPath(node) {
        if (node.parent !== null) {
            return (<path className={b("link")} d={this.getPath(node)}> </path>)
        }
    }

    getPath(d) {
        return "M" + d.x + "," + d.y
            + "C" + d.x + "," + (d.y + d.parent.y) / 2
            + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
            + " " + d.parent.x + "," + d.parent.y;
    }

    renderNodes() {
        let treemap = d3.tree()
            .size([500, 350]); //розміщення відносно svg

        let nodes = d3.hierarchy(this.state.treeData);

        nodes = treemap(nodes);
        let nodesMap = [];
        nodes.each(function (d) {
            nodesMap.push({
                "id": d.data["name"],
                "x": d.x + 200,
                "y": d.y + 60,
                "children": d.children,
                "parent": d.parent
            })
        });


        return (nodesMap.map((node) =>
                <Fragment>
                    <g key={node.id} className={this.getClassName(node)} transform={this.getTransform(node)}>
                        <rect width="100" height="150" className={b("node-rect")}>
                        </rect>
                    </g>
                    {this.renderPath(node)}
                </Fragment>
            )
        )
    }

    render() {
        return (
            <svg width="1000" height="710">
                <g transform="translate(200,60)">
                    {this.renderNodes()}
                </g>
            </svg>
        )
    }
}

export default D3Tree;