import { createStore,applyMiddleware } from 'redux';
import FamilyApp from './reducers';

import thunk from 'redux-thunk'
import logger from 'redux-logger'

export default () => {
    return createStore(FamilyApp,
        applyMiddleware(thunk,logger)
    );
}