import React from 'react';
import '../../css/index.css';

export default function SignUpModal({ displayState, setDisplayState }) {
  function handleSubmit(e) {
    e.preventDefault()
  }
  
  function closeModal() {
    setDisplayState('sign-up-modal-wrapper hide');
  }
  
  return (
    <div className={displayState}>
      <button className='close-button' onClick={closeModal}>❌</button>
      <div className='sign-up-title'>Welcome!</div>
      <div className='sign-up-info'>
        <p>Create your account and start connecting with others</p>
        <p>here on LoQui!</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='email-label' htmlFor='email-sign-up'>Email</label>
          <br></br>
          <input className='email-input' type='email' id='email-sign-up' required/>
        </div>
        <div>
          <label className='password-label' htmlFor='password-sign-up'>Password</label>
          <br></br>
          <input className='password-input' type='password' id='password-sign-up' required/>
        </div>
        <div>
          <label className='confirm-password-label' htmlFor='confirm-password'>Confirm password</label>
          <br></br>
          <input className='confirm-password-input' type='password' id='confirm-password' />
        </div>
        <div className='button-wrapper'>
          <button type='submit' className='sign-up-button'>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
