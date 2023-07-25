import React from 'react';
import { useSelector } from 'react-redux';
import { userFavouriteCoursesSelector } from '../../../redux/selectors/userFavouriteCoursesSelector';
import { Badge, Tabs, TabList, Tab, TabPanels } from '@chakra-ui/react';
import SearchTabPanel from './SearchTabPanel';

const SearchTabs = ({ searchString, results }) => {
  const courses = useSelector(userFavouriteCoursesSelector);
  return (
    <Tabs>
      <TabList>
        <Tab key="all">
          All<Badge mx={2}>{Object.keys(results).length}</Badge>
        </Tab>
        {Object.keys(courses).map(id => (
          <Tab key={id}>
            {courses[id].courseCode}
            <Badge mx={2}>{results.length}</Badge>
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
            results={results}
            course={courses[id]}
          />
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default SearchTabs;
