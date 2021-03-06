import React from 'react';
import AdminTabNavigation from './AdminTabNavigation';

import { headers } from '../constants';

const AdminHeader = () => {
    return (
        <div className='admin-header'>
            <div className='admin-header-logo-text'>
                <img className="admin-header-logo" alt="Aunt Leah's Logo" src={require('../AuntLeahsTrees.png')} />
                <div className="admin-header-text">{headers.MAIN_HEADER}</div>
            </div>
            <AdminTabNavigation />
        </div>
    );
};

export default AdminHeader;
