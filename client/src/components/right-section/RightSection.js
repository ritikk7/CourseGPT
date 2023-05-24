import React from 'react'
import styles from './RightSection.module.css';

const RightSection = () => {
  return (
    <div className={styles.container}>
        <div className={styles.inputArea}>
            <input className={styles.input} placeholder='Enter a prompt...'/>
        </div>
    </div>
  )
}

export default RightSection