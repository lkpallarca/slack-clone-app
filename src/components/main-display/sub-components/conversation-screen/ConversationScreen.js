import React from 'react';
import '../../../../css/index.css';
import MainNavBar from './sub-components/MainNavBar';
import MessageForm from './sub-components/MessageForm';

export default function ConversationScreen({ setConvoListHighlight, setConvoSelected }) {
  return (
    <section className='convo-screen'>
      <MainNavBar setConvoListHighlight={setConvoListHighlight} setConvoSelected={setConvoSelected}/>
      <div className='screen'>ConversationScreen</div>
      <MessageForm />
    </section>
  )
}
