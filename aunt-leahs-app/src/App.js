import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage';
import AdminLogin from './pages/adminLogin';
import VolunteerPage from './pages/volunteerPage';


function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/adminlogin' component={AdminLogin} />
        <Route exact path='/volunteerlogin' component={VolunteerPage}/>
      </Switch>
    </div>
  );
}

export default App;
