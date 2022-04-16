import React, { useState } from 'react';

export default function ConvoList({ setConvoSelected, highlightConvo, setHighlightConvo, setConvoInfo, convoInfo }) {
  const [channelDisplay, setChannelDisplay] = useState(false);
  const [dMessageDisplay, setDMessageDisplay] = useState(false);
  const [channelList, setChannelList] = useState([]);
  const [dMessageList, setDMessageList] = useState([]);

  function handleConvoSelect(selected) {
    setHighlightConvo(selected);
    setConvoSelected(true);
    setConvoInfo(selected);
  }

  function toggleChannelList() {
    setChannelDisplay(!channelDisplay);
  }

  function toggleDMessageList() {
    setDMessageDisplay(!dMessageDisplay);
  }

  return (
    <>
      <div className='sidebar-channels'>
        <button onClick={toggleChannelList} className='sidebar-channels-trigger'>Channels</button>
        <div className={channelDisplay ? 'sidebar-channels-list show' : 'sidebar-channels-list'}>
          {/* {TEST_CONVOS.map(({ pos, value }) => {
            return (
              <div 
                key={pos} 
                className={pos === highlightConvo ? 'sidebar-channels-list highlight show' : 'sidebar-channels-list show'} 
                onClick={() => handleConvoSelect(pos)}
              >
                {value}
              </div>
            )
          })} */}
        </div>
      </div>
      
      <div className='sidebar-direct-messages'>
      <button onClick={toggleDMessageList} className='sidebar-direct-messages-trigger'>Direct Messages</button>
      <div className={dMessageDisplay ? 'sidebar-direct-messages-list show' : 'sidebar-direct-messages-list'}>
        {/* {TEST_CONVOS_2.map(({ pos, value }) => {
          return (
            <div 
              key={pos} 
              className={pos === highlightConvo ? 'sidebar-channels-list highlight show' : 'sidebar-channels-list show'} 
              onClick={() => handleConvoSelect(pos)}
            >
              {value}
            </div>
          )
        })} */}
      </div>
    </div>
    </>
  )
}
