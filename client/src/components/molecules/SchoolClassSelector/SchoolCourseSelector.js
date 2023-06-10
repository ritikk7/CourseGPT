import React, { useState, useEffect } from "react";
import {
  Select,
  Checkbox,
  CheckboxGroup,
  VStack, FormControl, FormLabel
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, fetchSchool, fetchSchools } from "../../../redux/schoolsSlice";

const SchoolCourseSelector = () => {
  const dispatch = useDispatch();
  const schools = useSelector(state => state.schools.data);
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
    if (!schools) {
      dispatch(fetchSchools()).then(res => {
      });
    }

  }, [dispatch, schools]);

  const handleSchoolDropdownChange = e => {
    setSelectedSchool(e.target.value);
  };

  const renderSchoolDropdownOptions = () => {
    return schools.map(school => (
        <option key={school.value} value={option.value}>
          {option.label}
        </option>
      )
    );
  };

  if (schools) {
    return (
      <FormControl>
        <FormLabel>School</FormLabel>
        <Select onChange={handleSchoolDropdownChange}>
          <option value="">What school do you attend?</option>

        </Select>
        <CheckboxGroup
          value={secondDropdownValue}
          onChange={handleSecondDropdownChange}
        >
          <VStack align="start" spacing={2}>
            {secondDropdownOptions.map(option => (
              <Checkbox key={option.value} value={option.value}>
                {option.label}
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>
      </FormControl>
    );
  } else {
    return (
      <FormControl>
        <FormLabel>School</FormLabel>
        <Select>
          <option value="">Loading schools...</option>
        </Select>
      </FormControl>
    );
  }
};

export default SchoolCourseSelector;
