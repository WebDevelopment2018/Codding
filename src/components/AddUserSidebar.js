import React, {Component} from 'react';
import {connect} from "react-redux";
import request from "superagent";
import Dropzone from 'react-dropzone';

import block from "../helpers/BEM";
import "../styles/AddUserSidebar.less";
import {addUser} from "../actions/index";

const b = block("AddUserSidebar");
const CLOUDINARY_UPLOAD_PRESET = 'redgw5c9';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/csucu/upload';
const dropzoneStyle = {
    width  : "150px",
    margin : "auto",
    height : "150px",
    border : "2px dashed #82BF56"
};

class AddUserSidebar extends Component {
    constructor() {
        super();
        this.state = {
            "href": "/",
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ''
        }
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
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

    addPersonToData(e) {
        e.preventDefault();
        const name = this.refs.name.value;
        const surname = this.refs.surname.value;
        const birthday = this.refs.birthday.value;
        const death = this.refs.death.value === "" ? null : this.refs.death.value;
        const father = this.refs.father.value === "" ? null : parseInt(this.refs.father.value);
        const mother = this.refs.mother.value === "" ? null : parseInt(this.refs.mother.value);
        const children = [];
        const relationship = [];
        const photo = this.state.uploadedFileCloudinaryUrl;

        const person = {
            name,
            surname,
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
        //this.context.executeAction(navigateAction, { method: 'get', url: "/"+id } );
    };

    render() {
        return (
            <form className={b()} onSubmit={this.addPersonToData.bind(this)}
                  href={this.props.href}>{this.props.children}
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