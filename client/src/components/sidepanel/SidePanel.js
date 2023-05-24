import React from 'react'
import styles from './SidePanel.module.css';
import { Select } from '@chakra-ui/react'

const SidePanel = () => {
  return (
    <div className={styles.sidepanel}>
        <Select placeholder='Select a course'>
          <option value='cpsc455'>CPSC455</option>
          <option value='cpsc310'>CPSC310</option>  
          <option value='cpsc320'>CPSC320</option>
        </Select>
        <div>New chat</div>
        <div>Username</div> 
    </div>
  )
}

export default SidePanel