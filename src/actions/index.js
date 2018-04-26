

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

export const editPerson = (id,data) => async (dispatch) => {
    console.log("EDIT",id,data);
    await fetch("http://localhost:3000/persons/" + id, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
    dispatch(editingPersonEnd());
    window.location.href = "http://localhost:5000/" + id;
};