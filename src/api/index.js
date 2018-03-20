const fetchFamilyStart = () =>{
    return {
        type: "FETCH_FAMILY"
    }
}

const fetchFamilySuccess = (family) =>{
    return {
        type: "FETCH_FAMILY_SUCCESS",
        family
    }
}

const fetchFamilyFail = (family) =>{
    return {
        type: "FETCH_FAMILY_FAIL",
        family
    }
}

export const fetchFamily = () => async (dispatch) => {
    dispatch(fetchFamilyStart());
    const family = await ((await fetch(`http://localhost:3000/persons`)).json());
    dispatch(fetchFamilySuccess(family));
}



