import { createStore } from 'redux';

import rootReducer from './rootReducer';
import { pages } from '../constants';

const store = createStore(
    rootReducer,
    {
        page: pages.VOLUNTEER_HOME
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
