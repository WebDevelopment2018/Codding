
export const changePersonId = (id) => {
    return {
        type: 'CHANGE_ID',
        person: id
    }
};

export const setData = (data) => {
    return {
        type: 'SET_DATA',
        data
    }
}

const fetchPersonStart = (id) =>{
    return {
        type: "FETCH_PERSON",
        id
    }
}

const fetchPersonSuccess = (id, data) =>{
    return {
        type: "FETCH_PERSON_SUCCESS",
        id,
        data
    }
}

const fetchPersonFail = (id, data) =>{
    return {
        type: "FETCH_PERSON_FAIL",
        id,
        data
    }
}

export const fetchPerson = (id) => async (dispatch) => {
    dispatch(fetchPersonStart(id));
    const person = await ((await fetch(`http://localhost:3000/persons/${id}`)).json());
    dispatch(fetchPersonSuccess(id,person));
}