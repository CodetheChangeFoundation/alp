export const setNewVolunteer = volunteer => (
    {
        type: 'SET_NEW_VOLUNTEER',
        payload: volunteer
    }
)

export const setExistingVolunteer = existingVolunteer => (
    {
        type: 'SET_EXISTING_VOLUNTEER',
        payload: existingVolunteer
    }
)

export const setDuration = duration => (
    {
        type: 'SET_DURATION',
        payload: duration
    }
)
