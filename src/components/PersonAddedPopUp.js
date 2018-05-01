import React, {Component} from 'react';
import "../styles/PersonAddedPopUp.less";

class PersonAddedPopUp extends Component {
    render() {
        return (
            <section className="PersonAddedPopUp">
                <span className="close" onClick={this.props.closePopup}>&times;</span>
                PersonAddedPopUp
            </section>
        )
    }
}

export default PersonAddedPopUp;