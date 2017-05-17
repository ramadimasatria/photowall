import React from 'react';

import styles from './styles.css';

const Expo = ({ text }) => (
  <div className={styles.container}>
    <div className={styles.text}>{ text }</div>
  </div>
);

export default Expo;
