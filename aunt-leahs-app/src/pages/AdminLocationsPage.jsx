import React from 'react';
import { AzureAD, AuthenticationState } from 'react-aad-msal';

import { LocationList } from '../components/adminLocationList/LocationList';
import AdminHeader from '../components/AdminHeader';

import { authProvider } from '../auth/authProvider';
import store from '../redux/store';

const AdminLocationsPage = () => (
    <AzureAD provider={authProvider} reduxStore={store}>
        <div className='center-text'>
            <AdminHeader />
            <LocationList />
        </div>
    </AzureAD>
);

export default AdminLocationsPage;
