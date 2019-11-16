import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage';
import './styles.css'

function App() {

  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} /> 
      </Switch>
    </div>
  );
}

export default App;
