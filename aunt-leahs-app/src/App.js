import React from 'react';

import './App.css';
import HomePage from './pages/homepage/homepage';
import TextInput from './components/textField/textField.jsx';
import './styles.css'

const handleChange = (e) =>{
  console.log('handleChange Called')
  console.log(e.target.value)
};

function App() {


  return (
    <div className='testtest'>
        <div className='test'>
          <TextInput title='First Name' size='Short'/>
          <TextInput title='Last Name' size='Short'/>
        </div>
        <TextInput title='Username' size='Long' onChange={handleChange}/>
        
    </div>
  );
}

export default App;
