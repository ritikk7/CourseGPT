import React from 'react';
import styled from 'styled-components';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import SearchTabs from '../../atoms/ChatSearchTabs/SearchTabs';

const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
  background: #353744;
`;

const SearchResults = ({ searchString, results, isLoading }) => {
  return (
    <>
      <SearchContent>
        <SearchTabs searchString={searchString} results={results} />
        {isLoading && <LoadingSpinner />}
      </SearchContent>
    </>
  );
};

export default SearchResults;
