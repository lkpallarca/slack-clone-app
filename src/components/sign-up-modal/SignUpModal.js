import React, { useState } from 'react';
import useSignUp from '../../customHooks/useSignUp';
import Alerts from '../alerts/Alerts';
import '../../css/index.css';

export default function SignUpModal({ displayState, setDisplayState }) {
  const { mutate, error, isError, isSuccess } = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    mutate({ 
      email, 
      password,
      "password_confirmation": confirmPassword
    }, {
      onSuccess: () => {
        e.target.reset();
      }
    });
  }
  
  function closeModal() {
    setDisplayState('sign-up-modal-wrapper hide');
  }
  
  return (
    <section className={displayState}>
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
          <input onChange={(e)=> setEmail(e.target.value)} className='email-input' type='email' id='email-sign-up' required/>
        </div>
        <div>
          <label className='password-label' htmlFor='password-sign-up'>Password</label>
          <br></br>
          <input onChange={(e)=> setPassword(e.target.value)} className='password-input' type='password' id='password-sign-up' required/>
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
      {isError ? <Alerts message={error.response.data.errors.full_messages[0]} isErr={true}/> : null}
      {isSuccess ? <Alerts message={`${email} is successfully signed up!`} isError={false}/> : null}
    </section>
  );
}
