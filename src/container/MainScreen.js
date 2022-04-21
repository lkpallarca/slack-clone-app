import React, { useState, useEffect } from 'react'
import API from '../API';
import ErrorAlert from '../components/alerts/ErrorAlert';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import MainDisplay from '../components/main-display/MainDisplay';
import SideBar from '../components/side-bar/SideBar';
import '../css/index.css';
import { getDMessageHistoryList, getLoggedUser } from '../utils/storage';

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
  const [isError, setIsError] = useState(true);
  const loggedUser = getLoggedUser().data.id;
  const [error, setError] = useState('');
  const [alert, setAlert] = useState(false);
  
  async function fetchUsers() {
    const fetchedUsers = await API.get('/users', { headers: getLoggedUser().headers });
    const fetchedChannels = await API.get('/channels', { headers: getLoggedUser().headers });
    let dMessageHistoryList = getDMessageHistoryList(getLoggedUser().data.id);
    if(!fetchedChannels.data.data) {
      setSearchData({users: [...fetchedUsers.data.data], channels: []});
      compareDMessageList(dMessageHistoryList, fetchedUsers.data.data);
      setIsLoading(false);
      return
    } else {
      setSearchData({users: [...fetchedUsers.data.data], channels: [...fetchedChannels.data.data]});
      compareDMessageList(dMessageHistoryList, fetchedUsers.data.data);
      setChannelList([...fetchedChannels.data.data]);
      setIsLoading(false);
    }
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

  async function fetchMessages() {
    const receiver = convoInfo.owner_id ? 'Channel' : 'User'
    const fetchedMessagesFrom = await API.get(`/messages?receiver_id=${loggedUser}&receiver_class=User`, { headers: getLoggedUser().headers });
    const fetchedMessagesTo = await API.get(`/messages?receiver_id=${convoInfo.id}&receiver_class=${receiver}`, { headers: getLoggedUser().headers });
    const sortedMessageList = [...fetchedMessagesFrom.data.data, ...fetchedMessagesTo.data.data].slice().sort((a,b)=> a.id - b.id);
    setMessages(sortedMessageList);
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  useEffect(() => {
    const checkDMessageList = dMessageList.find(each => each.id === convoInfo.id);
    if(convoInfo === null) {
      return
    }
    if(!checkDMessageList && !convoInfo.owner_id) {
      setDMessageList([...dMessageList, convoInfo]);
    }
    fetchMessages();
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
            setChannelList={setChannelList}
            setIsError={setIsError}
            setError={setError}
            setAlert={setAlert}
          />
          <MainDisplay 
            convoSelected={convoSelected} 
            setConvoSelected={setConvoSelected} 
            convoInfo={convoInfo} 
            setConvoListHighlight={setHighlightConvo}
            messages={messages}
            setUpdateListInstance={setUpdateListInstance}
          />
          <ErrorAlert state={alert} setState={setAlert} message={error} isError={isError}/>
        </>
        }
      </section> 
      : null
      }
    </>
  )
}
