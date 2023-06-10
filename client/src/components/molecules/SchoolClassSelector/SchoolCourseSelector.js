import React, {useState, useEffect} from 'react';
import {
    Select,
    Checkbox,
    CheckboxGroup,
    VStack, FormControl, FormLabel,
} from '@chakra-ui/react';
import api from '../../../api/axiosInstance';
import {useDispatch} from 'react-redux';
import {fetchCourses, fetchSchool} from '../../../redux/schoolsSlice';

const SchoolCourseSelector = () => {
    const [firstDropdownValue, setFirstDropdownValue] = useState('');
    const [firstDropdownOptions, setFirstDropdownOptions] = useState([]);
    const [secondDropdownValue, setSecondDropdownValue] = useState([]);
    const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('schools');

            setFirstDropdownOptions(
                response.data.schools.map(school => ({
                    label: school.name,
                    value: school._id,
                }))
            );
        };

        fetchData();
    }, []);

    const handleFirstDropdownChange = async event => {
        if (!event.target.value) {
            setSecondDropdownOptions([]);
            return;
        }

        dispatch(fetchSchool(event.target.value));
        setFirstDropdownValue(event.target.value);

        const response = await api.get(`/schools/${event.target.value}/courses`);

        setSecondDropdownOptions(
            response.data.courses.map(course => ({
                label: course.courseName,
                value: course._id,
            }))
        );
    };

    const handleSecondDropdownChange = async event => {
        dispatch(fetchCourses({firstDropdownValue, event}));
        setSecondDropdownValue(event);
    };

    return (
        <FormControl>
            <FormLabel>School</FormLabel>
            <Select onChange={handleFirstDropdownChange}>
                <option value="">What school do you attend?</option>
                {firstDropdownOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
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
};

export default SchoolCourseSelector;
