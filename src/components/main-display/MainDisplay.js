import React, { useState } from 'react';
import '../../css/index.css';
import ConversationScreen from './sub-components/conversation-screen/ConversationScreen';
import Infographic from './sub-components/infographic/Infographic';

export default function MainDisplay({ convoSelected, setConvoSelected, setConvoListHighlight, convoInfo }) {

  return (
    <section className='main-display'>
      {convoSelected ? 
        <ConversationScreen 
          setConvoListHighlight={setConvoListHighlight} 
          setConvoSelected={setConvoSelected}
          convoInfo={convoInfo}
        /> : 
        <Infographic />
      }
    </section>
  )
}
