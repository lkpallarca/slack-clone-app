import React, { useState, useEffect } from 'react'
import API from '../API';
import LoadingScreen from '../components/loading-screen/LoadingScreen';
import MainDisplay from '../components/main-display/MainDisplay';
import SideBar from '../components/side-bar/SideBar';
import '../css/index.css';
import { getLoggedUser } from '../utils/storage';

export default function MainScreen({ show }) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [convoSelected, setConvoSelected] = useState(false);
  const [highlightConvo, setHighlightConvo] = useState('')
  
  async function fetchUsers() {
    let fetchedData;
    const fetchedUsers = await API.get('/users', { headers: getLoggedUser().headers });
    const fetchedChannels = await API.get('/channels', { headers: getLoggedUser().headers });
    if (fetchedChannels.data.data) {
      fetchedData = [
        ...fetchedUsers.data.data,
        ...fetchedChannels.data.data
      ];
    } else {
      fetchedData = fetchedUsers.data.data;
    }
    setSearchData(fetchedData);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <>
      {show ? 
      <section className='main-screen'>
        {isLoading ? <LoadingScreen/> : 
        <>
          <SideBar setConvoSelected={setConvoSelected} searchData={searchData} highlightConvo={highlightConvo} setHighlightConvo={setHighlightConvo}/>
          <MainDisplay setConvoSelected={setConvoSelected} convoSelected={convoSelected} setConvoListHighlight={setHighlightConvo}/>
        </>
        }
      </section> 
      : null
      }
    </>
  )
}
