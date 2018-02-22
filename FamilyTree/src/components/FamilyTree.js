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
            return <div className="FamilyTree FamilyTree_empty">no user</div>;
        }
        return (
            <section className="FamilyTree">
                <TreeNode {...user}/>
                <div>
                    <FamilyTree id={user.mother}/>
                    <FamilyTree id={user.father}/>
                </div>

            </section>
        )
    }
}

export default FamilyTree;