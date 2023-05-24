import React from 'react'
import styles from './SidePanel.module.css';
import { 
  Select, 
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider
 } from '@chakra-ui/react';
 import { HamburgerIcon } from '@chakra-ui/icons'

const SidePanel = () => {
  return (
    <div className={styles.sidepanel}>
       <div className={styles.courseSelect}>
       <Select placeholder='Select a course' _hover={{ bg: "rgb(61, 61, 61)" }}>
          <option value='cpsc455'>CPSC455</option>
          <option value='cpsc310'>CPSC310</option>  
          <option value='cpsc320'>CPSC320</option>
        </Select>
        <Button mt={4} width='100%' bg='transparent' _hover={{ bg: "rgb(61, 61, 61)" }} border='1px' borderColor='gray.300'>+ New Chat</Button>
       </div>
       <div className={styles.profile}>
        <div>Username</div>
       <Menu>

  <MenuButton as={Button} bg='transparent' _hover={{ bg: "rgb(61, 61, 61)" }} _focus={{ bg: "rgb(61, 61, 61)" }} 
    _expanded={{ bg: "rgb(61, 61, 61)" }}>
  <HamburgerIcon/>
  </MenuButton>
  <MenuList bg='black' border='none'>
    <MenuItem bg='black'>Profile</MenuItem>
    <MenuItem bg='black'>Clear conversations</MenuItem>
    <MenuItem bg='black'>Logout</MenuItem>
  </MenuList>
</Menu></div> 
    </div>
  )
}

export default SidePanel