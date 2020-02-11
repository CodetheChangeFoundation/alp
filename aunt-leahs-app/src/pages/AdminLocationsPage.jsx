import React from 'react';
import '../styles.css';
import { LocationList } from '../components/adminLocationList/LocationList';
import AdminHeader from '../components/AdminHeader';

const AdminLocationsPage = () => (
    <div class='center-text'>
        <AdminHeader />
        <LocationList />
    </div>
);

export default AdminLocationsPage;
