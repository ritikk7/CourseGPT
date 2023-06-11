import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './ChatPanel.module.css';
import ChatSection from '../../molecules/Chat/ChatSection';

const ExistingChatPanel = () => {
  const scrollRef = useRef(null);
  const messageId = useSelector(state => state.chats.activeChat.messages)
  const chatHistory = useSelector(state => state.messages[messageId])


  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <>
      <div className={styles.chatPanel}>
        {chatHistory &&
          chatHistory.map((msg, index) => (
            <ChatSection key={index} message={msg} />
          ))}
        <div
          id="dummy-div"
          ref={scrollRef}
          style={{ float: 'left', clear: 'both' }}
        />
      </div>
    </>
  );
};

export default ExistingChatPanel;
