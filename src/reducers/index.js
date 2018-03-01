import { combineReducers } from 'redux';
import family, * as fromFamily from './family';

const FamilyApp = combineReducers({
    family
});

export default FamilyApp;


export const getAllFamily = (state) => fromFamily.getAllFamily(state.family);