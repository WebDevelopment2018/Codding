import { createStore,applyMiddleware } from 'redux';
import FamilyApp from './reducers';

import thunk from 'redux-thunk';

export default () => {
    return createStore(FamilyApp,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk)
    );
}