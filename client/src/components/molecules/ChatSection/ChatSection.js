import React, { useEffect, useState } from 'react';
import styles from './ChatSection.module.css';
import ChatSenderImage from '../../atoms/ChatSenderImage/ChatSenderImage';
import { useSelector } from 'react-redux';

const ChatSection = ({ message }) => {
  const user = useSelector(state => state.user);
  const isSenderUser = message.senderType === 'User';
  const backgroundColor = isSenderUser ? 'transparent' : 'rgba(68,70,84)';
  const courseGptImage = './coursegptLogo.png';
  const userImage = 'https://bit.ly/dan-abramov';
  const [chatMessage, setChatMessage] = useState('');
  const isAnimationFinished = message.content === chatMessage;

  useEffect(() => {
    if (!isAnimationFinished) {
      const timeout = setTimeout(() => {
        setChatMessage(message.content.slice(0, chatMessage.length + 1));
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [message, chatMessage]);

  const ProfileIcon = isSenderUser ? (
    <ChatSenderImage
      imageUrl={userImage}
      alt={user.firstName + ' ' + user.lastName}
    />
  ) : (
    <ChatSenderImage imageUrl={courseGptImage} alt="CourseGPT Logo" />
  );

  return (
    <div className={styles.chatComponent} style={{ backgroundColor }}>
      <div className={styles.chatContent}>
        {message && ProfileIcon}
        {/* {<div className={styles.blinkingCursor} />} */}
        {isSenderUser ? (
          message.content
        ) : (
          <div className={isAnimationFinished ? null : styles.blinkingCursor}>
            {chatMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSection;
