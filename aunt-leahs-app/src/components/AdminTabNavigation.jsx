import React from 'react';
import { withRouter } from 'react-router-dom';

import Tab from './Tab';

const AdminTabNavigation = ({ history, location }) => {
    const { pathname } = location;
    return (
        <div className='admin-header-tab-container'>
            <Tab selected={pathname === '/admin/shiftData'} onClick={() => history.push('/admin/shiftData')}>Shift Data</Tab>
            <Tab selected={pathname === '/admin/volunteerData'} onClick={() => history.push('/admin/volunteerData')}>Volunteer Data</Tab>
            <Tab selected={pathname === '/admin/locations'} onClick={() => history.push('/admin/locations')}>Locations</Tab>
            <Tab>Sign Out</Tab>
        </div>
    );
};


export default withRouter(AdminTabNavigation);
