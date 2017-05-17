import React from 'react';
import LazyLoad from 'react-lazyload';

import styles from './styles.css';

const Photo = ({ url, name, country, row, col, tileData }) => {
  const width = col * tileData.cellSize;
  const height = row * tileData.cellSize;

  return (
    <div className={styles.container}>
      <LazyLoad offset={2 * tileData.cellSize} height={height}>
        <img
          src={url}
          className={styles.image}
          alt={name}
          width={width}
          height={height}
        />
      </LazyLoad>

      <div className={styles.caption}>
        { name }
        <br />
        { country }
      </div>
    </div>
  );
};

export default Photo;
