import React from 'react';
import { connect } from 'react-redux';

import { pages } from '../constants';

import VolunteerHomePage from '../pages/VolunteerHomePage';
import VolunteerLoginPage from '../pages/VolunteerLoginPage';
import VolunteerCheckInPage from '../pages/VolunteerCheckInPage';
import VolunteerSignUpPage from '../pages/VolunteerSignUpPage';

const VolunteerFormControl = ({ page }) => {
    switch (page) {
        case pages.VOLUNTEER_HOME:
            return <VolunteerHomePage />;
        case pages.VOLUNTEER_LOGIN:
            return <VolunteerLoginPage />;
        case pages.VOLUNTEER_CHECK_IN:
            return <VolunteerCheckInPage />;
        case pages.VOLUNTEER_SIGN_UP:
            return <VolunteerSignUpPage />;
        default:
            return <VolunteerHomePage />;
    }
};

const mapStateToProps = state => ({
    page: state.page.page
});

export default connect(mapStateToProps)(VolunteerFormControl);
