import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import request from "superagent";
import Dropzone from "react-dropzone";
import "react-select/less/default.less";
import {Redirect} from 'react-router';

import block from "../helpers/BEM";
import "../styles/AddUserForm.less";
import {addPerson} from "../actions/person";
import {getEditingPersonId} from "../reducers/index";
import {editPerson} from "../actions/person";
import {getPersonById} from "../reducers/index";
import {CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL, DROPZONE_STYLES} from "../helpers/consts";
import SearchPerson from "./SearchPerson";
import {getRelatives} from "../reducers";
import PersonAddedPopUp from "./PersonAddedPopUp";

const b = block("AddUserForm");

class AddUserForm extends Component {
    state = {
        action: "submit",
        personAdded : false,
        name : "" ,
        surname: "",
        photo: "https://res.cloudinary.com/csucu/image/upload/v1524057401/av97c7rihdxzy7apnjaj.jpg",
        mother: null,
        father: null,
        birthday: '',
        death: '',
        children: [],
        relationship: [],
        redirectToId:null,
    };

    static getDerivedStateFromProps = (nextProps) => {
        if(nextProps.relatives){
            //console.log("form : ",nextProps.relatives);
            return nextProps.relatives;
        }
        if (nextProps.person) {
            return {
                action: "edit",
                redirectToId:null,
                name: nextProps.person.name,
                surname: nextProps.person.surname,
                gender: nextProps.person.gender,
                mother: nextProps.person.mother,
                father: nextProps.person.father,
                children: nextProps.person.children,
                photo: nextProps.person.photo,
                birthday: nextProps.person.birthday,
                death: nextProps.person.death,
                relationship: nextProps.person.relationship
            };
        } else {
            return null;
        }
    };

    onImageDrop(files) {
        this.setState({photo: files[0]});
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request
            .post(CLOUDINARY_UPLOAD_URL)
            .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
            .field("file", file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }
            if (response.body.secure_url !== "") {
                this.setState({
                    photo: response.body.secure_url
                });
            }
        });
    }
    togglePopup() {this.setState({personAdded: !this.state.personAdded});}

    addPersonToData(e) {
        e.preventDefault();

        const {action,personAdded,redirectToId, ...person} = this.state;
        const {addUser, editPerson} = this.props;

        if (action === "submit") {
            const id = addUser(person);
            console.log("added id: ",id);
            this.setState({redirectToId: id});
        } else {
            editPerson(this.props.person.id, person);
            console.log("person editing")
            //this.togglePopup();
            // if(!this.state.personAdded){
            //   this.setState({redirectToId: this.props.person.id});
            // }
        }
        document.querySelector(".AddUserForm").reset();

    }

    handleStateChange(propName, value) {
        this.setState({[propName]: value});
    }

    handleStateChangeFromEvent(propName, ev) {
        this.handleStateChange(propName, ev.target.value);
    }

    render() {
        return (
            <Fragment>
                <form className={b()} onSubmit={this.addPersonToData.bind(this)} href={this.props.href}>
                    {this.props.children}
                    <input value={this.state.name} onChange={this.handleStateChangeFromEvent.bind(this, "name")}
                           className={b("input-name")} placeholder="Ім'я" required/>
                    <input value={this.state.surname} onChange={this.handleStateChangeFromEvent.bind(this, "surname")}
                           type="text" className={b("input-surname")} placeholder="Прізвище" required/>
                    <div className={b("gender")}>
                        <label>
                            <input onChange={this.handleStateChangeFromEvent.bind(this, "gender")} type="radio"
                                   ref="male" name="gender" value="male" checked={this.state.gender === "male"}/>{" "}Male
                        </label>
                        <label>
                            <input onChange={this.handleStateChangeFromEvent.bind(this, "gender")} type="radio"
                                   ref="female" name="gender" value="female"
                                   checked={this.state.gender === "female"}/>{" "}Female
                        </label>
                    </div>
                    <div className={b("bday")}>
                        <h4 className={b("text")}>День народження:</h4>
                        <input ref="birthday" type="date" value={this.state.birthday} className={b("input-birthday")}
                               name="bday" onChange={this.handleStateChangeFromEvent.bind(this, "birthday")} required/>
                    </div>
                    <div className={b("dday")}>
                        <h4 className={b("text")}>День смерті:</h4>
                        <input ref="death" type="date" value={this.state.death}
                               onChange={this.handleStateChangeFromEvent.bind(this, "death")}
                               className={b("input-death")} name="dday"/>
                    </div>
                    <SearchPerson gender={"male"} className={b("father-select")} value={this.state.father}
                                  onChange={this.handleStateChange.bind(this, "father")} placeholder="Тато"/>
                    <SearchPerson gender={"female"} className={b("mother-select")} value={this.state.mother}
                                  onChange={this.handleStateChange.bind(this, "mother")} placeholder="Мама"/>
                    <SearchPerson className={b("children-select")} multi={true} value={this.state.children}
                                  onChange={this.handleStateChange.bind(this, "children")} placeholder="Діти"/>

                    <div className={b("fileUpload")}>
                        <div className={b("dropzone-text")}>
                            Drop an image or click to select a file to upload.
                        </div>
                        <Dropzone onDrop={this.onImageDrop.bind(this)} multiple={false} style={DROPZONE_STYLES}
                                  accept="image/*">
                            <div className={b("preview")}>
                                {this.state.photo === "" ? null : (
                                    <img className={b("preview-img")} src={this.state.photo}/>)}
                            </div>
                        </Dropzone>
                    </div>
                    <button type="submit" className={b("submit-button")}>
                        {this.state.action}
                    </button>
                </form>
                {this.state.redirectToId && (<Redirect to={`/${this.state.redirectToId}`}/>)}
                {this.state.personAdded ? <PersonAddedPopUp edit={this.state.action} closePopup={this.togglePopup.bind(this)} /> : null}
            </Fragment>
        );
    }
}

export default connect(
    state => {
        let person = null;
        if (getEditingPersonId(state)) {
            person = getPersonById(getEditingPersonId(state).id, state);
        }
        // if (getRelatives(state).relatives) {
        //     person = getRelatives(state).relatives;
        // }
        // console.log(person);
        return {person, relatives:getRelatives(state).relatives};
    },
    {
        addUser: addPerson,
        editPerson
    }
)(AddUserForm);
