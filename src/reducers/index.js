import { combineReducers } from 'redux';
import person, * as fromPerson from './person';
import family, * as fromFamily from './family';

const FamilyApp = combineReducers({
    person: person,
    family: family
});

export default FamilyApp;
export const getPerson = (state) => fromPerson.getPerson(state.person);
export const getPersonById = (id,state) => fromPerson.getPersonById(id,state.person);
export const getEditingPersonId = (state) => fromPerson.getEditingPersonId(state.person);
export const isPersonFetching = (id,state) => fromPerson.isPersonFetching(id,state.person);
export const getAllPersons =  (state) => fromPerson.getAllPersons(state.person);

export const isFamilyFetching = (id,state) => fromFamily.isFamilyFetching(id,state.family);
export const getFamilyByPersonId = (id,state) => fromFamily.getFamilyByPersonId(id,state.family);


