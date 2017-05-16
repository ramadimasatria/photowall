/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import axios from 'axios';

import Grid from '../../components/Grid';

import styles from './styles.css';

class Photowall extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
    };
  }

  componentWillMount() {
    axios.get('/photos')
      .then(({ data }) => {
        this.setState({
          items: data,
        });
      });
  }

  render() {
    return (
      <div className={styles.photowall}>
        <h1 className={styles.title}>Photo Wall</h1>

        <div className={styles.gridContainer}>
          <Grid
            items={this.state.items}
            width={1200}
            cellSize={200}
          />
        </div>
      </div>
    );
  }
}

export default Photowall;
