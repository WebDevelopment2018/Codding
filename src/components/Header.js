import React, {Component} from 'react';
import block from "../helpers/BEM";

const b = block("Layout");

class Header extends Component {
    render() {
        return (
            <header className={b("header")}>
                <div className={b("authorization")}>Hello, admin</div>
                <div className={b("logo")}>
                    <img className={b("logo-img")}
                         src="https://www.nextadvisor.com/blog/wp-content/uploads/2015/04/bigstock-A-pictographic-image-of-a-gree-25125803.jpg"
                         alt=""/>
                    <h1 className={b("logo-title")}>Family</h1>
                </div>
            </header>
        )
    }
}

export default Header;