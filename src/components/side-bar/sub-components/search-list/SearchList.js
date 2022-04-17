import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import API from '../../../../API';
import { getLoggedUser } from '../../../../utils/storage';

export default function SearchList({ passedSearch, searchingFor, highlightConvo, setHighlightConvo, setConvoSelected, setConvoInfo, setMessages }) {
  const { users, channels } = passedSearch;

  function handleConvoSelect(selected) {
    setHighlightConvo(selected.id);
    setConvoSelected(true);
    setConvoInfo(selected);
  }

  return (
    <>
      <div className='sidebar-search-list-wrapper'>
        <div className='search-list-categories'>Users</div>
        {users.filter(each => each.uid.match(new RegExp(searchingFor, "i")))
        .map(each => {
          return (
              <div 
                key={each.id} 
                onClick={() => handleConvoSelect(each)} 
                className={highlightConvo === each.id ? 'sidebar-search-list highlight' : 'sidebar-search-list'}
              >
                {each.uid}
              </div>
          )
        })}
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
      </div>
    </>
  )
}
