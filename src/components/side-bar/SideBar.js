import React, { useState, useEffect } from 'react';
import API from '../../API';
import '../../css/index.css';
import { getLoggedUser } from '../../utils/storage';
import Channels from './sub-components/channels/Channels';
import DirectMessages from './sub-components/direct-messages/DirectMessages';
import NavBar from './sub-components/nav-bar/NavBar';
import SearchList from './sub-components/search-list/SearchList';
import SearchUsers from './sub-components/search/SearchUsers';

export default function SideBar({ searchData }) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchingFor, setSearchingFor] = useState('');

  return (
    <>
      <section className='sidebar-wrapper'>
        <NavBar />
        <SearchUsers searchingFor={searchingFor} setSearchingFor={setSearchingFor} onSearch={setIsSearching}/>
        {isSearching ? <SearchList searchingFor={searchingFor} passedSearch={searchData}/> :
          <div className='sidebar-channel-dmessage-wrapper'>
            <Channels />
            <DirectMessages />
          </div>
        }
      </section>
    </>
  )
}
