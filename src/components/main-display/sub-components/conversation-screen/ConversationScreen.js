import React, { useState, useEffect } from 'react';
import API from '../../../../API';
import '../../../../css/index.css';
import { getLoggedUser } from '../../../../utils/storage';
import ConversationDisplay from './sub-components/ConversationDisplay';
import MainNavBar from './sub-components/MainNavBar';
import MessageForm from './sub-components/MessageForm';

export default function ConversationScreen({ setConvoListHighlight, setConvoSelected, convoInfo }) {
  return (
    <section className='convo-screen'>
      <MainNavBar setConvoListHighlight={setConvoListHighlight} setConvoSelected={setConvoSelected}/>
      <div className='conversation-display-wrapper'>
        <ConversationDisplay convoInfo={convoInfo}/>
      </div>
      <MessageForm convoInfo={convoInfo}/>
    </section>
  )
}
