import React, { useState } from 'react';
import styles from './CustomTextbox.module.css';
import { Box, Input, Text } from '@chakra-ui/react'

const CustomTextbox = ({type, value}) => {

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="10vh">
            <Text
                fontWeight="bold"
                color="#FFF"
                marginRight="2" 
                paddingRight="2"
                width="150px"
            >
                {type} 
            </Text>
            <Input
                width='auto'
                background="#FFFFFF"
                placeholder={value}
            />
        </Box>
    )
}

export default CustomTextbox;