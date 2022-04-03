import React, { useState } from 'react';
import '../../css/index.css';

export default function SideBar() {
  const [channelDisplay, setChannelDisplay] = useState(false);
  const [dMessageDisplay, setDMessageDisplay] = useState(false);

  function toggleChannelList() {
    setChannelDisplay(!channelDisplay);
  }

  function toggleDMessageList() {
    setDMessageDisplay(!dMessageDisplay);
  }

  return (
    <>
      <section className='sidebar-wrapper'>
        <nav className='sidebar-navbar'>

        </nav>
        <div className='sidebar-search'>
          <span className='sidebar-search-icon'>🔍</span>
          <input className='sidebar-search-input' placeholder='Search user or channel' type='text'/>
        </div>
        <div className='sidebar-channel-dmessage-wrapper'>
          <div className='sidebar-channels'>
            <button onClick={toggleChannelList} className='sidebar-channels-trigger'>Channels</button>
            <div className={channelDisplay ? 'sidebar-channels-list show' : 'sidebar-channels-list'}>
             <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
            </div>
          </div>
          <div className='sidebar-direct-messages'>
            <button onClick={toggleDMessageList} className='sidebar-direct-messages-trigger'>Direct Messages</button>
            <div className={dMessageDisplay ? 'sidebar-direct-messages-list show' : 'sidebar-direct-messages-list'}>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
              <div>Consilium</div>
              <div>Ac</div>
              <div>Implerem</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
