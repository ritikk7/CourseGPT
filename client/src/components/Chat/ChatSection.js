import React from 'react';
import styles from './ChatSection.module.css';

const ChatSection = ({ message, index }) => {
  const backgroundColor = index % 2 === 0 ? 'transparent' : 'rgba(68,70,84)';
  return (
    <div className={styles.chatComponent} style={{ backgroundColor }}>
      {message}
    </div>
  );
};

export default ChatSection;
