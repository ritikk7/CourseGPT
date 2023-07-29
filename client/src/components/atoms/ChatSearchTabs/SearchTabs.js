import React from 'react';
import { useSelector } from 'react-redux';
import { userFavouriteCoursesSelector } from '../../../redux/selectors/userFavouriteCoursesSelector';
import {
  Badge,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  useTheme,
} from '@chakra-ui/react';
import SearchTabPanel from './SearchTabPanel';

const SearchTabs = ({ searchString, results }) => {
  const theme = useTheme();
  const courses = useSelector(userFavouriteCoursesSelector);

  const getFilteredResults = courseId => {
    return results.filter(res => res.course === courseId);
  };
  return (
    <Tabs>
      <TabList>
        <Tab
          key="all"
          _hover={{ bg: '#455A64' }}
          _focus={{ bg: '#455A64' }}
          color={theme.colors.background.light}
          borderTopRadius={7}
        >
          All<Badge mx={2}>{results.length}</Badge>
        </Tab>
        {Object.keys(courses).map(id => (
          <Tab
            key={id}
            _hover={{ bg: '#455A64' }}
            _focus={{ bg: '#455A64' }}
            color={theme.colors.background.light}
            borderTopRadius={7}
          >
            {courses[id].courseCode}
            <Badge mx={2}>{getFilteredResults(id).length}</Badge>
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        <SearchTabPanel
          searchString={searchString}
          results={results}
          course="all"
        />
        {Object.keys(courses).map(id => (
          <SearchTabPanel
            key={id}
            searchString={searchString}
            results={getFilteredResults(id)}
            course={courses[id]}
          />
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default SearchTabs;
