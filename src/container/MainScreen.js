import React, { useState, useEffect } from 'react'
import API from '../API';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import MainDisplay from '../components/main-display/MainDisplay';
import SideBar from '../components/side-bar/SideBar';
import '../css/index.css';
import { getChannelHistoryList, getDMessageHistoryList, getLoggedUser } from '../utils/storage';

export default function MainScreen({ show }) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [dMessageList, setDMessageList] = useState([]);
  const [channelList, setChannelList] = useState([]);
  const [convoSelected, setConvoSelected] = useState(false);
  const [highlightConvo, setHighlightConvo] = useState('');
  const [convoInfo, setConvoInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [updateListInstance, setUpdateListInstance] = useState(0);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const loggedUser = getLoggedUser().data.id;
  
  async function fetchUsers() {
    const fetchedUsers = await API.get('/users', { headers: getLoggedUser().headers });
    const fetchedChannels = await API.get('/channels', { headers: getLoggedUser().headers });
    const sampleFetch = await API.get(`/messages?receiver_id=2791&receiver_class=Channel`, { headers: getLoggedUser().headers });
    // console.log(sampleFetch)
    let dMessageHistoryList = getDMessageHistoryList(getLoggedUser().data.id);
    let channelHistoryList = getChannelHistoryList(getLoggedUser().data.id);
    console.log('dm history', dMessageHistoryList)
    console.log('channel history', channelHistoryList)

    if(!fetchedChannels.data.data) {
      setSearchData({users: [...fetchedUsers.data.data], channels: []});
      mapConvoList(dMessageHistoryList, fetchedUsers.data.data);
      setIsLoading(false);
      return
    } else {
      setSearchData({users: [...fetchedUsers.data.data], channels: [...fetchedChannels.data.data]});
      mapConvoList(dMessageHistoryList, fetchedUsers.data.data);
      setChannelList(fetchedChannels.data.data);
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
    const receiver = convoInfo.owner_id ? 'Channel' : 'User'
    const fetchedMessagesFrom = await API.get(`/messages?receiver_id=${loggedUser}&receiver_class=User`, { headers: getLoggedUser().headers });
    const fetchedMessagesTo = await API.get(`/messages?receiver_id=${convoInfo.id}&receiver_class=${receiver}`, { headers: getLoggedUser().headers });
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
    } 
    if(isNewMessage === true && convoInfo.owner_id) {
      channelList.push(convoInfo)
      return
    } else {
      dMessageList.push(convoInfo)
    }
  }, [updateListInstance, convoInfo])

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
            dMessageList={dMessageList}
            channelList={channelList}
          />
          <MainDisplay 
            convoSelected={convoSelected} 
            setConvoSelected={setConvoSelected} 
            convoInfo={convoInfo} 
            setConvoListHighlight={setHighlightConvo}
            messages={messages}
            setUpdateListInstance={setUpdateListInstance}
          />
        </>
        }
      </section> 
      : null
      }
    </>
  )
}
