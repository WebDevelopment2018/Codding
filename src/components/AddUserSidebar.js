import React, {Component} from 'react';
import block from "../helpers/BEM";
import "../styles/AddUserSidebar.less";

const b = block("AddUserSidebar");

class AddUserSidebar extends Component {
    constructor() {
        super()
    }
    render(){
        return(
            <form className={b()}>
                <input type="text" className={b("input-name")} placeholder="Ім'я"/>
                <input type="text" className={b("input-surname")} placeholder="Прізвище"/>
                <div className={b("bday")}>
                    <h4 className={b("text")}>День народження:</h4>
                    <input type="date" className={b("input-birthday")} name="bday"/>
                </div>
                <div className={b("dday")}>
                    <h4 className={b("text")}>День смерті:</h4>
                    <input type="date" className={b("input-death")} name="bday"/>
                </div>
            </form>
        )
    }
}

export default AddUserSidebar;