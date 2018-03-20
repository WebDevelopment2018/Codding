import {combineReducers} from "redux";
import {assoc} from "ramda";

const family = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_FAMILY_SUCCESS":
            return assoc('data', action.family, state);
        default:
            return state;
    }
};


const fetching = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_FAMILY":
            return assoc('fetched',true, state);
        case "FETCH_PERSON_SUCCESS":
        case "FETCH_PERSON_FAIL":
            return assoc('fetched',false, state);
        default:
            return state;
    }
};

export default combineReducers({
        family,
        fetching
    }
);

export const getFamily = (state) => state.family;
export const isFamilyFetching = (state) => state.fetching;