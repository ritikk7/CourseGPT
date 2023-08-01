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
  useTheme,
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import SearchResults from './SearchResults';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useClickOutside } from 'react-click-outside-hook';
import { useDebounce } from '../../../hooks/debounceHook';
import api from '../../../api/axiosInstance';
import { setActivePanelSearch } from '../../../redux/userSlice';
import styles from './SearchBarInput.module.css';
import { setIsSearchBarVisible } from '../../../redux/uiSlice';

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
  const theme = useTheme();
  const dispatch = useDispatch();
  const activePanel = useSelector(state => state.user.activePanel);
  const [input, setInput] = useState('');
  const [isExpanded, setExpanded] = useState(false);
  const [ref, isClickedOutside] = useClickOutside();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const isSearchBarVisible = useSelector(state => state.ui.isSearchBarVisible);

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    clearSearch();
    dispatch(setIsSearchBarVisible(false));
  };

  const clearSearch = () => {
    setInput('');
    setLoading(false);
    setSearchResults([]);
  };

  const prepareSearchQuery = query => {
    const url = `/messages?search=${query}`;
    return encodeURI(url);
  };

  const searchMessages = async () => {
    if (!input || input.trim() === '') {
      return;
    }
    setLoading(true);

    const URL = prepareSearchQuery(input);
    let response;
    try {
      response = await api.get(URL);
    } catch (err) {
      return;
    }

    if (response) {
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
    if (activePanel === 'SEARCH' && !isClickedOutside && isSearchBarVisible) {
      expandContainer();
    } else collapseContainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePanel, isClickedOutside, isSearchBarVisible]);

  useDebounce(input, 500, searchMessages);

  const hideSearch = () => {
    dispatch(setIsSearchBarVisible(false));
    clearSearch();
  };

  return (
    <div className={styles.container}>
      <Center
        m={5}
        borderRadius="6px"
        style={{
          backgroundColor: theme.colors.sidePanel.background,
          color: theme.colors.background.light,
        }}
      >
        <VStack>
          <SearchBarContainer
            animate={isExpanded ? 'expanded' : 'collapsed'}
            variants={ContainerVariants}
            transition={ContainerTransition}
            ref={ref}
          >
            <InputGroup bg="#353744">
              <InputLeftElement pointerEvents="none">
                <IconButton
                  colorScheme="gray.300"
                  aria-label="Search for Chats/Messages"
                  size="lg"
                  icon={<SearchIcon />}
                />
              </InputLeftElement>
              <Input
                className={styles.input}
                id="searchString"
                variant="outline"
                style={{
                  backgroundColor: theme.colors.sidePanel.background,
                  color: theme.colors.background.light,
                }}
                placeholder="Search for Chats/Messages"
                name="searchString"
                value={input}
                autoFocus={isSearchBarVisible}
                onFocus={() => {
                  dispatch(setActivePanelSearch());
                }}
                onChange={handleChange}
              />
              <InputRightElement>
                <IconButton
                  isRound={true}
                  variant="solid"
                  colorScheme="gray.300"
                  aria-label="Clear Search Bar"
                  size="lg"
                  fontSize="14px"
                  icon={<CloseIcon />}
                  onClick={hideSearch}
                />
              </InputRightElement>
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
    </div>
  );
};

export default SearchBarInput;
