import React from 'react';
import { connect } from 'react-redux';

import { pages } from '../constants';

import HomePage from '../pages/HomePage';
import VolunteerPage from '../pages/volunteerPage';
import VolunteerSignUpPage from '../pages/VolunteerSignUpPage';

const VolunteerFormControl = ({ page }) => {
    switch (page) {
        case pages.VOLUNTEER_HOME:
            return <HomePage />;
        case pages.VOLUNTEER_LOGIN:
            return <VolunteerPage />;
        case pages.VOLUNTEER_SIGN_UP:
            return <VolunteerSignUpPage />;
        default:
            return <HomePage />;
    }
};

const mapStateToProps = state => ({
    page: state.page.page
});

export default connect(mapStateToProps)(VolunteerFormControl);
