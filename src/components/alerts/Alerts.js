import React, { useState } from 'react';
import '../../css/index.css';

export default function Alerts({ message, isErr, reset = null }) {
  const [display, setDisplay] = useState(true);

  return (
    <section className={display ? 'error-alert show' : 'error-alert'}>
      <div>
        {isErr ? <p>{`Sorry, ${message}`}</p> : <p>{`Great! ${message}`}</p>}
        <button onClick={() => {
          setDisplay(false);
          reset(false);
        }}>Okay</button>
      </div>
    </section>
  )
}
