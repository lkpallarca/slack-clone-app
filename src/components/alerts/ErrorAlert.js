import React from 'react';
import '../../css/index.css';

export default function ErrorAlert({ state, setState, message, isError }) {
  return (
    <section className={state ? 'error-alert show' : 'error-alert'}>
      <div>
        {isError ? <p>{`Sorry, ${message}`}</p> : <p>{`Great! ${message}`}</p>}
        <button onClick={() => setState(!state)}>Okay</button>
      </div>
    </section>
  )
}
