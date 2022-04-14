import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import API from '../../../../../API';
import { getLoggedUser } from '../../../../../utils/storage';

export default function MessageForm({ convoInfo }) {
  const [chosenEmoji, setChosenEmoji] = useState('');
  const [message, setMessage] = useState('');

  // function onEmojiClick(event, emojiObject) {
  //   setChosenEmoji(emojiObject);
  // }

  function handleInput(e) {
    setMessage(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const sendMessage = await API.post('/messages', { 
      "receiver_id": JSON.stringify(convoInfo.id),
      "receiver_class": 'User',
      "body": message }, 
      { headers: getLoggedUser().headers }
    );
    console.log(sendMessage);
    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      {/* <Picker onEmojiClick={onEmojiClick} /> */}
      {/* <button>{chosenEmoji.emoji}</button> */}
      <div>
        <input onChange={handleInput} type='text' placeholder='Type a message'/>
        <button className='message-submit'><img src='send-icon.png' alt='send arrow icon'/></button>
      </div>
    </form>
  )
}
