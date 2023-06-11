import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay,
  Select,
  VStack
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchools } from "../../../redux/schoolsSlice";
import { fetchCourses } from "../../../redux/coursesSlice";
import { updateUser } from "../../../redux/userSlice";

const SchoolCourseSelector = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const schools = useSelector((state) => state.schools.data);
  const courses = useSelector((state) => state.courses.data);
  const previousSelectedSchoolID = useSelector((state) => state.user.data.school);
  const userFavouriteCourses = useSelector((state) => state.user.data.favourites);
  const [newSelectedSchoolID, setNewSelectedSchoolID] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

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
  }, []);

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
  }, [dispatch, newSelectedSchoolID, courses, userFavouriteCourses]);

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

  const handleSave = () => {
    const payload = {
      school: newSelectedSchoolID,
      favourites: selectedCourses
    };

    dispatch(updateUser(payload))
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.log("Failed to update user:", error);
      });
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
        onChange={() => handleCourseChange(course._id)}
      >
        {course.courseName}
      </Checkbox>
    ));
  };

  return (
        <ModalBody mt={7}>
          <FormControl>
            <FormLabel>School</FormLabel>
            <Select defaultValue={previousSelectedSchoolID ? previousSelectedSchoolID : "Select a School"}
                    onChange={handleSchoolChange}>
              {renderSchools()}
            </Select>
            <FormLabel>Courses</FormLabel>
            <VStack align="start" spacing={2}>
              {renderCourses()}
            </VStack>
          </FormControl>
          <ModalCloseButton mt={2} size={"lg"} />
          <ModalFooter>
            <Button onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalBody>
  );
};

export default SchoolCourseSelector;
