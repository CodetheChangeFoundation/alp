const INITIAL_STATE = {
    location: null
}

const locationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_VOLUNTEER_LOCATION':
            return {
                ...state,
                location: action.payload
            }

        default:
            return state;

    }
}

export default locationReducer;
