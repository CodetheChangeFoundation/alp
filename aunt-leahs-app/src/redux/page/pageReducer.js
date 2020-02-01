import { pages } from '../../constants';

const INITIAL_STATE = {
    page: pages.VOLUNTEER_HOME
}

const pageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                page: action.payload
            }

        default:
            return state;

    }
}

export default pageReducer;
