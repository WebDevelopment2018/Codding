import {combineReducers} from "redux";
import {assoc} from "ramda";


export const activePersonId = (state = {}, action) => {
    switch (action.type) {
        case "CHANGE_ID":
            return {id: action.person};
        default:
            return state;
    }
};

export const persons = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_PERSON_SUCCESS":
            return assoc(action.id, action.data, state);
        default:
            return state;
    }
};

export const fetching = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_PERSON":
            return assoc(action.id, true, state);
        case "FETCH_PERSON_SUCCESS":
        case "FETCH_PERSON_FAIL":
            return assoc(action.id, false, state);
        default:
            return state;
    }
};


export default combineReducers({
        activePersonId,
        persons,
        fetching
    }
);


export const getPerson = (personId, state) => state.activePersonId;
export const getPersonById = (id, state) => state.persons[id];
export const isPersonFetching = (id, state) => state.fetching[id];

