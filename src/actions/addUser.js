import {fetchPerson} from "./fetching";
import {getPersonById} from "../reducers";

export const editPersonParents = (child, id, gender) => async (dispatch, getState) => {
    console.log("child id ",child);
    console.log("parent id ",parent);
    console.log(gender);
    if(gender === "male"){
        const father = id;
        await fetch("http://localhost:3000/persons/" + child, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({father})
        });
    }
    if(gender === "female"){
        const mother = id;
        await fetch("http://localhost:3000/persons/" + child, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({mother})
        });
    }
};

export const editPersonChildren = (id, child) => async (dispatch, getState) => {
    let person = getPersonById(id, getState());
    if (!person) {
        await dispatch(fetchPerson(id));
    }
    person = getPersonById(id, getState());
    const children = person.children.concat(child);
    await fetch("http://localhost:3000/persons/" + id, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({children})
    });
};

export const addUser = (data) => async (dispatch) => {
    const id = await fetch('http://localhost:3000/persons', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.mother) {
                dispatch(editPersonChildren(data.mother, [data.id]));
            }
            if (data.father) {
                dispatch(editPersonChildren(data.father, [data.id]));
            }
            if(data.children){
                dispatch(editPersonParents(data.children[0], data.id ,data.gender));
            }
            window.location.href = "http://localhost:5000/" + data.id;
            return data.id;
        });
    return id;

};