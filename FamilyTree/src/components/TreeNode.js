import React from 'react'
import "../styles/treeNode.less"

class TreeNode extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="TreeNode">
                <img className="TreeNode__img" src={this.props.photo} alt=""/>
                <h3 className="TreeNode__fullName">{this.props.name} {this.props.surname}</h3>
                <time className="TreeNode__birthday">{this.props.birthday}</time>
                <time className="TreeNode__death">{this.props.death}</time>
            </div>
        )
    }
}

export default TreeNode