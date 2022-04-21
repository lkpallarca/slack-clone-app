import React, { useState, useEffect } from 'react';
import { getLoggedUser } from '../../../../utils/storage';
import API from '../../../../API';

export default function CreateChannel({ setError, setAlert, setIsError, isAddingMember, selectedChannelMembers, handleDeleteMember, showCreateChannelTrigger, onSearch, setShowSearch, setSearchingFor, setSelectedChannelMembers, convoInfo, channelList, setChannelList }) {
  const [channelName, setChannelName] = useState('');

  useEffect(() => {
    if(!selectedChannelMembers.length) {
      setChannelName('');
    }
    return
  }, [selectedChannelMembers])

  async function handleCreateModifyChannel() {
    const validMembers = selectedChannelMembers.filter(each => each.id !== getLoggedUser().data.id);
    if(isAddingMember) {
      addMembers(validMembers, convoInfo.id)
      reset();
      return
    }
    if(channelName.trim().length === 0) {
      setError('Invalid channel name.');
      setAlert(true);
      return
    }
    const create = await API.post('/channels', { 
      "name": JSON.stringify(channelName),
      "user_ids": [...validMembers]
      }, 
      { headers: getLoggedUser().headers }
    );
    if(create.data.errors) {
      setIsError(true);
      setAlert(true);
      setError(create.data.errors);
      return  
    }
    addMembers(validMembers, create.data.data.id);
    setChannelList([...channelList, {owner_id: getLoggedUser().data.id, name: channelName, id: create.data.data.id}]);
    setAlert(true);
    setError(`The Channel "${channelName}" has been created.`);
    setIsError(false);
    reset();
  }

  async function addMembers(memberArr, channelId) {
    await Promise.all(memberArr.map(async (each) => {
      const postMember = await API.post('/channel/add_member', 
      {'id': channelId, 'member_id': each.id}, 
      {headers: getLoggedUser().headers});
      if(postMember.data.errors) {
        setIsError(true);
        setError(`One of/The selected ${postMember.data.errors[0]}`);
        setAlert(true);
      }
    }))
  }

  function reset() {
    onSearch(false);
    setShowSearch(false);
    setSearchingFor('');
    setSelectedChannelMembers([]);
  }

  return (
    <>
      <div className='search-list-categories'>Add Members to {isAddingMember ? convoInfo.name : `the Channel`}</div>
      {!isAddingMember && selectedChannelMembers.length !== 0 ?
        <input onChange={e => setChannelName(e.target.value)} className='channel-name-input' type='text' placeholder='Type Channel Name here' value={channelName}/> 
        : null
      }
      {selectedChannelMembers.length > 0 ? null : <div className='dummy'></div>}
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
        onClick={() => handleCreateModifyChannel()}
      >
        {isAddingMember ? 'Add member' : 'Create channel'}
      </div>
    </>
  )
}
