import React from 'react'
import "../styles/FamilyTree.less";
import TreeNode from "./TreeNode";
import users from "../../data/data.json"
const getUserById = (id) => users.find(user => user.id === id);

class FamilyTree extends React.Component {
    render() {
        const user = getUserById(this.props.id);
        console.log(user);
        if(!user){
            return "no user";
        }
        return (
            <section className="FamilyTree">
                <div><FamilyTree id={user.mother}/> <FamilyTree id={user.father}/></div>
                <TreeNode {...user}/>
            </section>
        )
    }
}

export default FamilyTree;