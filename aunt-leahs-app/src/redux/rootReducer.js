import { combineReducers } from 'redux';

import volunteerReducer from './volunteer/volunteerReducer';
import locationReducer from './location/locationReducer';

export default combineReducers({
    location: locationReducer,
    volunteer: volunteerReducer
});
