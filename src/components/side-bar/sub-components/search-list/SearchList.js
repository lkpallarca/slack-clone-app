import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function SearchList({ passedSearch, searchingFor }) {
  return (
    <>
      <div className='sidebar-search-list-wrapper'>
        {passedSearch.filter(each => each.data.match(new RegExp(searchingFor, "i")))
        .map(each => {
          return (
              <div key={uuidv4()} className='sidebar-search-list'>
                {each.data}
              </div>
          )
        })}
      </div>
    </>
  )
}
