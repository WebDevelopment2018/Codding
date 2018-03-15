import React, {Component, Fragment} from 'react';
import {fromEvent} from "most";

import * as d3 from "d3";
import {connect} from "react-redux";

import "../styles/Tree.less";
import block from "../helpers/BEM";
import {buildChildrenTree, buildParentsTree, findSiblings, findRelationships} from "./consts";
import Family from "./Family";


const b = block("Tree");

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "parentsCoordinates": [],
            "childrenCoordinates": [],
            "siblingsCoordinates":[],
            "relationshipCoordinates": [],
            "height": 350,
            "data":[]
        }
    }
    componentDidMount() {
        const mouseDown = fromEvent("mousedown", this.refs.root);
        const mouseMove = fromEvent("mousemove", this.refs.root);
        const mouseUp = fromEvent("mouseup", this.refs.root);

        const click = fromEvent("click", this.refs.root);
        mouseDown
            .filter(({target}) => target.matches(".Tree"))
            .observe(ev => console.log("down"));
            mouseUp
                .filter(({ target }) => target.matches(".Tree"))
                .tap(ev => console.log("up"))
                .observe(ev => ev);

    }
    componentWillMount() {
        const id = parseInt(this.props.person);
        const height = this.state.height;
        const treeDataParents = buildParentsTree(id);
        const parentsNodes = this.initTree(treeDataParents);
        parentsNodes.each(function (d) {
            if (d.depth === 0) {
                d.y = height;
            } else {
                d.y += ((parentsNodes.height - d.depth - 1) * height);
            }
        });
        const treeDataChildren = buildChildrenTree(id);
        const childrenNodes = this.initTree(treeDataChildren);
        childrenNodes.each(function (d) {
                d.y += height;
        });
        this.setState({"parentsCoordinates": this.buildTree(parentsNodes)});
        this.setState({"childrenCoordinates": this.buildTree(childrenNodes)});
        const siblings = findSiblings(id);
        console.log(siblings);
        let siblingsCoordinates = [];
        siblings.map((s,i) =>{
            siblingsCoordinates.push({
                "id": s.id,
                "x": parentsNodes.x + 200*(i+1),
                "y": parentsNodes.y -150
            })
            }
        );
        this.setState({"siblingsCoordinates": siblingsCoordinates});

        const relationship = findRelationships(id);
        let relationshipCoordinates = [];
        relationship.map((s,i) =>{
            relationshipCoordinates.push({
                    "id": s,
                    "x": parentsNodes.x - 200*(i+1),
                    "y": parentsNodes.y -150
                })
            }
        );
        this.setState({"relationshipCoordinates": relationshipCoordinates});
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
            return (<path className={b("link")} d={this.getPath(node)}/>)
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
                <svg ref="root" className={b()} width="100%" height={this.state.height * 2} key="1">
                    <image className="Layout__logo" href="http://res.cloudinary.com/csucu/image/upload/q_100/v1521035030/logo_iflxie.jpg" x="200" y="50" height="80px" width="100px"/>
                    <g transform="translate(400,210)">              /*size of path layer*/
                        {this.renderTrees()}
                    </g>
                </svg>
                <Family coordinates={this.state.parentsCoordinates} key="2"/>
                <Family coordinates={this.state.childrenCoordinates.slice(1,this.state.childrenCoordinates.length)} key="3"/>
                <Family coordinates={this.state.siblingsCoordinates} key="4"/>
                <Family coordinates={this.state.relationshipCoordinates} key="5"/>
            </Fragment>
        )
    }
}

export default connect((state, props) => {
        console.log(state, "PROPS ", props.match.params.person);
        return {
            person: props.match.params.person || 6
        }
    }
)(Tree);