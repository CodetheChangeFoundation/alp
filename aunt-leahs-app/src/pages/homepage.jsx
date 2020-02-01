import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Head from '../components/header';
import LocationSelect from '../components/locationSelect';
import CustomButton from '../components/customButton'
import { headers } from '../constants';
import '../styles.css';

import { setVolunteerLocation } from '../redux/location/locationAction';

const HomePage = ({ history, setVolunteerLocation, selectedLocation }) => (
    <div className="homepage">
        <Head page={headers.SUB_HEADER.location} />

        <div className="homepage-list">
            <LocationSelect onLocationSelect={setVolunteerLocation}></LocationSelect>
        </div>

        <div className="homepage-button">
            <CustomButton size='small' color='primary' onClick={
                () => {
                    if (selectedLocation) {
                        history.push('/volunteerLogin')
                    } else {
                        alert("No location has been selected!");
                    }
                }}>
                    Next
                    </CustomButton>
        </div>

        <div className="homepage-admin-login">
            <Link to='/admin'>Admin Login</Link>
        </div>

    </div>
);

const mapStateToProps = state => ({
    selectedLocation: state.location.location
});

const mapDispatchToProps = dispatch => ({
    setVolunteerLocation: location => dispatch(setVolunteerLocation(location))
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(HomePage);
