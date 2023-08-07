import React, { forwardRef, useEffect, useState } from 'react';
import styles from './ChatSection.module.css';
import ChatSenderImage from '../../atoms/ChatSenderImage/ChatSenderImage';
import { useSelector } from 'react-redux';
import Typewriter from 'typewriter-effect';
import { Box, Highlight, IconButton, useTheme } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import Feedback from '../FeedbackPanel/FeedbackPanel';
import mapHighlightedTextToArray from '../../../util/mapHighlightedText';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { renderToString } from "react-dom/server";

const ChatSection = ({ message }, ref) => {
  const user = useSelector(state => state.user);
  const highlightMessage = useSelector(state => state.chats.highlightMessage);
  const highlightedTexts = mapHighlightedTextToArray(highlightMessage);
  const userProfile = useSelector(state => state.user.profilePicture);
  const isSenderUser = message.role === 'user';
  const theme = useTheme();
  const backgroundColor = isSenderUser
    ? `${theme.colors.chatSection.light}`
    : `${theme.colors.chatSection.dark}`;
  const courseGptImage = './coursegptLogo.png';
  const messageIsGptPlaceholder = message?.isGptPlaceholder;

  const userImage = userProfile ? userProfile : 'https://bit.ly/dan-abramov';
  const renderAnimation = shouldRenderAnimation(message.createdAt);
  const [typingAnimation, setTypingAnimation] = useState('.');

  // Credit to chatGPT
  function shouldRenderAnimation(createdAt) {
    const createdAtTimestamp = Math.floor(new Date(createdAt).getTime() / 1000); // Convert ISO date string to timestamp in seconds
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

    return (createdAtTimestamp >= currentTime - 30);
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

  const handleMixedTextWithCodeBlocksAndNewlines = text => {
    // function is overly complicated as working with md turns out to be a pain
    // improvements can be made here
    if (text) {
      let blocks = text.split('```');
      return blocks.map((block, index) => {
        if (index % 2 === 1) {
          const existingLanguage = block.match(/^\s*(\w+)/);
          const language = existingLanguage ? existingLanguage[1] : 'javascript'; // default language javascript
          const codeContent = block.replace(/^\s*\w+\s*/, '');
          return (
            <SyntaxHighlighter language={language} style={prism} key={index}>
              {codeContent}
            </SyntaxHighlighter>
          );
        } else {
          const lines = block.split('\n');
          const content = lines.map((line, key) => (
            <div style={{ marginBottom: '1em' }} key={key}>
              <ReactMarkdown children={line} />
            </div>
          ));
          return <>{content}</>;
        }
      });
    }
    return null;
  };

  const handleNewlineHTMLHighlighted = text => {
    if (text) {
      return text.split('\n').map((item, key) => {
        return (
          <span key={key}>
            <Highlight
              query={highlightedTexts}
              styles={{
                px: '1',
                bg: theme.colors.search.highlight,
                color: theme.colors.background.dark,
                rounded: 'md',
              }}
            >
              {item}
            </Highlight>
            <br />
          </span>
        );
      });
    }
    return null;
  };

  const handleCopyToClipboard = text => {
    navigator.clipboard.writeText(text);
  };

  const renderMessageContent = () => {
    if (!highlightMessage || highlightMessage._id !== message._id)
      return handleMixedTextWithCodeBlocksAndNewlines(message.content);
    return handleNewlineHTMLHighlighted(message.content);
  };

  const renderBotAnswer = () => {
    if (!renderAnimation) {
      return renderMessageContent();
    }
    if (message.content) {
      return (
        <Typewriter
          options={{
            delay: 1,
            cursor:'' // buggy so removed
          }}
          onInit={typewriter => {
            typewriter
              .typeString(renderToString(handleMixedTextWithCodeBlocksAndNewlines(message.content)))
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
          cursor:'' // buggy so removed
        }}
      />
    );
  };

  const renderGptPlaceholder = () => {
    return messageIsGptPlaceholder ? <span>{typingAnimation}</span> : null;
  };

  return (
    <div ref={ref}>
      {!isSenderUser ? (
        <Box color={theme.colors.chatSection.lightText}>
          <div className={styles.chatComponent} style={{ backgroundColor }}>
            <div className={styles.chatContent}>
              {message && ProfileIcon}
              <div className={styles.textBlock}>
                {message && renderGptPlaceholder()}
                {message && !messageIsGptPlaceholder && renderBotAnswer()}
              </div>
              {message && !messageIsGptPlaceholder && (
                <div className={styles.chatBtns}>
                  <Feedback message={message._id} />
                  <IconButton
                    icon={<CopyIcon />}
                    onClick={() => handleCopyToClipboard(message.content)}
                    style={{ backgroundColor }}
                  />
                </div>
              )}
            </div>
          </div>
        </Box>
      ) : (
        <Box color={theme.colors.chatSection.darkText}>
          <div className={styles.chatComponent} style={{ backgroundColor }}>
            <div className={styles.chatContent}>
              {message && ProfileIcon}
              {message && renderMessageContent()}
            </div>
          </div>
        </Box>
      )}
    </div>
  );
};

export default forwardRef(ChatSection);
