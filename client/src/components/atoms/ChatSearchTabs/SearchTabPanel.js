import React from 'react';
import MessageResult from '../../molecules/SearchBar/MessageResult';
import { Center, Text, TabPanel } from '@chakra-ui/react';

const SearchTabPanel = ({ searchString, results }) => {
  const isEmptyInput = !searchString || searchString === '';
  const isEmptyResults = !results || results.length === 0;

  return (
    <TabPanel>
      {!isEmptyInput && isEmptyResults && (
        <Center>
          <Text color="gray.500">No result found</Text>
        </Center>
      )}
      {!isEmptyInput && !isEmptyResults && (
        <>
          {results.map(result => (
            <MessageResult key={result._id} result={result} />
          ))}
        </>
      )}
    </TabPanel>
  );
};

export default SearchTabPanel;
