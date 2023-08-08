import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './ChatPanel.module.css';
import { activeChatWithMessagesSelector } from '../../../redux/selectors/activeChatWithMessagesSelector';
import ChatSection from '../../molecules/ChatSection/ChatSection';

const ChatPanel = () => {
  const scrollRef = useRef(null);
  const activeChat = useSelector(activeChatWithMessagesSelector);
  const isGptLoading = useSelector(state => state.messages.gptLoading);
  const highlightMessage = useSelector(state => state.chats.highlightMessage);
  const renderChatMessages =
    activeChat &&
    Object.values(activeChat) &&
    Object.values(activeChat.messages) &&
    Object.values(activeChat.messages).length > 0;

  const scrollToRef = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToRef();
  }, [activeChat, scrollRef.current]);

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
      messagesToDisplay.map((msg, i) => {
        const needsRef = highlightMessage && highlightMessage._id === msg._id;

        return (
          <ChatSection
            key={i}
            message={msg}
            ref={needsRef ? scrollRef : null}
          />
        );
      })
    );
  };

  return (
    <>
      <div className={styles.chatPanel}>
        {renderMessages()}
        {!highlightMessage && (
          <div
            id="dummy-div"
            ref={scrollRef}
            style={{ float: 'left', clear: 'both' }}
          />
        )}
      </div>
    </>
  );
};

export default ChatPanel;
