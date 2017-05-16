import React from 'react';

import styles from './styles.css';

const Photo = ({ url, name }) => (
  <div className={styles.photoContainer}>
    <img src={url} className={styles.photoImg} alt={name} />
  </div>
);

export default Photo;
