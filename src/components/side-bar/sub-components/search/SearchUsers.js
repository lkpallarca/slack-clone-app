import React, { useEffect } from 'react';

export default function SearchUsers({ onSearch, searchingFor, setSearchingFor, setIsCreatingChannel, selectedChannelMembers, setSelectedChannelMembers, showSearch, setShowSearch }) {
  useEffect(() => {
    if(showSearch) {
      return
    }
    if(selectedChannelMembers.length) {
      setShowSearch(true);
    }
  }, [selectedChannelMembers])

  function handleSubmit(e) {
    e.preventDefault();
  }
  function handleSearch(e) {
    setSearchingFor(e.target.value);
    if(!selectedChannelMembers.length && !e.target.value.length) {
      console.log('nothing')
      setShowSearch(false);
      onSearch(false);
      setIsCreatingChannel(false);
      setSearchingFor('');
      return
    }
    if(e.target.value.length > 0) {
      onSearch(true);
      setShowSearch(true);
    }
  }

  function reset() {
    setShowSearch(false);
    onSearch(false);
    setIsCreatingChannel(false);
    setSearchingFor('');
    setSelectedChannelMembers([]);
  }

  return (
    <>
      <form onSubmit={handleSubmit} onReset={reset} className='sidebar-search'>
        <span className='sidebar-search-icon'>{showSearch ? <button type='reset'><img src='back-icon.png' alt='simple left arrow'/></button> : '🔍'}</span>
        <input onChange={handleSearch} className='sidebar-search-input' value={searchingFor} placeholder='Search user email or channel' type='text'/>
      </form>
    </>
  )
}
