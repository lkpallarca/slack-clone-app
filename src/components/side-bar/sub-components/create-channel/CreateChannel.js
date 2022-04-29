import React, { useState, useEffect } from 'react';
import { addMembers, createChannel } from '../../../../API';
import Alerts from '../../../alerts/Alerts';
import useCut from '../../../../customHooks/useCut';

export default function CreateChannel({ isAddingMember, selectedChannelMembers, handleDeleteMember, showCreateChannelTrigger, onSearch, setShowSearch, setSearchingFor, setSelectedChannelMembers, convoInfo, channelList, setChannelList }) {
  const [channelName, setChannelName] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [isErr, setIsErr] = useState(true);
  const { userId } = useCut();

  useEffect(() => {
    if(!selectedChannelMembers.length) {
      setChannelName('');
    }
    return
  }, [selectedChannelMembers])

  async function handleCreateModifyChannel() {
    const validMembers = selectedChannelMembers.filter(each => each.id !== userId);
    if(isAddingMember) {
      const postMembers = await addMembers([...validMembers], convoInfo.id);
      if(postMembers) {
        // setMessage(`One of / The selected ${postMembers}`);
        // setIsErr(true);
        // setShowAlert(true);
        handleError(`One of / The selected ${postMembers}`, true);
        // reset();
      } else {
        handleSuccess('User/s successfuly added!', false);
        reset();
      }
      return
    }
    if(channelName.trim().length === 0) {
      handleError('Invalid channel name.', true);
    }
    const create = await createChannel({ 
      "name": JSON.stringify(channelName),
      "user_ids": [...validMembers]
    });
    if(create.errors) {
      handleError(`${create.errors[0]}`, true);
    } else {
      handleSuccess('User/s successfuly added!', false);
    }
    await addMembers([...validMembers], create.data.id);
    setChannelList([...channelList, create.data]);
    reset();
  }

  function handleSuccess(message, boolean) {
    setMessage(message);
    setIsErr(boolean);
    setShowAlert(true);
  }

  function handleError(message, boolean) {
    setMessage(message);
    setIsErr(boolean);
    setShowAlert(true);
  }

  function reset() {
    onSearch(false);
    setShowSearch(false);
    setSearchingFor('');
    setSelectedChannelMembers([]);
    setMessage('');
    setIsErr(true);
  }

  return (
    <>
      <div className='search-list-categories'>Add Members to {isAddingMember ? convoInfo.name : `the Channel`}</div>
      {!isAddingMember && selectedChannelMembers.length !== 0 ?
        <input 
          onChange={e => setChannelName(e.target.value)} 
          className='channel-name-input' 
          type='text' 
          placeholder='Type Channel Name here' 
          value={channelName}
        /> 
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
      {showAlert ? <Alerts message={message} isErr={isErr} reset={reset}/> : null}
    </>
  )
}
