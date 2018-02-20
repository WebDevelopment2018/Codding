import React from 'react'
import "../styles/treeNode.less"

class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            surname: this.props.surname,
            imgSrc: this.props.imgSrc,
        }
    }

    render() {
        return (
            <div className="treeNode">
                <img className="treeNode__img" src={this.state.imgSrc} alt=""/>
                <h3 className="treeNode__name">{this.state.name} {this.state.surname}</h3>
            </div>
        )
    }
}

export default TreeNode