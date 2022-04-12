import React, { useState } from 'react';
import '../../css/index.css';
import ConversationScreen from './sub-components/conversation-screen/ConversationScreen';
import Infographic from './sub-components/infographic/Infographic';

export default function MainDisplay({ convoSelected, setConvoSelected, setConvoListHighlight }) {
  const [onlyOne, setOnlyOne] = useState(true);

  return (
    <section className='main-display'>
      {convoSelected ? 
        <ConversationScreen setConvoListHighlight={setConvoListHighlight} setConvoSelected={setConvoSelected}/> : 
        <Infographic />
      }
    </section>
  )
}
