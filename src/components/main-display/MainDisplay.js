import React from 'react';
import '../../css/index.css';
import ConversationScreen from './sub-components/conversation-screen/ConversationScreen';
import Infographic from './sub-components/infographic/Infographic';

export default function MainDisplay({ convoSelected, setConvoSelected, setConvoListHighlight, convoInfo, setUpdateListInstance }) {
  return (
    <section className='main-display'>
      {convoSelected ? 
        <ConversationScreen 
          setConvoSelected={setConvoSelected}
          convoInfo={convoInfo}
          setUpdateListInstance={setUpdateListInstance}
        /> : 
        <Infographic />
      }
    </section>
  )
}
