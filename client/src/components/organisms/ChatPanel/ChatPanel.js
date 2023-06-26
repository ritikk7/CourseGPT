import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './ChatPanel.module.css';
import { activeChatWithMessagesSelector } from '../../../redux/selectors/activeChatWithMessagesSelector';
import ChatSection from '../../molecules/ChatSection/ChatSection';

const ChatPanel = () => {
  const scrollRef = useRef(null);
  const activeChat = useSelector(activeChatWithMessagesSelector);
  const isGptLoading = useSelector(state => state.messages.gptLoading);
  const renderChatMessages =
    activeChat &&
    Object.values(activeChat) &&
    Object.values(activeChat.messages) &&
    Object.values(activeChat.messages).length > 0;

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat]);

  const renderMessages = () => {
    const messagesToDisplay = Object.values(activeChat.messages);
    if (isGptLoading) {
      const gptPlaceholder = {
        createAt: new Date(),
        role: 'system',
        isGptPlaceholder: true,
      };
      messagesToDisplay.push(gptPlaceholder);
    }
    return (
      renderChatMessages &&
      messagesToDisplay.map((msg, i) => <ChatSection key={i} message={msg} />)
    );
  };

  return (
    <>
      <div className={styles.chatPanel}>
        {renderMessages()}
        <div
          id="dummy-div"
          ref={scrollRef}
          style={{ float: 'left', clear: 'both' }}
        />
      </div>
    </>
  );
};

export default ChatPanel;
