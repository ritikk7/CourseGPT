import React from 'react'
import styles from './RightSection.module.css';
import api from '../../api/axiosInstance';

import {  Text  } from '@chakra-ui/react';

const RightSection = () => {
    const callApi = () => {
        api
          .post('/users')
          .then(response => {
            const data = response.data;
            alert(JSON.stringify(data));
          })
          .catch(error => {
            console.error(error);
          });
      };
  return ( 
    <div className={styles.container}>
      <div className={styles.mainPanel}>
       <Text as='b' fontSize='4xl'> CourseGPT</Text>
      </div>
        <div className={styles.inputSection}>
           <div className={styles.inputArea}>
           <input className={styles.input} placeholder='Enter a prompt...'/>
       {/* TODO: replace btn with svg */}
            <button className={styles.sendBtn}  onClick={callApi}>Send</button>
           </div>
        </div>
    </div>
  )
}

export default RightSection