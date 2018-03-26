import React, {Component} from 'react';
import block from "../helpers/BEM";
import "../styles/AddUserSidebar.less";

const b = block("AddUserSidebar");

class AddUserSidebar extends Component {
    constructor() {
        super();
        this.state = {
            name: [],
        };
    }
    addPersonToData(e) {
        e.preventDefault();
        const name = this.refs.name.value;
        const surname = this.refs.surname.value;
        const birthday = this.refs.birthday.value;
        const death = this.refs.death.value;
        const father = this.refs.father.value;
        const mother = this.refs.mother.value;
        const children = this.refs.children.value;

        const person = {
            name: name,
            surname: surname,
            birthday: birthday,
            death: death,
            father: father,
            mother: mother,
            children: children,
        };
        if (mother==="" || father==="" || children==="" || death===""){
            person.mother = null;
            person.father = null;
            person.children = null;
            person.death = null;
        }
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch('http://localhost:3000/persons', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(person)
        }).then((res) => res.json());
        console.log('new data added');
        alert("Done!")
    };

    render(){
        return(
            <form className={b()} onSubmit={this.addPersonToData.bind(this)}>
                <input ref='name' type="text" className={b("input-name")} placeholder="Ім'я" required/>
                <input ref='surname' type="text" className={b("input-surname")} placeholder="Прізвище" required/>
                <div className={b("bday")}>
                    <h4 className={b("text")}>День народження:</h4>
                    <input ref='birthday' type="date" className={b("input-birthday")} name="bday" required/>
                </div>
                <div className={b("dday")}>
                    <h4 className={b("text")}>День смерті:</h4>
                    <input ref='death' type="date" className={b("input-death")} name="bday"/>
                </div>
                <input ref='father' type="text" className={b("input-surname")} placeholder="Тато"/>
                <input ref='mother' type="text" className={b("input-surname")} placeholder="Мама"/>
                <input ref='children' type="text" className={b("input-surname")} placeholder="Діти"/>
                <button type='submit' className="ToggleSidebar__action-button">Submit</button>
            </form>
        )
    }
}

export default AddUserSidebar;