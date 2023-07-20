import React from 'react';
import styles from './Legend.module.css';

const Legend = ({ colorScheme }) => {
  const values = ['<0.2', '0.2-0.4', '0.4-0.6', '0.6-0.8', '>0.8'];
  const Block = ({ color, index }) => {
    return (
      <div className={styles.blockContainer}>
        <div className={styles.block} style={{ backgroundColor: color }} />
        <span>{values[index]}</span>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.legendTitle}>Sentiment Legend</div>
      <div className={styles.legendContainer}>
        <span>negative</span>
        <div className={styles.legend}>
          {colorScheme.map((color, index) => (
            <Block key={index} color={color} index={index} />
          ))}
        </div>
        <span>positive</span>
      </div>
    </div>
  );
};

export default Legend;
