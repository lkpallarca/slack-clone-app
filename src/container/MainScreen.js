import React, { useState, useEffect } from 'react';
import SideBar from '../components/side-bar/SideBar';
import useAllUsers from '../customHooks/useAllUsers';
import MainDisplay from '../components/main-display/MainDisplay';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import useUserChannels from '../customHooks/useUserChannels';
import { getDMessageHistoryList, getLoggedUser } from '../utils/storage';
import '../css/index.css';

export default function MainScreen({ show }) {
  const { allUsersData, fetchedAllUsers } = useAllUsers();
  const { userChannels, fetchedUserChannels } = useUserChannels();
  const [channelList, setChannelList] = useState([]);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [dMessageList, setDMessageList] = useState([]);
  const [convoInfo, setConvoInfo] = useState(null);
  const [convoSelected, setConvoSelected] = useState(false);
  const [highlightConvo, setHighlightConvo] = useState('');
  const loggedUserId = getLoggedUser().data.id;

  useEffect(() => {
    if(convoSelected === false) {
      setHighlightConvo('');
    }
  }, [convoSelected])
  
  useEffect(() => {
    if(fetchedAllUsers === 'success' && fetchedUserChannels === 'success') {
      updateData();
      setIsLoadingPage(false);
    }
  }, [fetchedAllUsers, fetchedUserChannels])

  function updateData() {
    const dMessageHistoryList = getDMessageHistoryList(loggedUserId);
    if(userChannels) {
      setSearchData({ users: allUsersData, channels: userChannels });
      setChannelList(userChannels);
    } else {
      setSearchData({ users: allUsersData, channels: [] });
    }
    compareDMessageList(dMessageHistoryList, allUsersData);
  }

  function compareDMessageList(chattingWith, allUsers) {
    chattingWith.forEach(every => {
      allUsers.forEach(each => {
        if(each.id === every) {
          setDMessageList(prev => [...prev, each]);
        }
      });
    })
  }

  useEffect(() => {
    const checkDMessageList = dMessageList.find(each => each.id === convoInfo.id);
    if(convoInfo === null) {
      return
    }
    if(!checkDMessageList && !convoInfo.owner_id) {
      setDMessageList([...dMessageList, convoInfo]);
    }
  }, [convoInfo])

  return (
    <>
      {show ? 
      <section className='main-screen'>
        {isLoadingPage ? <LoadingScreen/> : 
        <>
          <SideBar 
            convoInfo={convoInfo}
            searchData={searchData} 
            channelList={channelList}
            dMessageList={dMessageList}
            setConvoInfo={setConvoInfo}
            setChannelList={setChannelList}
            highlightConvo={highlightConvo}
            setConvoSelected={setConvoSelected}
            setHighlightConvo={setHighlightConvo} 
          />
          <MainDisplay 
            convoSelected={convoSelected}
            setConvoSelected={setConvoSelected} 
            convoInfo={convoInfo} 
          />
        </>
        }
      </section> 
      : null
      }
    </>
  )
}
