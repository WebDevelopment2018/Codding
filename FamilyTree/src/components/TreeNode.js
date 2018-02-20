import React from 'react'
import "../styles/treeNode.less"

class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="treeNode">
                <img className="treeNode__img" src="https://cdn5.img.ria.ru/images/92088/17/920881710.jpg" alt=""/>
                <h3 className="treeNode__name">Олексій</h3>
                <h3 className="treeNode__surname">Романов</h3>
            </div>
        )
    }
}

export default TreeNode