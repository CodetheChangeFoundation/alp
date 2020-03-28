import React from 'react';
import { withAuthentication } from 'react-aad-msal';

import { LocationList } from '../components/adminLocationList/LocationList';
import AdminHeader from '../components/AdminHeader';

import { authProvider } from '../auth/authProvider';
import store from '../redux/store';

const AdminLocationsPage = () => (
    <div className='center-text'>
        <AdminHeader />
        <LocationList />
    </div>
);

export default withAuthentication(AdminLocationsPage, {
    provider: authProvider,
    reduxStore: store,
    forceLogin: true
});
