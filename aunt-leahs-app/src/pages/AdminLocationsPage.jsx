import React from 'react';
import '../styles.css';
import { LocationList } from '../components/adminLocationList/locationList';
import AdminHeader from '../components/AdminHeader';

const AdminLocationsPage = () => (
    <div class='Center-text'>
        <AdminHeader />
        <LocationList />
    </div>
);

export default AdminLocationsPage;
