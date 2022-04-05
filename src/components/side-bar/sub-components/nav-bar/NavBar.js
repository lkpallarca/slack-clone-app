import React, { useState } from 'react';
import '../../../../css/index.css';

export default function NavBar() {
  const [settings, setHighlightSettings] = useState(false);
  const [menu, setHighlightMenu] = useState(false);
  const [logout, setHighlightLogout] = useState(false);

  function handleSettingsSelect() {
    // console.log('settings');
  }

  function handleMenuSelect() {
    console.log('menu');
  }

  function handleLogoutSelect() {
    console.log('logout');
  }

  function reset() {
    setHighlightSettings(false);
    setHighlightMenu(false);
    setHighlightLogout(false);
  }

  return (
    <nav className='sidebar-navbar'>
      <button 
        className={settings ? 'highlight' : ''} 
        onBlur={reset}
        onClick={()=> {
          setHighlightSettings(!settings);
          handleSettingsSelect();
      }}>
        <img src='settings-icon.png' alt='simple settings icon'/>
      </button>
      <button 
        className={menu ? 'highlight' : ''} 
        onBlur={reset}
        onClick={()=> {
          setHighlightMenu(!menu);
          handleSettingsSelect();
      }}>
        <img src='menu-icon.png' alt='simple menu icon'/>
      </button>
      <button 
        className={logout ? 'highlight' : ''} 
        onBlur={reset}
        onClick={()=> {
          setHighlightLogout(!logout);
          handleSettingsSelect();
      }}>
        <img src='logout-icon.png' alt='simple logout icon'/>
      </button>
    </nav>
  )
}
