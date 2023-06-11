import React from 'react';
import { Box, Stack, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

const ProfileInfo = ({ user, setFirstName, setLastName, setEmail, setAccountType }) => (
  <Box w="100%">
    <Stack direction="row" spacing={4}>
      <FormControl>
        <FormLabel>First name</FormLabel>
        <Input
          placeholder="First name"
          value={user.firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Last name</FormLabel>
        <Input
          placeholder="Last name"
          value={user.lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>
    </Stack>
    <FormControl>
      <FormLabel>Email address</FormLabel>
      <Input
        placeholder="Email address"
        value={user.email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </FormControl>
    <FormControl>
      <FormLabel>Account Type</FormLabel>
      <Select
        placeholder="Account Type"
        value={user.type}
        onChange={(e) => setAccountType(e.target.value)}
      >
        <option value="Student">Student</option>
        <option value="Professor">Teacher</option>
        <option value="Admin">Admin</option>
        <option value="Developer">Developer</option>
      </Select>
    </FormControl>
  </Box>
);

export default ProfileInfo;
