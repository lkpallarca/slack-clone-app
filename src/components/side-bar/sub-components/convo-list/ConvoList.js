import React, { useState } from 'react';


let TEST_CONVOS = [
  { pos: 'one', value: 'first' },
  { pos: 'two', value: 'second' },
  { pos: 'three', value: 'third' },
  { pos: 'four', value: 'second' },
  { pos: 'five', value: 'second' },
  { pos: 'six', value: 'second' },
  { pos: 'threes', value: 'third' }
]

let TEST_CONVOS_2 = [
  { pos: 'on', value: 'firs' },
  { pos: 'tw', value: 'secon' },
  { pos: 'thre', value: 'thid' },
  { pos: 'fou', value: 'secod' },
  { pos: 'fiv', value: 'secod' },
  { pos: 'si', value: 'seond' },
  { pos: 'thres', value: 'hird' }
]

export default function ConvoList({ setConvoSelected, highlightConvo, setHighlightConvo }) {
  const [channelDisplay, setChannelDisplay] = useState(false);
  const [dMessageDisplay, setDMessageDisplay] = useState(false);

  function handleConvoSelect(selected) {
    setHighlightConvo(selected);
    setConvoSelected(true);
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
          {TEST_CONVOS.map(({ pos, value }) => {
            return (
              <div 
                key={pos} 
                className={pos === highlightConvo ? 'sidebar-channels-list highlight show' : 'sidebar-channels-list show'} 
                onClick={() => handleConvoSelect(pos)}
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
        {TEST_CONVOS_2.map(({ pos, value }) => {
          return (
            <div 
              key={pos} 
              className={pos === highlightConvo ? 'sidebar-channels-list highlight show' : 'sidebar-channels-list show'} 
              onClick={() => handleConvoSelect(pos)}
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
