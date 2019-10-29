import React from 'react';
import logo from './logo.svg';
import './App.css';
import Head from './components/header/header.jsx';
import constants from './constants.jsx';

const subText = constants.headerConstants.subText;
function App() {
  return (
    <div className="App">
      <Head page={subText.location}/>
    </div>
  );
}

export default App;
