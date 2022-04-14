import axios from 'axios';
import React, { useState } from 'react';
import API from '../../API';
import '../../css/index.css';
import ErrorAlert from '../alerts/ErrorAlert';

export default function SignUpModal({ displayState, setDisplayState, passedId }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [alert, setAlert] = useState('');
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await API.post('/auth/', { email, password, "password_confirmation": confirmPassword });
    } catch (err) {
      setError(err.response.data.errors.full_messages[0]);
      setAlert(!alert);
    }
    e.target.reset();
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
          <input onChange={(e)=> setEmail(e.target.value)} className='email-input' type='email' id={`email-sign-up-${passedId}`} required/>
        </div>
        <div>
          <label className='password-label' htmlFor='password-sign-up'>Password</label>
          <br></br>
          <input onChange={(e)=> setPassword(e.target.value)} className='password-input' type='password' id={`password-sign-up-${passedId}`} required/>
        </div>
        <div>
          <label className='confirm-password-label' htmlFor='confirm-password'>Confirm password</label>
          <br></br>
          <input onChange={(e)=> setConfirmPassword(e.target.value)} className='confirm-password-input' type='password' id={`confirm-password-${passedId}`} />
        </div>
        <div className='button-wrapper'>
          <button type='submit' className='sign-up-button'>Sign Up</button>
        </div>
      </form>
      <ErrorAlert state={alert} setState={setAlert} message={error}/>
    </section>
  );
}
