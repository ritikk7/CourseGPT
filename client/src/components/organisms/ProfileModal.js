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
import { updateUser } from "../../redux/userSlice";
import { fetchSchools } from "../../redux/schoolsSlice";
import { fetchCourses } from "../../redux/coursesSlice";

const ProfileModal = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const schools = useSelector((state) => state.schools.data);
  const courses = useSelector((state) => state.courses.data);
  const previousSelectedSchoolID = useSelector((state) => state.user.data.school);
  const userFavouriteCourses = useSelector((state) => state.user.data.favourites);
  const [newSelectedSchoolID, setNewSelectedSchoolID] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");

  useEffect(() => {
    if (!schools || schools.length === 0) {
      dispatch(fetchSchools());
    }
  }, [dispatch, schools]);

  useEffect(() => {
    if (previousSelectedSchoolID) {
      setNewSelectedSchoolID(previousSelectedSchoolID);
      if (courses[previousSelectedSchoolID]) {
        setAvailableCourses(courses[previousSelectedSchoolID]);
      } else {
        dispatch(fetchCourses(previousSelectedSchoolID));
      }
    }
  }, [previousSelectedSchoolID, courses, dispatch]);

  useEffect(() => {
    if (newSelectedSchoolID) {
      if (courses[newSelectedSchoolID]) {
        const newCourses = courses[newSelectedSchoolID].map((course) => ({
          ...course,
          selected: userFavouriteCourses.includes(course._id)
        }));
        setAvailableCourses(newCourses);
      } else {
        dispatch(fetchCourses(newSelectedSchoolID));
      }
    }
  }, [newSelectedSchoolID, courses, userFavouriteCourses, dispatch]);

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setAccountType(user.type);
  }, [user]);

  const handleSchoolChange = (e) => {
    setNewSelectedSchoolID(e.target.value);
  };

  const handleCourseChange = (courseID) => {
    const updatedCourses = availableCourses.map((course) => {
      if (course._id === courseID) {
        const isSelected = !course.selected;
        if (isSelected) {
          setSelectedCourses((prev) => [...prev, courseID]);
        } else {
          setSelectedCourses((prev) => prev.filter((_id) => _id !== courseID));
        }
        return { ...course, selected: isSelected };
      }
      return course;
    });

    setAvailableCourses(updatedCourses);
  };

  const renderSchools = () => {
    return schools.map((school) => (
      <option key={school._id} value={school._id}>
        {school.name}
      </option>
    ));
  };

  const renderCourses = () => {
    return availableCourses.map((course) => (
      <Checkbox
        key={course._id}
        value={course._id}
        isChecked={course.selected}
        onChange={()=> handleCourseChange(course._id)}
      >
        {course.courseName}
      </Checkbox>
    ));
  };

  const handleSave = () => {
    const updatedUser = {
      firstName,
      lastName,
      email,
      type: accountType,
      school: newSelectedSchoolID,
      favourites: selectedCourses
    };
    dispatch(updateUser(updatedUser));
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <VStack spacing="5" width="100%" padding="5">
          <Text fontSize="3xl" fontWeight="bold">
            Edit Profile Settings
          </Text>
          <Box boxSize="150px">
            <Image
              borderRadius="full"
              boxSize="150px"
              src="https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
              alt="Profile Picture"
            />
          </Box>
          <Stack spacing="5" width="100%">
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Account Type</FormLabel>
              <Select
                placeholder="Select account type"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="Student">Student</option>
                <option value="Professor">Professor</option>
                <option value="Developer">Developer</option>
                <option value="Admin">Admin</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>School</FormLabel>
              <Select
                defaultValue={previousSelectedSchoolID ? previousSelectedSchoolID : "Select a School"}
                onChange={handleSchoolChange}
              >
                {renderSchools()}
              </Select>
              <FormLabel>Courses</FormLabel>
              <VStack align="start" spacing={2}>
                {renderCourses()}
              </VStack>
            </FormControl>
          </Stack>
        </VStack>
        <ModalCloseButton mt={2} size={"lg"} />
        <ModalFooter>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
