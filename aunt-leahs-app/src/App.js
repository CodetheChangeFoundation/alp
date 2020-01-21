import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage';
import AdminLogin from './pages/adminLogin';
import VolunteerPage from './pages/volunteerPage';

import TabComponent from './components/TabComponent';
import CustomButton from './components/customButton';

import TabHeader from  './components/AdminHeader';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/admin' component={AdminLogin} />
      </Switch>
    </div>
  );
}

export default App;
