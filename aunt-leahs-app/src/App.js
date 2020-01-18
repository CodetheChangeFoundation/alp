import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import AdminLogin from './pages/adminLogin';


function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} /> 
        {/* Uncomment when other pages are merged
        <Route exact path='/volunteerlogin' component={VolunteerPage}/>
        <Route exact path='/adminlogin' component={AdminLogin}/>
        */}
      </Switch>
    </div>
  );
}

export default App;
