import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import API from '../../../../../API';
import { addToChannelHistoryList, addToDMessageHistoryList, getLoggedUser } from '../../../../../utils/storage';
import useSendMessage from '../../../../../customHooks/useSendMessage';

export default function MessageForm({ convoInfo }) {
  const { mutate } = useSendMessage();
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState('');
  const loggedUser = getLoggedUser().data.id;

  function onEmojiClick(event, emojiObject) {
    setMessage(prev => prev + emojiObject.emoji);
    setShowEmoji(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const receiver = convoInfo.owner_id ? 'Channel' : 'User';
    mutate({
      'receiver_id': JSON.stringify(convoInfo.id),
      'receiver_class': receiver,
      'body': message
    })
    if(receiver === 'User') {
      addToDMessageHistoryList(loggedUser, convoInfo.id);
    }
    setShowEmoji(false);
    setMessage('');
  }

  return (
    <>
      <div className={showEmoji ? 'emojis show' : 'emojis'}>
        <Picker onEmojiClick={onEmojiClick}/>
      </div>
      <button className='emoji-trigger' onClick={()=> setShowEmoji(!showEmoji)}><img src='smiling-icon.png' alt='simple smiley icon'/></button>
      <form onSubmit={handleSubmit} className='form'>
        <input onChange={(e)=> setMessage(e.target.value)} type='text' placeholder='Type a message' value={message}/>
        <button type='submit' className='message-submit'><img src='send-icon.png' alt='send arrow icon'/></button>
      </form>
    </>
  )
}
