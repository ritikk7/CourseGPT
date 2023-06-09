import React, { useState } from "react";
import { Button, Box, Image, Text } from '@chakra-ui/react';
import CustomTextbox from '../components/CustomTextbox/CustomTextbox';
import '../styles/Profile.css';

function Profile() {

    const [value, setValue] = useState('Value');
    const [type, setType] = useState('Type');

    return (
        <div className="Profile">
            <Text
                fontSize="5vh"
                fontWeight="bold"
                color="#FFFFFF"
                paddingLeft="10"
                paddingTop="6"
            >
                Edit Profile
            </Text>
            <div class="image-container">
                <Image
                    borderRadius='full'
                    boxSize='150px'
                    src='https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg'
                    alt='Default Profile Picture'
                />
            </div>
            <CustomTextbox
                value={value}
                type={"First Name"}
            />
            <CustomTextbox
                value={value}
                type={"Last Name"}
            />
            <CustomTextbox
                value={value}
                type={"Email"}
            />
            <CustomTextbox
                value={value}
                type={"Account Type"}
            />
            <Box display="flex" justifyContent="center" marginTop="12">
                <Button>
                    Submit
                </Button>
            </Box>
        </div>
    );
}

export default Profile;