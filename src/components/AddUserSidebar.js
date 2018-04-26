import React, {Component} from 'react';
import {connect} from "react-redux";
import request from "superagent";
import Dropzone from 'react-dropzone';
import {Async} from 'react-select';
import 'react-select/less/default.less';

import block from "../helpers/BEM";
import "../styles/AddUserSidebar.less";
import {addUser} from "../actions/addUser";
import {getEditingPersonId} from "../reducers/index";
import {editPerson} from "../actions/index";
import {getPersonById} from "../reducers/index";

const b = block("AddUserSidebar");
const CLOUDINARY_UPLOAD_PRESET = 'redgw5c9';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/csucu/upload';
const dropzoneStyle = {
    width: "150px",
    margin: "auto",
    height: "150px",
    border: "2px dashed #82BF56"
};

class AddUserSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "href": "/",
            action: "Submit",
            uploadedFile: null,
            uploadedFileCloudinaryUrl: '',
            motherName: '',
            fatherName: '',
            childrenName: '',
            mother: null,
            father: null,
            children: [],
            relationship:[]
        }
    }

    componentWillReceiveProps(props) {
        if (props.person) {
            if(props.person.gender === "male"){
                this.refs.male.checked = true;
            }else{
                this.refs.female.checked = true;
            }
            this.refs.birthday.value = this.getDate(props.person.birthday);
            this.refs.death.value = this.getDate(props.person.death);
            this.refs.name.value = props.person.name;
            this.refs.surname.value = props.person.surname;
            this.setState({
                action: "Edit",
                fatherName: props.fatherName,
                motherName: props.motherName,
                mother: props.person.mother,
                father: props.person.father,
                children: props.person.children,
                uploadedFileCloudinaryUrl: props.person.photo,
                relationship:props.person.relationship
            });
        }
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }

    getOptions(input) {
        if (!input) {
            return Promise.resolve({options: []});
        }
        return fetch(`http://localhost:3000/persons?name_like=${input}`)
            .then((response) => {
                return response.json();
            }).then((json) => {
                json.map((person) => {
                        person['label'] = person.name + " " + person.surname;
                        person['value'] = person.name + " " + person.surname;
                    }
                );
                return {options: json};
            });
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);
        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }
            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
            }
        });
    }

    onChangeMother(motherName) {
        this.setState({
            motherName,
            mother:motherName.id
        });
    }

    onChangeFather(fatherName) {
        this.setState({
            fatherName,
            father:fatherName.id
        });
    }

    onChangeChild(childrenName) {
        this.setState({
            childrenName,
            children:[children.id]
        });
    }

    addPersonToData(e) {
        e.preventDefault();
        const name = this.refs.name.value;
        const surname = this.refs.surname.value;
        const gender = document.querySelector('input[name=gender]:checked').value;
        const birthday = this.refs.birthday.value;
        const death = this.refs.death.value === "" ? null : this.refs.death.value;
        const father = this.state.father;
        const mother = this.state.mother;
        const children = this.state.children;
        const relationship = this.state.relationship;
        const photo = this.state.uploadedFileCloudinaryUrl === "" ? "https://res.cloudinary.com/csucu/image/upload/v1524057401/av97c7rihdxzy7apnjaj.jpg" : this.state.uploadedFileCloudinaryUrl;

        const person = {name,surname,gender,birthday,death,father,mother,children, relationship,photo};
        const {addUser, editPerson} = this.props;
        if(this.state.action === "Submit"){
            addUser(person);
            //const id = addUser(person);
            //this.setState({"href": "/" + id});
        }else{
            editPerson(this.props.person.id,person);
        }
        alert("Done!");
        document.querySelector(".AddUserSidebar").reset()
    };

    getDate(date){
        if(date){
            return date.substr(6,8)+"-" + date.substr(3,2)+"-" +date.substr(0,2);
        }
        return "";
    }
    render() {
        console.log("person: ", this.state);
        return (
            <form className={b()} onSubmit={this.addPersonToData.bind(this)}
                  href={this.props.href}>{this.props.children}
                <input ref='name' type="text" className={b("input-name")} placeholder="Ім'я"  required/>
                <input ref='surname' type="text" className={b("input-surname")} placeholder="Прізвище" required/>
                <div className={b("gender")}>
                    <input type="radio" ref="male" name="gender" value="male"/> Male
                    <input type="radio" ref="female" name="gender" value="female"/> Female
                </div>
                <div className={b("bday")}>
                    <h4 className={b("text")}>День народження:</h4>
                    <input ref='birthday' type="date" className={b("input-birthday")} name="bday" required/>
                </div>
                <div className={b("dday")}>
                    <h4 className={b("text")}>День смерті:</h4>
                    <input ref='death' type="date" className={b("input-death")} name="dday"/>
                </div>
                <Async className={b("father-select")} loadOptions={this.getOptions} value={this.state.fatherName}
                       onChange={this.onChangeFather.bind(this)}
                       placeholder="Тато"/>
                <Async className={b("mother-select")} loadOptions={this.getOptions} value={this.state.motherName}
                       onChange={this.onChangeMother.bind(this)}
                       placeholder="Мама"/>
                <Async className={b("children-select")} loadOptions={this.getOptions} value={this.state.childrenName}
                       onChange={this.onChangeChild.bind(this)}
                       placeholder="Діти"/>
                <div className={b("fileUpload")}>
                    <div className={b("dropzone-text")}>Drop an image or click to select a file to upload.</div>
                    <Dropzone
                        onDrop={this.onImageDrop.bind(this)}
                        multiple={false}
                        style={dropzoneStyle}
                        accept="image/*">
                        <div className={b("preview")}>
                            {this.state.uploadedFileCloudinaryUrl === '' ? null :
                                <img className={b("preview-img")} src={this.state.uploadedFileCloudinaryUrl}/>
                            }
                        </div>
                    </Dropzone>
                </div>
                <button type='submit' className="ToggleSidebar__action-button">{this.state.action}</button>
            </form>
        )
    }
}

export default connect((state) => {
        let person = null;
        let motherName = '';
        let fatherName = '';
        if (getEditingPersonId(state)) {
            person = getPersonById(getEditingPersonId(state).id, state);
            if (person){
                motherName = person.mother === null ? '' :
                        getPersonById(person.mother, state).name+" " + getPersonById(person.mother, state).surname;
                fatherName = person.father === null ? '' :
                        getPersonById(person.father, state).name+" " + getPersonById(person.father, state).surname;
            }
        }
        return {
            person,
            motherName,
            fatherName
        }
    },
    {
        addUser,
        editPerson
    }
)(AddUserSidebar);