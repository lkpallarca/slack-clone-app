import React, { useState, useEffect } from 'react';
import API from '../../../../../API';
import { getLoggedUser } from '../../../../../utils/storage';
import { v4 as uuidv4 } from 'uuid';

export default function ConversationDisplay({ convoInfo }) {
  const [messages, setMessages] = useState([]);
  const loggedUser = getLoggedUser().data.id;
  const receiver = convoInfo.id

  async function fetchMessages() {
    const fetchedMessagesFrom = await API.get(`/messages?receiver_id=${loggedUser}&receiver_class=User`, { headers: getLoggedUser().headers });
    const fetchedMessagesTo = await API.get(`/messages?receiver_id=${receiver}&receiver_class=User`, { headers: getLoggedUser().headers });
    const sortedMessageList = [...fetchedMessagesFrom.data.data, ...fetchedMessagesTo.data.data].slice().sort((a,b)=> a.id - b.id);
    setMessages(sortedMessageList);
  }

  useEffect(() => {
    fetchMessages();

    // const interval = setInterval(() => {
    //   fetchMessages();
    // }, 1000);
    // return () => clearInterval(interval);
  }, [])

  return (
    <section className='conversation-display'>
      {messages.map(each => {
        if(each.sender.id === getLoggedUser().data.id) {
          return (
            <div key={uuidv4()} className='message-bubble me'> 
              {each.body}
            </div>
          )
        } else {
          return (
            <div key={uuidv4()} className='message-bubble'>
              {each.body}
            </div>
          )
        }
      })}
    </section>
  )
}
