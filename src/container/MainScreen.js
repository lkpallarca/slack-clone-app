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
    let dMessageHistoryList = getDMessageHistoryList(getLoggedUser().data.id);
    // let channelHistoryList = getChannelHistoryList(getLoggedUser().data.id);
    // const modifiedChannelHistoryList = channelHistoryList.filter(each => each.owner_id !== getLoggedUser().data.id);
    // if(!fetchedChannels.data.data && channelHistoryList) {
    //   setSearchData({users: [...fetchedUsers.data.data], channels: [...modifiedChannelHistoryList]});
    //   compareDMessageList(dMessageHistoryList, fetchedUsers.data.data);
    //   setChannelList([...modifiedChannelHistoryList]);
    //   setIsLoading(false);
    // }
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

  async function test() {
    const sample = await API.get('/channels/2853', { headers: getLoggedUser().headers});
    // const sample = await API.post('/channel/add_member', {'id': 2850, 'member_id': 1998}, {headers: getLoggedUser().headers})
    console.log(sample)
  }

  useEffect(() => {
    fetchUsers();
    // test()
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
