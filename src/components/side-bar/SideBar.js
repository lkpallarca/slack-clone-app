import React, { useState } from 'react';
import ConvoList from './sub-components/convo-list/ConvoList';
import SideNavBar from './sub-components/nav-bar/SideNavBar';
import SearchList from './sub-components/search-list/SearchList';
import SearchUsers from './sub-components/search/SearchUsers';
import '../../css/index.css';

export default function SideBar({ highlightConvo, setHighlightConvo, searchData, setConvoSelected, setConvoInfo, convoInfo, dMessageList, channelList, setChannelList }) {
  const [isSearching, setIsSearching] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isCreatingChannel, setIsCreatingChannel] = useState(false);
  const [searchingFor, setSearchingFor] = useState('');
  const [selectedChannelMembers, setSelectedChannelMembers] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <section className='sidebar-wrapper'>
        <SideNavBar 
          setIsAddingMember={setIsAddingMember}
          setIsCreatingChannel={setIsCreatingChannel} 
          onSearch={setIsSearching}
        />
        <SearchUsers 
          setIsAddingMember={setIsAddingMember} 
          searchingFor={searchingFor} 
          setSearchingFor={setSearchingFor} 
          onSearch={setIsSearching} 
          setIsCreatingChannel={setIsCreatingChannel} 
          selectedChannelMembers={selectedChannelMembers} 
          setSelectedChannelMembers={setSelectedChannelMembers} 
          showSearch={showSearch} 
          setShowSearch={setShowSearch}
        />
        {isSearching ? 
          <SearchList 
            isAddingMember={isAddingMember} 
            channelList={channelList} 
            setChannelList={setChannelList} 
            setSearchingFor={setSearchingFor} 
            setShowSearch={setShowSearch} 
            selectedChannelMembers={selectedChannelMembers} 
            setSelectedChannelMembers={setSelectedChannelMembers} 
            onSearch={setIsSearching} 
            convoInfo={convoInfo} 
            setConvoInfo={setConvoInfo} 
            setConvoSelected={setConvoSelected} 
            searchingFor={searchingFor} 
            passedSearch={searchData} 
            highlightConvo={highlightConvo} 
            setHighlightConvo={setHighlightConvo} 
            isCreatingChannel={isCreatingChannel}
          /> 
          :
          <div className='sidebar-channel-dmessage-wrapper'>
            <ConvoList 
              setIsCreatingChannel={setIsCreatingChannel} 
              setIsAddingMember={setIsAddingMember} 
              setIsSearching={setIsSearching} 
              channelList={channelList} 
              dMessageList={dMessageList} 
              convoInfo={convoInfo} 
              setConvoInfo={setConvoInfo} 
              setConvoSelected={setConvoSelected} 
              highlightConvo={highlightConvo} 
              setHighlightConvo={setHighlightConvo}
            />
          </div>
        }
      </section>
    </>
  )
}
