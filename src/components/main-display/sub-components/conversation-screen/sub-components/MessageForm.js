import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import API from '../../../../../API';
import { addToDMessageHistoryList, getLoggedUser } from '../../../../../utils/storage';

export default function MessageForm({ convoInfo, setMessageInstances }) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState('');
  const loggedUser = getLoggedUser().data.id;

  function onEmojiClick(event, emojiObject) {
    setMessage(prev => prev + emojiObject.emoji);
    setShowEmoji(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await API.post('/messages', { 
      "receiver_id": JSON.stringify(convoInfo.id),
      "receiver_class": 'User',
      "body": message }, 
      { headers: getLoggedUser().headers }
    );
    setMessageInstances(prev => prev += 1);
    addToDMessageHistoryList(getLoggedUser().data.id, convoInfo.id);
    setShowEmoji(false);
    setMessage('');
  }

  return (
    <>
      <div className={showEmoji ? 'emojis show' : 'emojis'}>
        <Picker onEmojiClick={onEmojiClick}/>
      </div>
      <button className='emoji-trigger' onClick={()=> setShowEmoji(!showEmoji)}><img src='smiley-icon.png' alt='simple smiley icon'/></button>
      <form onSubmit={handleSubmit} className='form'>
        <div className='message-input'>
          <input onChange={(e)=> setMessage(e.target.value)} type='text' placeholder='Type a message' value={message}/>
          <button type='submit' className='message-submit'><img src='send-icon.png' alt='send arrow icon'/></button>
        </div>
      </form>
    </>
  )
}
