import { combineReducers } from 'redux';

import volunteerReducer from './volunteer/volunteerReducer';
import locationReducer from './location/locationReducer';
import pageReducer from './page/pageReducer';

const appReducer = combineReducers({
    location: locationReducer,
    volunteer: volunteerReducer,
    page: pageReducer
});

export const rootReducer = (state, action) => {
    if (action.type === 'CLEAR_STATE') {
        state = undefined;
    }

    return appReducer(state, action);
}

export const clearStateAction = () => (
    {
        type: 'CLEAR_STATE'
    }
)