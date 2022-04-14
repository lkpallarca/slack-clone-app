import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function SearchList({ passedSearch, searchingFor, highlightConvo, setHighlightConvo, setConvoSelected, setConvoInfo }) {

  function handleConvoSelect(selected) {
    setHighlightConvo(selected.id);
    setConvoSelected(true);
    setConvoInfo(selected);
  }

  return (
    <>
      <div className='sidebar-search-list-wrapper'>
        {passedSearch.filter(each => each.uid.match(new RegExp(searchingFor, "i")))
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
      </div>
    </>
  )
}
