import React from 'react'
import styles from './SidePanel.module.css';
import { Select, Button } from '@chakra-ui/react'

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
        <div className={styles.profile}>Username</div> 
    </div>
  )
}

export default SidePanel