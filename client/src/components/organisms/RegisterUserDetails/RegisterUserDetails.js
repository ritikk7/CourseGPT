import React, { useEffect, useState } from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  Checkbox,
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
  useCheckboxGroup,
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
  const toast = useToast();
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
      let courseCodes = Object.values(selectedSchool.courses).map((course) => course.courseCode);
      return (
        <CourseSelectButtons options={courseCodes}
          handleChange={coursesSelected => setSelectedCourses(coursesSelected)}/>
      );
    }
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.800'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color={'white'}>
            User Registration
          </Heading>
        </Stack>
        <Box
          borderWidth="1px"
          rounded="lg"
          bg={'gray.700'}
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={1000}
          minWidth={500}
          p={8}
          m="10px auto"
        >
          {!userInfo.type && (
            <UserTypeSelectButtons
              value={userInfo.type}
              handleChange={value => handleUserSelection(value)}
            />
          )}
          {userInfo.type && (
            <>
              <FormControl id="userType">
                <FormLabel color={'white'}>
                  Account Type: {userInfo.type}
                </FormLabel>
              </FormControl>

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

              <FormLabel color={'white'}>Courses</FormLabel>

              <SimpleGrid minChildWidth='120px' spacing='5px'>
                {renderCourses()}
              </SimpleGrid>

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
            </>
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

function CourseSelectButtons({ options, handleChange }) {
  const { getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
    onChange: handleChange
  });

  return (
    //   <HStack {...options}>
    <>
      {/* <Text>The selected checkboxes are: {value.sort().join(' and ')}</Text> */}
      {options.map(value => {
        const option = getCheckboxProps({ value });
        return (
            <MultiSelectButtons key={value} {...option}>
              {value}
            </MultiSelectButtons>
        );
      })}
    </>
    //   </HStack>
  );
}
