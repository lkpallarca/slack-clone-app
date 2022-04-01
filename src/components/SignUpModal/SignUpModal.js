import React, { useState } from 'react';
import '../../css/index.css';

export default function SignUpModal({ displayState, setDisplayState }) {
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  function handleSubmit(e) {
    e.preventDefault()
    // fetch("https://slackapi.avionschool.com/api/v1/auth/", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*'
    //   },
    //   body: JSON.stringify({
    //     email: emailInput,
    //     password: passwordInput,
    //     password_confirmation: confirmPassword
    //   })
    // }).then(res => {
    //   console.log(res)
    // })
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
          <input onChange={(e)=> setEmailInput(e.target.value)} className='email-input' type='email' id='email-sign-up' required/>
        </div>
        <div>
          <label className='password-label' htmlFor='password-sign-up'>Password</label>
          <br></br>
          <input onChange={(e)=> setPasswordInput(e.target.value)} className='password-input' type='password' id='password-sign-up' required/>
        </div>
        <div>
          <label className='confirm-password-label' htmlFor='confirm-password'>Confirm password</label>
          <br></br>
          <input onChange={(e)=> setConfirmPassword(e.target.value)} className='confirm-password-input' type='password' id='confirm-password' />
        </div>
        <div className='button-wrapper'>
          <button type='submit' className='sign-up-button'>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
