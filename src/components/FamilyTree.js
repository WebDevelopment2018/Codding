import React, {Component} from 'react'

import "../styles/FamilyTree.less";
import Person from "./Person";
import users from "../../data/data.json"
import block from "../helpers/BEM";

const b = block("Person");
const bl = block("FamilyTree");

const getUserById = (id) => users.find(user => user.id === id);

const findBroAndSisters = (person) => {
    let mother = person.mother,
        father = person.father,
        sistersBrothers = [];
    users.map((user) => {
            if (mother !== null && father !== null && person !== user && user.mother === mother && user.father === father) {
                sistersBrothers.push(user);
            }
        }
    );
    console.log(sistersBrothers);
    console.log("----------");
    return sistersBrothers;

};

class FamilyTree extends Component {
    render() {
        const user = getUserById(this.props.id);
        console.log(user);
        if (!user) {
            return <div className={b("unknown")}>
                <img className={b("img")}
                     src="http://doctorwhite.md/wp-content/uploads/2015/05/facebook-profile-picture-unknown-facts-about-facebook.jpg"
                     alt=""/>
                <h3 className={b("fullName")}>Unknown</h3>
            </div>;
        }

        let broSisters = findBroAndSisters(user);
        let htmlBroSisters = "";
        if(broSisters !== []){
            htmlBroSisters = broSisters.map((person,i)=> <Person key={i} {...person}/>)
        }
        return (
            <section className={bl()}>
                <Person {...user}/>
                {htmlBroSisters}
                <div>
                    <FamilyTree id={user.mother}/>
                    <FamilyTree id={user.father}/>
                </div>

            </section>
        )
    }
}

export default FamilyTree;