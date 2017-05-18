import React from 'react';

import styles from './styles.css';

const Premium = ({ text }) => {
  const colors = ['red', 'yellow', 'blue', 'green', 'orange', 'black'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <div className={styles.text}>{ text }</div>
    </div>
  );
};

export default Premium;
