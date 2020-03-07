import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Header from '../components/Header';
import LocationSelect from '../components/LocationSelect';
import CustomButton from '../components/CustomButton'
import { headers, pages } from '../constants';

import { setVolunteerLocation } from '../redux/location/locationAction';
import { setCurrentPage } from '../redux/page/pageAction';

const VolunteerHomePage = ({ setVolunteerLocation, selectedLocation, setCurrentPage }) => {

    const [locations, setLocations] = useState([]);

    useEffect(() => {
		getLocations();
    }, []);
    
    const proceedToNextPage = () => {
        if (selectedLocation) {
            setCurrentPage(pages.VOLUNTEER_LOGIN)
        } else {
            alert("No location has been selected!");
        }
    }

    const getLocations = async () => {
		const response = await fetch('http://localhost:7071/api/location');
		const locations = await response.json();
		const locationObjs = locations.map((location) => (
			{
				name: location.name,
				id: location.id,
				isDeleted: location.isDeleted
			}));
		setLocations(locationObjs);
	}
    
    return (
    <div className="homepage">
        <Header page={headers.SUB_HEADER.location} />

        <div className="homepage-list">
            <LocationSelect locations={locations} onLocationSelect={setVolunteerLocation}></LocationSelect>
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
