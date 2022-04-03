import React, { useState } from 'react'
import LoginModal from '../components/LoginModal/LoginModal'
import MainDisplay from '../components/MainDisplay/MainDisplay';
import SideBar from '../components/SideBar/SideBar';
import '../css/index.css';

export default function MainScreen() {
  const [loginModalDisplay, setLoginModalDisplay] = useState('login-modal');

  return (
    <section className='main-screen'>
      <SideBar />
      <MainDisplay />
      <LoginModal displayModal={loginModalDisplay} setDisplayModal={setLoginModalDisplay}/>
    </section>
  )
}
