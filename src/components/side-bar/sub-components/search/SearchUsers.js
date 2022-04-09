import React, { useState } from 'react';
import API from '../../../../API';
import '../../../../css/index.css';
import { getLoggedUser } from '../../../../utils/storage';

export default function SearchUsers({ onSearch, searchingFor, setSearchingFor }) {
  const [showSearch, setShowSearch] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
  }

  async function handleSearch(e) {
    setSearchingFor(e.target.value);
    if(e.target.value.length > 0) {
      onSearch(true);
      setShowSearch(true);
    } else {
      setShowSearch(false);
      onSearch(false);
    }
  }

  function reset() {
    setShowSearch(false);
    onSearch(false);
    setSearchingFor('');
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
