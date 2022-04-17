import React, { useState, useEffect } from 'react'
import API from '../API';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import MainDisplay from '../components/main-display/MainDisplay';
import SideBar from '../components/side-bar/SideBar';
import '../css/index.css';
import { getDMessageHistoryList, getLoggedUser } from '../utils/storage';

export default function MainScreen({ show }) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [dMessageList, setDMessageList] = useState([]);
  const [convoSelected, setConvoSelected] = useState(false);
  const [highlightConvo, setHighlightConvo] = useState('');
  const [convoInfo, setConvoInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInstances, setMessageInstances] = useState(0);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const loggedUser = getLoggedUser().data.id;
  
  async function fetchUsers() {
    const fetchedUsers = await API.get('/users', { headers: getLoggedUser().headers });
    const fetchedChannels = await API.get('/channels', { headers: getLoggedUser().headers });
    let convoHistoryList = getDMessageHistoryList(getLoggedUser().data.id);

    if(!fetchedChannels.data.data) {
      setSearchData({users: [...fetchedUsers.data.data], channels: []});
      mapConvoList(convoHistoryList, fetchedUsers.data.data);
      setIsLoading(false);
      return
    } else {
      setSearchData({users: [...fetchedUsers.data.data], channels: [...fetchedChannels.data.data]});
      mapConvoList(convoHistoryList, fetchedUsers.data.data);
      setIsLoading(false);
    }
  }

  function mapConvoList(chattingWith, allUsers) {
    chattingWith.forEach(every => {
      allUsers.forEach(each => {
        if(each.id === every) {
          setDMessageList(prev => [...prev, each]);
        }
      });
    })
  }

  async function fetchMessages() {
    const fetchedMessagesFrom = await API.get(`/messages?receiver_id=${loggedUser}&receiver_class=User`, { headers: getLoggedUser().headers });
    const fetchedMessagesTo = await API.get(`/messages?receiver_id=${convoInfo.id}&receiver_class=User`, { headers: getLoggedUser().headers });
    const sortedMessageList = [...fetchedMessagesFrom.data.data, ...fetchedMessagesTo.data.data].slice().sort((a,b)=> a.id - b.id);
    setMessages(sortedMessageList);
    if(sortedMessageList.length === 0) {
      setIsNewMessage(true);
    } else {
      setIsNewMessage(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  useEffect(() => {
    if(convoInfo === null) {
      return
    }
    fetchMessages();
    if(isNewMessage === false) {
      return
    } else {
      // mapConvoList(convoHistoryList, fetchedUsersAgain.data.data);
      // console.log(convoInfo);
      // console.log(dMessageList);
      dMessageList.push(convoInfo)
    }
  }, [messageInstances, convoInfo])

  return (
    <>
      {show ? 
      <section className='main-screen'>
        {isLoading ? <LoadingScreen/> : 
        <>
          <SideBar 
            searchData={searchData} 
            highlightConvo={highlightConvo} 
            setConvoSelected={setConvoSelected} 
            setHighlightConvo={setHighlightConvo}
            setConvoInfo={setConvoInfo}
            convoInfo={convoInfo}
            setMessages={setMessages}
            dMessageList={dMessageList}
          />
          <MainDisplay 
            convoSelected={convoSelected} 
            setConvoSelected={setConvoSelected} 
            convoInfo={convoInfo} 
            setConvoListHighlight={setHighlightConvo}
            messages={messages}
            setMessageInstances={setMessageInstances}
          />
        </>
        }
      </section> 
      : null
      }
    </>
  )
}
