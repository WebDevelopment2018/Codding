import {getPersonById} from "../reducers/index";
import {uniq} from "ramda";

export const changePersonId = (id) => {
    console.log(id);
    return {
        type: 'CHANGE_ID',
        id
    }
};

export const fetchPersonStart = (id) => {
    return {
        type: "FETCH_PERSON",
        id
    }
};

export const fetchPersonSuccess = (id, data) => {
    return {
        type: "FETCH_PERSON_SUCCESS",
        id,
        data
    }
};

export const fetchPersonFail = (id, data) => {
    return {
        type: "FETCH_PERSON_FAIL",
        id,
        data
    }
};

export const fetchPerson = (id) => async (dispatch) => {
    dispatch(fetchPersonStart(id));
    const person = await ((await fetch(`http://localhost:3000/persons/${id}`)).json());
    dispatch(fetchPersonSuccess(id, person));
    return person;
};

export const fetchFamilyStart = (id) => {
    return {
        type: "FETCH_FAMILY",
        id
    }
};

export const fetchFamilySuccess = (family, id) => {
    return {
        type: "FETCH_FAMILY_SUCCESS",
        family,
        id
    }
};

export const fetchFamilyFail = (family, id) => {
    return {
        type: "FETCH_FAMILY_FAIL",
        family,
        id
    }
};

const getParents = (id) => async (dispatch, getState) => {
    if (id) {
        let person = getPersonById(id, getState());
        if (!person) {
            await dispatch(fetchPerson(id));
        }
        person = getPersonById(id, getState());
        let parents = [await dispatch(getParents(person.father)),
            await dispatch(getParents(person.mother))];
        return {
            "name": person.id,
            "children": parents.filter(n => n)
        };
    }
    return null;
};
const getRelationship = (id) => async (dispatch, getState) => {
    let person = getPersonById(id, getState());
    if (!person) {
        await dispatch(fetchPerson(id));
    }
    await Promise.all(
        person.relationship.map(i => !getPersonById(i, getState()) ? dispatch(fetchPerson(i)) : i)
    );
    return person.relationship;
};
const getSiblings = (id) => async (dispatch, getState) => {
    let person = getPersonById(id, getState());
    if (!person) {
        person = await dispatch(fetchPerson(id));
    }
    let siblings = [];
    if (person.mother !== null) {
        let mother = getPersonById(person.mother, getState());
        if (!mother) {
            mother = await dispatch(fetchPerson(person.mother));
        }
        mother.children.map(child => {
            child !== person.id ? siblings.push(child) : child
        });
    }
    if (person.father !== null) {
        let father = getPersonById(person.father, getState());
        if (!father) {
            father = await dispatch(fetchPerson(person.father));
        }
        father.children.map(child => {
            child !== person.id ? siblings.push(child) : child
        });
    }
    siblings = uniq(siblings);
    await Promise.all(
        siblings.map(i => !getPersonById(i, getState()) ? dispatch(fetchPerson(i)) : i)
    );
    return siblings;
};
const getChildren = (id) => async (dispatch, getState) => {
    if (id) {
        let person = getPersonById(id, getState());
        if (!person) {
            await dispatch(fetchPerson(id));
        }
        person = getPersonById(id, getState());
        if (person.children !== []) {
            const children = await Promise.all(
                person.children.map(id =>
                    dispatch(getChildren(id))
                )
            )
            return {
                "name": person.id,
                children
            };
        }
        return {
            "name": person.id,
            "children": []
        };
    }
    return null;
};


export const fetchUserFamily = (id) => async (dispatch) => {
    dispatch(fetchFamilyStart(id));
    const family = {
        "parents": await dispatch(getParents(id)),
        "children": await dispatch(getChildren(id)),
        "relationship": await dispatch(getRelationship(id)),
        "siblings": await dispatch(getSiblings(id))
    };
    dispatch(fetchFamilySuccess(family, id));
};
const editPersonParents = (data, id) => async (dispatch) => {
    await fetch("http://localhost:3000/persons/" + id, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
};

const editPersonChildren = (id, child) => async (dispatch, getState) => {
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
                dispatch(editPersonChildren(data.mother, [data.id]));
            }
            return data.id;
        });
    return id;

};