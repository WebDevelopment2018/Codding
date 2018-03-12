import React, {Component, Fragment} from 'react';
import * as d3 from "d3";

import "../styles/Tree.less";
import data from "../../data/data.json";
import block from "../helpers/BEM";
import {getUserById} from "./consts";
import Family from "./Family";

const b = block("Tree");

const buildParentsTree = (id) => {
    if (id !== null) {
        let user = getUserById(id, data);
        let parents = [buildParentsTree(user.father, name), buildParentsTree(user.mother, name)];
        return {
            "name": user.id,
            "children": parents.filter(n => n)
        };
    }
    return null;
};

const buildChildrenTree = (id) => {
    if (id !== null) {
        let user = getUserById(id, data);

        return {
            "name": user.id,
            "children": getChildren(id)
        };
    }
    return null;
};

const getChildren = (id) => {
    let children = [];
    data.map(user => {
        if (user.mother === id || user.father === id) {
            children.push(buildChildrenTree(user.id));
        }
    })
    return children;
}

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "parentsCoordinates": [],
            "childrenCoordinates": [],
            "height": 350
        }
    }

    componentWillMount() {
        const height = this.state.height;
        const treeDataParents = buildParentsTree(this.props.id);
        const parentsNodes = this.initTree(treeDataParents);
        parentsNodes.each(function (d) {
            if (d.depth === 0) {
                d.y = height;
            } else {
                d.y += ((parentsNodes.height - d.depth - 1) * height);
            }
        });
        const treeDataChildren = buildChildrenTree(this.props.id);
        const childrenNodes = this.initTree(treeDataChildren);
        childrenNodes.each(function (d) {
                d.y += height;
        });
        this.setState({"parentsCoordinates": this.buildTree(parentsNodes)});
        this.setState({"childrenCoordinates": this.buildTree(childrenNodes)});
    }

    initTree(treeData){
        let treemap = d3.tree()
            .size([500, this.state.height]);                              //розміщення відносно svg
        let nodes = d3.hierarchy(treeData);
        nodes = treemap(nodes);
        return nodes;
    }

    buildTree(nodes){
        let nodesMap = [];
        nodes.each(function (d) {
            nodesMap.push({
                "id": d.data["name"],
                "x": d.x - 50,                     //control where to start through width of the block
                "y": d.y - 150,                     //control where to start through height of the block
                "children": d.children,
                "parent": d.parent
            })
        });
        return nodesMap;
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
            return (<path className={b("link")} d={this.getPath(node)}></path>)
        }
    }

    getPath(d) {                                                    //control ends and line of the path
        return "M" + (d.x + 50) + "," + d.y
            + "C" + (d.x + 50) + "," + (d.y + d.parent.y) / 2
            + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
            + " " + d.parent.x + "," + d.parent.y;
    }

    renderTrees() {
        return (
            <Fragment>
                {this.state.parentsCoordinates.map((node) => this.renderNode(node))}
                {this.state.childrenCoordinates.map((node) => this.renderNode(node))}
            </Fragment>
        )

    }

    renderNode(node) {
        return (
            <Fragment>
                <g key={node.id} className={this.getClassName(node)} transform={this.getTransform(node)}>
                    <rect width="100" height="150" className={b("node-rect")}>
                    </rect>
                </g>
                {this.renderPath(node)}
            </Fragment>
        )
    }

    render() {
        return (
            <Fragment>
                <svg className={b()} width="100%" height={this.state.height * 2}>
                    <image className="Layout__logo" href="https://www.nextadvisor.com/blog/wp-content/uploads/2015/04/bigstock-A-pictographic-image-of-a-gree-25125803.jpg" x="200" y="50" height="80px" width="100px"/>
                    <g transform="translate(400,210)">              /*size of path layer*/
                        {this.renderTrees()}
                    </g>
                </svg>
                <Family coordinates={this.state.parentsCoordinates}/>
                <Family coordinates={this.state.childrenCoordinates.slice(1,this.state.childrenCoordinates.length)}/>
            </Fragment>
        )
    }
}

export default Tree;