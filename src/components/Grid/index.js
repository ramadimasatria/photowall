/* eslint-disable no-underscore-dangle */

import React from 'react';

import styles from './styles.css';

import Tile from '../Tile';
import Photo from '../Photo';
import Expo from '../Expo';

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.matrix = [];

    this.cols = Math.floor(props.width / props.cellSize);
    this.rows = 0;

    this.pointer = [0, 0]; // [x, y] --> x indicates row, y indicates col
    this.buffer = this.pointer;
  }

  _addRow() {
    this.rows += 1;
    this.matrix.push([]);
    for (let i = 0; i < this.cols; i += 1) {
      this.matrix[this.rows - 1].push('-');
    }
  }

  _isCellAvailable(point1, point2) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;

    let available = true;

    // Check if out of bound
    if (y2 === this.cols) {
      return false;
    }

    // Check if cell is already occupied
    for (let x = x1; x <= x2; x += 1) {
      if (!this.matrix[x]) {
        this._addRow();
      }

      for (let y = y1; y <= y2; y += 1) {
        available = this.matrix[x][y] !== 'x';
        if (!available) break;
      }

      if (!available) break;
    }

    return available;
  }

  _fillMatrix(point1, point2) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;

    for (let x = x1; x <= x2; x += 1) {
      if (!this.matrix[x]) {
        this.matrix.push([]);
      }

      for (let y = y1; y <= y2; y += 1) {
        this.matrix[x][y] = 'x';
      }
    }
  }

  _findNextEmptyCell(point, checkCurrent = false) {
    const [x, y] = point;

    let nextX = x;
    let nextY = y;

    let found = false;
    if (checkCurrent) {
      found = this.matrix[nextX][nextY] !== 'x';
    }

    while (!found) {
      nextY += 1;
      if (nextY === this.cols) {
        nextX += 1;
        nextY = 0;

        if (!this.matrix[nextX]) {
          this._addRow();
        }
      }

      found = this.matrix[nextX][nextY] !== 'x';
    }

    return [nextX, nextY];
  }

  _findCell(item) {
    const [x, y] = this.buffer;
    const [sizeY, sizeX] = item.size.split('x');

    const point1 = [x, y];
    const point2 = [
      x + (sizeX - 1),
      y + (sizeY - 1),
    ];

    if (!this._isCellAvailable(point1, point2)) {
      this.buffer = this._findNextEmptyCell(this.buffer);
      return this._findCell(item);
    }

    this._fillMatrix(point1, point2);

    this.pointer = this._findNextEmptyCell(this.pointer, true);
    this.buffer = this.pointer;

    return {
      col: y + 1,
      row: x + 1,
    };
  }

  render() {
    const { width, cellSize, items } = this.props;

    return (
      <div className={styles.grid} style={{ width }}>
        {
          items.map((item) => {
            const { col, row } = this._findCell(item);
            const [colSpan, rowSpan] = item.size.split('x');

            const tileData = {
              col,
              row,
              colSpan,
              rowSpan,
              cellSize,
            };

            let TileContent;
            switch (item.type) {
              case 'expo':
                TileContent = (
                  <Expo {...item} />
                );
                break;

              default:
                TileContent = (
                  <Photo {...item} tileData={tileData} />
                );
                break;
            }

            return (
              <Tile key={item.id} {...tileData}>
                { TileContent }
              </Tile>
            );
          })
        }
      </div>
    );
  }
}

export default Grid;
