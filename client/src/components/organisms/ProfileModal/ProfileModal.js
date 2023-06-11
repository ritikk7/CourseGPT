import React, { useState, useEffect } from "react";
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
import { fetchSchools, fetchUserSchool } from "../../../redux/schoolsSlice";
import { fetchSchoolCourses, fetchUserFavouriteCourses } from "../../../redux/coursesSlice";
import LoadingSpinner from "../../atoms/LoadingSpinner/LoadingSpinner";

const ProfileModal = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const currUserFavouriteCourses = useSelector((state) => state.courses.userFavourites);
  const currUserSchool = useSelector((state) => state.schools.userSchool);
  const schoolIdToSchoolMap = useSelector((state) => state.schools.schools);
  const schoolIdToCoursesMap = useSelector((state) => state.courses.allCourses);

  const [allAvailableCourses, setAllAvailableCourses] = useState({});

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [accountType, setAccountType] = useState(user.type);



  // When the page first loads
  useEffect(() => {
    if (Object.keys(schoolIdToSchoolMap).length === 0) {
      dispatch(fetchSchools());
    }
    if (Object.values(currUserFavouriteCourses).length === 0) {
      dispatch(fetchUserFavouriteCourses());
    }
    if (currUserSchool === null) {
      dispatch(fetchUserSchool());
    }
  }, []);

  useEffect(() => {
    if (currUserSchool !== null) {
      dispatch(fetchSchoolCourses(currUserSchool._id));
    }
  }, [currUserSchool, dispatch]);

  useEffect(() => {
    if (Object.keys(schoolIdToSchoolMap).length !== 0) {
      setIsLoading(false);
    }
  }, [schoolIdToSchoolMap])

  const [newSelectedSchool, setNewSelectedSchool] = useState(null);
  const [newSelectedCourses, setNewSelectedCourses] = useState({});

  useEffect(() => {
    if(currUserSchool) {
      setNewSelectedSchool(currUserSchool);
    }
    if(currUserFavouriteCourses) {
      setNewSelectedCourses(currUserFavouriteCourses);
    }
    if(schoolIdToCoursesMap && currUserSchool && schoolIdToCoursesMap[currUserSchool._id]) {
      setAllAvailableCourses(schoolIdToCoursesMap[currUserSchool._id]);
    }
  }, [currUserSchool, currUserFavouriteCourses, dispatch]);


  // On school change, ensure all courses are available
  useEffect(() => {
    if(schoolIdToCoursesMap && newSelectedSchool && schoolIdToCoursesMap[newSelectedSchool._id]) {
      setAllAvailableCourses(schoolIdToCoursesMap[newSelectedSchool._id]);
    } else if(newSelectedSchool) {
      console.log(newSelectedSchool);
      dispatch(fetchSchoolCourses(newSelectedSchool._id));
    }
  }, [newSelectedSchool, schoolIdToCoursesMap]);

  // On changes
  const handleSchoolChange = (e) => {
    setNewSelectedSchool(schoolIdToSchoolMap[e.target.value]);
  };

  const handleCourseChange = (course) => {
    setNewSelectedCourses((prevCourses) => {
      if (prevCourses[course._id]) {
        const {[course._id]: deletedCourse, ...remainingCourses} = prevCourses;
        return remainingCourses;
      } else {
        return { ...prevCourses, [course._id]: course};
      }
    });
  };

  // On save
  const handleSave = () => {
    const favourites = Object.keys(newSelectedCourses);

    const updatedUser = {
      firstName,
      lastName,
      email,
      school: newSelectedSchool._id,
      favourites,
      type: accountType
    };

    dispatch(updateUser(updatedUser));
    handleClose();
  };

  // Render

  const renderSchools = () => {
    return Object.values(schoolIdToSchoolMap).map((school) => (
      <option key={school._id} value={school._id}>
        {school.name}
      </option>
    ));
  };

  const renderCourses = () => {
    return Object.values(allAvailableCourses).map((course) => (
      <Checkbox
        key={course._id}
        isChecked={!!newSelectedCourses[course._id]}
        onChange={() => handleCourseChange(course)}
      >
        {course.courseName}
      </Checkbox>
    ));
  };


  if (isLoading) return <LoadingSpinner/>;

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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
            </Stack>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Account Type</FormLabel>
              <Select
                placeholder="Account Type"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
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
                placeholder="Select school"
                value={newSelectedSchool?._id}
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
