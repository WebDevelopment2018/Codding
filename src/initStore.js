import { createStore } from 'redux';
import FamilyApp from './reducers';

export default () => {
    return createStore(FamilyApp)
}