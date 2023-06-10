import React from 'react';
import Profile from "./ProfileSettings";
import CustomModal from "./CustomModal";

const Settings = ({isOpen, handleClose}) => {
    const handleSave = () => {
        handleClose();
    };

    return (
        <CustomModal isOpen={isOpen} handleClose={handleClose} handleSave={handleSave} Component={Profile} />
    );
};

export default Settings;
