import React, { useState } from 'react';
import '../../css/index.css';
import ConversationScreen from './sub-components/conversation-screen/ConversationScreen';
import Infographic from './sub-components/infographic/Infographic';

export default function MainDisplay({ convoSelected, setConvoSelected, setConvoListHighlight, convoInfo, messages, setMessageInstances }) {

  return (
    <section className='main-display'>
      {convoSelected ? 
        <ConversationScreen 
          setConvoListHighlight={setConvoListHighlight} 
          setConvoSelected={setConvoSelected}
          convoInfo={convoInfo}
          messages={messages}
          setMessageInstances={setMessageInstances}
        /> : 
        <Infographic />
      }
    </section>
  )
}
