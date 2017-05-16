import React from 'react';

import styles from './styles.css';

const Tile = (props) => {
  const { col, colSpan, row, rowSpan, cellSize } = props;

  const top = (row - 1) * cellSize;
  const left = (col - 1) * cellSize;
  const width = colSpan * cellSize;
  const height = rowSpan * cellSize;

  return (
    <div className={styles.tile} style={{ top, left, width, height }}>
      <div className={styles.tileContent}>
        { props.children }
      </div>
    </div>
  );
};

export default Tile;
