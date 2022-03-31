import React, { useState } from 'react';
import '../../css/index.css';
import SignUpModal from '../SignUpModal/SignUpModal';

export default function LoginModal() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showModal, setShowModal] = useState('sign-up-modal-wrapper hide');

  function handleSubmit(e) {
    e.preventDefault();
  }

  function createAccount() {
    setShowModal('sign-up-modal-wrapper');
  }

  return (
    <>
      <div className='login-modal'>
        <div class="my-logo">
          <img id="my-logo" src="My Logo.png" alt="my logo"/>
        </div>
        <div className='loqui'>LoQui</div>
        <form onSubmit={handleSubmit}>
          <div >
            <label className='email-label' htmlFor='email-input'>Email</label>
            <br></br>
            <input className='email-input' type='email' id='email-input' required/>
          </div>
          <div>
            <label className='password-label' htmlFor='password-input'>Password</label>
            <br></br>
            <input className='password-input' type='password' id='password-input' required/>
          </div>
          <div className='button-wrapper'>
            <button className='login-button' type='submit'>Log In</button>
            <button className='create-account-button' onClick={createAccount}>Create new Account</button>
          </div>
        </form>
      </div>
      <SignUpModal displayState={showModal} setDisplayState={setShowModal}/>
    </>
  );
}
