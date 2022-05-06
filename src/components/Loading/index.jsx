import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

Loading.propTypes = {};

function Loading(props) {
  return (
    <div className="loading-dialog">
      <div className="loading">
        <div className="a"></div>
        <div className="b"></div>
        <div className="c"></div>
        <div className="d"></div>
      </div>
    </div>
  );
}

export default Loading;
