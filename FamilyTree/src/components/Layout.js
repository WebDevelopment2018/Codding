import React from 'react'
import "../styles/Layout.less";
import TreeNode from "./TreeNode";

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className = "Layout">
                <TreeNode/>
            </div>
        )
    }
}

export default Layout