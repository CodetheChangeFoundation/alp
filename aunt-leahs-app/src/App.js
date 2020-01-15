import React from 'react';

import './App.css';
import HomePage from './pages/homepage';
import './styles.css'


function App() {
  const onChange = () => {
    return "world";
  }
  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;
