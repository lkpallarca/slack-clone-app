import React, { useState } from 'react'

export default function MainNavBar({ setConvoListHighlight, setConvoSelected, convoInfo }) {
  const [selectedButton, setSelectedButton] = useState('');
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const image = 'https://avatars.dicebear.com/api/human/';

  function reset() {
    setSelectedButton('');
    setShowMenuOptions(false);
  }

  return (
    <nav className='mainbar-navbar'>
      <div>
        <img src={`${image}${convoInfo.id}.svg`} className='chat-image'/>
        {convoInfo.owner_id ? convoInfo.name.replace(/"/g, '') : convoInfo.email}
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
