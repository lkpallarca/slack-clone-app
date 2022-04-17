import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function ConvoList({ setConvoSelected, highlightConvo, setHighlightConvo, setConvoInfo, convoInfo, dMessageList }) {
  const [channelDisplay, setChannelDisplay] = useState(false);
  const [dMessageDisplay, setDMessageDisplay] = useState(false);
  const [channelList, setChannelList] = useState([]);
  let directMessagesList = [...dMessageList];

  function handleConvoSelect(selected) {
    setHighlightConvo(selected.id);
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
        {directMessagesList.map(each => {
          return (
            <div 
              key={each.id} 
              className={each.id === highlightConvo ? 'sidebar-channels-list highlight show' : 'sidebar-channels-list show'} 
              onClick={() => handleConvoSelect(each)}
            >
              {each.email}
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}
