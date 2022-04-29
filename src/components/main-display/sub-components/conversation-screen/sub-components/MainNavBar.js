import React, { useEffect, useState } from 'react'
import useAllUsers from '../../../../../customHooks/useAllUsers';
import useChannelDetails from '../../../../../customHooks/useChannelDetails';
import useCut from '../../../../../customHooks/useCut';

export default function MainNavBar({ setConvoSelected, convoInfo }) {
  const { channelMembers } = useChannelDetails(convoInfo.id);
  const { data, fetchedAllUsers } = useAllUsers();
  const [memberList, setMemberList] = useState([]);
  const [selectedButton, setSelectedButton] = useState('');
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const [showGroupMembers, setShowGroupMembers] = useState(false);
  const { profile, image } = useCut();

  useEffect(() => {
    reset();
  }, [convoInfo])

  const displayChannelMembers = () => {
    if(convoInfo.owner_id && fetchedAllUsers === 'success') {
      retrieveMemberDetails([...channelMembers.data.channel_members], data);
    } else {
      return
    }
  }
  
  function reset() {
    setSelectedButton('');
    setShowMenuOptions(false);
    setMemberList([]);
    setShowGroupMembers(false);
  }

  function retrieveMemberDetails(memberArr, allUsers) {
    memberArr.forEach(every => {
      allUsers.forEach(each => {
        if(each.id === every.user_id) {
          setMemberList(prev => [...prev, each]);
        }
      });
    })
  }

  return (
    <nav className='mainbar-navbar'>
      <div>
        <img src={convoInfo.owner_id ? `${profile}${convoInfo.id}.svg` : `${image}${convoInfo.id}.svg`} className='chat-image'/>
        {convoInfo.owner_id ? convoInfo.name.replace(/"/g, '') : convoInfo.email}
      </div>
      <div>
        <button 
          className={selectedButton === 'menu' ? 'highlight' : ''}
          onBlur={reset}
          onClick={()=> {
            setSelectedButton('menu');
            setShowMenuOptions(!showMenuOptions);
            setShowGroupMembers(false);
          }}>
          <img src='menu-icon.png' alt='simple menu icon'/>
        </button>
        <ul className={showMenuOptions ? 'show' : null}>
          {convoInfo.owner_id ? <li onClick={()=> {
            setShowGroupMembers(true);
            displayChannelMembers();
          }}>
            Group Members
          </li>
          : null}
          <li onClick={()=> {
            setConvoSelected(false);
          }}>
            Close Chat
          </li>
        </ul>
        <ul onClick={reset} className={showGroupMembers ? 'show' : null}>
          <li key={convoInfo.id} className='member-title'>"{convoInfo.name?.replace(/"/g, '')}" Members</li>
          {memberList?.map(each => {
            return (
              <li key={each.id}>{each.email}</li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
