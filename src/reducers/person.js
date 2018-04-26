import {combineReducers} from "redux";
import {assoc} from "ramda";
import {
    EDITING_PERSON_START, EDITING_PERSON_SUCCESS, FETCH_PERSON, FETCH_PERSON_FAIL,
    FETCH_PERSON_SUCCESS
} from "../actions/actionTypes";


export const activePersonId = (state = {}, action) => {
    switch (action.type) {
        case "CHANGE_ID":
            return {id: action.person};
        default:
            return state;
    }
};
export const editingPersonId = (state = {}, action) => {
    switch (action.type) {
        case EDITING_PERSON_START:
            return {id: action.id};
        case EDITING_PERSON_SUCCESS:
            return {id: null};
        default:
            return state;
    }
};


export const persons = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PERSON_SUCCESS:
            return assoc(action.id, action.data, state);
        default:
            return state;
    }
};

export const fetching = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PERSON:
            return assoc(action.id, true, state);
        case FETCH_PERSON_SUCCESS:
        case FETCH_PERSON_FAIL:
            return assoc(action.id, false, state);
        default:
            return state;
    }
};


export default combineReducers({
        activePersonId,
        persons,
        fetching,
        editingPersonId
    }
);


export const getPerson = (personId, state) => state.activePersonId;
export const getPersonById = (id, state) => state.persons[id];
export const getEditingPersonId = (state) => state.editingPersonId;
export const isPersonFetching = (id, state) => state.fetching[id];

