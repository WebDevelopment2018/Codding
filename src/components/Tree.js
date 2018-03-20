import React, {Component, Fragment} from 'react';

import * as d3 from "d3";
import {connect} from "react-redux";

import "../styles/Tree.less";
import block from "../helpers/BEM";
import {buildChildrenTree, buildParentsTree, findSiblings, findRelationships} from "./consts";
import Family from "./Family";
import {fetchPerson} from "../actions";
import {getPersonById, isPersonFetching} from "../reducers";
import TreePathes from "./TreePathes";
import person from "../reducers/person";

const b = block("Tree");

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "parentsCoordinates": [],
            "childrenCoordinates": [],
            "siblingsCoordinates": [],
            "relationshipCoordinates": [],
            "height": 350,
            "data": []
        }
    }

    componentWillMount() {
        this.calculateTree(this.props.activePersonId);

    }

    componentWillReceiveProps(nextProps) {
        this.calculateTree(nextProps.activePersonId);
    }

    // buildParentsTree(id,props){
    //     if (id !== null) {
    //         let user = getPersonById(id, props);
    //         console.log(user);
    //         let parents = [buildParentsTree(user.father, props), buildParentsTree(user.mother, props)];
    //         return {
    //             "name": user.id,
    //             "children": parents.filter(n => n)
    //         };
    //     }
    //     return null;
    // };

    calculateTree(props) {
        const {fetchPerson, isPersonFetching, person, activePersonId,state} = this.props;

        if (!person && !isPersonFetching) {
            fetchPerson(activePersonId)
        }

        if (person) {
            console.log(person, person.father);
            //console.log(getPersonById(person.father, state));
            //console.log(fetchPerson(person.father));
            const id = parseInt(props);
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
            const siblings = findSiblings(id);
            let siblingsCoordinates = [];
            siblings.map((s, i) => {
                    siblingsCoordinates.push({
                        "id": s.id,
                        "x": parentsNodes.x + 200 * (i + 1),
                        "y": parentsNodes.y - 150
                    })
                }
            );
            const relationship = findRelationships(id);
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
        return (
            <Fragment>
                <svg ref="root" className={b()} width="100%" height={this.state.height * 2} key="1">
                    <image className="Layout__logo"
                           href="http://res.cloudinary.com/csucu/image/upload/q_100/v1521035030/logo_iflxie.jpg" x="200"
                           y="50" height="80px" width="100px"/>
                    <TreePathes parentsCoordinates={this.state.parentsCoordinates}
                                childrenCoordinates={this.state.childrenCoordinates}/>
                </svg>
                <Family coordinates={this.state.parentsCoordinates} key="2"/>
                <Family coordinates={this.state.childrenCoordinates.slice(1, this.state.childrenCoordinates.length)}
                        key="3"/>
                <Family coordinates={this.state.siblingsCoordinates} key="4"/>
                <Family coordinates={this.state.relationshipCoordinates} key="5"/>
            </Fragment>
        )
    }
}


export default connect((state, props) => {
        return {
            activePersonId: props.match.params.person || 6,
            person: getPersonById(props.match.params.person || 6, state),
            isPersonFetching: isPersonFetching(props.match.params.person || 6, state),
            state
        }
    },
    {
        fetchPerson
    }
)(Tree);