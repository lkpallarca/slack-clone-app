import React from 'react';
import '../../css/index.css';

export default function ErrorAlert({ state, setState, message }) {
  return (
    <section className={state ? 'error-alert show' : 'error-alert'}>
      <div>
        <p>OOPS!</p>
        <p>{message}</p>
        <button onClick={() => setState(!state)}>Close</button>
      </div>
    </section>
  )
}
