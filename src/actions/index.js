

export const editingPersonStart = (id) => {
    return {
        type: "EDITING_PERSON_START",
        id
    }
};

export const editingPersonEnd = () => {
    return {
        type: "EDITING_PERSON_END"
    }
};

export const editPerson = (data) => async (dispatch) => {
    //const person = await ((await fetch(`http://localhost:3000/persons/${id}`)).json());
    console.log("EDIT");
    dispatch(editingPersonEnd());
};