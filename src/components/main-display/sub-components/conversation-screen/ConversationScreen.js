import React, { useState, useEffect } from 'react';
import API from '../../../../API';
import '../../../../css/index.css';
import useMessages from '../../../../customHooks/useMessages';
import { getLoggedUser } from '../../../../utils/storage';
import ConversationDisplay from './sub-components/ConversationDisplay';
import MainNavBar from './sub-components/MainNavBar';
import MessageForm from './sub-components/MessageForm';

export default function ConversationScreen({ setConvoSelected, convoInfo }) {
  const loggedUserId = getLoggedUser().data.id;
  const { ourMessages, theirMessages } = useMessages(loggedUserId, convoInfo.id, 'User', `${convoInfo.owner_id ? 'Channel' : 'User'}`);
  const [messages, setMessages] = useState([]);

  function fetchMessages() {
    const sortedMessageList = [...ourMessages, ...theirMessages].slice().sort((a,b)=> a.id - b.id);
    setMessages(sortedMessageList);
  }

  useEffect(() => {
    fetchMessages();
  }, [ourMessages, theirMessages])

  return (
    <section className='convo-screen'>
      <MainNavBar setConvoSelected={setConvoSelected} convoInfo={convoInfo}/>
      <div className='conversation-display-wrapper'>
        <ConversationDisplay messages={messages}/>
      </div>
      <div className='message-form-wrapper'>
        <MessageForm convoInfo={convoInfo} />
      </div>
    </section>
  )
}
