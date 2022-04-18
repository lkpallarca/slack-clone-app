import React, { useCallback } from 'react';
import API from '../../../../../API';
import { getLoggedUser } from '../../../../../utils/storage';
import { v4 as uuidv4 } from 'uuid';

export default function ConversationDisplay({ messages }) {
  const setRef = useCallback(node => {
    if(node) {
      node.scrollIntoView({smooth : true})
    }
  }, [])

  return (
    <section className='conversation-display'>
      {messages.map((each, index) => {
        const lastMessage = messages.length - 1 === index;
        if(each.sender.id === getLoggedUser().data.id) {
          return (
            <div key={index} ref={lastMessage ? setRef : null} className='message-bubble me'> 
              {each.body}
            </div>
          )
        } else {
          return (
            <div key={index} ref={lastMessage ? setRef : null} className='message-bubble'>
              {each.body}
            </div>
          )
        }
      })}
    </section>
  )
}
