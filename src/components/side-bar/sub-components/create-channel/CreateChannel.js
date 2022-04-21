import React, { useState, useEffect } from 'react';
import API from '../../../../API';
import { addToChannelHistoryList, addToChannelHistoryListAsCreator, getChannelHistoryList, getLoggedUser, setLoggedUser } from '../../../../utils/storage';

export default function CreateChannel({ isAddingMember, selectedChannelMembers, handleDeleteMember, showCreateChannelTrigger, onSearch, setShowSearch, setSearchingFor, setSelectedChannelMembers, convoInfo, channelList, setChannelList }) {
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
    console.log('this should not appear when adding member');
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

    // addToChannelHistoryListAsCreator(getLoggedUser().data.id, channelName, create.data.data.id);
    // validMembers.forEach(each => {
    //   const ifAlreadyLogged = getChannelHistoryList(each.id);
    //   if(ifAlreadyLogged) {
    //     addToChannelHistoryList(getLoggedUser().data.id, each.id, channelName, create.data.data.id);
    //   } else {
    //     localStorage.setItem(`${each.id}d`, JSON.stringify([]));
    //     localStorage.setItem(`${each.id}c`, JSON.stringify([{owner_id: getLoggedUser().data.id, name: channelName, id: create.data.data.id}]));
    //   }
    // });
    // console.log(create);
    addMembers(validMembers, create.data.data.id);
    setChannelList([...channelList, {owner_id: getLoggedUser().data.id, name: channelName, id: create.data.data.id}]);
    alert('Channel created');
    reset();
  }

  async function addMembers(memberArr, channelId) {
    await Promise.all(memberArr.map(async (each) => {
      await API.post('/channel/add_member', 
      {'id': channelId, 'member_id': each.id}, 
      {headers: getLoggedUser().headers});
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
      <div className='search-list-categories'>Add Members to the {isAddingMember ? 'existing' : 'new'} Channel</div>
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
