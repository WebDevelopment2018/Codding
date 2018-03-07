import { combineReducers } from 'redux';
import Person, * as fromPerson from './Person';

const FamilyApp = combineReducers({
    Person
});

export default FamilyApp;


export const getPerson = (state) => fromPerson.getPerson(state.family);