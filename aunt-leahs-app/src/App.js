import React from 'react';

import './App.css';
import HomePage from './pages/homepage/homepage';
import TextField from './components/textField.jsx';
import './styles.css'

function App() {
  return (
    <div className='testtest'>
        <div className='test'>
          <TextField title='First Name'/>
          <TextField title='Last Name'/>
        </div>
        <TextField title='Email' />
    </div>
  );
}

export default App;
