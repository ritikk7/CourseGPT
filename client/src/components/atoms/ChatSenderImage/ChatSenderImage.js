import React from 'react';
import { Image } from '@chakra-ui/react';

const ChatSenderImage = ({ imageUrl, alt }) => {
  return (
    <Image borderRadius="full" boxSize="36px" src={imageUrl} alt={alt} mx={4} />
  );
};
export default ChatSenderImage;
