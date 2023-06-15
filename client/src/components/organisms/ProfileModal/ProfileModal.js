import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Box,
  VStack,
  Image,
  Input,
  Text,
  Stack,
  Select,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Checkbox
} from "@chakra-ui/react";
import { updateUser } from "../../../redux/userSlice";
import { schoolsWithCoursesSelector } from "../../../redux/selectors/schoolsWithCoursesSelector";
import { userFavouriteCoursesSelector } from "../../../redux/selectors/userFavouriteCoursesSelector";
import { userSchoolWithCoursesSelector } from "../../../redux/selectors/userSchoolWithCoursesSelector";

const ProfileModal = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const schoolsWithCourses = useSelector(schoolsWithCoursesSelector);
  const userFavoriteCourses = useSelector(userFavouriteCoursesSelector);
  const userSchool = useSelector(userSchoolWithCoursesSelector);

  const [userInfo, setUserInfo] = useState({
    email: user.email,
    //password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    type: user.type
  });

  const [selectedSchool, setSelectedSchool] = useState(userSchool);
  const [selectedCourses, setSelectedCourses] = useState(userFavoriteCourses);

  const handleSchoolChange = (e) => {
    setSelectedSchool(schoolsWithCourses[e.target.value]);
  };

  useEffect(() => {
    if(selectedSchool && userSchool && selectedSchool._id === userSchool._id) {
      setSelectedCourses(userFavoriteCourses);
    } else {
      setSelectedCourses({});
    }
  },[selectedSchool])

  const handleCourseChange = (course) => {
    setSelectedCourses((prevCourses) => {
      if (prevCourses[course._id]) {
        const { [course._id]: deletedCourse, ...remainingCourses } = prevCourses;
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
      ...userInfo,
      school,
      favourites
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
    if(selectedSchool) {
      return Object.values(selectedSchool.courses).map((course, i) => (
        <Checkbox
          key={i}
          isChecked={!!selectedCourses[course._id]}
          onChange={() => handleCourseChange(course)}
        >
          {course.courseCode}
        </Checkbox>
      ))
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <VStack p={5}>
          <Stack direction="row">
            <Box boxSize="150px">
              <Image
                borderRadius="full"
                boxSize="150px"
                src="https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
                alt="Profile Picture"
              />
            </Box>
          </Stack>
          <Box w="100%">
            <Stack direction="row" spacing={4}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  placeholder="First name"
                  value={userInfo.firstName}
                  onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  value={userInfo.lastName}
                  onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value })}
                />
              </FormControl>
            </Stack>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="Email address"
                value={userInfo.email}
                onChange={(e) => setUserInfo({...userInfo, email: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Account Type</FormLabel>
              <Select
                value={userInfo.type}
                onChange={(e) => setUserInfo({...userInfo, type: e.target.value })}
              >
                <option value="Student">Student</option>
                <option value="Professor">Teacher</option>
                <option value="Admin">Admin</option>
                <option value="Developer">Developer</option>
              </Select>
            </FormControl>
          </Box>
          <Box w="100%">
            <FormControl>
              <FormLabel>School</FormLabel>
              <Select
                placeholder="Select a school"
                value={selectedSchool?._id}
                onChange={handleSchoolChange}
              >
                {renderSchools()}
              </Select>
            </FormControl>
            <Text fontSize="lg">Courses</Text>
            {renderCourses()}
          </Box>
        </VStack>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
