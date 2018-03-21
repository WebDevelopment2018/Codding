import React, {Component, Fragment} from 'react';

import * as d3 from "d3";
import {connect} from "react-redux";
import {isEmpty} from "ramda";

import "../styles/Tree.less";
import block from "../helpers/BEM";
import {buildChildrenTree, buildParentsTree, findSiblings, findRelationships} from "./consts";
import Family from "./Family";
import {fetchFamily} from "../api";
import {getFamily, isFamilyFetching} from "../reducers";
import TreePathes from "./TreePathes";

const b = block("Tree");

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "parentsCoordinates": [],
            "childrenCoordinates": [],
            "siblingsCoordinates": [],
            "relationshipCoordinates": []
        }
    }

    componentWillMount() {
        this.calculateTree(this.props.activePersonId);

    }

    componentWillReceiveProps(nextProps) {
        this.calculateTree(nextProps.activePersonId);
    }
    calculateTree(props) {
        const {fetchFamily, family,isFamilyFetching} = this.props;
        if (isEmpty(family) && isEmpty(isFamilyFetching)) {
            fetchFamily();
        }
        if (!isEmpty(family)) {
            const data = family.data;
            const id = parseInt(props);
            const treeDataParents = buildParentsTree(id,data);
            const parentsNodes = this.initTree(treeDataParents);
            const parentHeight = parentsNodes.height*200;
            parentsNodes.each(function (d) {
                d.y = parentHeight - d.depth*200;
            });
            const treeDataChildren = buildChildrenTree(id, data);
            const childrenNodes = this.initTree(treeDataChildren);
            childrenNodes.each(function (d) {
                d.y = parentHeight + 200*d.depth;
            });
            const siblings = findSiblings(id,data);
            let siblingsCoordinates = [];
            siblings.map((s, i) => {
                    siblingsCoordinates.push({
                        "id": s.id,
                        "x": parentsNodes.x + 200 * (i + 1),
                        "y": parentsNodes.y - 150
                    })
                }
            );
            const relationship = findRelationships(id, data);
            let relationshipCoordinates = [];
            relationship.map((s, i) => {
                    relationshipCoordinates.push({
                        "id": s,
                        "x": parentsNodes.x - 200 * (i + 1),
                        "y": parentsNodes.y - 150
                    })
                }
            );
            this.setState({
                relationshipCoordinates,
                siblingsCoordinates,
                "childrenCoordinates": this.buildTree(childrenNodes),
                "parentsCoordinates": this.buildTree(parentsNodes)
            });
        }
    }

    initTree(treeData) {
        let treemap = d3.tree()
            .size([500, this.state.height]);                              //розміщення відносно svg
        let nodes = d3.hierarchy(treeData);
        nodes = treemap(nodes);
        return nodes;
    }

    buildTree(nodes) {
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

    render() {
        const all = this.state.relationshipCoordinates.concat(this.state.siblingsCoordinates,
            this.state.childrenCoordinates.slice(1, this.state.childrenCoordinates.length),
            this.state.parentsCoordinates);
        console.log(all);
        return (
            <Fragment>
                <svg ref="root" className={b()} width="100%" height="700" key="1">
                    <image className="Layout__logo"
                           href="http://res.cloudinary.com/csucu/image/upload/q_100/v1521035030/logo_iflxie.jpg" x="200"
                           y="50" height="80px" width="100px"/>
                    <TreePathes parentsCoordinates={this.state.parentsCoordinates}
                                childrenCoordinates={this.state.childrenCoordinates}/>
                </svg>
                <Family coordinates={all} key="2"/>
            </Fragment>
        )
    }
}


export default connect((state, props) => {
        return {
            activePersonId: props.match.params.person || 6,
            family: getFamily(state),
            isFamilyFetching: isFamilyFetching(state),
            // person: getPersonById(props.match.params.person || 6, state),
            // isPersonFetching: isPersonFetching(props.match.params.person || 6, state),
        }
    },
    {
        fetchFamily
    }
)(Tree);