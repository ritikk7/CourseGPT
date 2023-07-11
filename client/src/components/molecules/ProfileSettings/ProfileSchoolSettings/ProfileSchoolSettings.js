import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  ModalFooter,
  ModalHeader,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';

import { updateUser } from '../../../../redux/userSlice';
import { schoolsWithCoursesSelector } from '../../../../redux/selectors/schoolsWithCoursesSelector';
import { userFavouriteCoursesSelector } from '../../../../redux/selectors/userFavouriteCoursesSelector';
import { userSchoolWithCoursesSelector } from '../../../../redux/selectors/userSchoolWithCoursesSelector';

import { MultiSelectButtons } from '../../../atoms/RadioAndCheckboxBtnGroups/SelectionButtonGroup';

const ProfileSchoolSettings = ({ handleClose }) => {
  const dispatch = useDispatch();
  const schoolsWithCourses = useSelector(schoolsWithCoursesSelector);
  const userFavoriteCourses = useSelector(userFavouriteCoursesSelector);
  const userSchool = useSelector(userSchoolWithCoursesSelector);

  const [selectedSchool, setSelectedSchool] = useState(userSchool);
  const [selectedCourses, setSelectedCourses] = useState(userFavoriteCourses);

  const handleSchoolChange = e => {
    setSelectedSchool(schoolsWithCourses[e.target.value]);
  };

  useEffect(() => {
    if (selectedSchool && userSchool && selectedSchool._id === userSchool._id) {
      setSelectedCourses(userFavoriteCourses);
    } else {
      setSelectedCourses({});
    }
  }, [selectedSchool]);

  const handleCourseChange = course => {
    setSelectedCourses(prevCourses => {
      if (prevCourses[course._id]) {
        const { [course._id]: deletedCourse, ...remainingCourses } =
          prevCourses;
        return remainingCourses;
      } else {
        return { ...prevCourses, [course._id]: course };
      }
    });
  };

  const handleSave = () => {
    const favourites = Object.keys(selectedCourses);
    const school = selectedSchool._id;
    const updatedUser = {
      school,
      favourites,
    };
    dispatch(updateUser(updatedUser));
    handleClose();
  };

  const renderSchools = () => {
    return Object.values(schoolsWithCourses).map((school, i) => (
      <option key={i} value={school._id}>
        {school.name}
      </option>
    ));
  };

  const renderCourses = () => {
    if (selectedSchool) {
      return Object.values(selectedSchool.courses).map((course, i) => (
        <MultiSelectButtons
          key={i}
          isChecked={!!selectedCourses[course._id]}
          onChange={() => handleCourseChange(course)}
        >
          {course.courseCode}
        </MultiSelectButtons>
      ));
    }
  };

  return (
    <Box w="600px">
      <ModalHeader>School Settings</ModalHeader>
      <FormControl paddingInlineStart={6}>
        <FormLabel>School</FormLabel>
        <Select
          backgroundColor={'teal.600'}
          color={'white'}
          placeholder="Select a school"
          value={selectedSchool?._id}
          onChange={handleSchoolChange}
          margin={3}
        >
          {renderSchools()}
        </Select>
        <FormLabel>Courses</FormLabel>
        <SimpleGrid minChildWidth="120px" spacing="7px">
          {renderCourses()}
        </SimpleGrid>
      </FormControl>
      <ModalFooter paddingInlineEnd={0} paddingTop={6}>
        <Button colorScheme="blue" mr={3} onClick={handleSave}>
          Save
        </Button>
        <Button colorScheme="red" onClick={handleClose}>Cancel</Button>
      </ModalFooter>
    </Box>
  );
};

export default ProfileSchoolSettings;
