import { combineReducers } from 'redux';

import volunteerReducer from './volunteer/volunteerReducer';
import locationReducer from './location/locationReducer';
import pageReducer from './page/pageReducer';
import authReducer from './auth/authReducer';

const appReducer = combineReducers({
    location: locationReducer,
    volunteer: volunteerReducer,
    page: pageReducer, 
    auth: authReducer
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