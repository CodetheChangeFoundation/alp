const INITIAL_STATE = {
    volunteer: {
        isNewVolunteer: false,
        name: null,
        email: null,
        streetAddress: null,
        city: null,
        province: null,
        postalCode: null,
        emergencyContactFirstName: null,
        emergencyContactLastName: null,
        emergencyContactRelationship: null,
        emergencyContactPhoneNumber: null,
        emergencyContactEmail: null,
        mailingList: false
    }
}

const volunteerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_EXISTING_VOLUNTEER':
            return {
                ...state,
                volunteer: {
                    isNewVolunteer: false,
                    name: action.payload.name
                }
            };
        case 'SET_NEW_VOLUNTEER':
            action.payload.isNewVolunteer = true;
            return {
                ...state,
                volunteer: action.payload
            };
        case 'SET_DURATION':
            //TODO
        default:
            return state;

    }
}

export default volunteerReducer;
