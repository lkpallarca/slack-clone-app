import React, { useCallback } from 'react';
import API from '../../../../../API';
import { getLoggedUser } from '../../../../../utils/storage';
import { v4 as uuidv4 } from 'uuid';
import dateFormat from 'dateformat';

export default function ConversationDisplay({ messages }) {
  const setRef = useCallback(node => {
    if(node) {
      node.scrollIntoView({smooth : true})
    }
  }, [])

  function formatDate(date) {
    const modifiedDate = dateFormat(date, "ddd mmm d");
    return modifiedDate;
  }

  return (
    <section className='conversation-display'>
      {messages.map((each, index) => {
        const lastMessage = messages.length - 1 === index;
        const modifiedDate = formatDate(each.created_at);
        console.log(modifiedDate)
        if(each.sender.id === getLoggedUser().data.id) {
          return (
            <div key={index} ref={lastMessage ? setRef : null} className='message-bubble me'> 
              {each.body}
              <p className='message-date'>{modifiedDate}</p>
            </div>
          )
        } else {
          return (
            <div key={index} ref={lastMessage ? setRef : null} className='message-bubble'>
              {each.body}
              <p className='message-date'>{modifiedDate}</p>
            </div>
          )
        }
      })}
    </section>
  )
}
