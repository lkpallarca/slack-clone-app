import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../css/index.css';
import { clearLoggedUser } from '../../../../utils/storage';

export default function NavBar({ }) {
  const [selectedButton, setSelectedButton] = useState('');
  const [showLogoutOptions, setShowLogoutOptions] = useState(false);
  const navigate = useNavigate();

  function handleSelectSettings() {
    console.log('settings');
  }

  function handleSelectMenu() {
    console.log('menu');
  }

  function handleSelectLogout() {
    console.log('logout');
  }

  function reset() {
    setSelectedButton('');
    setShowLogoutOptions(false);
  }

  return (
    <>
      <nav className='sidebar-navbar'>
        <button
          className={selectedButton === 'settings' ? 'highlight' : ''} 
          onBlur={reset}
          onClick={()=> {
            setSelectedButton('settings');
            handleSelectSettings();
        }}>
          <img src='settings-icon.png' alt='simple settings icon'/>
        </button>
        <div>
          <button 
            className={selectedButton === 'menu' ? 'highlight' : ''} 
            onBlur={reset}
            onClick={()=> {
              setSelectedButton('menu');
              handleSelectMenu();
          }}>
            <img src='menu-icon.png' alt='simple menu icon'/>
          </button>
          <ul>

          </ul>
        </div>
        <div>
          <button 
            className={selectedButton === 'logout' ? 'highlight' : ''}
            onBlur={reset} 
            onClick={()=> {
              setSelectedButton('logout');
              setShowLogoutOptions(!showLogoutOptions);
              handleSelectLogout();
          }}>
            <img src='logout-icon.png' alt='simple logout icon'/>
          </button>
          <div className={showLogoutOptions ? 'logout-choices show' : 'logout-choices'}>
            <div>Continue to log out?</div> 
            <div>
              <button onClick={()=> {
                navigate('/');
                clearLoggedUser();
                }}>Yes</button>
              <button>No</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
