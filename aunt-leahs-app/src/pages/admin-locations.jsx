import React from 'react';
import Head from '../components/header.jsx';
import CustomButton from '../components/customButton/customButton'
import constants from '../constants';
import '../styles.css';
import { LocationList } from '../components/adminLocationList/locationList';

const AdminLocationsPage = () => (
    <div className="homepage">
        <Head />
        
        <div className="homepage-list">
            <LocationList></LocationList>
        </div>
        
        <div className="homepage-button">
            <CustomButton size='small' color='primary'>Save</CustomButton>
        </div>
        
    </div>
);

export default AdminLocationsPage;
