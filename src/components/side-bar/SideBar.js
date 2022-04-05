import React from 'react';
import '../../css/index.css';
import Channels from './sub-components/channels/Channels';
import DirectMessages from './sub-components/direct-messages/DirectMessages';
import NavBar from './sub-components/nav-bar/NavBar';

export default function SideBar({ onLogOut }) {
  return (
    <>
      <section className='sidebar-wrapper'>
        <NavBar onLogOut={onLogOut}/>
        <div className='sidebar-search'>
          <span className='sidebar-search-icon'>🔍</span>
          <input className='sidebar-search-input' placeholder='Search user or channel' type='text'/>
        </div>
        <div className='sidebar-channel-dmessage-wrapper'>
          <Channels />
          <DirectMessages />
        </div>
      </section>
    </>
  )
}
