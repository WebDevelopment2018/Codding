import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <header className="Layout__header">
                <div className="Layout__authorization">Hello, admin</div>
                <div className="Layout__logo">
                    <img className="Layout__logo-img"
                         src="https://www.nextadvisor.com/blog/wp-content/uploads/2015/04/bigstock-A-pictographic-image-of-a-gree-25125803.jpg"
                         alt=""/>
                    <h1 className="Layout__logo-title">Family</h1>
                </div>
            </header>
        )
    }
}

export default Header;