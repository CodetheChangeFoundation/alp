import React from 'react';
import Head from '../components/header.jsx';
import '../styles.css';
import { LocationList } from '../components/adminLocationList/locationList';
import TabComponent from '../components/tab';

const AdminLocationsPage = () => (
    <div className="homepage">
        <div style={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
            <Head />
            <TabComponent tabs={[
                { title: 'Shift Data', content: ''},
                { title: 'Volunteer Data',content: ''},
                { title: 'Locations', content: ''},
                { title: 'Sign Out', content: ''}
            ]} />
        </div>
        
        <div>
            <LocationList />
        </div>
        
    </div>
);

export default AdminLocationsPage;
