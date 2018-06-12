import React, {Component} from 'react';
import "../styles/PersonAddedPopUp.scss";
import block from "../helpers/BEM";

const b = block("PersonAddedPopUp");

class PersonAddedPopUp extends Component {
    render() {
        return (
            <section className={b()}>
                <div className={b("wrapper")}>
                  <div className={b("header")}>
                      <span className={b("close-text")} onClick={this.props.closePopup}>Close</span>
                      <span className={b("close-button")} onClick={this.props.closePopup}/>
                  </div>
                  <div className={b("message")}>Done!
                    <p className={b("message",["result"])}>Person was {this.props.action}ed.</p>
                  </div>
                </div>
            </section>
        )
    }
}

export default PersonAddedPopUp;