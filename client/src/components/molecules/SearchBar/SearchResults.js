import React from 'react';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import SearchTabs from '../../atoms/ChatSearchTabs/SearchTabs';
import styles from './SearchResults.module.css';
import { useTheme } from '@chakra-ui/react';

const SearchResults = ({ searchString, results, isLoading }) => {
  const theme = useTheme();
  return (
    <>
      <div
        className={styles.searchContent}
        style={{
          backgroundColor: theme.colors.sidePanel.background,
          color: theme.colors.background.light,
        }}
      >
        <SearchTabs searchString={searchString} results={results} />
        {isLoading && <LoadingSpinner />}
      </div>
    </>
  );
};

export default SearchResults;
