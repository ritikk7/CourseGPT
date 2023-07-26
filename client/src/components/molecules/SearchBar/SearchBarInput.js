import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Center,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import SearchResults from './SearchResults';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import { useDebounce } from '../../../hooks/debounceHook';
import api from '../../../api/axiosInstance';
import { setActivePanelSearch } from '../../../redux/userSlice';

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 2.5em;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const ContainerVariants = {
  expanded: {
    height: '20em',
  },
  collapsed: {
    height: '2.5em',
  },
};

const ContainerTransition = { type: 'spring', damping: 22, stiffness: 150 };

const SearchBarInput = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  const activePanel = useSelector(state => state.user.activePanel);
  const [input, setInput] = useState('');
  const [isExpanded, setExpanded] = useState(false);
  const [ref, isClickedOutside] = useClickOutside();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    clearSearch();
  };

  const clearSearch = () => {
    setInput('');
    setLoading(false);
    setSearchResults([]);
  };

  const prepareSearchQuery = query => {
    const url = `/users/${user.userId}/messages?search=${query}`;
    return encodeURI(url);
  };

  const searchMessages = async () => {
    console.log('fetching results for ' + input);
    if (!input || input.trim() === '') {
      return;
    }
    setLoading(true);

    const URL = prepareSearchQuery(input);
    let response;
    try {
      response = await api.get(URL);
    } catch (err) {
      console.log('Error: ', err);
      return;
    }

    if (response) {
      console.log('Response: ', response.data);
      setSearchResults(response.data);
    }
    setLoading(false);
  };

  const handleChange = e => {
    e.preventDefault();
    const val = e.target.value;
    setInput(val);
  };

  useEffect(() => {
    if (activePanel === 'SEARCH' && !isClickedOutside) {
      expandContainer();
    } else collapseContainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePanel, isClickedOutside]);

  useDebounce(input, 500, searchMessages);

  return (
    <Center m={5} color="white">
      <VStack>
        <SearchBarContainer
          animate={isExpanded ? 'expanded' : 'collapsed'}
          variants={ContainerVariants}
          transition={ContainerTransition}
          ref={ref}
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <IconButton
                colorScheme="gray.300"
                aria-label="Search for Chats/Messages"
                size="lg"
                icon={<SearchIcon />}
              />
            </InputLeftElement>
            <Input
              id="searchString"
              variant="outline"
              placeholder="Search for Chats/Messages"
              name="searchString"
              value={input}
              onFocus={() => {
                dispatch(setActivePanelSearch());
              }}
              onChange={handleChange}
            />
            {input !== '' && (
              <InputRightElement>
                <IconButton
                  isRound={true}
                  variant="solid"
                  colorScheme="gray.300"
                  aria-label="Clear Search Bar"
                  size="xs"
                  fontSize="9px"
                  icon={<CloseIcon />}
                  onClick={clearSearch}
                />
              </InputRightElement>
            )}
          </InputGroup>
          {isExpanded && (
            <SearchResults
              searchString={input}
              results={searchResults}
              isLoading={isLoading}
            />
          )}
        </SearchBarContainer>
      </VStack>
    </Center>
  );
};

export default SearchBarInput;
