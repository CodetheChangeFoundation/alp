import React from 'react';
//import logo from './logo.svg';
import './App.css';
import SelectBox from './components/select-box/select-box.jsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div style={{margin: 'auto', width: '200px'}}>
        <SelectBox
          width = {200}
          items = {[
            {value: 'value 1', id: '1'},
            {value: 'value 2', id: '2'},
            {value: 'value 3', id: '3'},
            {value: 'value 4', id: '4'},
            {value: 'value 5', id: '5'}
          ]}
          />
      </div>
      </header>
    </div>
  );
}
export default App;
