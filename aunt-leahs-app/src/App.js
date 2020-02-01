import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core';

import './App.css';

import AdminHomePage from './pages/AdminHomePage';
import AdminShiftDataPage from './pages/AdminShiftDataPage';
import AdminVolunteerDataPage from './pages/AdminVolunteerDataPage';
import AdminLocationsPage from './pages/AdminLocationsPage';

import VolunteerFormControl from './components/VolunteerFormControl';

function App() {
  return (
    <StylesProvider injectFirst>
      <div>
        <Switch>
          <Route exact path='/' component={VolunteerFormControl} />
          <Route exact path='/admin' component={AdminHomePage} />
          <Route exact path='/admin/shiftData' component={AdminShiftDataPage} />
          <Route exact path='/admin/volunteerData' component={AdminVolunteerDataPage} />
          <Route exact path='/admin/locations' component={AdminLocationsPage} />
        </Switch>
      </div>
    </StylesProvider>
  );
}

export default App;
