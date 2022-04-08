import React from 'react';
import '../../css/index.css';

export default function LoadingScreen() {
  return (
    <section className='loading-screen'>
      <div className="my-logo">
        <img id="my-logo" src="My Logo.png" alt="my logo"/>
      </div>
      <div>Loading...</div>
    </section>
  )
}
