import React from 'react';
import './App.css';
import AdminLogin from './pages/adminLogin';

import TabComponent from './components/TabComponent';
import CustomButton from './components/customButton';

import TabHeader from  './components/AdminHeader';

function App() {
  return (
    <div className='testtest'>
        <TabHeader/>
        <AdminLogin />
    </div>
  );
}

export default App;
