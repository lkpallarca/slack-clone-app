import React, { useState, useEffect } from 'react';
import '../../../../css/index.css';

let TEST_CONVOS = [
  { pos: 'one', value: 'first' },
  { pos: 'two', value: 'second' },
  { pos: 'three', value: 'third' }
]

export default function Channels() {
  const [channelDisplay, setChannelDisplay] = useState(false);
  const [highlightConvoId, setHighlightConvoId] = useState('');

  function handleConvoSelect(selected) {
    setHighlightConvoId(selected);
  }

  function toggleChannelList() {
    setHighlightConvoId('');
    setChannelDisplay(!channelDisplay);
  }

  return (
    <div className='sidebar-channels'>
      <button onClick={toggleChannelList} className='sidebar-channels-trigger'>Channels</button>
      <div className={channelDisplay ? 'sidebar-channels-list show' : 'sidebar-channels-list'}>
        {TEST_CONVOS.map(({ pos, value }) => {
          return (
            <div key={pos} className={pos === highlightConvoId ? 'sidebar-channels-list highlight show' : 'sidebar-channels-list show'} onClick={() => handleConvoSelect(pos)}>
              {value}
            </div>
          )
        })}
      </div>
    </div>
  )
}
