import { Box, Input, Text } from '@chakra-ui/react';

const CustomTextbox = ({type, value}) => {

    return (
        <Box display="flex" alignItems="center" height="8vh">
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
                width="250px"
                background="#FFFFFF"
                placeholder={value}
            />
        </Box>
    )
}

export default CustomTextbox;
