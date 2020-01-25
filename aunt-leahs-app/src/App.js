import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage';
import AdminLogin from './pages/adminLogin';
import ShiftDataPage from './pages/ShiftDataPage';
import VolunteerDataPage from './pages/VolunteerDataPage';
import LocationsPage from './pages/LocationsPage';
import VolunteerPage from './pages/volunteerPage';
import NewVolunteer from './pages/newVolunteer';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/admin' component={AdminLogin} />
        <Route exact path='/admin/shiftData' component={ShiftDataPage} />
        <Route exact path='/admin/volunteerData' component={VolunteerDataPage} />
        <Route exact path='/admin/locations' component={LocationsPage} />
        <Route exact path='/newVolunteer' component={NewVolunteer} />
        <Route exact path='/volunteerLogin' component={VolunteerPage} />
      </Switch>
    </div>
  );
}

export default App;
