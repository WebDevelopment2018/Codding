import {getChildren, getParents, getRelationship, getSiblings} from "./index"

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