import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function SearchList({ passedSearch, searchingFor }) {
  const [highlightConvoId, setHighlightConvoId] = useState('');

  function handleConvoSelect(selected) {
    setHighlightConvoId(selected);
  }

  return (
    <>
      <div className='sidebar-search-list-wrapper'>
        {passedSearch.filter(each => each.uid.match(new RegExp(searchingFor, "i")))
        .map(each => {
          return (
              <div 
                key={each.id} 
                onClick={() => handleConvoSelect(each.id)} 
                className={highlightConvoId === each.id ? 'sidebar-search-list highlight' : 'sidebar-search-list'}
              >
                {each.uid}
              </div>
          )
        })}
      </div>
    </>
  )
}
