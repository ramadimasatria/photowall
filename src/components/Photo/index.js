import React from 'react';
import LazyLoad from 'react-lazyload';

import styles from './styles.css';
import FadeImage from '../FadeImage';

const Photo = ({ url, name, country, tileData }) => {
  const { colSpan, rowSpan } = tileData;
  const width = colSpan * tileData.cellSize;
  const height = rowSpan * tileData.cellSize;

  return (
    <div className={styles.container}>
      <LazyLoad offset={2 * tileData.cellSize} height={height} once>
        <div className={styles.image}>
          <FadeImage
            src={url}
            alt={name}
            width={width}
            height={height}
            />
        </div>
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
