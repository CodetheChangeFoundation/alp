import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Head from '../components/header';
import LocationSelect from '../components/locationSelect';
import CustomButton from '../components/customButton'
import constants from '../constants';
import '../styles.css';

const HomePage = ({ history }) => (
    <div className="homepage">
        <Head page={constants.HEADER.SUB_HEADER.location} />

        <div className="homepage-list">
            <LocationSelect onLocationSelect={function setLocation(location) { alert("Selected: " + location.name); }}></LocationSelect>
        </div>

        <div className="homepage-button">
            <CustomButton size='small' color='primary' onClick={() => history.push('/volunteerlogin')}>Next</CustomButton>
        </div>

        <div className="homepage-admin-login">
            <Link to='/adminlogin'>Admin Login</Link>
        </div>

    </div>
);

export default withRouter(HomePage);
