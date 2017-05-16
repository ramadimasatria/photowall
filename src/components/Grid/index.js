import React from 'react';

import styles from './styles.css';

import Tile from '../Tile';
import Photo from '../Photo';

const Grid = ({ items, width, cellSize }) => {
  const cols = Math.floor(width / cellSize);

  return (
    <div className={styles.grid} style={{ width }}>
      {
        items.map((item, idx) => {
          const tileData = {
            col: (idx % cols) + 1,
            colSpan: 1,
            row: Math.ceil((idx + 1) / cols),
            rowSpan: 1,
            cellSize,
          };

          return (
            <Tile key={item.id} {...tileData}>
              <Photo {...item} tileData={tileData} />
            </Tile>
          );
        })
      }
    </div>
  );
};

export default Grid;
