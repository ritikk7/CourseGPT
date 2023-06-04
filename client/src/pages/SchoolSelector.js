import React, { useState, useEffect } from "react";
import { Select } from "@chakra-ui/react";
import api from "../api/axiosInstance";
import { Checkbox, CheckboxGroup, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setSchool, setClasses } from "../redux/schoolSlice";

const SchoolSelector = () => {
  const [firstDropdownValue, setFirstDropdownValue] = useState("");
  const [firstDropdownOptions, setFirstDropdownOptions] = useState([]);
  const [secondDropdownValue, setSecondDropdownValue] = useState([]);
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('schools');

      setFirstDropdownOptions(response.data.schools.map((school) => {
        return {
          label: school.name,
          value: school._id
        }
      }));
    };
    fetchData();
  }, [firstDropdownOptions]);

  const handleFirstDropdownChange = async (event) => {
    setFirstDropdownValue(event.target.value)
    const result = await api.get('/schools/' + event.target.value)
    dispatch(setSchool(result.data.school[0]));

    const response = await api.get('/schools/' + event.target.value + '/courses')
    setSecondDropdownOptions(response.data.courses.map((course) => {
      return {
        label: course.courseName,
        value: course._id
      }
    }));
  };

  const handleSecondDropdownChange = async (event) => {
    let promises = []
    for (let e of event) {
      promises.push(api.get('/schools/' + firstDropdownValue + '/courses/' + e))
    }
    Promise.all(promises).then((results) => {
      let courses = results.map((r) => {
        return r.data.course[0]
      })
      dispatch(setClasses(courses));
    }).catch((e) => {
      console.log("Error!")
    })
    setSecondDropdownValue(event);
  };

  return (
    <div>
      <Select value={firstDropdownValue} onChange={handleFirstDropdownChange}>
        <option value="">What school do you attend?</option>
        {firstDropdownOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      <CheckboxGroup value={secondDropdownValue} onChange={handleSecondDropdownChange}>
      <VStack align="start" spacing={2}>
        {secondDropdownOptions.map((option) => (
          <Checkbox key={option.value} value={option.value}>
            {option.label}
          </Checkbox>
        ))}
      </VStack>
    </CheckboxGroup>
    </div>
  );
};

export default SchoolSelector;
