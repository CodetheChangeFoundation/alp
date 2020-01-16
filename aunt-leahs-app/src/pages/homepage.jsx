import React from 'react';
import Head from '../components/header';
import LocationSelect from '../components/locationSelect';
import CustomButton from '../components/customButton'
import constants from '../constants';
import '../styles.css';

const HomePage = () => (
    <div className="homepage">
        <Head page={constants.HEADER.SUB_HEADER.location} />

        <div className="homepage-list">
            <LocationSelect onLocationSelect={function setLocation(location) { alert("Selected: " + location.name); }}></LocationSelect>
        </div>

        <div className="homepage-button">
            <CustomButton size='small' color='primary'>Next</CustomButton>
        </div>

        <div className="homepage-admin-login">
            <a href='#'>Admin Login</a>
        </div>

    </div>
);

export default HomePage;
