import React, { useState } from 'react'

export default function MainNavBar({ setConvoListHighlight, setConvoSelected }) {
  const [selectedButton, setSelectedButton] = useState('');
  const [showMenuOptions, setShowMenuOptions] = useState(false);

  function reset() {
    setSelectedButton('');
    setShowMenuOptions(false);
  }

  return (
    <nav className='mainbar-navbar'>
      <div>
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
          <li>Contact Info</li>
          <li onClick={()=> {
            setConvoListHighlight(false);
            setConvoSelected(false);
          }}>
            Close Chat
          </li>
          <li>Delete Chat</li>
        </ul>
      </div>
    </nav>
  )
}
