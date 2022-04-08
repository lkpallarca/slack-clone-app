import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../API';
import '../../css/index.css';
import { clearLoggedUser, setLoggedUser } from '../../utils/storage';
import ErrorAlert from '../alerts/ErrorAlert';
import SignUpModal from '../sign-up-modal/SignUpModal';

export default function LoginModal({ setShow }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showModal, setShowModal] = useState('sign-up-modal-wrapper hide');
  const [error, setError] = useState();
  const [alert, setAlert] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    clearLoggedUser();
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await API.post('/auth/sign_in', { email, password });
      const userData = { ...response.data, headers: response.headers };
      setLoggedUser(userData);
      setShow(true);
      navigate('/chat');
    } catch (err) {
      setError(err.response.data.errors[0]);
      setAlert(!alert);
    }
    e.target.reset();
  }

  function createAccount(e) {
    e.preventDefault();
    setShowModal('sign-up-modal-wrapper');
  }

  return (
    <section className='login-modal-wrapper'>
      <div className='login-modal'>
        <div className="my-logo">
          <img id="my-logo" src="My Logo.png" alt="my logo"/>
        </div>
        <div className='loqui'>LoQui</div>
        <form onSubmit={handleSubmit}>
          <div >
            <label className='email-label' htmlFor='email-input'>Email</label>
            <br></br>
            <input onChange={(e) => setEmail(e.target.value)} className='email-input' type='email' id='email-input' required/>
          </div>
          <div>
            <label className='password-label' htmlFor='password-input'>Password</label>
            <br></br>
            <input onChange={(e) => setPassword(e.target.value)} className='password-input' type='password' id='password-input' required/>
          </div>
          <div className='button-wrapper'>
            <button className='login-button' type='submit'>Log In</button>
            <button className='create-account-button' onClick={createAccount}>Create new Account</button>
          </div>
        </form>
      </div>
      <SignUpModal displayState={showModal} setDisplayState={setShowModal}/>
      <ErrorAlert state={alert} setState={setAlert} message={error}/>
    </section>
  );
}
