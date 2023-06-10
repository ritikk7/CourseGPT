import React, { useRef, useEffect } from 'react';

import styles from './ChatPanel.module.css';
import ChatSection from '../../Chat/ChatSection';

const ChatPanel = ({ chatHistory }) => {
  const scrollRef = useRef(null);

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
            <ChatSection key={index} index={index} message={msg} />
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

export default ChatPanel;
