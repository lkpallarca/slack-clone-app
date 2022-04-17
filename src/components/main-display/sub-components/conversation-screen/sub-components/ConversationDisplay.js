import React, { useState, useEffect } from 'react';
import API from '../../../../../API';
import { getLoggedUser } from '../../../../../utils/storage';
import { v4 as uuidv4 } from 'uuid';

export default function ConversationDisplay({ messages }) {
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
