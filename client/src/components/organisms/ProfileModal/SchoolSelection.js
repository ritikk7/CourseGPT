import React from 'react';
import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";

const SchoolSelection = ({ schools, selectedSchool, setSelectedSchool }) => (
  <Box w="100%">
    <FormControl>
      <FormLabel>School</FormLabel>
      <Select
        placeholder="Select school"
        value={selectedSchool?._id}
        onChange={e => setSelectedSchool(schools[e.target.value])}
      >
        {Object.values(schools).map((school) => (
          <option key={school._id} value={school._id}>
            {school.name}
          </option>
        ))}
      </Select>
    </FormControl>
  </Box>
);

export default SchoolSelection;
