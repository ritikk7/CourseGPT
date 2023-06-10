import React from 'react';
import CustomModal from "../molecules/CustomModal";
import SchoolCourseSelector from "../molecules/SchoolClassSelector/SchoolCourseSelector";
import {ModalBody} from "@chakra-ui/react";

const CourseSelectorModal = ({isOpen, handleClose}) => {
    const handleSave = () => {
        handleClose();
    };

    return (
        <CustomModal isOpen={isOpen} handleClose={handleClose} handleSave={handleSave}
                     Component={WrappedCourseSelectorModal}/>
    );
};

const WrappedCourseSelectorModal = () => {
    return (
        <ModalBody mt={7}>
            <SchoolCourseSelector/>
        </ModalBody>
    );
}


export default CourseSelectorModal;
