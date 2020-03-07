const INITIAL_STATE = {
    volunteer: {
        isNewVolunteer: false,
        firstName: null,
        lastName: null,
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
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName
                }
            };
        case 'SET_NEW_VOLUNTEER':
            action.payload.isNewVolunteer = true;
            return {
                ...state,
                volunteer: action.payload
            };
        default:
            return state;
    }
}

export default volunteerReducer;
