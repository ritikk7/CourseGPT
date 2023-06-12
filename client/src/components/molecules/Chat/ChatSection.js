import React from 'react';
import styles from './ChatSection.module.css';
import ChatSenderImage from "../../atoms/ChatSenderImage/ChatSenderImage";
import { useSelector } from 'react-redux';

const ChatSection = ({ message }) => {
  const courseGptImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png?20230318122128"
  const user = useSelector(state => state.user);
  const isSenderUser = message.senderType === 'User'
  const backgroundColor = isSenderUser ? 'transparent' : 'rgba(68,70,84)';

  const ProfileIcon = isSenderUser ?
    <ChatSenderImage imageUrl={user.profilePicture} alt={user.firstName + " " + user.lastName} />
    :
    <ChatSenderImage imageUrl={courseGptImage} alt="CourseGPT Logo" />;

  return (
    <div className={styles.chatComponent} style={{ backgroundColor }}>
      <div className={styles.chatContent}>
        {message && ProfileIcon}
        {message && message.content}
      </div>
    </div>
  );
};

export default ChatSection;
