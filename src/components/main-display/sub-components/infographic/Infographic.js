import React from 'react';
import '../../../../css/index.css';

export default function Infographic() {
  return (
    <>
      <img id="hand-logo" src="hand-logo-1.png" alt="cartoon of hand holding a cellphone"/>
      <div className='info-wrapper'>
        <div>Keep your app connected</div>
        <div>LoQui syncs your contacts to connect you with the people you wish to communicate with. Keep your app connected to be updated whenever you send or receive a message.</div>
      </div>
      <p>
        Make messages and calls from your computer with LoQui for Windows.
        <span> <a href='https://c.tenor.com/VFFJ8Ei3C2IAAAAM/rickroll-rick.gif' target='blank'>Get it here.</a></span>
      </p>
      <div className='vignette'></div>
    </>
  )
}
