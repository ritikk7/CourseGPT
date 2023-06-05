import React from 'react';

import styles from './ChatPanel.module.css';
import ChatSection from '../../Chat/ChatSection';

const ChatPanel = ({ chatHistory }) => {
  return (
    <div className={styles.chatPanel}>
      {chatHistory &&
        chatHistory.map((msg, index) => (
          <ChatSection key={index} index={index} message={msg} />
        ))}
    </div>
  );
};

export default ChatPanel;
