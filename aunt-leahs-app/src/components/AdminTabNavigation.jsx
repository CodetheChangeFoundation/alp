import React from 'react';
import { withRouter } from 'react-router-dom';
import { AzureAD } from 'react-aad-msal';

import Tab from './Tab';

import { authProvider } from '../auth/authProvider';
import store from '../redux/store';

const AdminTabNavigation = ({ history, location }) => {
    const { pathname } = location;
    return (
        <AzureAD provider={authProvider} reduxStore={store}>
            {
                ({ logout }) => {
                    return (
                        <div className='admin-header-tab-container'>
                            <Tab selected={pathname === '/admin/shiftData'} onClick={() => history.push('/admin/shiftData')}>Shift Data</Tab>
                            <Tab selected={pathname === '/admin/volunteerData'} onClick={() => history.push('/admin/volunteerData')}>Volunteer Data</Tab>
                            <Tab selected={pathname === '/admin/locations'} onClick={() => history.push('/admin/locations')}>Locations</Tab>
                            <Tab onClick={logout}>Sign Out</Tab>
                        </div>
                    );
                }
            }
        </AzureAD>
    );
};


export default withRouter(AdminTabNavigation);
