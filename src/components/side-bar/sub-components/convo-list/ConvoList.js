import React, { useState } from 'react';
import useCut from '../../../../customHooks/useCut';

export default function ConvoList({ setIsCreatingChannel, setIsAddingMember, setIsSearching, setConvoSelected, highlightConvo, setHighlightConvo, setConvoInfo, convoInfo, dMessageList, channelList }) {
  const [channelDisplay, setChannelDisplay] = useState(false);
  const [dMessageDisplay, setDMessageDisplay] = useState(false);
  const { image, profile } = useCut();

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
                <img src={`${profile}${each.id}.svg`}/>
                <p className='c-name'>{modifiedName}</p> 
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
              <p className='dm-name'>{each.email}</p>
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}
