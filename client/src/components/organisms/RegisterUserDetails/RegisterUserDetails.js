import React, { useEffect, useState } from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Stack,
  VStack,
  Text,
  useRadioGroup,
  useCheckboxGroup
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { useToast } from '@chakra-ui/react';
import {
  SingleSelectButtons,
  MultiSelectButtons,
} from '../../atoms/RadioAndCheckboxBtnGroups/SelectionButtonGroup';
import { updateUser } from '../../../redux/userSlice';
import { schoolsWithCoursesSelector } from '../../../redux/selectors/schoolsWithCoursesSelector';
import { userFavouriteCoursesSelector } from '../../../redux/selectors/userFavouriteCoursesSelector';
import { userSchoolWithCoursesSelector } from '../../../redux/selectors/userSchoolWithCoursesSelector';
import { fetchAllSchools } from '../../../redux/schoolsSlice';
import { fetchAllCourses } from '../../../redux/coursesSlice';

export default function RegisterUserDetails() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleUserSelection = value => {
    setUserInfo({ ...userInfo, type: value });
    dispatch(fetchAllSchools());
    dispatch(fetchAllCourses());
    console.log(userInfo);
  };

  const schoolsWithCourses = useSelector(schoolsWithCoursesSelector);
  const userFavoriteCourses = useSelector(userFavouriteCoursesSelector);
  const userSchool = useSelector(userSchoolWithCoursesSelector);

  const [userInfo, setUserInfo] = useState({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    type: user.type,
  });

  const [selectedSchool, setSelectedSchool] = useState(userSchool);
  const [selectedCourses, setSelectedCourses] = useState(userFavoriteCourses);

  const handleSchoolChange = e => {
    // reset courses to empty array 
    setSelectedSchool(schoolsWithCourses[e.target.value]);
    setSelectedCourses({});
    dispatch(fetchAllCourses());
  };

  const handleCourseChange = (userSelectedCourses) => {
    let selectedCoursesObj = {};
    for (let courseId of userSelectedCourses) {
      selectedCoursesObj[courseId] = selectedSchool.courses[courseId];
    }
    console.log(selectedCoursesObj);
    setSelectedCourses(selectedCoursesObj);
  }
  
  useEffect(() => {
    if (selectedSchool && userSchool && selectedSchool._id === userSchool._id) {
      setSelectedCourses(userFavoriteCourses);
    } else {
      setSelectedCourses({});
    }
  }, [selectedSchool]);

  const handleSubmit = () => {
    const favourites = Object.keys(selectedCourses);
    const school = selectedSchool._id;
    const userType = userInfo.type;
    const updatedUser = {
      ...userInfo,
      school: school,
      favourites: favourites,
      userType: userType,
    };
    console.log(updatedUser);
    dispatch(updateUser(updatedUser));
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
      return (
        <>
          <FormLabel color={'white'}>Courses</FormLabel>
          <SimpleGrid minChildWidth='120px' spacing='7px'>
            <CourseSelectButtons
              courses={selectedSchool.courses}
              selected={selectedCourses}
              handleChange={handleCourseChange}
            />
          </SimpleGrid>
        </>
      );
    }
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.800'}>
      <Stack align={'center'} spacing={8} mx={'auto'}  w={[300, 400, 500, 600]} py={12} px={6}>
        <Stack >
          <Heading fontSize={'4xl'} color={'white'}>
            User Registration
          </Heading>
        </Stack>
        <Box
          borderWidth="1px"
          rounded="lg"
          bg={'gray.700'}
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          w={[300, 400, 500, 600]} 
          p={8}
          m="10px auto"
        >
          {!userInfo.type && (
            <Stack spacing={4}>
              <Heading fontSize={'xl'} py="20px">Welcome to CourseGPT {userInfo.firstName}!</Heading>
              <UserTypeSelectButtons
                value={userInfo.type}
                handleChange={value => handleUserSelection(value)}
              />
            </Stack>
          )}
          {userInfo.type && (
            <Stack spacing={4}>
            <Heading align={'center'} fontSize={'xl'} color={'white'}>
                  Registering as a {userInfo.type}
                </Heading>
              <Text fontSize={'lg'} py="10px">Please select your school and courses below:</Text>
              <FormControl>
                <FormLabel color={'white'}>School</FormLabel>
                <Select
                  placeholder="Select a school"
                  value={selectedSchool?._id}
                  onChange={handleSchoolChange}
                >
                  {renderSchools()}
                </Select>
              </FormControl>

              <FormControl>
                {renderCourses()}
              </FormControl>

              <ButtonGroup mt="5%" w="100%">
                <Flex w="100%" justifyContent="space-between">
                  <Flex>
                    <Button
                      onClick={() => {
                        setUserInfo({ ...userInfo, type: null });
                      }}
                      colorScheme="teal"
                      variant="solid"
                      w="7rem"
                      mr="5%"
                    >
                      Back
                    </Button>
                  </Flex>
                  <Button
                    w="7rem"
                    colorScheme="red"
                    variant="solid"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Flex>
              </ButtonGroup>
            </Stack>
          )}
        </Box>
      </Stack>
    </Flex>
  );
}

function UserTypeSelectButtons({ handleChange }) {
  const options = ['Student', 'Professor'];

  const { getRadioProps } = useRadioGroup({
    defaultValue: null,
    onChange: handleChange,
  });

  return (
    <VStack {...options}>
      {options.map(value => {
        const option = getRadioProps({ value });
        return (
          <SingleSelectButtons key={value} {...option}>
            I'm a {value}
          </SingleSelectButtons>
        );
      })}
    </VStack>
  );
}

function CourseSelectButtons({ courses, selected, handleChange }) {
  const { value, setValue, getCheckboxProps } = useCheckboxGroup({
    defaultValue: Object.keys(selected),
    onChange: (value) => { 
      handleChange(value);
    }
  });

  useEffect(() => {
    setValue([]);
  }, [courses]);

  return (
    <>
      {Object.keys(courses).map(value => {
        const option = getCheckboxProps({value});
        return (
            <MultiSelectButtons key={value} {...option}>
              {courses[value].courseCode}
            </MultiSelectButtons>
        );
      })}
    </>
  );
}
