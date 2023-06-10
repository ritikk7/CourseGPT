import React from 'react';
import styles from './ProfileSidePanel.module.css';
import { Text, Flex } from '@chakra-ui/react';

const ProfileSidePanel = () => {
    return (
        <Flex
            background="rgb(31, 31, 32)"
            align="center"
            width="100%"
            height="100%"
            justify="center"
        >
            <Text
                as="b" 
                fontSize="3xl"
                color="#FFF"
            >
                CourseGPT
            </Text>
        </Flex>
    )
};

export default ProfileSidePanel;