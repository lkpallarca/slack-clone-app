import React, { useState, useEffect } from 'react';
import API from '../../../../API';
import { addToChannelHistoryList, getChannelHistoryList, getLoggedUser, setLoggedUser } from '../../../../utils/storage';

export default function CreateChannel({ selectedChannelMembers, handleDeleteMember, showCreateChannelTrigger, onSearch, setShowSearch, setSearchingFor, setSelectedChannelMembers, setConvoInfo }) {
  const [channelName, setChannelName] = useState('');

  useEffect(() => {
    if(!selectedChannelMembers.length) {
      setChannelName('');
    }
    return
  }, [selectedChannelMembers])

  async function handleCreateChannel() {
    const validMembers = selectedChannelMembers.filter(each => each.id !== getLoggedUser().data.id);
    if(channelName.trim().length === 0) {
      alert('Invalid channel name');
      return
    }
    const create = await API.post('/channels', { 
      "name": JSON.stringify(channelName),
      "user_ids": [...validMembers]
      }, 
      { headers: getLoggedUser().headers }
    );
    addToChannelHistoryList(getLoggedUser().data.id, create.data.data.id);
    validMembers.forEach(each => {
      const ifAlreadyLogged = getChannelHistoryList(each.id);
      if(ifAlreadyLogged) {
        addToChannelHistoryList(each.id, create.data.data.id);
      } else {
        localStorage.setItem(`${each.id}d`, JSON.stringify([]));
        localStorage.setItem(`${each.id}c`, JSON.stringify([create.data.data.id]));
      }
    });
    setConvoInfo(create.data.data);
    alert('Channel created')
    onSearch(false);
    setShowSearch(false);
    setSearchingFor('');
    setSelectedChannelMembers([]);
  }

  return (
    <>
      <div className='search-list-categories'>Add Members to the Channel</div>
      {selectedChannelMembers.length > 0 ? <input onChange={e => setChannelName(e.target.value)} className='channel-name-input' type='text' placeholder='Type Channel Name here' value={channelName}/> : <div className='dummy'></div>}
      {selectedChannelMembers.map(each => {
        return (
          <div
            key={each.id}
            className='added-members-list'
          >
            {each.name}
            <button onClick={() => handleDeleteMember(each)}>X</button>
          </div>
        )
      })}
      <div 
        className={showCreateChannelTrigger ? 'create-channel-trigger show height' : 'create-channel-trigger'}
        onClick={() => handleCreateChannel()}
      >
        Create Channel
      </div>
    </>
  )
}
