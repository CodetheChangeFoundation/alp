import React from 'react';
import '../styles.css';
import { LocationList } from '../components/adminLocationList/LocationList';
import AdminHeader from '../components/AdminHeader';

const AdminLocationsPage = () => (
    <div style={{ textAlign: 'center' }}>
        <AdminHeader />
        <LocationList />
    </div>
);

export default AdminLocationsPage;
