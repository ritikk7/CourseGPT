import React from 'react';
import styles from './ChatSection.module.css';
import ChatSenderImage from "../../atoms/ChatSenderImage/ChatSenderImage";
const ChatSection = ({ message }) => {
  const courseGptLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png?20230318122128"
  const isSenderUser = message.senderType === 'User'
  const backgroundColor = isSenderUser ? 'transparent' : 'rgba(68,70,84)';


  const ProfileIcon = isSenderUser ?
    <ChatSenderImage imageUrl={"https://bit.ly/dan-abramov"} alt="Dan Abramov" />
    :
    <ChatSenderImage imageUrl={courseGptLogo} alt="CourseGPT Logo" />;

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
