import { combineReducers } from 'redux';
import person, * as fromPerson from './person';
import data from "./data";

const FamilyApp = combineReducers({
    person: person,
    data: data
});



export default FamilyApp;
export const getPerson = (state) => fromPerson.getPerson(state.person);