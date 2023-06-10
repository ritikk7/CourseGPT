import { Box, Select, Text } from '@chakra-ui/react';

const CustomSelector= ({type}) => {

    return (
        <Box display="flex" alignItems="center" height="8vh">
            <Text
                fontWeight="bold"
                color="#FFFFFF"
                marginRight="2" 
                paddingRight="2"
                width="150px"
            >
                {type} 
            </Text>
            <Select
                width="250px"
                background="#FFFFFF"
            >
                <option>PlaceHolder 1</option>
                <option>PlaceHolder 2</option>
                <option>PlaceHolder 3</option>
            </Select>
        </Box>
    )
}

export default CustomSelector;
