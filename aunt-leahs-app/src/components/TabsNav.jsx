import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Tab from './Tab';

class TabsNav extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    
    }

    render() {
        const { history, location } = this.props;
        const { pathname } = location;
        return (
            <div className='admin-header-tab-container'>
                <Tab selected={pathname === '/admin/shiftData'} onClick={() => history.push('/admin/shiftData')}>Shift Data</Tab>
                <Tab selected={pathname === '/admin/volunteerData'} onClick={() => history.push('/admin/volunteerData')}>Volunteer Data</Tab>
                <Tab selected={pathname === '/admin/locations'} onClick={() => history.push('/admin/locations')}>Locations</Tab>
                <Tab>Sign Out</Tab>
            </div>
        )
    }
}

export default withRouter(TabsNav);