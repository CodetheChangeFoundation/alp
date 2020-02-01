import { combineReducers } from 'redux';

import volunteerReducer from './volunteer/volunteerReducer';
import locationReducer from './location/locationReducer';
import pageReducer from './page/pageReducer';

export default combineReducers({
    location: locationReducer,
    volunteer: volunteerReducer,
    page: pageReducer
});
