import React, { useState } from 'react';
import styles from './ChatSection.module.css';
import ChatSenderImage from '../../atoms/ChatSenderImage/ChatSenderImage';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
import Feedback from '../FeedbackPanel/FeedbackPanel';

const ChatSection = ({ message }) => {
  const user = useSelector(state => state.user);
  const isSenderUser = message.senderType === 'User';
  const backgroundColor = isSenderUser ? 'transparent' : 'rgba(68,70,84)';
  const courseGptImage = './coursegptLogo.png';
  const userImage = 'https://bit.ly/dan-abramov';

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
            {message && message.content}
          </div>
          <div className={styles.chatFeedback}>
            {isHovered && <Feedback message={message._id} />}
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
