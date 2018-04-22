import React, {Component} from 'react';
import {connect} from "react-redux";
import request from "superagent";
import Dropzone from 'react-dropzone';
import {Async} from 'react-select';
import 'react-select/less/default.less';

import block from "../helpers/BEM";
import "../styles/AddUserSidebar.less";
import {addUser} from "../actions/addUser";

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
    constructor() {
        super();
        this.state = {
            "href": "/",
            uploadedFile: null,
            uploadedFileCloudinaryUrl: '',
            suggestedNames: [],
            mother: '',
            motherId: null,
            father: '',
            fatherId: null,
            children: '',
            childrenId: null,
        }
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
    }

    getOptions(input){
        if (!input) {
            return Promise.resolve({ options: [] });
        }
        return fetch(`http://localhost:3000/persons?name_like=${input}`)
            .then((response) => {
            return response.json();
        }).then((json) => {
            json.map((person)=>{
                person['label']  = person.name + " " + person.surname;
                person['value']  = person.name + " " + person.surname;
            }
            );
            return { options: json };
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
    onChangeMother(mother) {
        console.log(mother.id);
        this.setState({
            mother,
            "motherId":mother.id
        });
    }
    onChangeFather(father) {
        console.log(father.id);
        this.setState({
            father,
            "fatherId":father.id
        });
    }
    onChangeChild(children) {
        console.log(children.id);
        this.setState({
            children,
            "childrenId":children.id
        });
    }
    addPersonToData(e) {
        e.preventDefault();
        const name = this.refs.name.value;
        const surname = this.refs.surname.value;
        const gender = document.querySelector('input[name=gender]:checked').value;
        const birthday = this.refs.birthday.value;
        const death = this.refs.death.value === "" ? null : this.refs.death.value;
        const father = this.state.fatherId;
        const mother = this.state.motherId;
        let children = [];
        if(this.state.childrenId){
            children = [this.state.childrenId];
        }
        const relationship = [];
        const photo = this.state.uploadedFileCloudinaryUrl === "" ? "https://res.cloudinary.com/csucu/image/upload/v1524057401/av97c7rihdxzy7apnjaj.jpg" : this.state.uploadedFileCloudinaryUrl;

        const person = {
            name,
            surname,
            gender,
            birthday,
            death,
            father,
            mother,
            children,
            relationship,
            photo
        };
        const {addUser} = this.props;
        const id = addUser(person);
        this.setState({"href": "/" + id});
        alert("Done!");
        document.querySelector(".AddUserSidebar").reset()
    };

    render() {
        return (
            <form className={b()} onSubmit={this.addPersonToData.bind(this)}
                  href={this.props.href}>{this.props.children}
                <input ref='name' type="text" className={b("input-name")} placeholder="Ім'я" required/>
                <input ref='surname' type="text" className={b("input-surname")} placeholder="Прізвище" required/>
                <div className={b("gender")}>
                    <input type="radio" name="gender" value="male"/> Male
                    <input type="radio" name="gender" value="female"/> Female
                </div>
                <div className={b("bday")}>
                    <h4 className={b("text")}>День народження:</h4>
                    <input ref='birthday' type="date" className={b("input-birthday")} name="bday" required/>
                </div>
                <div className={b("dday")}>
                    <h4 className={b("text")}>День смерті:</h4>
                    <input ref='death' type="date" className={b("input-death")} name="bday"/>
                </div>
                <Async className={b("input-surname")} loadOptions={this.getOptions} value={this.state.father}
                       onChange={this.onChangeFather.bind(this)}
                       placeholder="Тато"/>
                <Async className={b("input-surname")} loadOptions={this.getOptions} value={this.state.mother}
                       onChange={this.onChangeMother.bind(this)}
                    placeholder="Мама"/>
                <Async className={b("input-surname")} loadOptions={this.getOptions} value={this.state.children}
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
                <button type='submit' className="ToggleSidebar__action-button">Submit</button>
            </form>
        )
    }
}

export default connect(
    null,
    {addUser}
)(AddUserSidebar);