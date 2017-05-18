import React from 'react';
import ReactDOM from 'react-dom';

import styles from './styles.css';

class FadeImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    const imgTag = ReactDOM.findDOMNode(this.refs.img);
    const imgSrc = imgTag.getAttribute('src');
    const img = new window.Image();

    img.onload = () => {
      this.setState({loaded: true});
    };
    img.src = imgSrc;
  }

  render() {
    const { className = '', ...props } = this.props;
    let imageClass = `${className} ${styles.image}`;

    if (this.state.loaded) {
      imageClass += ` ${styles.loaded}`;
    }

    return (
      <img ref="img" className={`${imageClass}`} {...props} />
    );
  }
}

export default FadeImage;
