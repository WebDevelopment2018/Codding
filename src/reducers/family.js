import {combineReducers} from "redux";
import {assoc} from "ramda";

const families = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_FAMILY_SUCCESS":
            return assoc(action.id, action.family , state);
        default:
            return state;
    }
};

const fetching = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_FAMILY":
            return assoc(action.id, true, state);
        case "FETCH_FAMILY_SUCCESS":
        case "FETCH_FAMILY_FAIL":
            return assoc(action.id, false, state);
        default:
            return state;
    }
};

export default combineReducers({
        families,
        fetching
    }
);

//export const getFamily = (state) => state.family;
export const getFamilyByPersonId = (id, state) => state.families[id];
export const isFamilyFetching = (id,state) => state.fetching[id];