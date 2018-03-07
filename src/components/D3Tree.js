import React, {Component, Fragment} from 'react';
import * as d3 from "d3";

import "../styles/D3Tree.less";
import data from "../../data/data.json";
import block from "../helpers/BEM";
import {getUserById} from "./consts";
import Family from "./Family";

const b = block("D3Tree");

const buildTree = (id) => {
    if (id !== null) {
        let user = getUserById(id,data);
        let parents = [buildTree(user.father, name), buildTree(user.mother, name)];
        return {
            "name": user.id,
            "children": parents.filter(n => n)
        };
    }
    return null;
};

class D3Tree extends Component {
    constructor(props){
        super(props)
        this.state = {
            "nodesMap": []
        }
    }

    componentWillMount(){
        const treeData =  buildTree(this.props.id);
        let treemap = d3.tree()
            .size([500, 350]);                              //розміщення відносно svg
        let nodes = d3.hierarchy(treeData);
        nodes = treemap(nodes);
        let nodesMap = [];
        nodes.each(function (d) {
            nodesMap.push({
                "id": d.data["name"],
                "x": d.x - 50 ,                     //control where to start through width of the block
                "y": d.y - 150,                     //control where to start through height of the block
                "children": d.children,
                "parent": d.parent
            })
        });
        this.setState({"nodesMap":nodesMap});
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

    getPath(d) {                                                    //control ends and line of the path
        return "M" + (d.x + 50) + "," + d.y
            + "C" + (d.x + 50) + "," + (d.y + d.parent.y) / 2
            + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
            + " " + d.parent.x + "," + d.parent.y;
    }

    renderNodes() {
        return (this.state.nodesMap.map((node) =>
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
            <Fragment>
                <svg width="1000" height="700">
                    <g transform="translate(200,210)">              /*size of path layer*/
                        {this.renderNodes()}
                    </g>
                </svg>
                <Family coordinates={this.state.nodesMap}/>
            </Fragment>
        )
    }
}

export default D3Tree;