import React from 'react'
import "../styles/treeNode.less"

class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            surname: this.props.surname,
            imgSrc: this.props.imgSrc,
            birthday: this.props.birthday,
            death: this.props.death
        }
    }

    render() {
        return (
            <div className="TreeNode">
                <img className="TreeNode__img" src={this.state.imgSrc} alt=""/>
                <h3 className="TreeNode__fullName">{this.state.name} {this.state.surname}</h3>
                <time className="TreeNode__birthday">{this.state.birthday}</time>
                <time className="TreeNode__death">{this.state.death}</time>
            </div>
        )
    }
}

export default TreeNode