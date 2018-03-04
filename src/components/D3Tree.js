import React, {Component} from 'react';
//import * as d3 from "d3"

import "../styles/D3Tree.less";
import users from "../../data/data.json"
import block from "../helpers/BEM";
const getUserById = (id,data) => data.find(user => user.id === id);

const b = block("D3Tree");

class D3Tree extends Component {
    constructor(props) {
        super(props);
        let height = 500;
        let width = 960;
        this.state = {
            "treeData" : this.buildTree(this.props.id),
            "margin" :{top: 100, right: 120, bottom: 20, left: 120},
            width,
            height,
            "tree" : d3.layout.tree()
                .size([height, width]),
            "diagonal": d3.svg.diagonal()
                .projection(function(d) { return [d.x + 50, d.y + 50]; }),
            "svg": this.getSvg()
        };
    }

    getSvg(){
        return d3.select(".Layout").append("svg")
            .attr("width", 1000)
            .attr("height", 600)
            .append("g")
            .attr("transform", "translate(" + 120 + "," + 100 + ")");
    }

    buildTree(id){
        if(id !== null) {
            let user = getUserById(id,users);
            let parents = [this.buildTree(user.father), this.buildTree(user.mother)];
            return {
                "name": user.id,
                "children": parents.filter(n => n)
            };
        }
        return null;
    }

    update(root) {

        let nodes = this.state.tree.nodes(root).reverse(),
            links = this.state.tree.links(nodes);

        let i = 0;
        // Normalize for fixed-depth.
        nodes.forEach(function(d) { d.y = d.depth * 190; });

        let coordinates = [];
        nodes.forEach(function(d) {
            coordinates.push({
                "id": d.name,
                "x" : d.x +  this.state.margin.left,
                "y": d.y + this.state.margin.top
            })
        });
        console.log(coordinates);
        // Declare the nodes…
        let node = this.state.svg.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = ++i); });

        // Enter the nodes.
        let nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")"; });

        nodeEnter.append("rect")
            .attr("width", 100)
            .attr("height", 150)
            .style("fill", "#fff");

        nodeEnter.append("text")
            .attr("y", function(d) {
                return d.children || d._children ? -18 : 18; })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.name; })
            .style("fill-opacity", 1);

        // Declare the links…
        var link = this.state.svg.selectAll("path.link")
            .data(links, function(d) { return d.target.id; });

        // Enter the links.
        link.enter().insert("path", "g")
            .attr("class", b("link"))
            .attr("d", this.state.diagonal);

    }

    render() {
        let root = this.state.treeData[0];
        this.update(root);
        return (
            <div className="D3Tree">D3Tree</div>
        )
    }
}

export default D3Tree;