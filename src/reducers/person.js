import { combineReducers } from "redux";
import { assoc, values } from "ramda";
import {normalize} from 'normalizr';

import { EDITING_PERSON_START, EDITING_PERSON_SUCCESS, FETCH_PERSON, FETCH_PERSON_FAIL, FETCH_PERSON_SUCCESS, SEARCH_PERSON_SUCCESS, ADD_RELATIVES_START,
  ADD_RELATIVES_SUCCESS} from "../actions/actionTypes";


export const editingPersonId = (state = {}, action) => {
  switch (action.type) {
    case EDITING_PERSON_START:
      return { id: action.id };
    case EDITING_PERSON_SUCCESS:
      return { id: null };
    default:
      return state;
  }
};

export const addRelatives = (state = {}, action) => {
  switch (action.type) {
    case  ADD_RELATIVES_START:
      return { relatives: action.relatives };
    case  ADD_RELATIVES_SUCCESS:
      return { relatives: null };
    default:
      return state;
  }
};
export const persons = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PERSON_SUCCESS:
      return assoc(action.id, action.data, state);

    case SEARCH_PERSON_SUCCESS:
      const { persons } = action;
      return {
        ...state,
        ...persons.reduce((accum, el) => {
          accum[el._id] = el;
          console.log(accum , el);
          return accum;
        }, {})
      };

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
  persons,
  fetching,
  editingPersonId,
  addRelatives
});

export const getPerson = (personId, state) => state.activePersonId;
export const getPersonById = (id, state) => state.persons[id];
export const getEditingPersonId = state => state.editingPersonId;
export const isPersonFetching = (id, state) => state.fetching[id];
export const getRelatives = state =>  values(state.addRelatives);

export const getAllPersons = state => {
  return values(state.persons);
};
