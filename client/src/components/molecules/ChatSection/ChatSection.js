import React, { useEffect, useState } from 'react';
import styles from './ChatSection.module.css';
import ChatSenderImage from '../../atoms/ChatSenderImage/ChatSenderImage';
import { useSelector } from 'react-redux';
import Typewriter from 'typewriter-effect';

const ChatSection = ({ message }) => {
  const user = useSelector(state => state.user);
  const isSenderUser = message.senderType === 'User';
  const backgroundColor = isSenderUser ? 'transparent' : 'rgba(68,70,84)';
  const courseGptImage = './coursegptLogo.png';

  const userImage = 'https://bit.ly/dan-abramov';
  const renderAnimation = isTimestampLessThan5SecondsAgo(message.createdAt);

  // Credit to chatGPT
  function isTimestampLessThan5SecondsAgo(createdAt) {
    const createdAtTimestamp = Math.floor(new Date(createdAt).getTime() / 1000); // Convert ISO date string to timestamp in seconds
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

    return createdAtTimestamp >= currentTime - 5;
  }

  const ProfileIcon = isSenderUser ? (
    <ChatSenderImage
      imageUrl={userImage}
      alt={user.firstName + ' ' + user.lastName}
    />
  ) : (
    <ChatSenderImage imageUrl={courseGptImage} alt="CourseGPT Logo" />
  );

  const renderBotAnswer = () => {
    if (!renderAnimation) {
      return message.content;
    }
    if (message.content) {
      return (
        <Typewriter
          options={{
            delay: message.content.length > 300 ? 10 : 20,
          }}
          onInit={typewriter => {
            typewriter
              .typeString(message.content)
              .callFunction(() => {
                document.querySelector('.Typewriter__cursor').remove();
              })
              .start();
          }}
        />
      );
    }
    return (
      <Typewriter
        options={{
          autoStart: true,
          loop: true,
          strings: [''],
        }}
      />
    );
  };

  return (
    <div className={styles.chatComponent} style={{ backgroundColor }}>
      <div className={styles.chatContent}>
        {message && ProfileIcon}
        {isSenderUser ? message.content : renderBotAnswer()}
      </div>
    </div>
  );
};

export default ChatSection;
