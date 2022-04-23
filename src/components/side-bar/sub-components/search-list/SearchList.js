import React, { useState, useEffect } from 'react';
import Alerts from '../../../alerts/Alerts';
import CreateChannel from '../create-channel/CreateChannel';

export default function SearchList({ passedSearch, searchingFor, highlightConvo, setHighlightConvo, setConvoSelected, setConvoInfo, convoInfo, isCreatingChannel, onSearch, selectedChannelMembers, setSelectedChannelMembers, setShowSearch, setSearchingFor, channelList, setChannelList, isAddingMember }) {
  const { users, channels } = passedSearch;
  const [showAlert, setShowAlert] = useState(false);
  const [showCreateChannelTrigger, setShowCreateChannelTrigger] = useState(false);

  useEffect(() => {
    if(isAddingMember && selectedChannelMembers.length > 0) {
      setShowCreateChannelTrigger(true);
      return
    }
    if(selectedChannelMembers.length >= 2 && isAddingMember === false) {
      setShowCreateChannelTrigger(true);
      return
    } else {
      setShowCreateChannelTrigger(false);
    }
    if(showCreateChannelTrigger) return;
  }, [selectedChannelMembers])

  function handleDeleteMember(selected) {
    const updatedMembers = selectedChannelMembers.filter(each => each.id !== selected.id);
    setSelectedChannelMembers([...updatedMembers]);
  }

  function handleAddMemberToChannel(selected) {
    let newMember = {id: selected.id, name: selected.uid}
    const alreadySelected =  selectedChannelMembers.find(each => each.id === selected.id);
    if(alreadySelected) {
      setShowAlert(true);
      return
    }
    setSelectedChannelMembers([...selectedChannelMembers, newMember]);
  }

  function handleConvoSelect(selected) {
    setHighlightConvo(selected.id);
    setConvoSelected(true);
    setConvoInfo(selected);
  }

  return (
    <>
      <div className='sidebar-search-list-wrapper'>
        {isCreatingChannel ? 
          <CreateChannel 
            selectedChannelMembers={selectedChannelMembers} 
            handleDeleteMember={handleDeleteMember} 
            showCreateChannelTrigger={showCreateChannelTrigger}
            onSearch={onSearch}
            setShowSearch={setShowSearch}
            setSearchingFor={setSearchingFor} 
            setSelectedChannelMembers={setSelectedChannelMembers}
            convoInfo={convoInfo}
            channelList={channelList}
            setChannelList={setChannelList}
            isAddingMember={isAddingMember}
          /> : null
        }
        <div className='search-list-categories'>Users</div>
        {users.filter(each => each.uid.match(new RegExp(searchingFor, "i")))
        .map(each => {
          return (
              <div 
                key={each.id} 
                onClick={() => {
                  if(isCreatingChannel) {
                    handleAddMemberToChannel(each);
                    return
                  }
                  handleConvoSelect(each);
                }} 
                className={highlightConvo === each.id ? 'sidebar-search-list highlight' : 'sidebar-search-list'}
              >
                {each.uid}
              </div>
          )
        })}
        {isCreatingChannel ? null :
          <>
            <div className='search-list-categories'>Channels</div>
            {channels.filter(each => each.name.match(new RegExp(searchingFor, "i")))
            .map(each => {
              return (
                <div 
                  key={each.id} 
                  onClick={() => handleConvoSelect(each)} 
                  className={highlightConvo === each.id ? 'sidebar-search-list highlight' : 'sidebar-search-list'}
                >
                  {each.name}
                </div>
              )
            })}
          </>
        }
      </div>
      {showAlert ? <Alerts message='User is already added' isErr={true}/> : null}
    </>
  )
}
