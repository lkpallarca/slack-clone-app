import React, { useState } from 'react'

export default function MainNavBar({ setConvoListHighlight, setConvoSelected, convoInfo }) {
  const [selectedButton, setSelectedButton] = useState('');
  const [showMenuOptions, setShowMenuOptions] = useState(false);

  function reset() {
    setSelectedButton('');
    setShowMenuOptions(false);
  }

  return (
    <nav className='mainbar-navbar'>
      <div>
        {convoInfo.id}
      </div>
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
          {convoInfo.owner_id ? <li>Add member to Channel</li> : null}
          <li>Chat Info</li>
          <li onClick={()=> {
            setConvoListHighlight(false);
            setConvoSelected(false);
          }}>
            Close Chat
          </li>
        </ul>
      </div>
    </nav>
  )
}
