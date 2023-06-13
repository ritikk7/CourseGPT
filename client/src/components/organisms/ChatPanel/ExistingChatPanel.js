import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './ChatPanel.module.css';
import ChatSection from '../../molecules/Chat/ChatSection';
import { activeChatWithMessagesSelector } from "../../../redux/selectors/activeChatWithMessagesSelector";

const ExistingChatPanel = () => {
  const scrollRef = useRef(null);
  const activeChat = useSelector(activeChatWithMessagesSelector);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat]);

  return (
    <>
      <div className={styles.chatPanel}>
        {Object.values(activeChat.messages).length > 0 &&
          Object.values(activeChat.messages)?.map((msg, i) => (
            <ChatSection key={i} message={msg} />
          ))}
        <div
          id="dummy-div"
          ref={scrollRef}
          style={{ float: 'left', clear: 'both' }}
        />
      </div>
    </>
  );
};

export default ExistingChatPanel;
