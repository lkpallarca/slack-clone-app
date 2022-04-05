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

export default function DirectMessages() {
  const [dMessageDisplay, setDMessageDisplay] = useState(false);
  const [highlightConvoId, setHighlightConvoId] = useState('');

  function handleConvoSelect(selected) {
    setHighlightConvoId(selected);
  }

  function toggleDMessageList() {
    setHighlightConvoId('');
    setDMessageDisplay(!dMessageDisplay);
  }
  
  return (
    <div className='sidebar-direct-messages'>
      <button onClick={toggleDMessageList} className='sidebar-direct-messages-trigger'>Direct Messages</button>
      <div className={dMessageDisplay ? 'sidebar-direct-messages-list show' : 'sidebar-direct-messages-list'}>
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
