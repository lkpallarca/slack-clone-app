import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function ConvoList({ setIsCreatingChannel, setIsAddingMember, setIsSearching, setConvoSelected, highlightConvo, setHighlightConvo, setConvoInfo, convoInfo, dMessageList, channelList }) {
  const [channelDisplay, setChannelDisplay] = useState(false);
  const [dMessageDisplay, setDMessageDisplay] = useState(false);
  const image = `https://avatars.dicebear.com/api/human/`;

  let sampleChannels = [
    {id: 1, name: 'one'},
    {id: 2, name: 'two'},
    {id: 3, name: 'three'},
    {id: 4, name: 'four'}
    // ...channelList
  ]

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
          {channelList.map(each => {
            const modifiedName = each.name.replace(/"/g, '');
            return (
              <div 
                key={each.id} 
                className={each.id === highlightConvo ? 'sidebar-channels-list highlight show' : 'sidebar-channels-list show'} 
                onClick={() => handleConvoSelect(each)}
              >
                <img src={`${image}${each.id}.svg`}/>
                <p>{modifiedName}</p> 
                {each.id === highlightConvo ? <button onClick={() => {
                  setIsSearching(true);
                  setIsAddingMember(true);
                  setIsCreatingChannel(true);
                }}>+</button> : null}
              </div>
            )
          })}
        </div>
      </div>
      
      <div className='sidebar-direct-messages'>
      <button onClick={toggleDMessageList} className='sidebar-direct-messages-trigger'>Direct Messages</button>
      <div className={dMessageDisplay ? 'sidebar-direct-messages-list show' : 'sidebar-direct-messages-list'}>
        {dMessageList.map(each => {
          return (
            <div 
              key={each.id} 
              className={each.id === highlightConvo ? 'sidebar-channels-list highlight show' : 'sidebar-channels-list show'} 
              onClick={() => handleConvoSelect(each)}
            >
              <img src={`${image}${each.id}.svg`}/>
              <p>{each.email}</p>
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}
