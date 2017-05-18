import React from 'react';

import styles from './styles.css';

const Expo = ({ text }) => {
  const colors = ['red', 'yellow', 'blue', 'green', 'orange'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <div className={styles.text}>{ text }</div>
    </div>
  );
};

export default Expo;
