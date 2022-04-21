import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearLoggedUser, getLoggedUser } from '../../../../utils/storage';

export default function NavBar({ setIsCreatingChannel, onSearch }) {
  const [selectedButton, setSelectedButton] = useState('');
  const [showLogoutOptions, setShowLogoutOptions] = useState(false);
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const image = `https://avatars.dicebear.com/api/male/`;
  const navigate = useNavigate();

  function reset() {
    setSelectedButton('');
    setShowMenuOptions(false);
    setShowLogoutOptions(false);
  }

  return (
    <>
      <nav className='sidebar-navbar'>
        <div className='user-profile'>
          <img src={`${image}${getLoggedUser().data.id}.svg`}/>
          <p>{getLoggedUser().data.email}</p>
        </div>
        <div className='sidebar-navbar-options'>
          <div className='sidebar-navbar-options-menu'>
            <button 
              className={selectedButton === 'menu' ? 'highlight' : ''} 
              onBlur={reset}
              onClick={()=> {
                setSelectedButton('menu');
                setShowMenuOptions(!showMenuOptions);
            }}>
              <img src='menu-icon.png' alt='simple menu icon'/>
            </button>
            <ul className={showMenuOptions ? 'show' : null}>
              <li onClick={() => {
                onSearch(true);
                setIsCreatingChannel(true);
              }}>New Channel</li>
              <li>Archived</li>
              <li>Settings</li>
            </ul>
          </div>
          <div className='sidebar-navbar-options-logout'>
            <button 
              className={selectedButton === 'logout' ? 'highlight' : ''}
              onBlur={reset} 
              onClick={()=> {
                setSelectedButton('logout');
                setShowLogoutOptions(!showLogoutOptions);
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
        </div>
      </nav>
    </>
  )
}
