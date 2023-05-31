import React from 'react';
import styles from './ChatSection.module.css';

import { Image } from '@chakra-ui/react';
const ChatSection = ({ message, index }) => {
  const backgroundColor = index % 2 === 0 ? 'transparent' : 'rgba(68,70,84)';

  const ProfileIcon =
    index % 2 === 0 ? (
      <Image
        borderRadius="full"
        boxSize="36px"
        src="https://bit.ly/dan-abramov"
        alt="Dan Abramov"
        mx={4}
      />
    ) : (
      <Image
        borderRadius="full"
        boxSize="36px"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png?20230318122128"
        alt="ChatGPT logo"
        mx={4}
      />
    );
  return (
    <div className={styles.chatComponent} style={{ backgroundColor }}>
      <div className={styles.chatContent}>
        {message && ProfileIcon}
        {message}
      </div>
    </div>
  );
};

export default ChatSection;
