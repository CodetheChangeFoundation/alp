import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Head from '../components/header';
import LocationSelect from '../components/locationSelect';
import CustomButton from '../components/customButton'
import { headers, pages } from '../constants';
import '../styles.css';

import { setVolunteerLocation } from '../redux/location/locationAction';
import { setCurrentPage } from '../redux/page/pageAction';

const VolunteerHomePage = ({ setVolunteerLocation, selectedLocation, setCurrentPage }) => {

    const proceedToNextPage = () => {
        if (selectedLocation) {
            setCurrentPage(pages.VOLUNTEER_LOGIN)
        } else {
            alert("No location has been selected!");
        }
    }
    
    return (
    <div className="homepage">
        <Head page={headers.SUB_HEADER.location} />

        <div className="homepage-list">
            <LocationSelect onLocationSelect={setVolunteerLocation}></LocationSelect>
        </div>

        <div className="homepage-button">
            <CustomButton size='small' color='primary' onClick={proceedToNextPage}>
                Next
            </CustomButton>
        </div>

        <div className="homepage-admin-login">
            <Link to='/admin'>Admin Login</Link>
        </div>

    </div>);
};

const mapStateToProps = state => ({
    selectedLocation: state.location.location
});

const mapDispatchToProps = dispatch => ({
    setVolunteerLocation: location => dispatch(setVolunteerLocation(location)),
    setCurrentPage: page => dispatch(setCurrentPage(page))
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(VolunteerHomePage);
