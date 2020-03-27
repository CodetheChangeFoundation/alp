import { combineReducers } from 'redux';

import volunteerReducer from './volunteer/volunteerReducer';
import locationReducer from './location/locationReducer';
import pageReducer from './page/pageReducer';

import { pages } from '../constants';

const appReducer = combineReducers({
    location: locationReducer,
    volunteer: volunteerReducer,
    page: pageReducer
});

export const rootReducer = (state, action) => {
    if (action.type === 'CLEAR_STATE') {
        state = {
            page: {
                page: pages.VOLUNTEER_HOME
            }
        }
    }

    return appReducer(state, action);
}

export const clearStateAction = () => (
    {
        type: 'CLEAR_STATE'
    }
)