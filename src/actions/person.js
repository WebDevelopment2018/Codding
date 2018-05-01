import {
  EDITING_PERSON_FAIL,
  EDITING_PERSON_START,
  EDITING_PERSON_SUCCESS,
  FETCH_PERSON,
  FETCH_PERSON_FAIL,
  FETCH_PERSON_SUCCESS, SEARCH_PERSON_FAIL, SEARCH_PERSON_START, SEARCH_PERSON_SUCCESS
} from "./actionTypes";
import * as api from "../api";
import { getPersonById } from "../reducers";

export const changeActivePersonId = id => ({ type: "CHANGE_ID", id });

export const fetchPersonStart = id => ({ type: FETCH_PERSON, id });
export const fetchPersonSuccess = (id, data) => ({ type: FETCH_PERSON_SUCCESS, id, data });
export const fetchPersonFail = (id, data) => ({ type: FETCH_PERSON_FAIL, error: true, id, data });

export const editingPersonStart = id => ({ type: EDITING_PERSON_START, id });
export const editingPersonSuccess = () => ({ type: EDITING_PERSON_SUCCESS });
export const editingPersonFail = () => ({ type: EDITING_PERSON_FAIL, error: true });

const searchPersonByNameStart = search => ({ type: SEARCH_PERSON_START, search });
const searchPersonByNameSuccess = (search, persons) => ({ type: SEARCH_PERSON_SUCCESS, search, persons });
const searchPersonByNameFail = (search, persons) => ({ type: SEARCH_PERSON_FAIL, error: true, search, persons });

export const fetchPerson = id => async dispatch => {
  try {
    dispatch(fetchPersonStart(id));
    const person = await api.fetchUser(id);
    dispatch(fetchPersonSuccess(id, person));
    return person;
  } catch (error) {
    dispatch(fetchPersonFail(error))
  }
};

export const editPersonParents = (child, id, gender) => async (dispatch, getState) => {
  if (gender === "male") {
    const father = id;
    await api.editUser(child, { father });
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

export const addUser = data => async dispatch => {
  const user = await api.addUser(data);
  if (user.mother) dispatch(editPersonChildren(user.mother, [user.id]));
  if (user.father) dispatch(editPersonChildren(user.father, [user.id]));
  if (user.children) dispatch(editPersonParents(user.children[0], user.id, user.gender));

  window.location.href = "http://localhost:5000/" + user.id;
  return user.id;
};

export const editPerson = (id, data) => async dispatch => {
  try {
    await api.editUser(id, data);
    dispatch(editingPersonSuccess());
    window.location.href = "http://localhost:5000/" + id;
  } catch (error) {
    dispatch(editingPersonFail(error))
  }
};

export const searchPersonByName = searchString => async dispatch => {
  try {
    dispatch(searchPersonByNameStart(searchString));
    const response = await fetch(`http://localhost:3000/persons?name_like=${searchString}`);
    const result = await response.json();
    dispatch(searchPersonByNameSuccess(searchString, result));
  } catch (error) {
    dispatch(searchPersonByNameFail(error))
  }
};
