import React from 'react'
import "../styles/Layout.less";
import TreeNode from "./TreeNode";
import FamilyTree from "./FamilyTree";

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className = "Layout">
                <FamilyTree
                    familyName="romanov"
                />
            </div>
        )
    }
}

export default Layout