import React, { useState, useEffect } from 'react';
import API from '../../API';
import '../../css/index.css';
import { getLoggedUser } from '../../utils/storage';
import ConvoList from './sub-components/convo-list/ConvoList';
import SideNavBar from './sub-components/nav-bar/SideNavBar';
import SearchList from './sub-components/search-list/SearchList';
import SearchUsers from './sub-components/search/SearchUsers';

export default function SideBar({ searchData, setConvoSelected, highlightConvo, setHighlightConvo, setConvoInfo, convoInfo, setMessages, dMessageList }) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchingFor, setSearchingFor] = useState('');

  return (
    <>
      <section className='sidebar-wrapper'>
        <SideNavBar />
        <SearchUsers searchingFor={searchingFor} setSearchingFor={setSearchingFor} onSearch={setIsSearching}/>
        {isSearching ? <SearchList setConvoInfo={setConvoInfo} setConvoSelected={setConvoSelected} searchingFor={searchingFor} passedSearch={searchData} highlightConvo={highlightConvo} setHighlightConvo={setHighlightConvo} setMessages={setMessages}/> :
          <div className='sidebar-channel-dmessage-wrapper'>
            <ConvoList dMessageList={dMessageList} convoInfo={convoInfo} setConvoInfo={setConvoInfo} setConvoSelected={setConvoSelected} highlightConvo={highlightConvo} setHighlightConvo={setHighlightConvo}/>
          </div>
        }
      </section>
    </>
  )
}
