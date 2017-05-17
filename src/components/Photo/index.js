import React from 'react';
import LazyLoad from 'react-lazyload';

import styles from './styles.css';

const Photo = ({ url, name, country, row, col, tileData }) => (
  <div className={styles.container}>
    <LazyLoad offset={2 * tileData.cellSize}>
      <img
        src={url}
        className={styles.image}
        alt={name}
        width={col * tileData.cellSize}
      />
    </LazyLoad>

    <div className={styles.caption}>
      { name }
      <br />
      { country }
    </div>
  </div>
);

export default Photo;
