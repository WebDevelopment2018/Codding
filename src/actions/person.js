import {
  ADD_RELATIVES_FAIL,
  ADD_RELATIVES_START, ADD_RELATIVES_SUCCESS,
  EDITING_PERSON_FAIL,
  EDITING_PERSON_START,
  EDITING_PERSON_SUCCESS,
  FETCH_PERSON,
  FETCH_PERSON_FAIL,
  FETCH_PERSON_SUCCESS, SEARCH_PERSON_FAIL, SEARCH_PERSON_START, SEARCH_PERSON_SUCCESS
} from "./actionTypes";
import * as api from "../api";
import { getPersonById } from "../reducers";

export const fetchPersonStart = id => ({ type: FETCH_PERSON, id });
export const fetchPersonSuccess = (id, data) => ({ type: FETCH_PERSON_SUCCESS, id, data });
export const fetchPersonFail = (id, data) => ({ type: FETCH_PERSON_FAIL, error: true, id, data });

export const editingPersonStart = id => ({ type: EDITING_PERSON_START, id });
export const editingPersonSuccess = () => ({ type: EDITING_PERSON_SUCCESS });
export const editingPersonFail = () => ({ type: EDITING_PERSON_FAIL, error: true });

const searchPersonByNameStart = search => ({ type: SEARCH_PERSON_START, search });
const searchPersonByNameSuccess = (search, persons) => ({ type: SEARCH_PERSON_SUCCESS, search, persons });
const searchPersonByNameFail = (search, persons) => ({ type: SEARCH_PERSON_FAIL, error: true, search, persons });

export const addRelativesStart = relatives => ({ type: ADD_RELATIVES_START, relatives });
export const addRelativesSuccess = () => ({ type: ADD_RELATIVES_SUCCESS });
export const addRelativesFail = () => ({ type: ADD_RELATIVES_FAIL, error: true });

export const fetchPerson = id => async dispatch => {
  try {
    dispatch(fetchPersonStart(id));
    let person = await api.fetchUser(id);
    dispatch(fetchPersonSuccess(id, person));
    return person;
  } catch (error) {
    dispatch(fetchPersonFail(error))
  }
};

export const editPersonParents = async (childs, id, gender) =>  {
  if (gender === "male") {
    const father = id;
    await Promise.all(childs.map(child => api.editUser(child, { father })));
  }
  if (gender === "female") {
    const mother = id;
    await api.editUser(child, { mother });
  }
};

export const editPersonChildren = (id, child) => async (dispatch, getState) => {
  let person = getPersonById(id, getState());
  if (!person) {
    await dispatch(fetchPerson(id));
  }
  person = getPersonById(id, getState());
  const children = person.children.concat(child);
  await api.editUser(id, { children });
};

export const addPerson = data => async dispatch => {
  const user = await api.addUser(data);
  //console.log("added person: ",user);
  if (user.mother) dispatch(editPersonChildren(user.mother, [await user._id]));
  if (user.father) dispatch(editPersonChildren(user.father, [await user._id]));
  if (user.children) dispatch(editPersonParents(user.children[0], await user._id, user.gender));
  return user._id;
};

export const editPerson = (id, data) => async dispatch => {
  try {
    await api.editUser(id, data);
    if (data.mother) dispatch(editPersonChildren(data.mother, [id]));
    if (data.father) dispatch(editPersonChildren(data.father, [id]));
    if (data.children) dispatch(editPersonParents(data.children, id, data.gender));
    dispatch(editingPersonSuccess());
  } catch (error) {
    dispatch(editingPersonFail(error))
  }
};

export const searchPersonByName = searchString => async dispatch => {
  try {
    dispatch(searchPersonByNameStart(searchString));
    const response = await fetch(`http://localhost:3000/persons/name/${searchString}`);
    const result = await response.json();
    dispatch(searchPersonByNameSuccess(searchString, result));
  } catch (error) {
    dispatch(searchPersonByNameFail(error))
  }
};
