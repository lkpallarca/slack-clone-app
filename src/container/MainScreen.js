import React, { useState, useEffect } from 'react'
import LoginModal from '../components/log-in-modal/LoginModal'
import MainDisplay from '../components/main-display/MainDisplay';
import SideBar from '../components/side-bar/SideBar';
import '../css/index.css';

export default function MainScreen() {
  const [loginModalDisplay, setLoginModalDisplay] = useState('login-modal');

  useEffect(() => {
    console.log(loginModalDisplay);
  }, [loginModalDisplay])
  

  return (
    <section className='main-screen'>
      {loginModalDisplay === 'login-modal' ? null :
        <>
          <SideBar onLogout={setLoginModalDisplay}/>
          <MainDisplay />
        </>
      }
      <LoginModal displayModal={loginModalDisplay} setDisplayModal={setLoginModalDisplay}/>
    </section>
  )
}
