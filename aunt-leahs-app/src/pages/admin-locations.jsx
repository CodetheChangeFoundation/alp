import React from 'react';
import Head from '../components/header.jsx';
import constants from '../constants';
import '../styles.css';
import { LocationList } from '../components/adminLocationList/locationList';

const AdminLocationsPage = () => (
    <div className="homepage">
        <Head page={constants.HEADER.SUB_HEADER.adminLocations} />
        
        <div className="homepage-list">
            <LocationList></LocationList>
        </div>
        
    </div>
);

export default AdminLocationsPage;
