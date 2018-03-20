import { combineReducers } from 'redux';
import person, * as fromPerson from './person';
import family, * as fromFamily from './data';

const FamilyApp = combineReducers({
    person: person,
    family: family
});



export default FamilyApp;
export const getPerson = (state) => fromPerson.getPerson(state.person);
export const getPersonById = (id,state) => fromPerson.getPersonById(id,state.person);
export const isPersonFetching = (id,state) => fromPerson.isPersonFetching(id,state.person);

export const isFamilyFetching = (state) => fromFamily.isFamilyFetching(state.family);
export const getFamily = (state) => fromFamily.getFamily(state.family);

