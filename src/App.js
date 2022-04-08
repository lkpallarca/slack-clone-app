import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainScreen from './container/MainScreen';
import LoginModal from './components/log-in-modal/LoginModal';
import './css/index.css';

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={ <LoginModal setShow={setShow}/> }/>
        <Route path='/chat' element={ <MainScreen show={show}/> }/>
      </Routes>
    </div>
  );
}

export default App;
