import React from 'react';
import { withRouter } from 'react-router-dom';
import TabsNav from '../components/TabsNav';

import { headers } from '../constants';

const AdminHeader = ({ history }) => {
    return (
        <div className='admin-header'>
            <div className='admin-header-logo-text'>
                <img className="admin-header-logo" alt="Aunt Leah's Logo" src={require('../AuntLeahsTrees.png')} />
                <div className="admin-header-text">{headers.MAIN_HEADER}</div>
            </div>
            <TabsNav />
        </div>
    );
};

export default withRouter(AdminHeader);