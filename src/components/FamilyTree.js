import React from 'react'
import "../styles/FamilyTree.less";
import TreeNode from "./Person";
import users from "../../data/data.json"
const getUserById = (id) => users.find(user => user.id === id);

class FamilyTree extends React.Component {
    render() {
        const user = getUserById(this.props.id);
        console.log(user);
        if(!user){
            return <div className="Person__unknown">
                <img className="Person__img" src="http://doctorwhite.md/wp-content/uploads/2015/05/facebook-profile-picture-unknown-facts-about-facebook.jpg" alt=""/>
                <h3 className="Person__fullName">Unknown</h3>
            </div>;
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