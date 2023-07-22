import React, { useState } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Center,
  VStack
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import SearchResults from './SearchResults';

const SearchBarInput = () => {
  const [input, setInput] = useState('');

  const fetchSearchResults = text => {
    console.log('fetching results for ' + text);
    // fetch();
  };

  const handleChange = e => {
    const val = e.target.value;
    setInput(val);
    fetchSearchResults(val);
  };

  return (
    <Center h='40px' m={5} color='white'>
      <VStack>
      <InputGroup maxW={400}>
        <InputLeftElement pointerEvents="none">
          <IconButton
            colorScheme="gray.300"
            aria-label="Search database"
            size='lg'
            icon={<SearchIcon />}
          />
        </InputLeftElement>
        <Input id='searchString' variant="outline" placeholder="Search messages" name='searchString' value={input} onChange={handleChange}/>
        <InputRightElement>
          <IconButton
            isRound={true}
            variant='solid'
            colorScheme="alphas"
            aria-label="Clear search bar"
            size='xs'
            fontSize='9px'
            icon={<CloseIcon />}
            onClick={() => {
              console.log('clearInput');
              setInput("");
            }}
          />
        </InputRightElement>
      </InputGroup>
      <SearchResults />
      </VStack>
    </Center>
  );
};

export default SearchBarInput;
