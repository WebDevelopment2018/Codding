import React, {Component} from 'react'
import "../styles/Person.less"



class Person extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Person">
                <img className="Person__img" src={this.props.photo} alt=""/>
                <h3 className="Person__fullName">{this.props.name} {this.props.surname}</h3>
                <time className="Person__birthday">{this.props.birthday}</time>
                <time className="Person__death">{this.props.death}</time>
            </div>
        )
    }
}

export default Person;