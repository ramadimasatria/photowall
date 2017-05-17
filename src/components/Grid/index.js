/* eslint-disable no-underscore-dangle */

import React from 'react';

import styles from './styles.css';

import Tile from '../Tile';
import Photo from '../Photo';

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.matrix = [];

    this.cols = Math.floor(props.width / props.cellSize);
    this.rows = 0;

    this.pointer = [0, 0]; // [x, y] --> x indicates row, y indicates col
    this.buffer = this.pointer;
  }


  componentWillReceiveProps(props) {
    if (this.props.items.length === props.items.length) {
      return;
    }

    this._updateMatrix(props.items);
  }

  _updateMatrix(items) {
    const cellCount = items.reduce((acc, item) => {
      const { col, row } = item;
      const size = col * row;
      return acc + size;
    }, 0);

    const rows = Math.ceil(cellCount / this.cols);
    for (let i = 0; i < rows; i += 1) {
      this._addRow();
    }
  }

  _addRow() {
    this.rows += 1;
    this.matrix.push([]);
    for (let i = 0; i < this.cols; i += 1) {
      this.matrix[this.rows - 1].push('-');
    }
  }

  _cellAvailable(point1, point2) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;

    let available = true;

    // Check if out of bound
    if (y2 > this.cols - 1) {
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

  _findNextEmptyCell(point) {
    const [x, y] = point;

    let nextX = x;
    let nextY = y;
    let found = false;

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

    const point1 = [x, y];
    const point2 = [
      x + (item.row - 1),
      y + (item.col - 1),
    ];

    if (!this._cellAvailable(point1, point2)) {
      this.buffer = this._findNextEmptyCell(this.buffer);
      return this._findCell(item);
    }

    const row = x + 1;
    const col = y + 1;

    this._fillMatrix(point1, point2);

    this.pointer = this._findNextEmptyCell(this.pointer);
    this.buffer = this.pointer;

    return { col, row };
  }

  render() {
    const { width, cellSize, items } = this.props;

    return (
      <div className={styles.grid} style={{ width }}>
        {
          items.map((item) => {
            const { col, row } = this._findCell(item);

            const tileData = {
              col,
              row,
              colSpan: item.col,
              rowSpan: item.row,
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
  }
}

export default Grid;
