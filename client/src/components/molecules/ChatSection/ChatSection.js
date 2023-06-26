import React, { useEffect, useState } from 'react';
import styles from './ChatSection.module.css';
import ChatSenderImage from '../../atoms/ChatSenderImage/ChatSenderImage';
import { useSelector } from 'react-redux';
import Typewriter from 'typewriter-effect';
import { Box } from '@chakra-ui/react';
import Feedback from '../FeedbackPanel/FeedbackPanel';

const ChatSection = ({ message }) => {
  const user = useSelector(state => state.user);
  const isSenderUser = message.role === 'user';
  const backgroundColor = isSenderUser ? 'transparent' : 'rgba(68,70,84)';
  const courseGptImage = './coursegptLogo.png';
  const messageIsGptPlaceholder = message?.isGptPlaceholder;

  const userImage = 'https://bit.ly/dan-abramov';
  const renderAnimation = isTimestampLessThan5SecondsAgo(message.createdAt);
  const isLongPassageLength = 300;
  const [typingAnimation, setTypingAnimation] = useState('.');

  // Credit to chatGPT
  function isTimestampLessThan5SecondsAgo(createdAt) {
    const createdAtTimestamp = Math.floor(new Date(createdAt).getTime() / 1000); // Convert ISO date string to timestamp in seconds
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

    return createdAtTimestamp >= currentTime - 5;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTypingAnimation(prev => (prev.length < 3 ? prev + '.' : '.'));
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const ProfileIcon = isSenderUser ? (
    <ChatSenderImage
      imageUrl={userImage}
      alt={user.firstName + ' ' + user.lastName}
    />
  ) : (
    <ChatSenderImage imageUrl={courseGptImage} alt="CourseGPT Logo" />
  );

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const renderBotAnswer = () => {
    if (!renderAnimation) {
      return message.content;
    }
    if (message.content) {
      return (
        <Typewriter
          options={{
            delay: message.content.length > isLongPassageLength ? 10 : 20,
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

  const renderGptPlaceholder = () => {
    return messageIsGptPlaceholder ? <span>{typingAnimation}</span> : null;
  };

  return (
    <>
      {!isSenderUser ? (
        <Box
          className={styles['message-container']}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.chatComponent} style={{ backgroundColor }}>
            <div className={styles.chatContent}>
              {message && ProfileIcon}
              {message && renderGptPlaceholder()}
              {message && !messageIsGptPlaceholder && renderBotAnswer()}
              {message && !messageIsGptPlaceholder && isHovered && (
                <Feedback message={message._id} />
              )}
            </div>
          </div>
        </Box>
      ) : (
        <div className={styles.chatComponent} style={{ backgroundColor }}>
          <div className={styles.chatContent}>
            {message && ProfileIcon}
            {message && message.content}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatSection;
