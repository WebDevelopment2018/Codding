import {getPersonById, isPersonFetching} from "../reducers";
import {fetchPerson} from "../actions/index";

const fetchFamilyStart = (id) =>{
    return {
        type: "FETCH_FAMILY",
        id
    }
}

const fetchFamilySuccess = (family, id) =>{
    return {
        type: "FETCH_FAMILY_SUCCESS",
        family,
        id
    }
}

const fetchFamilyFail = (family, id) =>{
    return {
        type: "FETCH_FAMILY_FAIL",
        family,
        id
    }
}

// const getFamily = (id) => async (dispatch) => {
//     const parents = getParents(id);
// }

const getPerson = (id,state) =>{
    if (id !== null) {
        let person = getPersonById(id,state);
        if(!person && !isPersonFetching(id,state)){
            console.log("bla");
            fetchPerson(id);
        }
        if(person){
            console.log(person);
            return person;
        }
        // let parents = [buildParentsTree(user.father, data), buildParentsTree(user.mother, data)];
        // return {
        //     "name": user.id,
        //     "children": parents.filter(n => n)
        // };
    }
    return null;
};



export const fetchFamily = (id, state) => async (dispatch) => {
    dispatch(fetchFamilyStart(id));
    const person = getPerson(id,state);
    const family = {
        person
    };
    //const family = await ((await fetch(`http://localhost:3000/persons`)).json());
    dispatch(fetchFamilySuccess(family,id));
}



