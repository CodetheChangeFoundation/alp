import React from 'react';
import { TabButton } from '../styles';

import { headers } from '../constants';

const AdminHeader = () => {
    return (
        <div>
            <img className="headerImage" alt="Aunt Leah's Logo" src={require('../AuntLeahsTrees.png')} />
            <span className="headerMain">{headers.MAIN_HEADER}</span>
            <TabButton to='/'>Shift Data</TabButton>
            <TabButton to='/'>Volunteer Data</TabButton>
            <TabButton to='/'>Locations</TabButton>
            <TabButton to='/'>Sign Out</TabButton>
        </div>
    );
};

export default AdminHeader;