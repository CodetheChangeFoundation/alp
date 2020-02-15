import React from 'react';
import { LocationList } from '../components/adminLocationList/LocationList';
import AdminHeader from '../components/AdminHeader';

const AdminLocationsPage = () => (
    <div className='center-text'>
        <AdminHeader />
        <LocationList />
    </div>
);

export default AdminLocationsPage;
