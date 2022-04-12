import React from 'react';

export default function MessageForm() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      <button></button>
      <button></button>
      <div>
        <input type='text' placeholder='Type a message'/>
        <button className='message-submit'><img src='send-icon.png' alt='send arrow icon'/></button>
      </div>
    </form>
  )
}
