import React, { useEffect, useState, forwardRef } from 'react';
import styles from './ChatSection.module.css';
import ChatSenderImage from '../../atoms/ChatSenderImage/ChatSenderImage';
import { useSelector } from 'react-redux';
import Typewriter from 'typewriter-effect';
import { Box, Highlight } from '@chakra-ui/react';
import Feedback from '../FeedbackPanel/FeedbackPanel';
import mapHighlightedTextToArray from '../../../util/mapHighlightedText';

const ChatSection = ({ message }, ref) => {
  const user = useSelector(state => state.user);
  const highlightMessage = useSelector(state => state.chats.highlightMessage);
  const highlightedTexts = mapHighlightedTextToArray(highlightMessage);
  const isSenderUser = message.role === 'user';
  const backgroundColor = isSenderUser ? 'transparent' : 'rgba(68,70,84)';
  const courseGptImage = './coursegptLogo.png';
  const messageIsGptPlaceholder = message?.isGptPlaceholder;

  const userImage = 'https://bit.ly/dan-abramov';
  const renderAnimation = isTimestampLessThan15SecondsAgo(message.createdAt);
  const isLongPassageLength = 300;
  const [typingAnimation, setTypingAnimation] = useState('.');

  // Credit to chatGPT
  function isTimestampLessThan15SecondsAgo(createdAt) {
    const createdAtTimestamp = Math.floor(new Date(createdAt).getTime() / 1000); // Convert ISO date string to timestamp in seconds
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

    return createdAtTimestamp >= currentTime - 15;
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

  const handleNewlineHTML = text => {
    if (text) {
      return text.split('\n').map((item, key) => {
        return (
          <span key={key}>
            {item}
            <br />
          </span>
        );
      });
    }
    return null;
  };
  const handleNewlineText = text => {
    if (text) {
      let htmlText = text
        .split('\n')
        .map((item, key) => {
          return `<span key=${key}>` + `${item}` + `<br />` + `</span>`;
        })
        .join('');
      return htmlText;
    }
    return null;
  };

  const renderMessageContent = () => {
    console.log(highlightMessage);
    if (!highlightMessage || highlightMessage._id !== message._id)
      return handleNewlineHTML(message.content);
    return (
      <Highlight
        query={highlightedTexts}
        styles={{
          px: '1',
          bg: 'blue.600',
          color: 'white',
          rounded: 'md',
        }}
      >
        {highlightMessage.content}
      </Highlight>
    );
  };

  const renderBotAnswer = () => {
    if (!renderAnimation) {
      return renderMessageContent();
    }
    if (message.content) {
      return (
        <Typewriter
          options={{
            delay: message.content.length > isLongPassageLength ? 10 : 20,
          }}
          onInit={typewriter => {
            typewriter
              .typeString(handleNewlineText(message.content))
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
        <Box className={styles['message-container']}>
          <div
            className={styles.chatComponent}
            style={{ backgroundColor }}
            {...ref}
          >
            <div className={styles.chatContent}>
              {message && ProfileIcon}
              <div className={styles.msgContent}>
                {message && renderGptPlaceholder()}
                {message && !messageIsGptPlaceholder && renderBotAnswer()}
              </div>
              {message && !messageIsGptPlaceholder && (
                <Feedback message={message._id} />
              )}
            </div>
          </div>
        </Box>
      ) : (
        <div
          className={styles.chatComponent}
          style={{ backgroundColor }}
          {...ref}
        >
          <div className={styles.chatContent}>
            {message && ProfileIcon}
            {message && renderMessageContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default forwardRef(ChatSection);
