import React, { useState } from 'react';
import '../../../../css/index.css';


let TEST_CONVOS = [
  { pos: 'one', value: 'first' },
  { pos: 'two', value: 'second' },
  { pos: 'three', value: 'third' },
  { pos: 'four', value: 'second' },
  { pos: 'five', value: 'second' },
  { pos: 'six', value: 'second' },
  { pos: 'threes', value: 'third' }
]

export default function ConvoList() {
  const [channelDisplay, setChannelDisplay] = useState(false);
  const [dMessageDisplay, setDMessageDisplay] = useState(false);
  const [highlightChannelConvoId, setHighlightChannelConvoId] = useState('');
  const [highlightDMessageConvoId, setHighlightDMessageConvoId] = useState('');

  function handleChannelConvoSelect(selected) {
    setHighlightChannelConvoId(selected);
  }

  function handleDMessageConvoSelect(selected) {
    setHighlightDMessageConvoId(selected);
  }

  function toggleChannelList() {
    setHighlightChannelConvoId('');
    setChannelDisplay(!channelDisplay);
  }

  function toggleDMessageList() {
    setHighlightDMessageConvoId('');
    setDMessageDisplay(!dMessageDisplay);
  }

  return (
    <>
      <div className='sidebar-channels'>
        <button onClick={toggleChannelList} className='sidebar-channels-trigger'>Channels</button>
        <div className={channelDisplay ? 'sidebar-channels-list show' : 'sidebar-channels-list'}>
          {TEST_CONVOS.map(({ pos, value }) => {
            return (
              <div 
                key={pos} 
                className={pos === highlightChannelConvoId ? 'sidebar-channels-list highlight show' : 'sidebar-channels-list show'} 
                onClick={() => handleChannelConvoSelect(pos)}
              >
                {value}
              </div>
            )
          })}
        </div>
      </div>
      
      <div className='sidebar-direct-messages'>
      <button onClick={toggleDMessageList} className='sidebar-direct-messages-trigger'>Direct Messages</button>
      <div className={dMessageDisplay ? 'sidebar-direct-messages-list show' : 'sidebar-direct-messages-list'}>
        {TEST_CONVOS.map(({ pos, value }) => {
          return (
            <div 
              key={pos} 
              className={pos === highlightDMessageConvoId ? 'sidebar-channels-list highlight show' : 'sidebar-channels-list show'} 
              onClick={() => handleDMessageConvoSelect(pos)}
            >
              {value}
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}
